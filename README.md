:root{
  --bg:#0b0f14;
  --card:#121a23;
  --muted:#7f93aa;
  --text:#e8f0ff;
  --accent:#ff2d7a;
  --accent2:#00d4ff;
  --line:#1f2a37;
}
*{box-sizing:border-box}
body{
  margin:0;
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;
  background: radial-gradient(1200px 800px at 20% 10%, #122033 0%, transparent 55%),
              radial-gradient(900px 700px at 80% 20%, #2a1433 0%, transparent 55%),
              var(--bg);
  color:var(--text);
}
a{color:inherit;text-decoration:none}
.container{max-width:980px;margin:0 auto;padding:16px}
.row{display:flex;gap:12px;flex-wrap:wrap}
.card{
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border:1px solid var(--line);
  border-radius:16px;
  padding:14px;
  box-shadow:0 10px 30px rgba(0,0,0,.25);
}
.btn{
  background:linear-gradient(135deg,var(--accent),#b000ff);
  border:none;color:white;
  padding:10px 14px;
  border-radius:12px;
  font-weight:700;
  cursor:pointer;
}
.btn.secondary{
  background:transparent;
  border:1px solid var(--line);
}
.btn:active{transform:scale(.98)}
.input{
  width:100%;
  padding:10px 12px;
  border-radius:12px;
  border:1px solid var(--line);
  background:#0e151f;
  color:var(--text);
  outline:none;
}
label{font-size:12px;color:var(--muted)}
small{color:var(--muted)}
.topbar{
  position:sticky;top:0;z-index:50;
  background:rgba(5,8,12,.72);
  backdrop-filter: blur(10px);
  border-bottom:1px solid var(--line);
}
.topbar .inner{
  max-width:980px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;
}
.brand{font-weight:900;letter-spacing:.5px}
.brand span{color:var(--accent2)}
.nav{display:flex;gap:10px;align-items:center}
.pill{
  padding:8px 10px;border:1px solid var(--line);
  border-radius:999px;color:var(--muted);
}
.grid{
  display:grid;
  grid-template-columns: 320px 1fr;
  gap:12px;
}
@media (max-width:900px){
  .grid{grid-template-columns:1fr}
}
.avatar{
  width:56px;height:56px;border-radius:14px;
  background:#0e151f;border:1px solid var(--line);
  object-fit:cover;
}
.post{display:flex;gap:12px}
.post img.media{
  width:100%;max-height:360px;object-fit:cover;
  border-radius:14px;border:1px solid var(--line);
  margin-top:10px;
}
.meta{display:flex;gap:10px;align-items:center;color:var(--muted);font-size:12px}
.actions{display:flex;gap:10px;margin-top:10px}
.iconbtn{
  background:transparent;border:1px solid var(--line);
  color:var(--text);
  padding:8px 10px;border-radius:12px;cursor:pointer;
}
.iconbtn.liked{border-color:rgba(255,45,122,.6)}
.hr{height:1px;background:var(--line);margin:12px 0}
.chatbox{
  height:60vh;overflow:auto;
  padding:10px;border-radius:14px;
  background:#0e151f;border:1px solid var(--line);
}
.bubble{
  max-width:78%;
  padding:10px 12px;border-radius:14px;
  margin:8px 0;border:1px solid var(--line);
  background:#0b1220;
}
.bubble.me{
  margin-left:auto;
  background:rgba(255,45,122,.12);
  border-color:rgba(255,45,122,.35);
}
.bubble .t{font-size:12px;color:var(--muted);margin-bottom:4px}