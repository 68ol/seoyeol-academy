import { walkInRoom } from './minime.js';
import { paintRoom } from './room.js';

const $ = s => document.querySelector(s);
const view = $('#view');
const CIRCLES = ['청룡회', '백호회', '주작회', '현무회', '무소속'];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let copy = {}, chars = [], pin = '', unlocked = false, ui = {}, vd = {}, crop = { default: { y: 20, z: 1 }, people: {} };
let mh = { diary: [], guestbook: [], ilchon: [], ilchonNames: [], gifts: [], photos: [], notes: {}, comments: {} };

const PH = '<div class=ph>준비 중</div>'; // 따옴표 없음: onerror 속성 안에 들어감
const img = (src, alt) => `<img src="${src}" alt="${esc(alt)}" onerror="this.outerHTML='${PH}'">`;
// 증명사진 정사각형 크롭: 목록 썸네일과 상세 사진이 같은 값(data/crop.json, tools/crop.html 에서 조정)을 쓴다
const cropStyle = id => { const k = { ...crop.default, ...(crop.people[id] || {}) }; return `object-position:50% ${k.y}%;transform:scale(${k.z});transform-origin:50% ${k.y}%`; };
const face = c => `<i class="crop">${img(`../img/id/${c.id}.jpg`, c.name).replace('<img ', `<img style="${cropStyle(c.id)}" `)}</i>`;
const rank = c => c.rankHidden ? '비공개' : c.rank ? c.rank + '위 (상위 10)' : '-';
const nameOf = id => (chars.find(c => c.id === id) || { name: id }).name;
const nick = id => (mh.ilchonNames.find(i => i.id === id) || {}).name;
const short = d => d.slice(2); // 2006.10.21 -> 06.10.21
const N = '<em class="n">N</em>';
const note = (head, sub, body) => `<div class="note"><b>${esc(head)}</b> ${sub ? `<small>${esc(sub)}</small>` : ''}<br>${esc(body)}</div>`;
const led = (n, w) => `<span class="led">${String(n).padStart(w, '0')}</span>`;

// 왼쪽 페이지와 오른쪽 정보 패널
function widgets() {
  $('#today').innerHTML = led(Math.floor(Math.random() * 30) + 2, 4);
  $('#total').innerHTML = led(13200 + Math.floor(Math.random() * 400), 6);
  $('#mood').textContent = `TODAY IS.. ${ui.mood.emoji} ${ui.mood.text}`;
  $('#status').textContent = ui.status;
  $('#intro').textContent = ui.intro;
  const yt = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(`${ui.bgm.title} ${ui.bgm.artist}`);
  $('#bgm-title').textContent = `${ui.bgm.title} - ${ui.bgm.artist}`;
  $('#bgm-title').href = $('#bgm-play').href = yt;
  $('#dday').textContent = `D-${ui.dday.days}`;
  $('#dday-label').textContent = ui.dday.label;
  $('#dotori').textContent = ui.dotori.toLocaleString();
  $('#vault-tab').textContent = `${ui.vault.tab} 🔒`;
  $('#guest-tab').innerHTML = `방명록 ${N}`;
  $('#diary-tab').innerHTML = `다이어리 ${N}`;
  $('#wave-title').textContent = ui.wave.title;
  // 파도타기: 누르면 아래로 펼쳐지는 목록
  $('#wave').innerHTML = `<li><a href="../index.html">참사람기숙학원</a></li>` +
    mh.ilchonNames.map(i => `<li class="off">${esc(nameOf(i.id))} (준비 중)</li>`).join('');
  $('#stats').innerHTML = ui.stats.map(([k, v]) => `<div class="srow"><span>${esc(k)}</span><i style="--v:${v}%"></i><b>${v}</b></div>`).join('');
  $('#gift-link').textContent = `선물함 ${mh.gifts.length} · 소망상자 0`;
}

// 홈: 한 화면에 다 보이는 요약 (최근 소식, 개수표, 미니룸, 일촌평)
function home() {
  const news = [
    ...mh.diary.map(d => ({ date: d.date, t: `다이어리 · ${d.title}` })),
    ...mh.guestbook.map(g => ({ date: g.date, t: `방명록 · ${nameOf(g.from)}님이 글을 남겼어요` })),
    ...mh.gifts.map(g => ({ date: g.date, t: `선물함 · ${nameOf(g.from)}님이 ${g.item || '선물'}을 보냈어요` }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const cell = (t, label, n, mark) => `<td><button data-go="${t}">${label}${mark ? ' ' + N : ''}</button></td><td>${n}</td>`;
  view.innerHTML = `<div class="top2">
    <div class="news"><div class="lab">Updated news <small>TODAY STORY</small></div>${news.map((x, i) =>
      `<div>${i < 2 ? N : '<em class="n off"></em>'}<span>${esc(x.t)}</span><small>${short(x.date)}</small></div>`).join('')}</div>
    <table class="stat" aria-label="미니홈피 현황"><tr>${cell('diary', '다이어리', mh.diary.length, 1)}${cell('photos', '사진첩', mh.photos.length)}</tr><tr>${cell('gifts', '선물함', mh.gifts.length)}${cell('ilchon', '일촌', mh.ilchonNames.length)}</tr><tr>${cell('guest', '방명록', mh.guestbook.length, 1)}<td></td><td></td></tr></table>
  </div>
  <div class="lab">Mini Room <small>EXPRESS YOURSELF</small></div>
  <div class="roomimg"><canvas class="room-px" width="190" height="95" role="img" aria-label="이동규의 기숙사 미니룸"></canvas><i class="px-shadow"></i><canvas class="px-me" width="24" height="34" role="img" aria-label="미니룸을 걸어 다니는 이동규"></canvas></div>
  <div class="lab">What friends say <small>${esc(ui.news.friends)}</small></div>
  <ul class="fs">${mh.ilchon.map(i => `<li><span>${esc(i.body)}</span><small>(${esc(nick(i.from) || '')} ${esc(nameOf(i.from))})</small></li>`).join('')}</ul>`;
  paintRoom(view.querySelector('.room-px'));
  stopRoom = walkInRoom(view.querySelector('.roomimg'));
}

function diary() {
  const list = [...mh.diary].sort((a, b) => b.date.localeCompare(a.date));
  view.innerHTML = `<h3>다이어리 (${list.length}) ${N}</h3><div>` + list.map(d => note(d.title, d.date, d.body)).join('') + '</div>';
}

function photos() {
  view.innerHTML = `<section class="collection album"><h3>사진첩 (${mh.photos.length})</h3><div class="grid">${mh.photos.map(p =>
    `<button class="card photo" data-p="${p.id}" aria-label="사진 ${esc(p.id.replace(/^p/, ''))} 확대">${img(`../img/photos/${p.id}.jpg`, '')}</button>`).join('')}</div></section>`;
  view.querySelectorAll('.photo').forEach(b => b.onclick = () => photo(b.dataset.p));
}

function gifts() {
  const rows = mh.gifts.map(gift => `<li><details>
    <summary class="entry-row">
      <span class="gift-name"><b>${esc(gift.item || '도토리 선물')}</b><span>${esc(nameOf(gift.from))}</span></span>
      <span class="gift-date">${esc(short(gift.date))}</span>
      <span class="entry-toggle">메시지</span>
    </summary>
    <div class="entry-message"><p>${esc(gift.msg)}</p><small>🌰 도토리 ${esc(gift.dotori)}개</small></div>
  </details></li>`);
  view.innerHTML = `<section class="collection gifts"><h3>받은 선물 <small>${mh.gifts.length}개</small></h3>
    <ul class="entry-list">${rows.join('')}</ul></section>`;
}

function ilchon() {
  const rows = mh.ilchonNames.map(friend => {
    const name = esc(nameOf(friend.id));
    const identity = `<span class="friend-name"><b>${name}</b><span>${esc(friend.name)}</span></span>`;
    const entries = mh.ilchon.filter(entry => entry.from === friend.id);
    if (!entries.length) return `<li><div class="entry-row">${identity}</div></li>`;
    return `<li><details>
      <summary class="entry-row" aria-label="${name} 일촌평 ${entries.length}개">${identity}<span class="entry-toggle">일촌평 ${entries.length}</span></summary>
      <div class="entry-message">${entries.map(entry => `<p>${esc(entry.body)}</p>`).join('')}</div>
    </details></li>`;
  });
  view.innerHTML = `<section class="collection friends"><h3>일촌 보기 <small>${mh.ilchonNames.length}명</small></h3>
    <ul class="entry-list">${rows.join('')}</ul></section>`;
}

// 사진 누르면 큰 사진과 설명 전체를 보여줌 (Esc, 바깥 클릭, 닫기 버튼으로 닫음)
function photo(id) {
  const p = mh.photos.find(x => x.id === id);
  lightbox(`../img/photos/${p.id}.jpg`, p.caption, '사진 보기');
}
// 업무함 인물 상세의 증명사진: 자르지 않은 원본 비율로 크게
function bigFace(c) { lightbox(`../img/id/${c.id}.jpg`, c.name, '증명사진', 'portrait'); }
function lightbox(src, caption, title, kind = '') {
  const prev = document.activeElement;
  const box = document.createElement('div');
  box.className = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'photo-window-title'); box.setAttribute('aria-describedby', 'photo-caption');
  box.innerHTML = `<div class="lb-in ${kind}">
    <div class="lb-bar"><span id="photo-window-title">${esc(title)}</span><button type="button" aria-label="닫기">×</button></div>
    ${img(src, '')}<p id="photo-caption">${esc(caption)}</p>
  </div>`;
  const close = () => { box.remove(); removeEventListener('keydown', onKey); prev && prev.focus && prev.focus(); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  box.onclick = e => { if (e.target === box) close(); };
  box.querySelector('button').onclick = close;
  addEventListener('keydown', onKey);
  document.body.append(box);
  box.querySelector('button').focus();
}

// 방명록: 최신순, 5개씩 페이지, 번호는 작성 순서
function guest(page = 0) {
  const per = 5, all = [...mh.guestbook].sort((a, b) => a.date.localeCompare(b.date));
  const list = all.map((g, i) => ({ ...g, no: i + 1 })).reverse();
  const pages = Math.ceil(list.length / per);
  view.innerHTML = `<h3>방명록 (${list.length})</h3>` + list.slice(page * per, page * per + per).map(g => `
    <div class="gb"><div class="gb-head"><span class="no">#${g.no}</span><span class="av">${img(`../img/${g.from}.png`, nameOf(g.from))}</span>
      <b>${esc(nameOf(g.from))}</b>${nick(g.from) ? `<i>${esc(nick(g.from))}</i>` : ''}<small>${esc(g.date)}</small></div>
      <p>${g.secret ? '🔒 비밀글입니다. 주인장만 볼 수 있어요.' : esc(g.body)}</p>
      ${g.reply && !g.secret ? `<p class="reply">└ <b>이동규</b> ${esc(g.reply)}</p>` : ''}</div>`).join('') +
    `<div class="pager">${Array.from({ length: pages }, (_, i) => `<button data-p="${i}"${i === page ? ' class="on"' : ''}>${i + 1}</button>`).join('')}</div>`;
  view.querySelectorAll('.pager button').forEach(b => b.onclick = () => { guest(+b.dataset.p); toTop(); view.querySelector('.pager button.on').focus(); });
}

// 잠금 화면: 3회 이상 틀리면 힌트
function lock() {
  view.innerHTML = `<div class="pin"><p>${esc(ui.vault.lock)}</p>
  <form><input inputmode="numeric" maxlength="4" autocomplete="off" aria-label="비밀번호"> <button>확인</button></form>
  <p class="err" role="alert"></p></div>`;
  const f = view.querySelector('form');
  let miss = 0;
  f.onsubmit = e => {
    e.preventDefault();
    if (f.querySelector('input').value === pin) { unlocked = true; vault(); }
    else view.querySelector('.err').textContent = '비밀번호가 틀렸어요.' + (++miss >= 3 ? ' ' + ui.vault.hint : '');
  };
  f.querySelector('input').focus();
}

// 열린 업무함: 위 탭 3개(인물철·학교 생활철·서열 등사본). 마지막 자료철을 기억해 인물 상세에서 돌아온다
let vtab = 'people', vdoc = null;
const hp = d => `<a class="hp" href="${d.href}" target="_blank" rel="noopener">${esc(d.link)} ▸</a>`;
const postit = s => s ? `<div class="postit">${esc(s)}</div>` : '';
const vpages = {
  // 파별 한 줄, 무소속에는 동규 본인도 포함
  people: () => CIRCLES.map(k => `<div class="sec"><h4>${k} <small>${esc(ui.circles[k] || '')}</small></h4><div class="grid five">${chars.filter(c => c.circle === k).map(c =>
    `<button class="card" data-id="${c.id}">${face(c)}<span>${esc(c.name)}${c.leader ? ' ★' : ''}</span></button>`).join('')}</div></div>`).join(''),
  school: () => {
    const d = vd.school.find(x => x.id === vdoc);
    if (!d) return `<ul class="doclist">${vd.school.map(x => `<li><button data-doc="${x.id}"><b>${esc(x.title)}</b><small>${esc(x.lead)}</small></button></li>`).join('')}</ul>`;
    return `<button class="back doc-back">◀ ${esc(vd.tabs.school)}</button><div class="doc"><h4>${esc(d.title)}</h4><p class="lead">${esc(d.lead)}</p>
    <dl>${d.items.map(i => `<dt>${esc(i.label)}</dt><dd>${esc(i.text)}</dd>`).join('')}</dl>${postit(d.memo)}${hp(d)}</div>`;
  },
  // 순위표는 characters.json 의 rank 로 만든다(비공개 인물 제외)
  rank: () => {
    const r = vd.rank, top = chars.filter(c => c.rank && !c.rankHidden).sort((x, y) => x.rank - y.rank);
    return `<div class="doc copy"><p class="stamp">${esc(r.stamp)}</p><h4>${esc(r.title)}</h4><p class="lead">${esc(r.lead)}</p>
    <table class="rk"><tbody>${top.map(c => `<tr><td class="no">${c.rank}</td><td><button class="lk" data-id="${c.id}">${esc(c.name)}</button></td><td>${c.circle}${c.leader ? ' 반장' : ''}</td><td>${c.grade}학년</td></tr>`).join('')}</tbody></table>
    <p class="small">${esc(r.tableNote)}</p>
    <h5>순위가 바뀌는 경우</h5><ul>${r.changes.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    <h5>도전 규칙</h5><ul>${r.challenge.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
    <h5>${esc(r.paewang.title)}</h5><p>${esc(r.paewang.text)}</p>${postit(r.memo)}</div>`;
  },
};
function vault(t = vtab) {
  if (!unlocked) return lock();
  vtab = t;
  view.innerHTML = `<h3>${esc(ui.vault.title)}</h3><div class="vtabs" role="tablist">${Object.keys(vpages).map(k =>
    `<button role="tab" aria-selected="${k === t}" class="${k === t ? 'on' : ''}" data-v="${k}">${esc(vd.tabs[k])}</button>`).join('')}</div>${vpages[t]()}`;
  view.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { vdoc = null; vault(b.dataset.v); view.querySelector(`[data-v="${b.dataset.v}"]`).focus(); });
  view.querySelectorAll('[data-id]').forEach(b => b.onclick = () => file(b.dataset.id));
  view.querySelectorAll('[data-doc]').forEach(b => b.onclick = () => { vdoc = b.dataset.doc; vault('school'); toTop(); view.querySelector('.doc-back').focus(); });
  const back = view.querySelector('.doc-back');
  if (back) back.onclick = () => { const id = vdoc; vdoc = null; vault('school'); view.querySelector(`[data-doc="${id}"]`).focus(); };
}

// 프로필 밑 덧글: 학생회와 친한 아이들이 남김, 대댓글 포함, 없는 인물은 섹션 생략
const cmLine = (c, re) => `<div class="cm${re ? ' re' : ''}">${re ? '└ ' : ''}<span class="av">${img(`../img/${c.from}.png`, nameOf(c.from))}</span><b>${esc(nameOf(c.from))}</b> ${esc(c.body)}</div>`;
const comments = id => {
  const list = (mh.comments || {})[id] || [];
  if (!list.length) return '';
  const n = list.reduce((s, c) => s + 1 + (c.replies || []).length, 0);
  return `<div class="cmbox"><h3>덧글 (${n})</h3>` + list.map(c => cmLine(c) + (c.replies || []).map(r => cmLine(r, true)).join('')).join('') + '</div>';
};

function file(id) {
  const c = chars.find(x => x.id === id), cp = copy[id] || {}, memo = mh.notes[id];
  view.innerHTML = `<button class="back">◀ 목록으로</button>
  <div class="detail"><button type="button" class="idpic" aria-label="${esc(c.name)} 증명사진 크게 보기">${face(c)}</button><div>
  <h3>${esc(c.name)}</h3>
  ${cp.tagline ? `<p class="status">"${esc(cp.tagline)}"</p>` : ''}
  ${cp.desc ? `<p class="desc">${esc(cp.desc)}</p>` : ''}
  <div class="chips">${c.traits.map(t => `<i>${esc(t)}</i>`).join('')}</div>
  <table>
  <tr><th>소속</th><td>${c.circle}${c.leader ? ' (반장)' : ''}</td></tr>
  <tr><th>학년</th><td>${c.grade}학년 · ${c.gender}</td></tr>
  <tr><th>서열</th><td>${rank(c)}</td></tr>
  <tr><th>생일</th><td>${c.birthday ? esc(c.birthday) : '?'}${c.birthdayNote ? ` <small class="cn">${esc(c.birthdayNote)}</small>` : ''}</td></tr>
  <tr><th>별자리</th><td>${c.zodiac ? esc(c.zodiac) : '?'}</td></tr>
  <tr><th>혈액형</th><td>${c.bloodType}형</td></tr>
  <tr><th>관계</th><td>${esc(c.relations)}</td></tr>
  </table>
  ${memo ? `<h3>${esc(ui.vault.memoLabel)}</h3><p class="desc">${esc(memo)}</p>` : ''}
  </div></div>
  ${comments(id)}`;
  view.querySelector('.idpic').onclick = () => bigFace(c);
  view.querySelector('.back').onclick = () => { vault(); view.querySelector(`[data-id="${id}"]`).focus(); };
  toTop(); view.querySelector('.back').focus();
}

// 탭 이동: 탭 버튼, 홈 개수표, 선물함 링크가 모두 이 함수를 쓴다
let stopRoom = null; // 홈의 미니룸 걷기 애니메이션을 멈추는 함수
let ready = false; // 데이터가 오기 전에는 탭이 동작하지 않게 막음
const tabs = { home, diary, photos, gifts, ilchon, guest: () => guest(0), vault };
function go(t) {
  if (!ready || !tabs[t]) return;
  document.querySelectorAll('#tabs button').forEach(x => { const on = x.dataset.t === t; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; });
  if (stopRoom) { stopRoom(); stopRoom = null; }
  tabs[t]();
  toTop();
}
const toTop = () => { view.parentElement.scrollTop = 0; };
// 탭 목록은 위아래 방향키로 이동
$('#tabs').addEventListener('keydown', e => {
  const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]; if (!d) return;
  const bs = [...document.querySelectorAll('#tabs button')], i = bs.indexOf(document.activeElement); if (i < 0) return;
  e.preventDefault(); const n = bs[(i + d + bs.length) % bs.length]; n.focus(); go(n.dataset.t);
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-t],[data-go]');
  if (b) go(b.dataset.t || b.dataset.go);
});

// 별 커서 효과 (마우스 환경 + 모션 허용일 때만)
if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  let last = 0;
  addEventListener('mousemove', e => {
    if (e.timeStamp - last < 45) return;
    last = e.timeStamp;
    const s = document.createElement('span');
    s.className = 'spark'; s.textContent = '✦';
    s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
    document.body.append(s);
    setTimeout(() => s.remove(), 600);
  });
}

Promise.all(['characters', 'notes', 'copy', 'minihome', 'ui', 'vault', 'crop'].map(n => fetch(`../data/${n}.json`).then(r => r.json())))
  .then(([c, n, cp, m, u, v, cr]) => { chars = c; pin = n.pin; copy = cp.chars; mh = m; ui = u; vd = v; crop = cr; ready = true; widgets(); home(); if (location.hash === '#vault') go('vault'); })
  .catch(() => { view.innerHTML = '<p>데이터를 불러오지 못했어요. 파일을 직접 열지 말고 서버(또는 GitHub Pages)로 열어 주세요.</p>'; });
