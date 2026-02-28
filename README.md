const DBKEY = "nevidimka_db_v1";

function loadDB(){
  const raw = localStorage.getItem(DBKEY);
  if(raw) return JSON.parse(raw);
  return { users: [], session: null, posts: [], chats: {} };
}
function saveDB(db){ localStorage.setItem(DBKEY, JSON.stringify(db)); }
function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
function now(){ return new Date().toISOString(); }

function getMe(db){ return db.users.find(u => u.id === db.session) || null; }
function requireAuth(){
  const db = loadDB();
  if(!db.session){ window.location.href = "index.html"; return null; }
  return db;
}
function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function escapeHtml(s){
  return (s||"").replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}
function getUser(db, id){ return db.users.find(u => u.id === id) || null; }
function avatarOr(user){
  return user?.avatarDataUrl || "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
    <rect width='100%' height='100%' fill='#0e151f'/>
    <text x='50%' y='54%' text-anchor='middle' fill='#7f93aa' font-size='22' font-family='Arial'>NEV</text>
  </svg>`);
}

async function register(){
  const db = loadDB();
  const name = document.querySelector("#reg_name").value.trim();
  const email = document.querySelector("#reg_email").value.trim().toLowerCase();
  const pass = document.querySelector("#reg_pass").value;
  const avatarFile = document.querySelector("#reg_avatar").files[0];

  if(!name || !email || !pass) return alert("Заповни ім'я, email і пароль.");
  if(db.users.some(u => u.email === email)) return alert("Такий email вже зареєстрований.");

  let avatarDataUrl = "";
  if(avatarFile) avatarDataUrl = await fileToDataURL(avatarFile);

  const user = { id: uid(), name, email, pass, avatarDataUrl };
  db.users.push(user);
  db.session = user.id;
  saveDB(db);
  window.location.href = "app.html";
}

function login(){
  const db = loadDB();
  const email = document.querySelector("#log_email").value.trim().toLowerCase();
  const pass = document.querySelector("#log_pass").value;

  const user = db.users.find(u => u.email === email && u.pass === pass);
  if(!user) return alert("Невірний email або пароль.");
  db.session = user.id;
  saveDB(db);
  window.location.href = "app.html";
}

function logout(){
  const db = loadDB();
  db.session = null;
  saveDB(db);
  window.location.href = "index.html";
}

function setTopbar(){
  const db = loadDB();
  const me = getMe(db);
  const el = document.querySelector("#me_badge");
  if(el && me) el.textContent = me.name;
}

async function createPost(){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);

  const text = document.querySelector("#post_text").value.trim();
  const imgFile = document.querySelector("#post_img").files[0];
  if(!text && !imgFile) return alert("Додай текст або фото.");

  let imgDataUrl = "";
  if(imgFile) imgDataUrl = await fileToDataURL(imgFile);

  db.posts.unshift({ id: uid(), userId: me.id, text, imgDataUrl, ts: now(), likes: [] });
  saveDB(db);

  document.querySelector("#post_text").value = "";
  document.querySelector("#post_img").value = "";
  renderFeed();
}

function toggleLike(postId){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);
  const p = db.posts.find(x => x.id === postId);
  if(!p) return;

  const i = p.likes.indexOf(me.id);
  if(i >= 0) p.likes.splice(i,1);
  else p.likes.push(me.id);

  saveDB(db);
  renderFeed();
}

function copyLink(postId){
  const base = location.origin + location.pathname.replace(/\/[^\/]*$/, "/");
  const url = `${base}app.html#post=${postId}`;
  navigator.clipboard?.writeText(url).then(()=>alert("Посилання скопійовано")).catch(()=>alert(url));
}

function renderFeed(){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);
  const list = document.querySelector("#feed");
  if(!list) return;

  if(db.posts.length === 0){
    list.innerHTML = `<div class="card"><b>Поки немає постів.</b><div class="hr"></div><small>Створи перший пост з фото 😊</small></div>`;
    return;
  }

  list.innerHTML = db.posts.map(p=>{
    const u = getUser(db, p.userId);
    const liked = p.likes.includes(me.id);
    return `
      <div class="card">
        <div class="post">
          <img class="avatar" src="${avatarOr(u)}" alt="avatar">
          <div style="flex:1">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
              <div>
                <b>${escapeHtml(u?.name || "Unknown")}</b>
                <div class="meta"><span>${new Date(p.ts).toLocaleString()}</span></div>
              </div>
              <a class="pill" href="chat.html?to=${encodeURIComponent(p.userId)}">💬 Чат</a>
            </div>

            ${p.text ? `<div style="margin-top:10px">${escapeHtml(p.text)}</div>` : ``}
            ${p.imgDataUrl ? `<img class="media" src="${p.imgDataUrl}" alt="media">` : ``}

            <div class="actions">
              <button class="iconbtn ${liked ? "liked":""}" onclick="toggleLike('${p.id}')">
                ${liked ? "❤️" : "🤍"} Лайк (${p.likes.length})
              </button>
              <button class="iconbtn" onclick="copyLink('${p.id}')">🔗 Посилання</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderPeople(){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);
  const box = document.querySelector("#people");
  if(!box) return;

  const others = db.users.filter(u => u.id !== me.id);
  if(others.length === 0){
    box.innerHTML = `<div class="card"><b>Ти поки один.</b><div class="hr"></div><small>Для тесту зроби 2-й акаунт в інкогніто.</small></div>`;
    return;
  }

  box.innerHTML = others.map(u=>`
    <div class="card" style="display:flex;align-items:center;gap:12px">
      <img class="avatar" src="${avatarOr(u)}" alt="avatar">
      <div style="flex:1">
        <b>${escapeHtml(u.name)}</b>
        <div class="meta"><span>${escapeHtml(u.email)}</span></div>
      </div>
      <a class="btn secondary" href="chat.html?to=${encodeURIComponent(u.id)}">Чат</a>
    </div>
  `).join("");
}

function chatKey(a,b){
  const x = [a,b].sort();
  return `${x[0]}|${x[1]}`;
}

function renderChat(){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);

  const params = new URLSearchParams(location.search);
  const toId = params.get("to");
  const peer = getUser(db, toId);

  const title = document.querySelector("#chat_title");
  const chatbox = document.querySelector("#chatbox");

  if(!peer){
    title.textContent = "Чат: відкрий з головної";
    chatbox.innerHTML = `<div class="bubble"><div class="t">Система</div>Повернись на головну і натисни “Чат” біля користувача.</div>`;
    return;
  }

  title.textContent = `Чат з ${peer.name}`;

  const key = chatKey(me.id, peer.id);
  const msgs = db.chats[key] || [];

  chatbox.innerHTML = msgs.map(m=>{
    const isMe = m.from === me.id;
    const name = isMe ? me.name : peer.name;
    return `
      <div class="bubble ${isMe ? "me":""}">
        <div class="t">${escapeHtml(name)} • ${new Date(m.ts).toLocaleTimeString()}</div>
        <div>${escapeHtml(m.text)}</div>
      </div>
    `;
  }).join("");

  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage(){
  const db = requireAuth(); if(!db) return;
  const me = getMe(db);

  const params = new URLSearchParams(location.search);
  const toId = params.get("to");
  const peer = getUser(db, toId);
  if(!peer) return alert("Немає співрозмовника.");

  const input = document.querySelector("#msg_text");
  const text = input.value.trim();
  if(!text) return;

  const key = chatKey(me.id, peer.id);
  if(!db.chats[key]) db.chats[key] = [];
  db.chats[key].push({ from: me.id, text, ts: now() });

  saveDB(db);
  input.value = "";
  renderChat();
}

function bootIndex(){
  const db = loadDB();
  if(db.session) window.location.href = "app.html";
}
function bootApp(){
  const db = requireAuth(); if(!db) return;
  setTopbar(); renderPeople(); renderFeed();
}
function bootChat(){
  const db = requireAuth(); if(!db) return;
  setTopbar(); renderChat();
}

window.register = register;
window.login = login;
window.logout = logout;
window.createPost = createPost;
window.toggleLike = toggleLike;
window.copyLink = copyLink;
window.sendMessage = sendMessage;
window.bootIndex = bootIndex;
window.bootApp = bootApp;
window.bootChat = bootChat;