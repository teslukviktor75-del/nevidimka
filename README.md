<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>nevidimka</title>
<style>
  :root{--bg:#10222b;--card:#18323c;--stroke:#2b4b58;--btn:#00f5d4;--btnText:#07323a;--txt:#e6f6f5;--mut:#a6c9c6;}
  *{box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--txt);padding:16px}
  .card{width:min(460px,100%);background:var(--card);border:1px solid var(--stroke);border-radius:18px;padding:16px}
  .logo{text-align:center;font-size:36px;font-weight:900;color:var(--btn);margin:6px 0 12px}
  .tabs{display:flex;gap:10px;margin-bottom:10px}
  .tabs button{flex:1;padding:10px;border-radius:12px;border:1px solid var(--stroke);background:transparent;color:var(--txt);font-weight:900}
  .tabs button.active{background:var(--btn);color:var(--btnText);border:none}
  input{width:100%;padding:12px;border-radius:12px;border:1px solid var(--stroke);background:transparent;color:var(--txt);margin:8px 0}
  .btn{width:100%;padding:12px;border-radius:12px;border:none;background:var(--btn);color:var(--btnText);font-weight:900;cursor:pointer;margin-top:6px}
  .btn2{width:100%;padding:12px;border-radius:12px;border:1px solid var(--stroke);background:transparent;color:var(--txt);font-weight:900;cursor:pointer;margin-top:10px}
  .err{display:none;margin-top:10px;color:#ffb3b3;font-weight:900}
  .home{display:none}
  .row{display:flex;gap:12px;align-items:center}
  .avatar{width:62px;height:62px;border-radius:16px;border:1px solid var(--stroke);object-fit:cover;background:#0b151b}
  .muted{color:var(--mut)}
  .section{margin-top:14px;border-top:1px solid var(--stroke);padding-top:12px}
  .chatBox{height:260px;overflow:auto;border:1px solid var(--stroke);border-radius:14px;padding:10px;background:#0d1b23}
  .msg{display:flex;gap:10px;margin:10px 0;align-items:flex-start}
  .msg img{width:34px;height:34px;border-radius:10px;object-fit:cover;border:1px solid var(--stroke);background:#0b151b}
  .bubble{padding:10px;border:1px solid var(--stroke);border-radius:14px;max-width:320px}
  .bubble b{display:block;margin-bottom:2px}
  .chatInput{display:flex;gap:10px;margin-top:10px}
  .chatInput input{margin:0;flex:1}
  .chatInput button{width:110px;margin:0}
</style>
</head>
<body>

<div class="card">
  <div class="logo">nevidimka</div>

  <!-- AUTH -->
  <div id="auth">
    <div class="tabs">
      <button id="tReg" class="active" onclick="showTab('reg')">Register</button>
      <button id="tLog" onclick="showTab('log')">Login</button>
    </div>

    <div id="reg">
      <input id="rUser" placeholder="Username" />
      <input id="rEmail" placeholder="Email" />
      <input id="rPass" placeholder="Password (мін 6)" type="password" />
      <button class="btn" onclick="register()">Register</button>
      <button class="btn2" onclick="googleLogin()">Continue with Google</button>
      <div class="muted" style="text-align:center;margin-top:8px">Google вхід відкриє Chrome OAuth</div>
    </div>

    <div id="log" style="display:none">
      <input id="lEmail" placeholder="Email" />
      <input id="lPass" placeholder="Password" type="password" />
      <button class="btn" onclick="login()">Login</button>
      <button class="btn2" onclick="googleLogin()">Continue with Google</button>
    </div>

    <div id="err" class="err"></div>
  </div>

  <!-- HOME -->
  <div id="home" class="home">
    <div class="row">
      <img id="ava" class="avatar" src="" alt="avatar">
      <div>
        <div style="font-weight:900;font-size:18px" id="name"></div>
        <div class="muted" id="email"></div>
      </div>
    </div>

    <div class="section">
      <div style="font-weight:900;margin-bottom:6px">Аватар</div>
      <input id="avatarFile" type="file" accept="image/*">
      <button class="btn2" onclick="uploadAvatar()">Завантажити аватар</button>
    </div>

    <div class="section">
      <div style="font-weight:900;margin-bottom:8px">💬 Міні-чат</div>
      <div id="chatBox" class="chatBox"></div>

      <div class="chatInput">
        <input id="chatText" placeholder="Напиши повідомлення..." />
        <button class="btn" onclick="sendMsg()">Send</button>
      </div>
    </div>

    <button class="btn2" onclick="logout()" style="margin-top:14px">Вийти</button>
  </div>
</div>

<script src="/socket.io/socket.io.js"></script>
<script>
  const tokenKey = "nevidimka_token";
  let socket = null;
  let me = null;

  function setErr(msg){
    const e = document.getElementById("err");
    e.style.display = "block";
    e.textContent = msg;
  }
  function clearErr(){
    const e = document.getElementById("err");
    e.style.display = "none";
    e.textContent = "";
  }

  function showTab(which){
    clearErr();
    document.getElementById("reg").style.display = which==="reg" ? "block" : "none";
    document.getElementById("log").style.display = which==="log" ? "block" : "none";
    document.getElementById("tReg").classList.toggle("active", which==="reg");
    document.getElementById("tLog").classList.toggle("active", which==="log");
  }

  async function api(path, method="GET", body=null){
    const token = localStorage.getItem(tokenKey);
    const headers = { "Content-Type":"application/json" };
    if(token) headers["Authorization"] = "Bearer " + token;
    const res = await fetch(path, { method, headers, body: body?JSON.stringify(body):null });
    const data = await res.json().catch(()=>({ok:false,error:"BAD_JSON"}));
    return { res, data };
  }

  async function register(){
    clearErr();
    const username = document.getElementById("rUser").value.trim();
    const email = document.getElementById("rEmail").value.trim();
    const password = document.getElementById("rPass").value;

    const {res, data} = await api("/api/register", "POST", { username, email, password });
    if(!data.ok) return setErr(data.error);
    localStorage.setItem(tokenKey, data.token);
    openHome(data.user);
  }

  async function login(){
    clearErr();
    const email = document.getElementById("lEmail").value.trim();
    const password = document.getElementById("lPass").value;

    const {data} = await api("/api/login", "POST", { email, password });
    if(!data.ok) return setErr(data.error);
    localStorage.setItem(tokenKey, data.token);
    openHome(data.user);
  }

  function googleLogin(){
    window.location.href = "/auth/google";
  }

  function openHome(user){
    me = user;
    document.getElementById("auth").style.display="none";
    document.getElementById("home").style.display="block";

    document.getElementById("name").textContent = user.username;
    document.getElementById("email").textContent = user.email;

    const avatar = user.avatar_url || "";
    document.getElementById("ava").src = avatar ? avatar : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%230b151b'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%23a6c9c6' font-size='20' font-family='Arial'%3EAVA%3C/text%3E%3C/svg%3E";

    startChat();
  }

  function logout(){
    localStorage.removeItem(tokenKey);
    if(socket){ socket.disconnect(); socket=null; }
    document.getElementById("home").style.display="none";
    document.getElementById("auth").style.display="block";
    showTab("log");
  }

  async function uploadAvatar(){
    clearErr();
    const file = document.getElementById("avatarFile").files[0];
    if(!file) return setErr("Вибери фото");
    const token = localStorage.getItem(tokenKey);
    if(!token) return setErr("Немає сесії");

    const fd = new FormData();
    fd.append("avatar", file);

    const res = await fetch("/api/avatar", {
      method:"POST",
      headers:{ "Authorization":"Bearer " + token },
      body: fd
    });

    const data = await res.json().catch(()=>({ok:false,error:"BAD_JSON"}));
    if(!data.ok) return setErr(data.error);

    // оновлюємо профіль
    openHome(data.user);
  }

  function startChat(){
    const token = localStorage.getItem(tokenKey);
    if(!token) return;

    if(socket) socket.disconnect();
    socket = io();

    socket.on("connect", ()=> socket.emit("auth", token));
    socket.on("auth_ok", ()=> {});
    socket.on("auth_error", (e)=> setErr("CHAT: " + e));

    socket.on("chat_history", (rows)=>{
      const box = document.getElementById("chatBox");
      box.innerHTML = "";
      rows.forEach(addMsg);
      box.scrollTop = box.scrollHeight;
    });

    socket.on("chat_new", (m)=>{
      addMsg(m);
      const box = document.getElementById("chatBox");
      box.scrollTop = box.scrollHeight;
    });
  }

  function addMsg(m){
    const box = document.getElementById("chatBox");
    const wrap = document.createElement("div");
    wrap.className = "msg";

    const img = document.createElement("img");
    img.src = m.avatar_url || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%230b151b'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' fill='%23a6c9c6' font-size='14' font-family='Arial'%3EAVA%3C/text%3E%3C/svg%3E";

    const bub = document.createElement("div");
    bub.className = "bubble";
    bub.innerHTML = `<b>${escapeHtml(m.username)}</b>${escapeHtml(m.text)}`;

    wrap.appendChild(img);
    wrap.appendChild(bub);
    box.appendChild(wrap);
  }

  function sendMsg(){
    const t = document.getElementById("chatText");
    const msg = t.value.trim();
    if(!msg) return;
    if(!socket) return setErr("Чат не підключений");
    socket.emit("chat_send", msg);
    t.value = "";
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // приймаємо токен після Google редіректа: #token=...
  (function readHashToken(){
    const h = window.location.hash || "";
    if(h.startsWith("#token=")){
      const token = h.slice(7);
      localStorage.setItem(tokenKey, token);
      window.location.hash = "";
    }
  })();

  // авто-вхід
  (async function init(){
    const token = localStorage.getItem(tokenKey);
    if(!token) return showTab("reg");
    const {data} = await api("/api/me");
    if(data.ok) openHome(data.user);
    else localStorage.removeItem(tokenKey);
  })();
</script>

</body>
</html>
