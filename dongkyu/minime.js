import { buildSlices, drawStacks, outline, snapTurn } from './stack.js';

// 이동규 스택 모델. 바닥면 10 x 8, 18층, 앞쪽(+y)이 얼굴 방향이다.
// 팔레트: 1 윤곽, 2 머리(더스티블루), 3 피부, 4 안경(녹색), 5 셔츠, 6 조끼, 7 바지, 8 신발, 9 입
export const PALETTE = [null, '#2b2b3a', '#6b86a6', '#f3d3b5', '#3f8f5a', '#f6f6f6', '#8a8d94', '#3b3f4a', '#282828', '#c87878'];
export const FOOT = { w: 10, h: 8, count: 18 };

const BOXES = [
  { x: 2, y: 2, w: 3, d: 5, z: 0, h: 1, ink: 8 }, { x: 5, y: 2, w: 3, d: 5, z: 0, h: 1, ink: 8 }, // 신발
  { x: 2, y: 3, w: 3, d: 3, z: 1, h: 5, ink: 7 }, { x: 5, y: 3, w: 3, d: 3, z: 1, h: 5, ink: 7 }, // 다리
  { x: 1, y: 2, w: 8, d: 4, z: 6, h: 6, ink: 6 }, // 조끼 몸통
  { x: 3, y: 5, w: 4, d: 1, z: 8, h: 4, ink: 5 }, // 앞섶의 흰 셔츠
  { x: 0, y: 3, w: 1, d: 3, z: 6, h: 5, ink: 5, top: 3 }, { x: 9, y: 3, w: 1, d: 3, z: 6, h: 5, ink: 5, top: 3 }, // 팔, 손
  { x: 1, y: 1, w: 8, d: 6, z: 12, h: 6, ink: 3 }, // 머리
  { x: 1, y: 1, w: 8, d: 6, z: 16, h: 2, ink: 2 }, // 머리 윗면 머리카락
  { x: 1, y: 1, w: 8, d: 2, z: 12, h: 4, ink: 2 }, // 뒷머리
  { x: 2, y: 6, w: 6, d: 1, z: 14, h: 2, ink: 4 }, // 안경
  { x: 3, y: 6, w: 1, d: 1, z: 14, h: 1, ink: 1 }, { x: 6, y: 6, w: 1, d: 1, z: 14, h: 1, ink: 1 }, // 눈
  { x: 4, y: 6, w: 2, d: 1, z: 12, h: 1, ink: 9 }, // 입
  { x: 4, y: 0, w: 2, d: 2, z: 12, h: 4, ink: 2 }, // 낮은 포니테일
];
export const slices = buildSlices(BOXES, FOOT.w, FOOT.h, FOOT.count);

export const BUFFER = { width: 24, height: 34, groundX: 12, groundY: 26 };
const STEPS = 16;
const SQUASH = .75;

/** 방 바닥 위를 걷는 길(방 그림 너비, 높이에 대한 비율). 의자와 침대를 피해 바닥 한가운데를 돈다. */
export const ROUTE = [[.40, .72], [.50, .86], [.58, .70], [.48, .62]];

/** 걸어가는 방향을 바라보는 동규의 한 프레임을 팔레트 번호 버퍼로 돌려준다 */
export function renderMinime(turn) {
  const { width, height, groundX, groundY } = BUFFER;
  const buf = drawStacks(width, height, [{ slices, x: groundX, y: groundY, turn: snapTurn(turn, STEPS), squash: SQUASH, spacing: 1 }]);
  return outline(buf, width, height, 1);
}

/** 버퍼를 캔버스에 칠한다 */
export function paint(ctx, buf) {
  const { width, height } = BUFFER;
  const image = ctx.createImageData(width, height);
  for (let i = 0; i < buf.length; i++) {
    const color = PALETTE[buf[i]];
    if (!color) continue;
    const n = parseInt(color.slice(1), 16);
    image.data.set([n >> 16, (n >> 8) & 255, n & 255, 255], i * 4);
  }
  ctx.putImageData(image, 0, 0);
}

/**
 * room(.roomimg 요소) 안에 동규를 올려서 걷게 한다. 멈추려면 돌려준 함수를 부른다.
 * 모션 줄이기 설정이면 한 자리에 정면으로 서 있기만 한다.
 */
export function walkInRoom(room) {
  const canvas = room.querySelector('canvas.px-me'), shadow = room.querySelector('.px-shadow');
  if (!canvas) return () => {};
  const { width, height, groundX, groundY } = BUFFER;
  const ctx = canvas.getContext('2d');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let pos = [...ROUTE[0]], target = 1, turn = 0, pause = 0, last, raf, stopped = false;

  function place() {
    const w = room.clientWidth, h = room.clientHeight;
    const scale = Math.max(1, Math.round(w / 190)); // 방 그림 픽셀과 맞는 정수 배율
    canvas.style.width = `${width * scale}px`;
    canvas.style.height = `${height * scale}px`;
    canvas.style.left = `${Math.round(pos[0] * w - groundX * scale)}px`;
    canvas.style.top = `${Math.round(pos[1] * h - groundY * scale)}px`;
    shadow.style.width = `${14 * scale}px`;
    shadow.style.height = `${3 * scale}px`;
    shadow.style.left = `${Math.round(pos[0] * w - 7 * scale)}px`;
    shadow.style.top = `${Math.round(pos[1] * h - 1.5 * scale)}px`;
  }
  function frame(time) {
    if (stopped || !room.isConnected) return;
    const dt = last === undefined ? 0 : Math.min(.1, (time - last) / 1000);
    last = time;
    if (pause > 0) pause -= dt;
    else {
      const w = room.clientWidth, h = room.clientHeight, [tx, ty] = ROUTE[target];
      const dx = (tx - pos[0]) * w, dy = (ty - pos[1]) * h / SQUASH; // 바닥 평면 기준 이동 방향
      const dist = Math.hypot(dx, dy), step = 22 * dt * (w / 380); // 방 그림 너비 380px일 때 초당 22px
      const wanted = Math.atan2(dy, dx) - Math.PI / 2;
      let diff = Math.atan2(Math.sin(wanted - turn), Math.cos(wanted - turn));
      turn += Math.max(-6 * dt, Math.min(6 * dt, diff)); // 방향은 부드럽게 돌아서 본다
      if (Math.abs(diff) < .6) {
        if (dist <= step) { pos = [tx, ty]; target = (target + 1) % ROUTE.length; pause = 1.4; }
        else pos = [pos[0] + dx / dist * step / w, pos[1] + dy * SQUASH / dist * step / h];
      }
    }
    paint(ctx, renderMinime(turn));
    place();
    raf = requestAnimationFrame(frame);
  }
  function sync() {
    const running = !motion.matches && !document.hidden && !stopped;
    if (running && raf === undefined) raf = requestAnimationFrame(frame);
    if (!running && raf !== undefined) { cancelAnimationFrame(raf); raf = undefined; last = undefined; }
    if (motion.matches) { paint(ctx, renderMinime(0)); place(); }
  }
  const resize = new ResizeObserver(place);
  resize.observe(room);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  sync();
  return () => {
    stopped = true;
    if (raf !== undefined) cancelAnimationFrame(raf);
    resize.disconnect();
    document.removeEventListener('visibilitychange', sync);
    motion.removeEventListener('change', sync);
  };
}
