// 스프라이트 스태킹: 물체는 한 픽셀 높이마다 한 장씩 쌓은 평면 조각(슬라이스) 더미다.
// 슬라이스는 그 층의 위에서 본 그림이고, 0번이 바닥이다. 그릴 때는 층마다 1px씩 위로 올리고
// 모든 층을 같은 각도로 돌린다. 팔레트 번호 버퍼(0 = 투명)로 그려서 캔버스 없이도 테스트할 수 있다.

/** boxes: {x, y, w, d, z, h, ink, top?, cut?}. 바닥면 (x, y)에서 +y가 물체의 앞쪽, z는 층 */
export function buildSlices(boxes, w, h, count) {
  const data = new Uint8Array(w * h * count);
  for (const box of boxes) {
    for (let z = Math.max(0, box.z); z < Math.min(count, box.z + box.h); z++) {
      const ink = box.cut ? 0 : z === box.z + box.h - 1 && box.top !== undefined ? box.top : box.ink;
      for (let y = Math.max(0, box.y); y < Math.min(h, box.y + box.d); y++) {
        for (let x = Math.max(0, box.x); x < Math.min(w, box.x + box.w); x++) data[z * w * h + y * w + x] = ink;
      }
    }
  }
  return { w, h, count, data };
}

/**
 * 스택 하나를 out(width * height)에 그린다. 위층이 아래층을 덮고, 표본 추출은 최근접.
 * o: {width, height, x, y, turn, squash = .75, spacing = 1}
 * x, y는 물체 중심이 땅에 닿는 점(정수로 반올림), 시트는 아래(+y)를 보고 있으니
 * 속도 v로 움직이는 물체는 turn = atan2(v.y, v.x) - PI / 2
 */
export function drawStack(out, s, o) {
  const { width, height } = o;
  const squash = o.squash ?? .75, spacing = o.spacing ?? 1;
  const px = Math.round(o.x), py = Math.round(o.y);
  const cos = Math.cos(o.turn), sin = Math.sin(o.turn);
  const hw = Math.floor(s.w / 2), hh = Math.floor(s.h / 2), layer = s.w * s.h;
  for (let z = 0; z < s.count; z++) {
    const lift = Math.round(z * spacing), base = z * layer;
    for (let Y = 0; Y < height; Y++) {
      const dy = (Y + .5 - (py - lift)) / squash;
      for (let X = 0; X < width; X++) {
        const dx = X + .5 - px;
        const col = Math.floor(dx * cos + dy * sin) + hw;
        const row = Math.floor(-dx * sin + dy * cos) + hh;
        if (col < 0 || row < 0 || col >= s.w || row >= s.h) continue;
        const ink = s.data[base + row * s.w + col];
        if (ink) out[Y * width + X] = ink;
      }
    }
  }
}

/** 여러 스택을 한 버퍼에 그린다. 바닥점 y가 작은(먼) 것부터, 조각 단위가 아니라 스택 단위로 정렬 */
export function drawStacks(width, height, items) {
  const out = new Uint8Array(width * height);
  for (const item of [...items].sort((a, b) => a.y - b.y)) drawStack(out, item.slices, { ...item, width, height });
  return out;
}

/** 완성된 스택에 윤곽선을 한 번만 둘러준다(층마다 그리면 몸 안에 선이 생긴다) */
export function outline(buffer, width, height, ink) {
  const out = buffer.slice();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (buffer[y * width + x]) continue;
      if ((x > 0 && buffer[y * width + x - 1]) || (x < width - 1 && buffer[y * width + x + 1]) ||
        (y > 0 && buffer[(y - 1) * width + x]) || (y < height - 1 && buffer[(y + 1) * width + x])) out[y * width + x] = ink;
    }
  }
  return out;
}

/** 채워진 픽셀의 경계 상자 (없으면 undefined) */
export function bounds(buffer, width, height) {
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!buffer[y * width + x]) continue;
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
  return x1 < 0 ? undefined : { x0, y0, x1, y1, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

/** 각도를 steps개 방향으로 맞춰서 천천히 돌 때 픽셀이 떨리지 않게 한다 */
export function snapTurn(turn, steps) {
  const unit = Math.PI * 2 / steps;
  return Math.round(turn / unit) * unit;
}
