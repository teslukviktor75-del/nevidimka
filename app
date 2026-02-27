:root{
  --bg1:#0b1220;
  --bg2:#111827;
  --card:rgba(255,255,255,.035);
  --card2:rgba(255,255,255,.06);
  --stroke:rgba(255,255,255,.09);
  --text:#e5e7eb;
  --muted:rgba(229,231,235,.75);
  --blue:#2563eb;
  --blue2:#1d4ed8;
  --red:#ef4444;
  --shadow:0 14px 40px rgba(0,0,0,.55);
}

*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{
  font-family: Arial, sans-serif;
  color:var(--text);
  background: radial-gradient(1200px 900px at 20% 10%, #1f2a44 0%, transparent 55%),
              radial-gradient(1000px 800px at 85% 85%, #10224a 0%, transparent 55%),
              linear-gradient(135deg,var(--bg1),var(--bg2));
  display:flex;
  align-items:center;
  justify-content:center;
  padding:12px;
}

/* APP SHELL */
.app{
  width:min(420px,100%);
  height:92vh;
  background: rgba(15,23,42,.92);
  border:1px solid var(--stroke);
  border-radius:20px;
  overflow:hidden;
  box-shadow:var(--shadow);
  backdrop-filter: blur(10px);
  display:flex;
  flex-direction:column;
}

/* TOP BAR */
.topbar{
  padding:14px 14px 12px;
  background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
  border-bottom:1px solid var(--stroke);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
}
.brand{
  font-weight:900;
  font-size:22px;
  letter-spacing:.3px;
}
.tabs{
  display:flex;
  gap:8px;
  align-items:center;
}
.tab{
  border:none;
  background:rgba(255,255,255,.07);
  color:var(--text);
  padding:9px 12px;
  border-radius:14px;
  cursor:pointer;
  font-size:13px;
  transition: .18s;
  user-select:none;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
}
.tab:hover{transform: translateY(-1px)}
.tab.active{
  background:linear-gradient(180deg, rgba(37,99,235,1), rgba(29,78,216,1));
  box-shadow: 0 10px 22px rgba(37,99,235,.35);
}
.tab.hide{display:none}

/* VIEWS */
.view{flex:1; display:none; padding:14px}
.view.active{display:flex; flex-direction:column; gap:12px}

/* CARDS */
.card{
  background: linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.03));
  border:1px solid var(--stroke);
  border-radius:18px;
  padding:14px;
  box-shadow: 0 10px 22px rgba(0,0,0,.25);
}

/* PROFILE HEADER */
.profileHead{
  display:flex;
  gap:14px;
  align-items:center;
}
.avatar{
  width:64px;
  height:64px;
  border-radius:18px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.12);
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  flex:0 0 auto;
}
.avatar img{width:100%;height:100%;object-fit:cover}
.muted{color:var(--muted); font-size:12px; line-height:1.3}
.pill{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:7px 10px;
  border-radius:999px;
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.08);
  font-size:12px;
}

/* FORMS */
label{
  display:block;
  font-size:12px;
  color:rgba(229,231,235,.85);
  margin:0 0 7px 2px;
}
.row{display:flex; gap:10px}
.row>div{flex:1}
input, textarea, select{
  width:100%;
  border:none;
  outline:none;
  padding:12px 12px;
  border-radius:16px;
  background: rgba(255,255,255,.06);
  color:var(--text);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
}
input::placeholder, textarea::placeholder{color: rgba(229,231,235,.45)}
textarea{min-height:90px; resize:none}

/* BUTTONS */
.btn{
  border:none;
  border-radius:16px;
  padding:12px 14px;
  font-weight:800;
  cursor:pointer;
  color:white;
  background: linear-gradient(180deg, var(--blue), var(--blue2));
  box-shadow: 0 14px 24px rgba(37,99,235,.25);
  transition:.18s;
  user-select:none;
}
.btn:hover{transform: translateY(-1px)}
.btn:active{transform: translateY(0px)}
.btn.secondary{
  color:var(--text);
  background: rgba(255,255,255,.09);
  box-shadow:none;
}
.btn.danger{
  background: linear-gradient(180deg, var(--red), #dc2626);
  box-shadow: 0 14px 24px rgba(239,68,68,.22);
}

/* CHAT */
.chatBox{
  flex:1;
  background: rgba(255,255,255,.02);
  border:1px solid rgba(255,255,255,.06);
  border-radius:18px;
  padding:12px;
  overflow:auto;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.bubble{
  max-width:78%;
  padding:10px 12px;
  border-radius:16px;
  background: rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.08);
  align-self:flex-start;
  word-wrap:break-word;
  animation: fadeIn .22s ease-out;
}
.bubble.me{
  background: linear-gradient(180deg, var(--blue), var(--blue2));
  border-color: transparent;
  align-self:flex-end;
}
.meta{font-size:11px; opacity:.85; margin-bottom:6px}
.imgMsg{
  width:100%;
  border-radius:14px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.12);
  margin-top:8px;
}
.imgMsg img{display:block;width:100%}

.composer{
  display:flex;
  gap:8px;
  align-items:center;
  padding:10px;
  border-radius:18px;
  border:1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.03);
}
.composer input{
  flex:1;
  border-radius:16px;
  padding:12px;
}
.iconBtn{
  width:42px;height:42px;
  border:none;
  border-radius:16px;
  background: rgba(255,255,255,.10);
  color:var(--text);
  cursor:pointer;
  font-size:18px;
  display:flex;align-items:center;justify-content:center;
  transition:.18s;
  user-select:none;
}
.iconBtn:hover{transform: translateY(-1px)}

/* POSTS */
.post{display:flex; flex-direction:column; gap:10px}
.postTop{display:flex; gap:10px; align-items:center}
.miniAvatar{
  width:38px;height:38px;
  border-radius:14px;
  background: rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.12);
  overflow:hidden;
}
.miniAvatar img{width:100%;height:100%;object-fit:cover}
.postImg{
  border-radius:18px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.04);
}
.postImg img{display:block;width:100%}
.postActions{display:flex; gap:8px; flex-wrap:wrap}

@keyframes fadeIn{
  from{opacity:0; transform: translateY(6px)}
  to{opacity:1; transform: translateY(0)}
}