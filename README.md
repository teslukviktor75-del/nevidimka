 <!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>nevidimka • Вхід</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body onload="bootIndex()">

<div class="topbar">
  <div class="inner">
    <div class="brand">nevidimka<span>.</span></div>
    <div class="pill">Cloudflare + GitHub</div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="card" style="flex:1;min-width:280px">
      <h2 style="margin:0 0 8px 0">Вхід</h2>
      <label>Email</label>
      <input class="input" id="log_email" placeholder="email@example.com">
      <div style="height:10px"></div>
      <label>Пароль</label>
      <input class="input" id="log_pass" type="password" placeholder="••••••••">
      <div style="height:12px"></div>
      <button class="btn" onclick="login()">Увійти</button>
      <div class="hr"></div>
      <small>Після входу перекине на головну сторінку.</small>
    </div>

    <div class="card" style="flex:1;min-width:280px">
      <h2 style="margin:0 0 8px 0">Реєстрація</h2>
      <label>Ім'я</label>
      <input class="input" id="reg_name" placeholder="Nevidimka">
      <div style="height:10px"></div>
      <label>Email</label>
      <input class="input" id="reg_email" placeholder="email@example.com">
      <div style="height:10px"></div>
      <label>Пароль</label>
      <input class="input" id="reg_pass" type="password" placeholder="створи пароль">
      <div style="height:10px"></div>
      <label>Аватар (фото)</label>
      <input class="input" id="reg_avatar" type="file" accept="image/*">
      <div style="height:12px"></div>
      <button class="btn" onclick="register()">Зареєструватись</button>
      <div class="hr"></div>
      <small>Працює без сервера: дані в телефоні (localStorage).</small>
    </div>
  </div>
</div>

<script src="app.js"></script>
</body>
</html>