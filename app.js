/* ── Config ────────────────────────────────────────── */
const CONFIG = {
  serverIP: 'mc.xaviers.website',
  name:     'xavier',
  note:     'idk what to put here...',
  socials: [
    { id: 'social-github', url: 'https://github.com/XavierdSeth' },
    { id: 'social-discord', url: 'https://discord.gg' },
    { id: 'social-mail', url: 'mailto:xavierseth27.1@gmail.com' },
  ],
  supabase: {
    url:    'https://holgsmqqwikcmcosssye.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbGdzbXFxd2lrY21jb3Nzc3llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDY1NzAsImV4cCI6MjA5NjIyMjU3MH0.LsLwdCxR4wACKuJIqHIzDRjqvSuFdugeDGNf9x2tPz8',
  },
  adminHash: '#/admin',
};

/* ── State ─────────────────────────────────────────── */
let sb;
let messages = [];
const liked = new Set(JSON.parse(localStorage.getItem('xv_liked') || '[]'));
 
/* ── Router ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (hash === CONFIG.adminHash) {
    showAdminPanel();
  } else {
    showMainSite();
  }
});
 
window.addEventListener('hashchange', () => {
  if (window.location.hash === CONFIG.adminHash) showAdminPanel();
  else showMainSite();
});
 
/* ── Main site boot ────────────────────────────────── */
async function showMainSite() {
  document.getElementById('main-view').style.display = '';
  document.getElementById('admin-view').style.display = 'none';
 
  sb = sb || window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);
  applyConfig();
  setupCharCount();
  await loadStatus();
  subscribeToStatus();
  await loadMessages();
  subscribeToMessages();
  fetchPlayerCount();
}
 
/* ── Admin panel boot ──────────────────────────────── */
async function showAdminPanel() {
  document.getElementById('main-view').style.display = 'none';
  document.getElementById('admin-view').style.display = '';
 
  sb = sb || window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey);
  await loadAdminStatus();
}
 
/* ── Config ────────────────────────────────────────── */
function applyConfig() {
  document.querySelector('.profile-name').textContent   = CONFIG.name;
  document.querySelector('.profile-avatar').textContent = CONFIG.name[0].toUpperCase();
  document.getElementById('server-ip-text').textContent = CONFIG.serverIP;
  document.getElementById('note-body').textContent      = CONFIG.note;
  document.title = `${CONFIG.name}s.website`;
  CONFIG.socials.forEach(s => {
    const link = document.getElementById(s.id);
    if (link) link.href = s.url;
  });
}
 
/* ── Copy IP ───────────────────────────────────────── */
function copyIP() {
  const btn = document.getElementById('copy-btn');
  const lbl = document.getElementById('copy-label');
  navigator.clipboard.writeText(CONFIG.serverIP).then(() => {
    lbl.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(() => { lbl.textContent = 'copy ip'; btn.classList.remove('copied'); }, 2000);
  });
}
 
/* ── Status (Supabase) ─────────────────────────────── */
const STATUS_MAP = {
  online:      { dot: 'green',  label: 'online' },
  maintenance: { dot: 'yellow', label: 'maintenance' },
  offline:     { dot: 'red',    label: 'offline' },
};
 
async function loadStatus() {
  const { data } = await sb.from('site_status').select('value').eq('key', 'server_status').single();
  applyStatusDisplay(data?.value || 'online');
}
 
function subscribeToStatus() {
  sb.channel('status-live')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_status' }, payload => {
      if (payload.new.key === 'server_status') applyStatusDisplay(payload.new.value);
    })
    .subscribe();
}
 
function applyStatusDisplay(status) {
  const s = STATUS_MAP[status] || STATUS_MAP.online;
  document.getElementById('status-dot').className = 'status-dot ' + s.dot;
  document.getElementById('status-text').textContent = s.label;
}
 
/* ── Admin: load + set status ──────────────────────── */
async function loadAdminStatus() {
  const { data } = await sb.from('site_status').select('value').eq('key', 'server_status').single();
  const current = data?.value || 'online';
  document.getElementById('admin-current-status').textContent = current;
  highlightAdminBtn(current);
}
 
async function adminSetStatus(status) {
  document.getElementById('admin-current-status').textContent = 'saving...';
  const { error } = await sb.from('site_status').update({ value: status }).eq('key', 'server_status');
  if (error) { document.getElementById('admin-current-status').textContent = 'error — try again'; return; }
  document.getElementById('admin-current-status').textContent = status;
  highlightAdminBtn(status);
}
 
function highlightAdminBtn(status) {
  document.querySelectorAll('.admin-btn').forEach(btn => {
    btn.classList.toggle('active-btn', btn.textContent.trim().startsWith(status));
  });
}
 
/* ── Player count ──────────────────────────────────── */
async function fetchPlayerCount() {
  try {
    const res = await fetch(`https://api.mcstatus.io/v1/server/java/${encodeURIComponent(CONFIG.serverIP)}`);
    const data = await res.json();
    const el = document.getElementById('player-count');
    if (data.online && data.players) {
      el.textContent = `${data.players.online}/${data.players.max} online`;
    } else {
      el.textContent = '0/100';
    }
  } catch {
    document.getElementById('player-count').textContent = '0/100';
  }
}
 
/* ── Char counter ──────────────────────────────────── */
function setupCharCount() {
  const input = document.getElementById('msg-input');
  const counter = document.getElementById('char-count');
  input.addEventListener('input', () => {
    const left = 500 - input.value.length;
    counter.textContent = left;
    counter.classList.toggle('low', left < 50);
  });
}
 
/* ── Load messages ─────────────────────────────────── */
async function loadMessages() {
  const { data, error } = await sb
    .from('messages').select('*')
    .order('created_at', { ascending: false }).limit(100);
  if (error) { console.error(error); return; }
  messages = data || [];
  renderFull();
}
 
/* ── Real-time messages ────────────────────────────── */
function subscribeToMessages() {
  sb.channel('messages-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
      if (messages.find(m => m.id === payload.new.id)) return;
      messages.unshift(payload.new);
      prependMsgDOM(payload.new, true);
      removeEmptyState();
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
      const idx = messages.findIndex(m => m.id === payload.new.id);
      if (idx !== -1) { messages[idx] = payload.new; patchMsgDOM(payload.new); }
    })
    .subscribe();
}
 
/* ── Post ──────────────────────────────────────────── */
async function postMessage() {
  const input = document.getElementById('msg-input');
  const text  = input.value.trim();
  if (!text) return;
 
  const btn = document.querySelector('.post-btn');
  btn.disabled = true;
 
  const tempId = 'temp-' + Date.now();
  const optimistic = { id: tempId, text, likes: 0, created_at: new Date().toISOString() };
  messages.unshift(optimistic);
  prependMsgDOM(optimistic, true);
  removeEmptyState();
 
  input.value = '';
  document.getElementById('char-count').textContent = '500';
  document.getElementById('char-count').classList.remove('low');
 
  const { data, error } = await sb.from('messages').insert({ text, likes: 0 }).select().single();
  btn.disabled = false;
 
  if (error) {
    messages = messages.filter(m => m.id !== tempId);
    document.getElementById('msg-' + tempId)?.remove();
    alert('something went wrong. try again.');
    input.value = text;
    return;
  }
 
  const idx = messages.findIndex(m => m.id === tempId);
  if (idx !== -1) messages[idx] = data;
  const tempEl = document.getElementById('msg-' + tempId);
  if (tempEl) { tempEl.id = 'msg-' + data.id; tempEl.classList.remove('msg--pending'); }
}
 
/* ── Like ──────────────────────────────────────────── */
async function toggleLike(id) {
  const msg = messages.find(m => m.id === id);
  if (!msg || String(id).startsWith('temp-')) return;
 
  const isLiked = liked.has(id);
  const newCount = isLiked ? Math.max(0, (msg.likes || 0) - 1) : (msg.likes || 0) + 1;
 
  if (isLiked) liked.delete(id); else liked.add(id);
  localStorage.setItem('xv_liked', JSON.stringify([...liked]));
  msg.likes = newCount;
  patchMsgDOM(msg);
 
  const { error } = await sb.from('messages').update({ likes: newCount }).eq('id', id);
  if (error) {
    if (isLiked) liked.add(id); else liked.delete(id);
    localStorage.setItem('xv_liked', JSON.stringify([...liked]));
    msg.likes = isLiked ? newCount + 1 : newCount - 1;
    patchMsgDOM(msg);
  }
}
 
/* ── DOM helpers ───────────────────────────────────── */
function renderFull() {
  const list = document.getElementById('messages-list');
  if (!messages.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-glyph">✡</div><p>no messages yet.<br>this wont last long.</p></div>`;
    return;
  }
  list.innerHTML = messages.map(m => buildMsgHTML(m, false)).join('');
}
 
function prependMsgDOM(msg, animate) {
  const list = document.getElementById('messages-list');
  const div = document.createElement('div');
  div.innerHTML = buildMsgHTML(msg, animate);
  list.insertBefore(div.firstElementChild, list.firstChild);
}
 
function patchMsgDOM(msg) {
  const el = document.getElementById('msg-' + msg.id);
  if (!el) return;
  const btn = el.querySelector('.reaction-btn');
  if (!btn) return;
  btn.className = 'reaction-btn' + (liked.has(msg.id) ? ' active' : '');
  btn.textContent = '♥' + (msg.likes ? ' ' + msg.likes : '');
}
 
function removeEmptyState() { document.querySelector('.empty-state')?.remove(); }
 
function buildMsgHTML(msg, animate) {
  const isLiked = liked.has(msg.id);
  const isTemp  = String(msg.id).startsWith('temp-');
  const d = new Date(msg.created_at);
  const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const classes = ['msg', animate ? 'msg-new' : '', isTemp ? 'msg--pending' : ''].filter(Boolean).join(' ');
  return `<div class="${classes}" id="msg-${msg.id}">
    <div class="msg-text">${escapeHTML(msg.text)}</div>
    <div class="msg-meta">
      <span class="msg-time">${dateStr} · ${timeStr}</span>
      <button class="reaction-btn${isLiked ? ' active' : ''}" onclick="toggleLike('${msg.id}')">♥${msg.likes ? ' ' + msg.likes : ''}</button>
    </div>
  </div>`;
}
 
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
 
/* ── Enter to post ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('msg-input');
  if (input) input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); postMessage(); }
  });
});