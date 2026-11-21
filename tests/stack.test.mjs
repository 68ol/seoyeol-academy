import assert from 'node:assert/strict';
import test from 'node:test';
import { bounds, drawStack, drawStacks, outline, snapTurn } from '../dongkyu/stack.js';
import { BUFFER, PALETTE, renderMinime, slices } from '../dongkyu/minime.js';

// A solid test sheet: 6 x 8 footprint, 5 slices, each slice a different index.
const W = 6, H = 8, COUNT = 5;
function solid() {
  const data = new Uint8Array(W * H * COUNT);
  for (let z = 0; z < COUNT; z++) data.fill(z + 1, z * W * H, (z + 1) * W * H);
  return { w: W, h: H, count: COUNT, data };
}
const SIZE = 40;
const render = (opts) => {
  const out = new Uint8Array(SIZE * SIZE);
  drawStack(out, solid(), { width: SIZE, height: SIZE, x: 20, y: 24, turn: 0, ...opts });
  return out;
};
const box = out => bounds(out, SIZE, SIZE);

test('straight down: as wide as a slice, as tall as the slice height plus (count - 1)', () => {
  const b = box(render({ squash: 1, spacing: 1 }));
  assert.equal(b.width, W);
  assert.equal(b.height, H + COUNT - 1);
});

test('squash 0.75 is shorter than squash 1', () => {
  assert.ok(box(render({ squash: .75 })).height < box(render({ squash: 1 })).height);
});

test('turned 90 degrees the width equals the slice height', () => {
  assert.equal(box(render({ squash: 1, turn: Math.PI / 2 })).width, H);
});

test('spacing 2 is taller than spacing 1', () => {
  assert.ok(box(render({ squash: 1, spacing: 2 })).height > box(render({ squash: 1, spacing: 1 })).height);
});

test('straight down matches pasting the slices by hand, each 1 px above the last', () => {
  const s = solid();
  const expected = new Uint8Array(SIZE * SIZE);
  for (let z = 0; z < COUNT; z++) {
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const X = 20 - Math.floor(W / 2) + x;
        const Y = 24 - Math.floor(H / 2) + y - z;
        expected[Y * SIZE + X] = s.data[z * W * H + y * W + x];
      }
    }
  }
  assert.deepEqual(render({ squash: 1, spacing: 1 }), expected);
});

test('spacing 0 and squash 1 draws flat: the top slice covers the rest', () => {
  const out = render({ squash: 1, spacing: 0 });
  const b = box(out);
  assert.equal(b.width, W);
  assert.equal(b.height, H);
  assert.ok(out.every(v => v === 0 || v === COUNT));
});

test('stack position is rounded to whole pixels', () => {
  assert.deepEqual(render({ x: 20.4, y: 24.4 }), render({ x: 20, y: 24 }));
});

test('stacks are sorted by their ground point, nearer ones on top', () => {
  const s = solid();
  const a = { slices: s, x: 20, y: 20, turn: 0, squash: 1 };
  const near = { ...a, y: 22 };
  const out = drawStacks(SIZE, SIZE, [near, a]);
  assert.deepEqual(out, drawStacks(SIZE, SIZE, [a, near]));
});

test('outline is drawn once around the finished stack, only outside it', () => {
  const out = render({ squash: 1 });
  const lined = outline(out, SIZE, SIZE, 9);
  const b = box(out);
  for (let i = 0; i < out.length; i++) if (out[i]) assert.equal(lined[i], out[i]);
  assert.equal(box(lined).width, b.width + 2);
  assert.equal(box(lined).height, b.height + 2);
});

test('snapTurn rounds to the given number of directions', () => {
  assert.equal(snapTurn(.1, 16), 0);
  assert.ok(Math.abs(snapTurn(Math.PI / 2 + .05, 16) - Math.PI / 2) < 1e-9);
});

test('동규 모델은 팔레트 번호만 쓰고, 바닥부터 머리끝까지 비어 있는 층이 없다', () => {
  assert.ok(slices.data.some(v => v));
  for (const v of slices.data) assert.ok(v < PALETTE.length, `알 수 없는 팔레트 번호 ${v}`);
  for (let z = 0; z < slices.count; z++) {
    assert.ok(slices.data.subarray(z * slices.w * slices.h, (z + 1) * slices.w * slices.h).some(v => v), `${z}층이 비었다`);
  }
});

test('동규 프레임은 어느 방향을 보아도 버퍼 안에 윤곽선까지 들어간다', () => {
  for (let step = 0; step < 16; step++) {
    const buf = renderMinime(step * Math.PI / 8);
    const b = bounds(buf, BUFFER.width, BUFFER.height);
    assert.ok(b.x0 >= 1 && b.y0 >= 1 && b.x1 <= BUFFER.width - 2 && b.y1 <= BUFFER.height - 2, `방향 ${step}에서 잘린다`);
  }
});

test('동규는 걸어가는 방향이 달라지면 모습이 달라진다', () => {
  assert.notDeepEqual(renderMinime(0), renderMinime(Math.PI));
});
