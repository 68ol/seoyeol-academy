import { buildSlices, drawStack } from './stack.js';

// 아이소메트릭 미니룸. 동규와 같은 스프라이트 스태킹(1층 = 1px, 45도, 납작함 .5)으로 그려서
// 방과 캐릭터의 픽셀 크기·각도가 같다. 바닥 격자 135 x 135, 0번 모서리가 화면 맨 위(방 안쪽 구석),
// x = 0 줄이 왼쪽 벽, y = 0 줄이 오른쪽 벽이다. 한 번만 그려서 캔버스에 칠한다.
export const ROOM = { width: 190, height: 95, size: 135, layers: 31, x: 95, y: 78, turn: Math.PI / 4, squash: .5 };

export const ROOM_PALETTE = [null,
  '#2b2b3a', // 1 윤곽 (동규와 같은 색)
  '#fbf3e4', '#e3cfa8', '#bcdcf0', '#8fbfe0', // 2 벽지, 3 벽 윗면, 4 아래 판벽, 5 몰딩
  '#e6b27c', '#dba26b', '#c48a55', // 6·7 마루, 8 마루 틈
  '#d59b63', '#b97a45', '#93592e', // 9 나무 윗면, 10 앞면, 11 옆면
  '#ffffff', '#9cc3e8', '#7aa5d4', // 12 이불 흰색, 13 이불 하늘, 14 이불 그늘
  '#d4effc', '#fffdf8', '#ffd27a', // 15 유리, 16 흰 틀, 17 커튼
  '#ece6d4', '#5d9ccc', '#f7b8c4', '#ee9aac', // 18 컴퓨터, 19 화면, 20 러그, 21 러그 테두리
  '#e57f7f', '#f2c94c', '#6cbf84', '#5aa860', '#d0744a', '#fff0b3', '#5b6270', '#7fa8de', // 22~29 책·화분·포스터·검정·파랑
];

const box = (x, y, w, d, z, h, ink, top, id = 1) => ({ x, y, w, d, z, h, ink, top, id });
// 가구 한 덩이: 윗면 T, 왼쪽 아래 면 L, 오른쪽 아래 면 R (오른쪽 면은 x 끝 2칸)
const block = (x, y, w, d, z, h, [T, L, R], id) => [box(x, y, w, d, z, h, L, T, id), box(x + w - 2, y, 2, d, z, h, R, T, id)];
const WOOD = [9, 10, 11];

function shell() {
  const S = ROOM.size, H = ROOM.layers - 1, out = [box(0, 0, S, S, 0, 1, 6)];
  for (let y = 3, i = 0; y < S; y += 9, i++) out.push(box(0, y, S, 9, 0, 1, i % 2 ? 7 : 6), box(0, y, S, 1, 0, 1, 8));
  out.push(box(44, 50, 50, 42, 0, 1, 21), box(47, 53, 44, 36, 0, 1, 20)); // 러그
  for (const [x, y, w, d] of [[0, 0, 3, S], [0, 0, S, 3]]) {
    out.push(box(x, y, w, d, 0, H, 2, 3), box(x, y, w, d, 0, 9, 4), box(x, y, w + (w === 3 ? 1 : 0), d + (d === 3 ? 1 : 0), 9, 1, 5));
  }
  return out;
}

function furniture() {
  return [
    // 책장 (왼쪽 벽 안쪽)
    ...block(3, 8, 12, 28, 0, 23, WOOD, 2),
    ...[2, 9, 16].flatMap(z => [[10, 5, 22], [15, 4, 29], [19, 6, 23], [25, 3, 24], [28, 6, 22]].map(([y, d, ink], i) =>
      box(12, y, 3, d, z, 5 - ((i + z) % 2), ink, ink, 2))),
    // 침대 (왼쪽 벽 앞쪽)
    ...block(3, 74, 26, 48, 0, 4, WOOD, 3), ...block(3, 74, 26, 3, 0, 11, WOOD, 3),
    box(4, 77, 24, 44, 4, 2, 12, 12, 3), box(7, 79, 18, 9, 6, 2, 12, 16, 3),
    ...block(4, 90, 25, 31, 5, 2, [13, 13, 14], 3),
    // 책상, 컴퓨터, 키보드, 스탠드 (오른쪽 벽)
    ...block(52, 3, 34, 16, 8, 2, WOOD, 4), ...block(52, 3, 3, 16, 0, 8, WOOD, 4), ...block(70, 3, 16, 16, 0, 8, WOOD, 4),
    ...block(57, 4, 14, 11, 10, 11, [18, 18, 27], 5), box(59, 14, 10, 1, 12, 7, 19, 19, 5),
    box(59, 15, 12, 3, 10, 1, 27, 27, 6),
    box(80, 7, 2, 2, 10, 8, 27, 27, 7), ...block(77, 5, 7, 7, 18, 2, [23, 23, 17], 7),
    // 의자
    ...[[62, 24], [62, 34], [72, 24], [72, 34]].map(([x, y]) => box(x, y, 2, 2, 0, 5, 11, 11, 8)),
    ...block(62, 24, 12, 12, 5, 2, WOOD, 8), ...block(62, 34, 12, 2, 7, 9, WOOD, 8),
    // 창문과 커튼 (오른쪽 벽)
    box(96, 3, 30, 2, 11, 15, 16, 16, 9), box(98, 3, 26, 2, 13, 11, 15, 15, 9),
    box(110, 3, 2, 2, 13, 11, 16, 16, 9), box(98, 3, 26, 2, 18, 1, 16, 16, 9),
    box(91, 3, 6, 3, 9, 18, 17, 17, 10), box(125, 3, 6, 3, 9, 18, 17, 17, 10), box(91, 3, 40, 3, 26, 2, 17, 17, 10),
    // 화분, 포스터(왼쪽 벽), 시계(오른쪽 벽)
    ...block(113, 7, 8, 8, 0, 5, [26, 26, 8], 11), ...block(111, 5, 12, 12, 5, 6, [25, 25, 24], 11), box(114, 8, 6, 6, 11, 2, 25, 24, 11),
    box(3, 46, 2, 18, 13, 13, 28, 28, 12), box(3, 49, 2, 12, 16, 7, 13, 13, 12), box(3, 52, 2, 5, 18, 3, 22, 22, 12),
    box(34, 3, 9, 2, 19, 8, 16, 16, 13), box(38, 3, 1, 3, 21, 4, 27, 27, 13), box(38, 3, 3, 3, 22, 1, 27, 27, 13),
  ];
}

export const ROOM_BOXES = [...shell(), ...furniture()];

/** 방 전체를 팔레트 번호 버퍼로. 가구마다 바깥쪽에 윤곽선을 둘러 동규와 같은 그림체로 맞춘다. */
export function renderRoom() {
  const { width, height, size, layers } = ROOM;
  const color = buildSlices(ROOM_BOXES, size, size, layers);
  const ids = buildSlices(ROOM_BOXES.map(b => ({ ...b, ink: b.id, top: b.id })), size, size, layers);
  const layer = size * size, zs = { ...color, data: color.data.map((v, i) => v ? Math.floor(i / layer) + 1 : 0) };
  const draw = s => { const out = new Uint8Array(width * height); drawStack(out, s, { ...ROOM, width, height }); return out; };
  const buf = draw(color), id = draw(ids), z = draw(zs), out = buf.slice();
  // 뒤에 있는 쪽(벽·바닥, 또는 더 낮은 층)의 픽셀이 가구와 맞닿으면 윤곽선 색
  for (let Y = 0; Y < height; Y++) {
    for (let X = 0; X < width; X++) {
      const i = Y * width + X;
      for (const j of [i - 1, i + 1, i - width, i + width]) {
        if ((j === i - 1 && X === 0) || (j === i + 1 && X === width - 1) || j < 0 || j >= buf.length) continue;
        if (id[j] > 1 && id[j] !== id[i] && (id[i] === 1 || z[j] > z[i])) { out[i] = 1; break; }
      }
    }
  }
  return out;
}

/** 버퍼를 캔버스에 칠한다 */
export function paintRoom(canvas) {
  const { width, height } = ROOM, buf = renderRoom(), ctx = canvas.getContext('2d');
  const image = ctx.createImageData(width, height);
  buf.forEach((v, i) => {
    const n = parseInt((ROOM_PALETTE[v] || '#fbf3e4').slice(1), 16);
    image.data.set([n >> 16, (n >> 8) & 255, n & 255, 255], i * 4);
  });
  ctx.putImageData(image, 0, 0);
}
