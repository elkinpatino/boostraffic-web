// ═══════════════════════════════════════════════════
// BOOSTRAFFIC DASHBOARD WORKER v6
// Multi-ficha por cuenta + Ask Maps en métricas
// Admin:   dashboard-boostraffic.elkinpatino.workers.dev
// Cliente: htl.boostraffic.com
// ═══════════════════════════════════════════════════

function isAdminHost(host) {
  return host.includes('workers.dev') || host === 'dashboard.boostraffic.com';
}

// ═══════════════════════════════════════════════════
// LOGIN ADMIN
// ═══════════════════════════════════════════════════
const LOGIN_ADMIN = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Boostraffic Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f5f3;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center}
.wrap{width:min(420px,92vw)}
.brand{display:flex;align-items:center;gap:8px;margin-bottom:32px;justify-content:center}
.brand-dot{width:8px;height:8px;border-radius:50%;background:#1d9e75}
.brand-name{font-size:16px;font-weight:600;color:#1a1a1a}
.brand-name span{color:#1d9e75}
.card{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:36px 32px}
.card-title{font-size:18px;font-weight:600;color:#1a1a1a;margin-bottom:4px}
.card-sub{font-size:13px;color:#888;margin-bottom:28px}
.label{font-size:12px;font-weight:500;color:#444;margin-bottom:6px;display:block}
.inp{width:100%;background:#fafafa;border:0.5px solid #e5e5e3;border-radius:8px;padding:11px 14px;font-family:'Inter',sans-serif;font-size:14px;color:#1a1a1a;outline:none;transition:border-color .2s;margin-bottom:16px;letter-spacing:.05em}
.inp:focus{border-color:#1d9e75;background:#fff}
.btn{width:100%;padding:12px;background:#1a1a1a;border:none;border-radius:8px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#fff;cursor:pointer;transition:background .2s;letter-spacing:.02em}
.btn:hover{background:#333}
.err{font-size:12px;color:#e24b4a;margin-top:10px;min-height:16px;text-align:center}
.footer{text-align:center;margin-top:20px;font-size:11px;color:#aaa}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
  </div>
  <div class="card">
    <div class="card-title">Panel de administracion</div>
    <div class="card-sub">Acceso exclusivo para el equipo Boostraffic</div>
    <label class="label">Clave maestra</label>
    <input class="inp" type="password" id="k" placeholder="••••••••" autocomplete="off">
    <button class="btn" onclick="auth()">Acceder al panel</button>
    <div class="err" id="e"></div>
  </div>
  <div class="footer">boostraffic.com · Sistema de Inteligencia Local</div>
</div>
<script>
async function auth(){
  var k=document.getElementById('k').value;
  var e=document.getElementById('e');
  if(!k)return;
  e.style.color='#888';e.textContent='Verificando...';
  try{
    var r=await fetch('/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:k,type:'admin'})});
    if(r.ok){e.style.color='#1d9e75';e.textContent='Acceso concedido...';setTimeout(function(){location.reload()},600)}
    else{e.style.color='#e24b4a';e.textContent='Clave incorrecta';document.getElementById('k').value=''}
  }catch(err){e.style.color='#e24b4a';e.textContent='Error de conexion'}
}
document.getElementById('k').addEventListener('keydown',function(e){if(e.key==='Enter')auth()});
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body>
</html>`;

// ═══════════════════════════════════════════════════
// LOGIN CLIENTE
// ═══════════════════════════════════════════════════
function buildClientLogin(accountName, subdomain) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${accountName || 'Mi Panel'} | Boostraffic</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f5f3;font-family:'Inter',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.wrap{width:min(440px,100%)}
.brand{display:flex;align-items:center;gap:8px;margin-bottom:32px;justify-content:center}
.brand-dot{width:8px;height:8px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.brand-name{font-size:16px;font-weight:600;color:#1a1a1a}
.brand-name span{color:#1d9e75}
.card{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;overflow:hidden}
.card-top{background:#fafafa;border-bottom:0.5px solid #e5e5e3;padding:28px 32px}
.card-top-label{font-size:11px;font-weight:500;color:#888;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
.card-top-name{font-size:22px;font-weight:600;color:#1a1a1a}
.card-top-sub{font-size:13px;color:#888;margin-top:3px}
.card-body{padding:28px 32px}
.label{font-size:12px;font-weight:500;color:#444;margin-bottom:6px;display:block}
.inp{width:100%;background:#fafafa;border:0.5px solid #e5e5e3;border-radius:8px;padding:12px 14px;font-family:'Inter',sans-serif;font-size:15px;color:#1a1a1a;outline:none;transition:border-color .2s;margin-bottom:16px;letter-spacing:.08em}
.inp:focus{border-color:#1d9e75;background:#fff}
.btn{width:100%;padding:13px;background:#1a1a1a;border:none;border-radius:8px;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;color:#fff;cursor:pointer;transition:background .2s}
.btn:hover{background:#333}
.err{font-size:12px;color:#e24b4a;margin-top:10px;min-height:16px;text-align:center}
.stats{display:flex;flex-direction:column;gap:8px;margin-top:20px;padding-top:20px;border-top:0.5px solid #e5e5e3}
.stat{display:flex;align-items:center;gap:8px;font-size:12px;color:#888}
.stat::before{content:'';display:inline-block;width:4px;height:4px;border-radius:50%;background:#1d9e75}
.footer{text-align:center;margin-top:20px;font-size:11px;color:#aaa}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
  </div>
  <div class="card">
    <div class="card-top">
      <div class="card-top-label">Panel de rendimiento</div>
      <div class="card-top-name">${accountName || 'Mi Panel'}</div>
      <div class="card-top-sub">Google Maps & Ask Maps · Bogota, Colombia</div>
    </div>
    <div class="card-body">
      <label class="label">Clave de acceso</label>
      <input class="inp" type="password" id="k" placeholder="••••••••" autocomplete="off">
      <button class="btn" onclick="auth()">Ver mis resultados &rarr;</button>
      <div class="err" id="e"></div>
      <div class="stats">
        <div class="stat">Resultados medibles actualizados</div>
        <div class="stat">Visibilidad en Ask Maps · Gemini AI</div>
        <div class="stat">Optimizacion activa en curso</div>
      </div>
    </div>
  </div>
  <div class="footer">boostraffic.com · Panel seguro · Datos en tiempo real</div>
</div>
<script>
async function auth(){
  var k=document.getElementById('k').value.trim().toUpperCase();
  var e=document.getElementById('e');
  if(!k)return;
  e.style.color='#888';e.textContent='Verificando acceso...';
  try{
    var r=await fetch('/auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key:k,type:'client',subdomain:'${subdomain}'})});
    if(r.ok){e.style.color='#1d9e75';e.textContent='Acceso concedido...';setTimeout(function(){location.reload()},600)}
    else{e.style.color='#e24b4a';e.textContent='Clave incorrecta. Contacta a tu asesor.';document.getElementById('k').value=''}
  }catch(err){e.style.color='#e24b4a';e.textContent='Error de conexion'}
}
document.getElementById('k').addEventListener('keydown',function(ev){if(ev.key==='Enter')auth()});
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body>
</html>`;
}

// ═══════════════════════════════════════════════════
// RESUMEN GENERAL - SELECTOR DE FICHAS
// ═══════════════════════════════════════════════════
function buildAccountSummary(account, fichas) {
  var fichasHTML = '';
  for(var i=0;i<fichas.length;i++){
    var f=fichas[i];
    var diff=(f.score||0)-(f.baseline_score||0);
    var stars=Math.floor(f.stars||0);
    var ss='';for(var s=0;s<stars;s++)ss+='\u2605';for(var s=stars;s<5;s++)ss+='\u2606';
    var scoreColor = f.score>=70?'#1d9e75':f.score>=40?'#d4a017':'#378add';
    fichasHTML+=`
    <div class="ficha-card" onclick="window.location.href='/ficha/${f.id}'">
      <div class="ficha-score" style="color:${scoreColor}">${f.score||0}<span style="font-size:12px;color:#bbb">/100</span></div>
      <div class="ficha-name">${f.name}</div>
      <div class="ficha-cat">${f.category||'Negocio'}</div>
      <div class="ficha-metrics">
        <div class="fm"><div class="fm-v">${(f.impressions||0).toLocaleString('es-CO')}</div><div class="fm-l">Impr.</div></div>
        <div class="fm"><div class="fm-v">${f.directions||0}</div><div class="fm-l">Rutas</div></div>
        <div class="fm"><div class="fm-v">${f.calls||0}</div><div class="fm-l">Calls</div></div>
        <div class="fm"><div class="fm-v">${f.stars||0}</div><div class="fm-l">★</div></div>
      </div>
      <div class="ficha-footer">
        <span class="ficha-stars">${ss}</span>
        ${diff>0?`<span class="ficha-badge up">&#8593; +${diff} pts</span>`:`<span class="ficha-badge active">Activa</span>`}
      </div>
      <div class="ficha-cta">Ver detalle &rarr;</div>
    </div>`;
  }

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${account.name} | Boostraffic</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f5f3;font-family:'Inter',sans-serif;color:#1a1a1a;min-height:100vh}
.topbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);height:52px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:0.5px solid #e5e5e3}
.brand{display:flex;align-items:center;gap:8px}
.brand-dot{width:7px;height:7px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.brand-name{font-size:14px;font-weight:600;color:#1a1a1a}
.brand-name span{color:#1d9e75}
.topbar-r{display:flex;align-items:center;gap:10px}
.live{display:flex;align-items:center;gap:6px;font-size:11px;color:#888}
.ldot{width:5px;height:5px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite}
.logout{font-size:12px;font-weight:500;color:#666;background:none;border:0.5px solid #e5e5e3;border-radius:6px;padding:5px 10px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.logout:hover{border-color:#ccc;color:#1a1a1a}
.main{max-width:980px;margin:0 auto;padding:32px 20px 80px}
.hero{margin-bottom:28px;padding-bottom:20px;border-bottom:0.5px solid #e5e5e3}
.hero-greeting{font-size:11px;font-weight:500;color:#1d9e75;text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}
.hero-name{font-size:clamp(24px,5vw,38px);font-weight:600;color:#1a1a1a;line-height:1.1;margin-bottom:6px}
.hero-sub{font-size:12px;color:#888}
.sec-title{font-size:11px;font-weight:600;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px}
.sec-title::after{content:'';flex:1;height:0.5px;background:#e5e5e3}
.fichas-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-bottom:40px}
.ficha-card{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:20px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
.ficha-card:hover{border-color:#c8e6da;transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.08)}
.ficha-score{font-size:44px;font-weight:600;line-height:1;margin-bottom:6px}
.ficha-name{font-size:16px;font-weight:600;color:#1a1a1a;margin-bottom:2px}
.ficha-cat{font-size:11px;color:#aaa;text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px}
.ficha-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px}
.fm{background:#f5f5f3;border-radius:6px;padding:7px;text-align:center}
.fm-v{font-size:13px;font-weight:500;color:#1a1a1a;line-height:1}
.fm-l{font-size:10px;color:#aaa;margin-top:2px}
.ficha-footer{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.ficha-stars{font-size:11px;color:#d4a017}
.ficha-badge{font-size:11px;padding:2px 8px;border-radius:6px;background:#f5f5f3;color:#888}
.ficha-badge.up{background:#e1f5ee;color:#0f6e56}
.ficha-badge.active{background:#e1f5ee;color:#0f6e56;border:0.5px solid #b2dece}
.ficha-cta{font-size:11px;font-weight:500;color:#1d9e75;text-align:right;transition:color .2s}
.ficha-card:hover .ficha-cta{color:#0f6e56}
.footer{text-align:center;padding:24px 0 0;border-top:0.5px solid #e5e5e3;font-size:11px;color:#bbb}
@media(max-width:600px){.fichas-grid{grid-template-columns:1fr}.main{padding:20px 16px 60px}}
</style>
</head>
<body>
<div class="topbar">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
  </div>
  <div class="topbar-r">
    <div class="live"><div class="ldot"></div>En vivo</div>
    <span style="font-size:12px;color:#aaa">${account.name}</span>
    <button class="logout" onclick="logout()">Salir</button>
  </div>
</div>
<div class="main">
  <div class="hero">
    <div class="hero-greeting">Panel de rendimiento</div>
    <div class="hero-name">${account.name}</div>
    <div class="hero-sub"><span style="color:#1d9e75;font-weight:500">${fichas.length} ficha${fichas.length!==1?'s':''} activa${fichas.length!==1?'s':''}</span> &middot; Bogota, Colombia &middot; Google Maps & Ask Maps</div>
  </div>
  <div class="sec-title">Tus fichas activas</div>
  <div class="fichas-grid">${fichasHTML}</div>
  <div class="footer">Boostraffic &nbsp;&middot;&nbsp; Sistema de Inteligencia Local &nbsp;&middot;&nbsp; boostraffic.com</div>
</div>
<script>
async function logout(){await fetch('/logout',{method:'POST'});location.href='/'}
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body>
</html>`;
}

// ═══════════════════════════════════════════════════
// DETALLE DE FICHA CLIENTE
// ═══════════════════════════════════════════════════
function buildFichaDetail(c, accountName) {
  var actions=c.actions||[];
  var score_b=c.baseline_score||0, score_n=c.score||0, score_d=score_n-score_b;
  var impr_b=c.baseline_impressions||0, impr_nuevas=c.impressions_new||0, impr_total=impr_b+impr_nuevas;
  var dir_b=c.baseline_directions||0, dir_n=c.directions||0;
  var calls_b=c.baseline_calls||0, calls_n=c.calls||0;
  var web_b=c.baseline_web||0, web_n=c.web||0;
  var stars_b=c.baseline_stars||0, stars_n=c.stars||0, stars_d=(stars_n-stars_b).toFixed(1);
  var baselineDate=c.baseline_date?new Date(c.baseline_date).toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'}):'—';
  var monthLabel=c.month_label?('Total de '+c.month_label):'Total del mes';

  var actionsHTML='';
  if(!actions.length){
    actionsHTML='<p style="font-size:13px;color:#aaa;padding:16px 0">Las primeras intervenciones apareceran aqui pronto.</p>';
  } else {
    var rev=actions.slice().reverse();
    for(var i=0;i<rev.length;i++){
      var a=rev[i];
      var dc=a.status==='done'?'#1d9e75':a.status==='prog'?'#ba7517':'#ccc';
      var dt=a.status==='done'?'Completado':a.status==='prog'?'En curso':'Planificado';
      var dbg=a.status==='done'?'background:#e1f5ee;color:#0f6e56':a.status==='prog'?'background:#faeeda;color:#854f0b':'background:#f5f5f3;color:#888';
      actionsHTML+='<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-bottom:0.5px solid #e5e5e3">';
      actionsHTML+='<div style="width:7px;height:7px;border-radius:50%;background:'+dc+';flex-shrink:0;margin-top:4px"></div>';
      actionsHTML+='<div style="flex:1;font-size:13px;color:#333">'+(a.text||a.public||'')+'</div>';
      actionsHTML+='<div style="text-align:right;flex-shrink:0"><span style="font-size:11px;padding:2px 7px;border-radius:6px;'+dbg+'">'+dt+'</span><div style="font-size:11px;color:#aaa;margin-top:3px">'+(a.date||'-')+'</div></div></div>';
    }
  }

  // Palabras clave / búsquedas que mostraron el perfil
  var keywords=c.keywords||[];
  var kwMax=0;
  keywords.forEach(function(k){
    var n=typeof k.count==='number'?k.count:parseInt(String(k.count).replace(/[^0-9]/g,''))||0;
    if(n>kwMax)kwMax=n;
  });
  var keywordsHTML='';
  keywords.forEach(function(k,i){
    var raw=k.count;
    var isLow=typeof raw==='string'&&/^\s*</.test(raw);
    var n=typeof raw==='number'?raw:parseInt(String(raw).replace(/[^0-9]/g,''))||0;
    var pct=kwMax>0?Math.max(3,Math.round((n/kwMax)*100)):3;
    var disp=typeof raw==='number'?raw.toLocaleString('es-CO'):raw;
    var isTop=i<3&&!isLow;
    keywordsHTML+='<div class="kw-row">'
      +'<div class="kw-rank'+(isTop?' top':'')+'">'+(i+1)+'</div>'
      +'<div class="kw-body">'
        +'<div class="kw-head"><span class="kw-term'+(isTop?' top':'')+'">'+k.term+'</span><span class="kw-count'+(isLow?' low':'')+'">'+disp+'</span></div>'
        +'<div class="kw-bar"><div class="kw-fill'+(isLow?' low':'')+'" data-w="'+pct+'%"></div></div>'
      +'</div>'
      +'</div>';
  });

  // Etiquetas / palabras clave objetivo que estamos posicionando
  var tags=c.tags||[];
  var tagsHTML='';
  tags.forEach(function(t){
    tagsHTML+='<div class="tag-row"><span class="tag-dot"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span><span class="tag-txt">'+t+'</span></div>';
  });

  // Bloque de dos columnas: búsquedas reales (izq) + palabras clave objetivo (der)
  var kwSearchIco='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var kwTagIco='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>';
  var kwPeriodTxt=c.keywords_period?('Búsquedas que mostraron tu perfil ('+c.keywords_period+') · ordenadas por volumen'):'Búsquedas que mostraron tu perfil · ordenadas por volumen';
  var kwCol=keywords.length?('<div class="kw-col"><div class="kw-title">'+kwSearchIco+' Cómo te encontraron en Google</div><div class="kw-sub">'+kwPeriodTxt+'</div>'+keywordsHTML+'</div>'):'';
  var tagCol=tags.length?('<div class="kw-col"><div class="kw-title">'+kwTagIco+' Palabras clave que estamos posicionando</div><div class="kw-sub">Términos de alto valor que optimizamos para atraer clientes nuevos</div>'+tagsHTML+'</div>'):'';
  var kwBlock='';
  if(keywords.length||tags.length){
    var kwInner=(keywords.length&&tags.length)?('<div class="kw-grid">'+kwCol+tagCol+'</div>'):(kwCol+tagCol);
    kwBlock='<div class="kw-card">'+kwInner+'</div>';
  }

  // Proyeccion proximos 30 dias — solo se muestra si el admin definio al menos un valor real
  var projBlock='';
  if(c.projScore||c.projStars||c.projAsk){
    projBlock='<div class="card card-pad"><div class="card-title" style="margin-bottom:16px">Proyeccion proximos 30 dias</div><div class="proj-grid">'
      +'<div class="pitem"><div class="pl">Score estimado</div><div class="pv">'+(c.projScore||'—')+'</div><div class="pn">fin de mes</div></div>'
      +'<div class="pitem"><div class="pl">Calificacion</div><div class="pv">'+(c.projStars||'—')+'</div><div class="pn">con estrategia activa</div></div>'
      +'<div class="pitem"><div class="pl">Presencia Ask Maps</div><div class="pv">'+(c.projAsk||'—')+'</div><div class="pn">consultas IA respondidas</div></div>'
      +'</div></div>';
  }

  // Cómo descubrieron tu empresa — desglose por plataforma/dispositivo (donut)
  var platforms=c.platforms||[];
  var platBlock='';
  if(platforms.length){
    var PLAT_PAL=['#f9ab00','#4285f4','#ea4335','#34a853','#a142f4','#00acc1','#ff7043'];
    var platTotal=platforms.reduce(function(s,p){return s+(Number(p.count)||0)},0)||1;
    var PC=2*Math.PI*48, pacc=0, platSegs='', platLegend='';
    platforms.forEach(function(p,i){
      var cnt=Number(p.count)||0;
      var frac=cnt/platTotal;
      var len=frac*PC;
      var gap=len>4?1.4:0;
      var seg=Math.max(len-gap,0.4);
      var color=PLAT_PAL[i%PLAT_PAL.length];
      platSegs+='<circle cx="60" cy="60" r="48" fill="none" stroke="'+color+'" stroke-width="14" stroke-dasharray="'+seg.toFixed(2)+' '+(PC-seg).toFixed(2)+'" stroke-dashoffset="'+(-pacc).toFixed(2)+'" transform="rotate(-90 60 60)"/>';
      pacc+=len;
      var pct=Math.round(frac*100);
      platLegend+='<div class="plat-item"><span class="plat-dot" style="background:'+color+'"></span><div><div class="plat-val">'+cnt.toLocaleString('es-CO')+' · '+pct+'%</div><div class="plat-lbl">'+p.label+'</div></div></div>';
    });
    // Lectura automática: agrupa por dispositivo y por canal (desde los labels de GBP)
    var devMobile=0, devDesktop=0, chSearch=0, chMaps=0;
    platforms.forEach(function(p){
      var l=(p.label||'').toLowerCase(), c=Number(p.count)||0;
      if(/escritorio|computador/.test(l)) devDesktop+=c; else if(/m[oó]vil/.test(l)) devMobile+=c;
      if(/maps/.test(l)) chMaps+=c; else chSearch+=c;
    });
    var platInsights='';
    if(devMobile+devDesktop>0){
      var mPct=Math.round(devMobile/platTotal*100), dPct=Math.round(devDesktop/platTotal*100);
      var sPct=Math.round(chSearch/platTotal*100), pmPct=Math.round(chMaps/platTotal*100);
      var heroNum=(devMobile>=devDesktop)?mPct:dPct;
      var heroTxt=(devMobile>=devDesktop)?'te encontró desde el celular 📱':'te encontró desde el computador 💻';
      platInsights='<div class="plat-insights">'
        +'<div class="pins-cap">Lectura rápida</div>'
        +'<div class="pins-hero"><div class="pins-hero-num">'+heroNum+'%</div><div class="pins-hero-txt">de las personas '+heroTxt+'</div></div>'
        +'<div class="pins-split"><div class="pins-split-lbl"><span><b>Móvil</b> '+mPct+'%</span><span><b>Escritorio</b> '+dPct+'%</span></div><div class="pins-bar"><span style="width:'+mPct+'%;background:#1d9e75"></span><span style="width:'+dPct+'%;background:#cdd6e0"></span></div></div>'
        +'<div class="pins-split"><div class="pins-split-lbl"><span><b>Búsqueda Google</b> '+sPct+'%</span><span><b>Google Maps</b> '+pmPct+'%</span></div><div class="pins-bar"><span style="width:'+sPct+'%;background:#4285f4"></span><span style="width:'+pmPct+'%;background:#ea4335"></span></div></div>'
        +'</div>';
    }
    platBlock='<div class="plat-card"><div class="kw-title"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="12" y1="12" x2="20" y2="16"/></svg> Cómo descubrieron tu empresa las personas</div><div class="kw-sub">Plataformas y dispositivos que usaron para encontrarte</div><div class="plat-grid"><div class="plat-ring"><svg viewBox="0 0 120 120">'+platSegs+'</svg><div class="plat-center"><div class="plat-center-num">'+platTotal.toLocaleString('es-CO')+'</div><div class="plat-center-lbl">vieron tu perfil</div></div></div><div class="plat-legend">'+platLegend+'</div>'+platInsights+'</div></div>';
  }

  var sentPositive=c.sentPositive||0, sentNeutral=c.sentNeutral||0, sentNegative=c.sentNegative||0;

  var startedLabel=c.started?new Date(c.started).toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'}):baselineDate;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${c.name} | Boostraffic</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f5f3;font-family:'Inter',sans-serif;color:#1a1a1a;min-height:100vh}
.topbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);height:52px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:0.5px solid #e5e5e3}
.brand{display:flex;align-items:center;gap:8px}
.brand-dot{width:7px;height:7px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.brand-name{font-size:14px;font-weight:600;color:#1a1a1a}
.brand-name span{color:#1d9e75}
.topbar-r{display:flex;align-items:center;gap:10px}
.back-btn,.logout{font-size:12px;font-weight:500;color:#666;background:none;border:0.5px solid #e5e5e3;border-radius:6px;padding:5px 10px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.back-btn:hover,.logout:hover{border-color:#ccc;color:#1a1a1a}
.main{max-width:960px;margin:0 auto;padding:24px 20px 60px}
.page-hero{margin-bottom:20px;padding-bottom:16px;border-bottom:0.5px solid #e5e5e3;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px}
.page-title{font-size:22px;font-weight:600;color:#1a1a1a}
.page-meta{font-size:12px;color:#888;margin-top:3px}
.page-date{font-size:12px;color:#aaa;text-align:right}
.card{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;margin-bottom:12px}
.card-pad{padding:20px}
.card-title{font-size:14px;font-weight:600;color:#1a1a1a;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between}
.card-subtitle{font-size:11px;color:#aaa;font-weight:400}
.score-grid{display:grid;grid-template-columns:160px 1fr;gap:20px;align-items:center}
.score-ring{position:relative;width:120px;height:120px;margin:0 auto}
.score-ring svg{transform:rotate(-90deg)}
.score-inner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.score-big{font-size:30px;font-weight:600;color:#1a1a1a;line-height:1}
.score-sub{font-size:11px;color:#aaa}
.score-info{display:flex;flex-direction:column;gap:10px}
.score-label{font-size:12px;color:#888;letter-spacing:.03em;text-transform:uppercase;margin-bottom:2px}
.score-delta{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:4px 10px;border-radius:6px;background:#e1f5ee;color:#0f6e56;font-weight:500}
.prog-row{display:flex;flex-direction:column;gap:5px}
.pr-hdr{display:flex;justify-content:space-between;font-size:12px}
.pr-lbl{color:#666}
.pr-val{font-weight:500;color:#1a1a1a}
.pr-bar{height:3px;background:#f0f0ee;border-radius:2px;overflow:hidden}
.pr-fill{height:100%;border-radius:2px;transition:width 1.5s ease}
.section-lbl{font-size:11px;font-weight:600;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin:16px 0 8px;display:flex;align-items:center;gap:8px}
.section-lbl::after{content:'';flex:1;height:0.5px;background:#e5e5e3}
.kpi-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:16px}.kpi-grid.hotel{grid-template-columns:repeat(6,1fr)}
.kpi-card{background:#fff;border:none;border-radius:16px;padding:20px 18px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.05);position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s}
.kpi-card:hover{transform:translateY(-3px);box-shadow:0 6px 24px rgba(0,0,0,.11)}
.kpi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--kc,#1d9e75)}
.kpi-icon{margin-bottom:14px;display:block;line-height:1;color:var(--kc,#1d9e75)}
.kpi-val{font-size:38px;font-weight:700;color:#1a1a1a;line-height:1;margin-bottom:6px;letter-spacing:-1px}
.kpi-lbl{font-size:12px;font-weight:500;color:#555;margin-bottom:0}
.kpi-badge{font-size:11px;padding:2px 7px;border-radius:6px;display:inline-block;margin-bottom:6px}
.kpi-base{font-size:11px;color:#bbb;margin-top:5px}
.kpi-badge.up{background:#e1f5ee;color:#0f6e56}
.kpi-badge.warn{background:#faeeda;color:#854f0b}
.kpi-badge.neu{background:#f5f5f3;color:#888}
.kw-card{background:#fff;border:none;border-radius:16px;padding:22px 24px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.05);margin-bottom:16px}
.kw-title{font-size:15px;font-weight:600;color:#1a1a1a;margin-bottom:4px;display:flex;align-items:center;gap:8px}
.kw-sub{font-size:12px;color:#aaa;margin-bottom:18px}
.kw-row{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:0.5px solid #f4f4f2}
.kw-row:last-child{border:none;padding-bottom:0}
.kw-rank{width:26px;height:26px;border-radius:8px;background:#f2f2f0;color:#aaa;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.kw-rank.top{background:linear-gradient(135deg,#1d9e75,#39c98f);color:#fff;box-shadow:0 2px 6px rgba(29,158,117,.3)}
.kw-body{flex:1;min-width:0}
.kw-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:6px}
.kw-term{font-size:13px;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.kw-term.top{font-weight:600;color:#1a1a1a}
.kw-count{font-size:14px;font-weight:700;color:#1d9e75;flex-shrink:0;font-variant-numeric:tabular-nums}
.kw-count.low{color:#bbb;font-weight:500}
.kw-bar{height:7px;background:#f2f2f0;border-radius:4px;overflow:hidden}
.kw-fill{height:100%;background:linear-gradient(90deg,#1d9e75,#39c98f);border-radius:4px;width:0;transition:width 1.4s cubic-bezier(.22,1,.36,1)}
.kw-fill.low{background:#d8d8d4}
.kw-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start}
.kw-grid .kw-col+.kw-col{border-left:0.5px solid #f0f0ee;padding-left:30px}
@media(max-width:760px){.kw-grid{grid-template-columns:1fr;gap:26px}.kw-grid .kw-col+.kw-col{border-left:none;padding-left:0;border-top:0.5px solid #f0f0ee;padding-top:26px}}
.tag-row{display:flex;align-items:center;gap:11px;padding:11px 0;min-height:29px;border-bottom:0.5px solid #f4f4f2}
.tag-row:last-child{border:none;padding-bottom:0}
.tag-dot{width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,#1d9e75,#39c98f);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 6px rgba(29,158,117,.28)}
.tag-txt{font-size:13px;color:#333;line-height:1.35}
.plat-card{background:#fff;border:none;border-radius:16px;padding:22px 24px;box-shadow:0 1px 3px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.05);margin-bottom:16px}
.plat-grid{display:grid;grid-template-columns:175px minmax(180px,1fr) minmax(210px,1.05fr);gap:30px;align-items:center;margin-top:8px}
@media(max-width:860px){.plat-grid{grid-template-columns:175px 1fr}.plat-insights{grid-column:1/-1;border-top:0.5px solid #f0f0ee;padding-top:18px}}
@media(max-width:680px){.plat-grid{grid-template-columns:1fr;justify-items:center;gap:22px}.plat-insights{grid-column:auto;width:100%;max-width:340px;border-top:none;padding-top:0}}
.plat-insights{display:flex;flex-direction:column;gap:13px;justify-content:center;align-self:center}
.pins-cap{font-size:11px;font-weight:600;color:#aaa;text-transform:uppercase;letter-spacing:.05em}
.pins-hero{background:linear-gradient(135deg,#eafaf3,#f4fbf8);border:0.5px solid #d6f0e4;border-radius:12px;padding:13px 15px}
.pins-hero-num{font-size:23px;font-weight:700;color:#1a1a1a;line-height:1;font-variant-numeric:tabular-nums}
.pins-hero-txt{font-size:12px;color:#555;margin-top:3px;line-height:1.35}
.pins-split-lbl{display:flex;justify-content:space-between;font-size:11px;color:#888;margin-bottom:6px}
.pins-split-lbl b{color:#1a1a1a;font-weight:600}
.pins-bar{display:flex;height:9px;border-radius:5px;overflow:hidden;background:#f2f2f0}
.pins-bar>span{display:block;height:100%}
.plat-ring{position:relative;width:180px;height:180px;flex-shrink:0}
.plat-ring svg{width:180px;height:180px;display:block}
.plat-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none}
.plat-center-num{font-size:27px;font-weight:700;color:#1a1a1a;font-variant-numeric:tabular-nums;line-height:1}
.plat-center-lbl{font-size:10px;color:#aaa;margin-top:4px;max-width:92px;line-height:1.3}
.plat-legend{display:flex;flex-direction:column;gap:13px}
.plat-item{display:flex;gap:11px;align-items:flex-start}
.plat-dot{width:11px;height:11px;border-radius:50%;flex-shrink:0;margin-top:4px}
.plat-val{font-size:14px;font-weight:700;color:#1a1a1a;font-variant-numeric:tabular-nums}
.plat-lbl{font-size:12px;color:#888;margin-top:1px;line-height:1.3}
.table-wrap{overflow-x:auto}
table.comp{width:100%;border-collapse:collapse;font-size:13px}
table.comp th{font-size:11px;color:#aaa;font-weight:500;padding:6px 10px;text-align:center;border-bottom:0.5px solid #e5e5e3;white-space:nowrap}
table.comp th:first-child{text-align:left}
table.comp td{padding:10px;border-bottom:0.5px solid #f0f0ee;vertical-align:middle}
table.comp tr:last-child td{border:none}
table.comp tr.hl td{background:#fafafa}
.td-lbl{font-size:12px;color:#888;text-transform:uppercase;letter-spacing:.03em}
.td-sub{font-size:10px;color:#bbb;margin-top:2px}
.td-b{font-size:13px;color:#bbb;text-align:center}
.td-arr{text-align:center;color:#ddd;font-size:13px}
.td-n{font-size:16px;font-weight:600;color:#1a1a1a;text-align:center}
.td-n small{font-size:10px;font-weight:400;color:#aaa;display:block;margin-top:2px}
.td-diff{text-align:center}
.td-prog{padding:0 8px;min-width:80px}
.bar-t{height:3px;background:#f0f0ee;border-radius:2px;overflow:hidden;margin-top:4px}
.bar-f{height:100%;border-radius:2px;background:#378add;transition:width 1.8s ease}
.ask-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.ask-box{background:#fafafa;border:0.5px solid #e5e5e3;border-radius:8px;padding:12px;text-align:center}
.ask-val{font-size:18px;font-weight:600;color:#1a1a1a;line-height:1;margin-bottom:3px}
.ask-lbl{font-size:11px;color:#888}
.ask-bar-hdr{display:flex;justify-content:space-between;font-size:11px;color:#aaa;margin-bottom:4px}
.ask-bar-t{height:3px;background:#f0f0ee;border-radius:2px;overflow:hidden}
.ask-bar-f{height:100%;background:#378add;border-radius:2px;transition:width 2s ease}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.irow{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:0.5px solid #f0f0ee;font-size:13px}
.irow:last-child{border:none}
.il{color:#888;font-size:12px}
.iv{font-weight:500;color:#1a1a1a}
.iv.g{color:#0f6e56}.iv.a{color:#854f0b}.iv.r{color:#a32d2d}
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.pitem{padding:0 16px;text-align:center}
.pitem:first-child{padding-left:0;text-align:left}
.pitem:last-child{padding-right:0;text-align:right}
.pitem+.pitem{border-left:0.5px solid #e5e5e3}
.pl{font-size:11px;color:#aaa;margin-bottom:5px}
.pv{font-size:20px;font-weight:600;color:#0f6e56}
.pn{font-size:11px;color:#aaa;margin-top:2px}
.foot{text-align:center;padding:20px 0 0;border-top:0.5px solid #e5e5e3;font-size:11px;color:#bbb}
@media(max-width:768px){.score-grid{grid-template-columns:1fr;text-align:center}.score-ring{margin:0 auto}.kpi-grid,.kpi-grid.hotel{grid-template-columns:repeat(2,1fr)}.two-col{grid-template-columns:1fr}.proj-grid{grid-template-columns:1fr}.pitem+.pitem{border-left:none;border-top:0.5px solid #e5e5e3;padding:12px 0 0}.pitem:first-child{text-align:center}.pitem:last-child{text-align:center}.td-prog{display:none}.main{padding:16px 14px 40px}}
</style>
</head>
<body>
<div class="topbar">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
  </div>
  <div class="topbar-r">
    <button class="back-btn" onclick="window.location.href='/'">&#8592; Mis fichas</button>
    <button class="logout" onclick="logout()">Salir</button>
  </div>
</div>
<div class="main">
  <div class="page-hero">
    <div>
      <div class="page-title">${c.name}</div>
      <div class="page-meta">${c.negocio||c.name} &middot; ${c.zona||'Bogotá, Colombia'}</div>
      <div style="font-size:12px;color:#aaa;margin-top:3px">Trabajando contigo desde el ${startedLabel}</div>
    </div>
    <div class="page-date" id="hdate"></div>
  </div>

  <!-- CRECIMIENTO INTERANUAL -->
  ${(c.yoy_impressions_pct!=null||c.yoy_searches_pct!=null||c.yoy_interactions_pct!=null)?`<div class="card card-pad" style="background:#f0faf5;border-color:#b2dece;margin-bottom:12px">
    <div style="font-size:13px;font-weight:600;color:#0f6e56;margin-bottom:10px">&#128200; Crecimiento interanual <span style="font-size:11px;font-weight:400;color:#888">(vs mismo mes año anterior)</span></div>
    ${c.yoy_impressions_pct!=null?`<div style="font-size:22px;font-weight:700;color:#0f6e56;margin-bottom:4px">${c.yoy_impressions_pct>0?'+':''}${c.yoy_impressions_pct}% <span style="font-size:13px;font-weight:400;color:#444">personas que vieron tu perfil</span></div>`:''}
    ${c.yoy_searches_pct!=null?`<div style="font-size:22px;font-weight:700;color:#0f6e56;margin-bottom:4px">${c.yoy_searches_pct>0?'+':''}${c.yoy_searches_pct}% <span style="font-size:13px;font-weight:400;color:#444">búsquedas que te mostraron</span></div>`:''}
    ${c.yoy_interactions_pct!=null?`<div style="font-size:22px;font-weight:700;color:#0f6e56;margin-bottom:0">${c.yoy_interactions_pct>0?'+':''}${c.yoy_interactions_pct}% <span style="font-size:13px;font-weight:400;color:#444">interacciones totales</span></div>`:''}
  </div>`:''}

  <!-- SCORE + PROGRESO -->
  <div class="card card-pad">
    <div class="score-grid">
      <div class="score-ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0ee" stroke-width="8"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#378add" stroke-width="8"
            stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="314" id="scoreCircle"/>
        </svg>
        <div class="score-inner">
          <div class="score-big" id="scoreNum">0</div>
          <div class="score-sub">/100</div>
        </div>
      </div>
      <div class="score-info">
        <div>
          <div class="score-label">Indice de Visibilidad Google</div>
          <div style="font-size:16px;font-weight:600;color:#1a1a1a;margin-bottom:6px" id="scoreTitle">Optimizacion activa</div>
          <div style="font-size:12px;color:#888;margin-bottom:10px" id="scoreBody">Cada intervencion suma autoridad ante Google.</div>
          <div class="score-delta">&#8593; +${score_d} pts desde que empezamos a trabajar juntos</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:4px">
          <div class="prog-row">
            <div class="pr-hdr"><span class="pr-lbl">Autoridad digital</span><span class="pr-val">${score_n}%</span></div>
            <div class="pr-bar"><div class="pr-fill" style="width:0%;background:#378add" id="pb1"></div></div>
          </div>
          <div class="prog-row">
            <div class="pr-hdr"><span class="pr-lbl">Objetivo estrellas (${c.starsTarget||'4.3'})</span><span class="pr-val">${Math.min(100,Math.round((stars_n/parseFloat(c.starsTarget||4.3))*100))}%</span></div>
            <div class="pr-bar"><div class="pr-fill" style="width:0%;background:#1d9e75" id="pb2"></div></div>
          </div>
          <div class="prog-row">
            <div class="pr-hdr"><span class="pr-lbl">Presencia Ask Maps</span><span class="pr-val">${c.askProgress||0}%</span></div>
            <div class="pr-bar"><div class="pr-fill" style="width:0%;background:#ba7517" id="pb3"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ACCIONES DEL MES -->
  <div class="section-lbl">Acciones del mes</div>
  <div class="kpi-grid${c.category_type==='hotel'?' hotel':''}">
    <div class="kpi-card" style="--kc:#1d9e75">
      <div class="kpi-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
      <div class="kpi-val" id="kv1">0</div>
      <div class="kpi-lbl">Llamadas directas</div>
      <div class="kpi-base">${monthLabel}</div>
    </div>
    <div class="kpi-card" style="--kc:#378add">
      <div class="kpi-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
      <div class="kpi-val" id="kv3">0</div>
      <div class="kpi-lbl">Solicitudes de ruta</div>
      <div class="kpi-base">${monthLabel}</div>
    </div>
    <div class="kpi-card" style="--kc:#7c5cbf">
      <div class="kpi-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
      <div class="kpi-val" id="kv4">0</div>
      <div class="kpi-lbl">Visitas web / perfil</div>
      <div class="kpi-base">${monthLabel}</div>
    </div>
    <div class="kpi-card" style="--kc:#25d366">
      <div class="kpi-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></div>
      <div class="kpi-val">${c.waConversations||0}</div>
      <div class="kpi-lbl">Chats WhatsApp</div>
      <div class="kpi-base">${monthLabel}</div>
    </div>
    ${c.category_type==='hotel'?`<div class="kpi-card" style="--kc:#ba7517">
      <div class="kpi-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg></div>
      <div class="kpi-val">${c.bookingClicks||0}</div>
      <div class="kpi-lbl">Clics de Reserva</div>
      <div class="kpi-base">${monthLabel}</div>
    </div>`:''}
  </div>

  <!-- DESCUBRIMIENTO POR PLATAFORMA (donut) -->
  ${platBlock}

  <!-- PALABRAS CLAVE + ETIQUETAS (dos columnas) -->
  ${kwBlock}

  <!-- ASK MAPS -->
  <div class="card card-pad" style="border-color:#b5d4f4">
    <div class="card-title">
      Visibilidad en Ask Maps
      <span style="font-size:11px;padding:3px 8px;border-radius:6px;background:#e6f1fb;color:#185fa5;font-weight:400">Gemini AI 2026 · Activo</span>
    </div>
    <div class="ask-grid">
      <div class="ask-box"><div class="ask-val">${c.askPresence||'0%'}</div><div class="ask-lbl">Presencia IA</div></div>
      <div class="ask-box"><div class="ask-val">${c.askConversations||0}</div><div class="ask-lbl">Conversaciones</div></div>
      <div class="ask-box"><div class="ask-val">${c.askScore||'0/10'}</div><div class="ask-lbl">Score Ask Maps</div></div>
      <div class="ask-box"><div class="ask-val" style="color:#0f6e56">+${c.askProgress||0}%</div><div class="ask-lbl">Proyeccion 30d</div></div>
    </div>
    <div class="ask-bar-hdr"><span>Progreso Ask Maps</span><span>${c.askProgress||0}%</span></div>
    <div class="ask-bar-t"><div class="ask-bar-f" style="width:0%" id="askBar"></div></div>
  </div>

  <!-- REPUTACION + SENTIMIENTO -->
  <div class="two-col">
    <div class="card card-pad">
      <div class="card-title">Reputacion</div>
      <div class="irow"><span class="il">Calificacion actual</span><span class="iv" style="font-size:18px">${stars_n} &#9733;</span></div>
      ${c.totalReviews?'<div class="irow"><span class="il">Total reseñas</span><span class="iv">'+c.totalReviews+'</span></div>':''}
      <div class="irow"><span class="il">Al inicio</span><span class="iv" style="color:#aaa">${stars_b||'—'} &#9733;</span></div>
      <div class="irow"><span class="il">Objetivo</span><span class="iv a">${c.starsTarget||'4.3'} &#9733;</span></div>
      <div class="irow"><span class="il">Ganadas</span><span class="iv ${parseFloat(stars_d)>0?'g':''}">${parseFloat(stars_d)>=0?'+':''}${stars_d} &#9733;</span></div>
    </div>
    <div class="card card-pad">
      <div class="card-title">Sentimiento</div>
      <div class="irow"><span class="il">Positivas</span><span class="iv g">${sentPositive}%</span></div>
      <div class="irow"><span class="il">Neutras</span><span class="iv">${sentNeutral}%</span></div>
      <div class="irow"><span class="il">Negativas</span><span class="iv r">${sentNegative}%</span></div>
      <div class="irow"><span class="il">Protocolo</span><span class="iv g">Activo</span></div>
    </div>
  </div>

  <!-- ACTIVIDAD -->
  <div class="card card-pad">
    <div class="card-title">Actividad del servicio</div>
    ${actionsHTML}
  </div>

  <!-- PROYECCION -->
  ${projBlock}

  <div class="foot">boostraffic.com &nbsp;&middot;&nbsp; Sistema de Inteligencia Local &nbsp;&middot;&nbsp; Mayo 2026</div>
</div>
<script>
var score=${JSON.stringify(score_n)},dir=${JSON.stringify(dir_n)},calls=${JSON.stringify(calls_n)},web=${JSON.stringify(web_n)},askProg=${JSON.stringify(c.askProgress||0)};
document.getElementById('hdate').textContent=new Date().toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'})+' · '+new Date().toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});
setTimeout(function(){
  var circ=document.getElementById('scoreCircle');
  if(circ){circ.style.transition='stroke-dashoffset 2s ease';circ.style.strokeDashoffset=314-(score/100)*314;}
  var n=document.getElementById('scoreNum');
  if(n){var c=0,t=setInterval(function(){c++;n.textContent=c;if(c>=score)clearInterval(t)},50)}
  var title=score<30?'Fase inicial de optimizacion':score<50?'Autoridad en construccion activa':'Visibilidad consolidandose';
  var body=score<30?'Tu perfil recibe las primeras intervenciones de autoridad.':score<50?'Progreso significativo. Las optimizaciones se indexan en Google.':'Perfil con autoridad consolidada.';
  var et=document.getElementById('scoreTitle');var eb=document.getElementById('scoreBody');
  if(et)et.textContent=title;if(eb)eb.textContent=body;
  var bars=[[document.getElementById('pb1'),score],[document.getElementById('pb2'),Math.min(100,Math.round((${JSON.stringify(stars_n)}/parseFloat('${c.starsTarget||4.3}'))*100))],[document.getElementById('pb3'),askProg]];
  bars.forEach(function(b){if(b[0]){b[0].style.transition='width 1.5s ease';b[0].style.width=b[1]+'%'}});
  function animNum(id,target){var el=document.getElementById(id);if(!el)return;var s=null,dur=1400;function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/dur,1);el.textContent=Math.round(p*target).toLocaleString('es-CO');if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
  animNum('kv1',calls);animNum('kv3',dir);animNum('kv4',web);
  var ab=document.getElementById('askBar');if(ab){ab.style.transition='width 2s ease';ab.style.width=askProg+'%';}
  document.querySelectorAll('.kw-fill').forEach(function(el,i){setTimeout(function(){el.style.width=el.dataset.w||'0%'},80*i)});
},350);
async function logout(){await fetch('/logout',{method:'POST'});location.href='/'}
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body>
</html>`;
}

// ═══════════════════════════════════════════════════
// ADMIN CSS
// ═══════════════════════════════════════════════════
const ADMIN_CSS = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Boostraffic Admin</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#f5f5f3;font-family:'Inter',sans-serif;color:#1a1a1a;min-height:100vh;overflow-x:hidden}
.topbar{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);height:52px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:0.5px solid #e5e5e3}
.brand{display:flex;align-items:center;gap:8px}
.brand-dot{width:7px;height:7px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.brand-name{font-size:14px;font-weight:600;color:#1a1a1a}
.brand-name span{color:#1d9e75}
.admin-tag{font-size:10px;font-weight:500;color:#aaa;background:#f0f0ee;border-radius:4px;padding:2px 7px;margin-left:4px}
.topbar-r{display:flex;align-items:center;gap:8px}
.btnsm{font-size:12px;font-weight:500;color:#666;background:none;border:0.5px solid #e5e5e3;border-radius:6px;padding:5px 10px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.btnsm:hover{border-color:#ccc;color:#1a1a1a}
.btnsm.primary{background:#1d9e75;color:#fff;border-color:#1d9e75}
.btnsm.primary:hover{background:#0f6e56;border-color:#0f6e56}
.main{max-width:1200px;margin:0 auto;padding:32px 24px 80px}
.ptitle{font-size:28px;font-weight:600;color:#1a1a1a;margin-bottom:4px}
.psub{font-size:12px;color:#888;margin-bottom:28px}
.sec-title{font-size:11px;font-weight:600;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:10px}
.sec-title::after{content:'';flex:1;height:0.5px;background:#e5e5e3}
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;margin-bottom:28px}
.cc{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:20px;cursor:pointer;transition:all .25s}
.cc:hover{border-color:#b2dece;transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.07)}
.cc-h{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.cc-name{font-size:16px;font-weight:600;color:#1a1a1a}
.cc-key{font-size:11px;color:#aaa;margin-top:2px}
.cc-sv{font-size:26px;font-weight:600;color:#1d9e75;text-align:right;line-height:1}
.cc-sl{font-size:10px;color:#aaa;text-align:right}
.cc-fichas{font-size:12px;color:#888;margin-bottom:10px}
.cc-m{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px}
.cc-mi{background:#f5f5f3;border-radius:6px;padding:7px;text-align:center}
.cc-mv{font-size:13px;font-weight:500;color:#1a1a1a;line-height:1}
.cc-ml{font-size:10px;color:#aaa;margin-top:2px}
.cc-f{display:flex;justify-content:space-between;align-items:center}
.cc-stars{font-size:11px;color:#d4a017}
.cc-badge{font-size:11px;padding:2px 8px;border-radius:6px;background:#f5f5f3;color:#888}
.cc-badge.up{background:#e1f5ee;color:#0f6e56}
.cc-badge.warn{background:#faeeda;color:#854f0b}
.cc-date{font-size:11px;color:#aaa}
.dp-inner{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:24px;margin-bottom:16px}
.dp-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;flex-wrap:wrap;gap:12px}
.dp-name{font-size:20px;font-weight:600;color:#1a1a1a}
.dp-meta{font-size:12px;color:#888;margin-top:4px}
.dp-btns{display:flex;gap:8px;flex-wrap:wrap}
.abtn{font-size:12px;font-weight:500;padding:7px 12px;border-radius:6px;border:0.5px solid;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;background:none}
.abtn.blue{border-color:#b5d4f4;color:#185fa5}.abtn.blue:hover{background:#e6f1fb}
.abtn.green{border-color:#b2dece;color:#0f6e56}.abtn.green:hover{background:#e1f5ee}
.abtn.gold{border-color:#e8d4a0;color:#854f0b}.abtn.gold:hover{background:#faeeda}
.abtn.red{border-color:#f5c0c0;color:#a32d2d}.abtn.red:hover{background:#fcebeb}
.abtn:disabled{opacity:.4;cursor:not-allowed}
.mrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px}
.mbox{background:#fff;border:0.5px solid #e5e5e3;border-radius:8px;padding:14px;position:relative;overflow:hidden}
.mbox::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--mc)}
.mbl{font-size:11px;font-weight:500;color:#aaa;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
.mbv{font-size:22px;font-weight:600;color:#1a1a1a;line-height:1}
.mbb{font-size:11px;color:#aaa;margin-top:3px}
.mbd{font-size:11px;margin-top:2px;font-weight:500}.mbd.up{color:#0f6e56}.mbd.dn{color:#a32d2d}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.ibox{background:#fff;border:0.5px solid #e5e5e3;border-radius:10px;padding:16px}
.irow{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:0.5px solid #f0f0ee}
.irow:last-child{border:none}
.ilbl{font-size:12px;color:#888}
.ival{font-size:13px;font-weight:500;color:#1a1a1a}
.ival.blue{color:#185fa5}.ival.gold{color:#854f0b}.ival.green{color:#0f6e56}.ival.muted{color:#aaa}
.alog{margin-bottom:20px}
.arow{display:flex;align-items:flex-start;gap:10px;padding:11px 0;border-bottom:0.5px solid #f0f0ee}
.arow:last-child{border:none}
.adot{width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:4px}
.adot.done{background:#1d9e75}.adot.prog{background:#d4a017}.adot.plan{background:#ccc}
.acont{flex:1}
.atitle{font-size:13px;color:#333;margin-bottom:3px}
.adetail{font-size:11px;color:#185fa5;line-height:1.6;margin-top:4px;padding:6px 10px;background:#e6f1fb;border-radius:6px;border-left:2px solid #b5d4f4}
.aright{text-align:right;flex-shrink:0}
.atag{font-size:11px;padding:2px 8px;border-radius:6px}
.atag.done{background:#e1f5ee;color:#0f6e56}.atag.prog{background:#faeeda;color:#854f0b}.atag.plan{background:#f5f5f3;color:#888}
.adate{font-size:11px;color:#aaa;margin-top:3px}
.kvsec{background:#fff;border:0.5px solid #e5e5e3;border-radius:10px;padding:20px;margin-bottom:12px}
.kvsec.green-sec{border-color:#b2dece;background:#f7fbf9}
.kvtitle{font-size:12px;font-weight:600;color:#1d9e75;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
.kvtitle.green{color:#0f6e56}
.kvsub{font-size:11px;font-weight:600;color:#aaa;letter-spacing:.06em;text-transform:uppercase;margin:14px 0 8px;padding-top:12px;border-top:0.5px solid #f0f0ee}
.irow-inp{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
.irow-inp>div{display:flex;flex-direction:column;gap:4px}
.inpl{font-size:11px;font-weight:500;color:#888}
.inp{background:#fff;border:0.5px solid #e5e5e3;border-radius:6px;padding:8px 10px;font-family:'Inter',sans-serif;font-size:12px;color:#1a1a1a;outline:none;transition:border-color .2s;width:90px}
.inp.full{width:100%}
.inp:focus{border-color:#1d9e75;box-shadow:0 0 0 2px rgba(29,158,117,.08)}
.inp::placeholder{color:#ccc}
select.inp{width:160px;cursor:pointer}
textarea.inp{resize:vertical}
.savebtn{background:#1d9e75;border:none;border-radius:6px;padding:9px 18px;font-family:'Inter',sans-serif;font-size:12px;font-weight:600;color:#fff;cursor:pointer;transition:all .2s;margin-top:4px}
.savebtn:hover{background:#0f6e56;transform:translateY(-1px)}
.savebtn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.add-form{background:#fff;border:0.5px solid #e5e5e3;border-radius:10px;padding:20px;margin-bottom:20px;display:none}
.add-form.show{display:block}
.toast{position:fixed;bottom:24px;right:24px;z-index:1000;font-size:12px;color:#fff;opacity:0;transform:translateY(12px);transition:all .35s;pointer-events:none;border-radius:8px;padding:12px 20px;min-width:220px;text-align:center}
.toast.show{opacity:1;transform:translateY(0)}.toast.ok{background:#1d9e75}.toast.error{background:#a32d2d}.toast.info{background:#185fa5}
.ldot{width:7px;height:7px;border-radius:50%;background:#1d9e75;animation:pulse 2s infinite;display:inline-block;margin-right:6px}
@media(max-width:900px){.mrow{grid-template-columns:1fr 1fr}.two-col{grid-template-columns:1fr}.cc-m{grid-template-columns:repeat(2,1fr)}.main{padding:20px 16px 60px}.irow-inp{flex-direction:column}.inp{width:100%!important}}
</style>`;

const ADMIN_BODY_TOP = `<body>
<div class="topbar">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
    <span class="admin-tag">Admin</span>
  </div>
  <div class="topbar-r">
    <span style="font-size:12px;color:#aaa">Panel maestro</span>
    <button class="btnsm primary" onclick="document.getElementById('addAccountForm').classList.toggle('show')">+ Cuenta</button>
    <button class="btnsm" onclick="logout()">Salir</button>
  </div>
</div>
<div class="main">
<div class="ptitle">Centro de Control</div>
<div class="psub">Todas las cuentas y fichas &middot; Solo visible para ti</div>

<div class="add-form" id="addAccountForm">
  <div class="sec-title">Nueva cuenta de cliente</div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
    <div><div class="inpl">Nombre de la cuenta</div><input class="inp" style="width:200px" id="na-name" placeholder="Hotel HTL"></div>
    <div><div class="inpl">Clave de acceso</div><input class="inp" style="width:120px" id="na-key" placeholder="HTL2026"></div>
    <div><div class="inpl">Subdominio</div><input class="inp" style="width:120px" id="na-sub" placeholder="htl"></div>
  </div>
  <div style="display:flex;gap:8px">
    <button class="savebtn" id="createAccountBtn" onclick="createAccount()">Crear cuenta</button>
    <button class="btnsm" onclick="document.getElementById('addAccountForm').classList.remove('show')">Cancelar</button>
  </div>
</div>

<div class="sec-title">Cuentas activas</div>
<div class="cgrid">`;

const ADMIN_BODY_BOT = `</div></div>
<div class="toast" id="toast"></div>
<script>
function showToast(msg,type){var t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+(type||'ok');clearTimeout(window._tt);window._tt=setTimeout(function(){t.className='toast'},3500)}
function setBtn(id,loading,original){var b=document.getElementById(id);if(!b)return;b.disabled=loading;b.textContent=loading?'Guardando...':original}
async function createAccount(){
  var name=document.getElementById('na-name').value.trim();
  var key=document.getElementById('na-key').value.trim().toUpperCase();
  var sub=document.getElementById('na-sub').value.trim().toLowerCase();
  if(!name||!key) return showToast('Nombre y clave requeridos','error');
  setBtn('createAccountBtn',true);showToast('Creando cuenta...','info');
  var payload={name:name,key:key,subdomain:sub||key.toLowerCase(),fichas:[],created:Date.now()};
  var res=await fetch('/api/account/'+key+'/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(res.ok){showToast('Cuenta '+name+' creada','ok');setBtn('createAccountBtn',false,'Crear cuenta');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error creando cuenta','error');setBtn('createAccountBtn',false,'Crear cuenta')}
}
async function logout(){showToast('Cerrando sesion...','info');await fetch('/logout',{method:'POST'});setTimeout(function(){location.href='/'},800)}
function scrollToUpdate(){var el=document.getElementById('updateSection');if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}
function scrollToAction(){var el=document.getElementById('actionSection');if(el){el.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(function(){var i=document.getElementById('a-pub');if(i)i.focus()},500)}}
</script><script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body></html>`;

function buildAdminAccounts(accounts) {
  if(!accounts||!accounts.length){
    return '<div style="color:#aaa;font-size:13px;padding:24px;grid-column:1/-1">No hay cuentas aun. Crea la primera con + Cuenta.</div>';
  }
  var html='';
  for(var i=0;i<accounts.length;i++){
    var a=accounts[i];
    var fichasCount=a.fichas?a.fichas.length:0;
    html+='<div class="cc" onclick="window.location.href=\'/detail-account/'+a.key+'\'">';
    html+='<div class="cc-h"><div><div class="cc-name">'+a.name+'</div><div class="cc-key">Clave: '+a.key+' &middot; '+a.subdomain+'.boostraffic.com</div></div>';
    html+='<div><div class="cc-sv">'+fichasCount+'</div><div class="cc-sl">Fichas</div></div></div>';
    html+='<div class="cc-fichas">'+fichasCount+' ficha'+(fichasCount!==1?'s':'')+' activa'+(fichasCount!==1?'s':'')+' en esta cuenta</div>';
    html+='<div class="cc-f"><span class="cc-date">Creada: '+(a.created?new Date(a.created).toLocaleDateString('es-CO'):'-')+'</span>';
    html+='<span class="cc-badge up">Activa</span></div></div>';
  }
  return html;
}

function buildAccountDetail(account, fichas) {
  var fichasHTML='';
  for(var i=0;i<fichas.length;i++){
    var f=fichas[i];
    var diff=(f.score||0)-(f.baseline_score||0);
    fichasHTML+='<div class="cc" onclick="window.location.href=\'/detail-ficha/'+f.id+'\'">';
    fichasHTML+='<div class="cc-h"><div><div class="cc-name">'+f.name+'</div><div class="cc-key">'+(f.category||'Negocio')+'</div></div>';
    fichasHTML+='<div><div class="cc-sv">'+(f.score||0)+'</div><div class="cc-sl">Score</div></div></div>';
    fichasHTML+='<div class="cc-m">';
    fichasHTML+='<div class="cc-mi"><div class="cc-mv">'+((f.impressions||0).toLocaleString('es-CO'))+'</div><div class="cc-ml">Impr.</div></div>';
    fichasHTML+='<div class="cc-mi"><div class="cc-mv">'+(f.directions||0)+'</div><div class="cc-ml">Rutas</div></div>';
    fichasHTML+='<div class="cc-mi"><div class="cc-mv">'+(f.calls||0)+'</div><div class="cc-ml">Calls</div></div>';
    fichasHTML+='<div class="cc-mi"><div class="cc-mv">'+(f.stars||0)+'</div><div class="cc-ml">★</div></div></div>';
    fichasHTML+='<div class="cc-f"><span class="cc-date">'+(f.updated?new Date(f.updated).toLocaleDateString('es-CO'):'-')+'</span>';
    fichasHTML+='<span class="cc-badge '+(diff>0?'up':'warn')+'">'+(diff>0?'+'+diff+' pts':'Sin cambios')+'</span></div></div>';
  }

  return ADMIN_CSS +
    `<body>
<div class="topbar">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
    <span class="admin-tag">Admin</span>
  </div>
  <div class="topbar-r">
    <button class="btnsm" onclick="window.location.href='/'">&#8592; Todas las cuentas</button>
    <button class="btnsm" onclick="logout()">Salir</button>
  </div>
</div>
<div class="main">
<div class="ptitle">${account.name}</div>
<div class="psub">Clave: ${account.key} &middot; ${account.subdomain||account.key.toLowerCase()}.boostraffic.com</div>
<div class="add-form show" id="addFichaForm" style="display:block">
  <div class="sec-title">Agregar nueva ficha</div>
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
    <div><div class="inpl">Nombre de la ficha</div><input class="inp" style="width:220px" id="nf-name" placeholder="Hotel HTL Norte"></div>
    <div><div class="inpl">Categoria</div><input class="inp" style="width:140px" id="nf-cat" placeholder="Hotel"></div>
    <div><div class="inpl">Objetivo estrellas</div><input class="inp" style="width:100px" id="nf-stars" placeholder="4.3"></div>
  </div>
  <button class="savebtn" id="createFichaBtn" onclick="createFicha('${account.key}')">Crear ficha</button>
</div>
<div class="sec-title">Fichas de esta cuenta</div>
<div class="cgrid">${fichasHTML||'<div style="color:#aaa;font-size:13px;padding:24px;grid-column:1/-1">No hay fichas aun.</div>'}</div>
</div>
<div class="toast" id="toast"></div>
<script>
function showToast(msg,type){var t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+(type||'ok');clearTimeout(window._tt);window._tt=setTimeout(function(){t.className='toast'},3500)}
function setBtn(id,loading,original){var b=document.getElementById(id);if(!b)return;b.disabled=loading;b.textContent=loading?'Guardando...':original}
async function createFicha(accountKey){
  var name=document.getElementById('nf-name').value.trim();
  var cat=document.getElementById('nf-cat').value.trim();
  var stars=document.getElementById('nf-stars').value.trim();
  if(!name) return showToast('Nombre de ficha requerido','error');
  var fichaId=accountKey+'-'+Date.now();
  var payload={id:fichaId,accountKey:accountKey,name:name,category:cat||'Negocio',starsTarget:stars||'4.3',score:0,impressions:0,directions:0,calls:0,web:0,stars:0,askPresence:'0%',askConversations:0,askScore:'0/10',askProgress:0,sentPositive:0,sentNeutral:0,sentNegative:0,started:Date.now(),updated:Date.now(),actions:[],actions_pro:[]};
  setBtn('createFichaBtn',true);showToast('Creando ficha...','info');
  var res=await fetch('/api/ficha/'+fichaId+'/create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(res.ok){showToast('Ficha '+name+' creada','ok');setBtn('createFichaBtn',false,'Crear ficha');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error creando ficha','error');setBtn('createFichaBtn',false,'Crear ficha')}
}
async function logout(){await fetch('/logout',{method:'POST'});location.href='/'}
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body></html>`;
}

// ═══════════════════════════════════════════════════
// ADMIN DETALLE FICHA — con Ask Maps en formulario
// ═══════════════════════════════════════════════════
function buildFichaDetailAdmin(ficha, accountKey) {
  var actions=ficha.actions_pro||[];
  var actHTML='';
  if(!actions.length){actHTML='<div style="color:#aaa;font-size:13px;padding:20px 0">No hay acciones registradas aun.</div>'}
  else{
    var rev=actions.slice().reverse();
    for(var i=0;i<rev.length;i++){
      var a=rev[i];
      var dc=a.status==='done'?'done':a.status==='prog'?'prog':'plan';
      var tt=a.status==='done'?'Completado':a.status==='prog'?'En curso':'Planificado';
      actHTML+='<div class="arow"><div class="adot '+dc+'"></div><div class="acont"><div class="atitle">'+(a.public||a.text||'')+'</div>';
      if(a.private)actHTML+='<div class="adetail">&#128274; '+a.private+'</div>';
      actHTML+='</div><div class="aright"><div class="atag '+dc+'">'+tt+'</div><div class="adate">'+(a.date||'-')+'</div></div></div>';
    }
  }
  var mDefs=[
    {label:'Score',cur:ficha.score||0,base:ficha.baseline_score,color:'rgba(26,86,255,0.6)'},
    {label:'Impresiones',cur:(ficha.impressions||0).toLocaleString('es-CO'),base:ficha.baseline_impressions?(ficha.baseline_impressions).toLocaleString('es-CO'):0,color:'rgba(201,168,76,0.6)'},
    {label:'Rutas',cur:ficha.directions||0,base:ficha.baseline_directions||0,color:'rgba(0,168,107,0.6)'},
    {label:'Llamadas',cur:ficha.calls||0,base:ficha.baseline_calls||0,color:'rgba(180,80,200,0.6)'},
    {label:'Web',cur:ficha.web||0,base:ficha.baseline_web||0,color:'rgba(255,100,100,0.6)'},
    {label:'Estrellas',cur:ficha.stars||0,base:ficha.baseline_stars||0,color:'rgba(201,168,76,0.6)'},
    {label:'Ask Score',cur:ficha.askScore||'0/10',base:'0/10',color:'rgba(26,86,255,0.8)'},
    {label:'Presencia IA',cur:ficha.askPresence||'0%',base:'0%',color:'rgba(26,86,255,0.5)'},
  ];
  var mHTML='';
  for(var i=0;i<mDefs.length;i++){
    var m=mDefs[i];
    var diff=parseFloat(m.cur)-parseFloat(m.base||0);
    var dc=diff>0?'up':diff<0?'dn':'';
    var dt=diff>0?'&#8593; +'+diff.toFixed(1):diff<0?'&#8595; '+diff.toFixed(1):'';
    mHTML+='<div class="mbox" style="--mc:'+m.color+'"><div class="mbl">'+m.label+'</div><div class="mbv">'+m.cur+'</div><div class="mbb">Base: '+(m.base!==undefined&&m.base!==null?m.base:'-')+'</div>'+(dt?'<div class="mbd '+dc+'">'+dt+'</div>':'')+'</div>';
  }

  return ADMIN_CSS +
    `<body>
<div class="topbar">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span></div>
    <span class="admin-tag">Admin</span>
  </div>
  <div class="topbar-r">
    <button class="btnsm" onclick="window.location.href='/detail-account/${accountKey}'">&#8592; Fichas</button>
    <button class="btnsm" onclick="logout()">Salir</button>
  </div>
</div>
<div class="main">
<div class="dp-inner">
  <div class="dp-header">
    <div><div class="dp-name">${ficha.name}</div><div class="dp-meta">${ficha.category||'Negocio'} &middot; ID: ${ficha.id} &middot; Inicio: ${ficha.started?new Date(ficha.started).toLocaleDateString('es-CO'):'-'}${ficha.baseline_date?' &middot; Baseline: '+new Date(ficha.baseline_date).toLocaleDateString('es-CO'):' &middot; Baseline: pendiente'}</div></div>
    <div class="dp-btns">
      <button class="abtn green" onclick="saveBaseline()">&#11042; Congelar Baseline</button>
      <button class="abtn blue" onclick="scrollToUpdate()">&#8593; Actualizar metricas</button>
      <button class="abtn gold" onclick="scrollToAction()">+ Accion</button>
      <button class="abtn" style="background:#f5f5f3;color:#444;border:0.5px solid #ddd" onclick="scrollToDailyLog()">&#128197; Registro diario</button>
      <button class="abtn" style="background:#fcebeb;color:#a32d2d;border:0.5px solid #f5c6c6" onclick="closeMonth()">&#8635; Cerrar mes</button>
      <button class="abtn" style="background:#f5f5f3;color:#444;border:0.5px solid #ddd" onclick="scrollToDailyLog()">&#128197; Registro diario</button>
      <button class="abtn" style="background:#fcebeb;color:#a32d2d;border:0.5px solid #f5c6c6" onclick="closeMonth()">&#8635; Cerrar mes</button>
    </div>
  </div>

  <div class="sec-title">Metricas actuales vs baseline</div>
  <div class="mrow">${mHTML}</div>

  <div class="two-col">
    <div><div class="sec-title">Ask Maps</div><div class="ibox">
      <div class="irow"><span class="ilbl">Presencia IA</span><span class="ival blue">${ficha.askPresence||'0%'}</span></div>
      <div class="irow"><span class="ilbl">Conversaciones</span><span class="ival">${ficha.askConversations||0}</span></div>
      <div class="irow"><span class="ilbl">Score Ask Maps</span><span class="ival blue">${ficha.askScore||'0/10'}</span></div>
      <div class="irow"><span class="ilbl">Proyeccion 30d</span><span class="ival green">${ficha.askProgress||0}%</span></div>
    </div></div>
    <div><div class="sec-title">Reputacion</div><div class="ibox">
      <div class="irow"><span class="ilbl">Calificacion actual</span><span class="ival">${ficha.stars||'-'} &#9733;</span></div>
      <div class="irow"><span class="ilbl">Baseline</span><span class="ival muted">${ficha.baseline_stars||'-'} &#9733;</span></div>
      <div class="irow"><span class="ilbl">Objetivo</span><span class="ival gold">${ficha.starsTarget||'4.3'} &#9733;</span></div>
      <div class="irow"><span class="ilbl">Sentimiento +</span><span class="ival green">${ficha.sentPositive||0}%</span></div>
    </div></div>
  </div>

  <div class="sec-title">Registro completo de acciones</div>
  <div class="alog">${actHTML}</div>

  <!-- GOOGLE PLACES SYNC -->
  <div class="kvsec" style="border-color:#4285f4;background:#f8faff" id="placesSection">
    <div class="kvtitle" style="color:#4285f4">Google Places — Sincronizacion automatica</div>
    <div style="font-size:12px;color:#888;margin-bottom:12px">Ingresa la consulta de busqueda del negocio para sincronizar rating y resenas desde Google automaticamente.</div>
    <div class="irow-inp" style="margin-bottom:14px">
      <div style="flex:1">
        <div class="inpl">Consulta de busqueda (como aparece en Google Maps)</div>
        <input class="inp full" id="u-places-query" value="${ficha.places_query||''}" placeholder="Nombre del negocio Direccion Ciudad" style="width:100%;max-width:480px">
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <button class="abtn blue" id="syncPlacesBtn" onclick="syncPlaces()">&#8635; Sincronizar con Google</button>
      <span style="font-size:11px;color:#aaa">${ficha.placesLastSync?'Ultima sync: '+new Date(ficha.placesLastSync).toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'}):'Sin sincronizar aun'}</span>
    </div>
    ${ficha.totalReviews?'<div style="font-size:11px;color:#4285f4;margin-top:8px">Resenas en Google: '+ficha.totalReviews+' · Rating: '+(ficha.stars||'-')+' ★</div>':''}
    ${ficha.placeId?'<div style="font-size:10px;color:#aaa;margin-top:4px">Place ID: '+ficha.placeId+'</div>':''}
  </div>

  <!-- FORMULARIO ACTUALIZAR METRICAS + ASK MAPS + REPUTACION -->
  <div class="kvsec" id="updateSection">
    <div class="kvtitle">Actualizar metricas</div>

    <div class="kvsub" style="border:none;margin-top:0;padding-top:0;color:rgba(26,86,255,.5)">Metricas Google Maps</div>
    <div class="irow-inp">
      <div><div class="inpl">Impr. nuevas</div><input class="inp" id="u-impr-new" placeholder="${ficha.impressions_new||0}" title="Impresiones acumuladas DESDE el inicio"></div>
      <div><div class="inpl">Rutas</div><input class="inp" id="u-dir" placeholder="${ficha.directions||0}"></div>
      <div><div class="inpl">Llamadas</div><input class="inp" id="u-calls" placeholder="${ficha.calls||0}"></div>
      <div><div class="inpl">Web</div><input class="inp" id="u-web" placeholder="${ficha.web||0}"></div>
      <div><div class="inpl">WhatsApp chats</div><input class="inp" id="u-wa" placeholder="${ficha.waConversations||0}"></div>
      <div><div class="inpl">Dias baseline</div><input class="inp" id="u-basedays" placeholder="${ficha.baseline_period_days||28}" title="Dias que cubrió el dato inicial (default 28)"></div>
      <div><div class="inpl">Estrellas</div><input class="inp" id="u-stars" placeholder="${ficha.stars||0}"></div>
      <div><div class="inpl">Score</div><input class="inp" id="u-score" placeholder="${ficha.score||0}"></div>
    </div>

    <div class="kvsub">Ask Maps</div>
    <div class="irow-inp">
      <div><div class="inpl">Presencia IA (%)</div><input class="inp" id="u-askpresence" placeholder="${ficha.askPresence||'0%'}"></div>
      <div><div class="inpl">Conversaciones</div><input class="inp" id="u-askconv" placeholder="${ficha.askConversations||0}"></div>
      <div><div class="inpl">Score Ask (0/10)</div><input class="inp" id="u-askscore" placeholder="${ficha.askScore||'0/10'}"></div>
      <div><div class="inpl">Proyeccion 30d (%)</div><input class="inp" id="u-askprog" placeholder="${ficha.askProgress||0}"></div>
    </div>

    <div class="kvsub">Proyeccion proximos 30 dias</div>
    <div class="irow-inp">
      <div><div class="inpl">Score estimado</div><input class="inp" id="u-projscore" placeholder="${ficha.projScore||'—'}"></div>
      <div><div class="inpl">Calificacion estimada</div><input class="inp" id="u-projstars" placeholder="${ficha.projStars||'—'}"></div>
      <div><div class="inpl">Presencia Ask Maps estimada</div><input class="inp" id="u-projask" placeholder="${ficha.projAsk||'—'}"></div>
    </div>

    <div class="kvsub">Sentimiento de resenas</div>
    <div class="irow-inp">
      <div><div class="inpl">Positivas (%)</div><input class="inp" id="u-sentpos" placeholder="${ficha.sentPositive||0}"></div>
      <div><div class="inpl">Neutras (%)</div><input class="inp" id="u-sentneu" placeholder="${ficha.sentNeutral||0}"></div>
      <div><div class="inpl">Negativas (%)</div><input class="inp" id="u-sentneg" placeholder="${ficha.sentNegative||0}"></div>
    </div>

    <button class="savebtn" id="metricsBtn" onclick="saveMetrics()">GUARDAR TODAS LAS METRICAS</button>
  </div>

  <!-- REGISTRO DIARIO -->
  <div class="kvsec" id="dailyLogSection">
    <div class="kvtitle">Registro diario</div>
    <div style="font-size:12px;color:#888;margin-bottom:12px">Ingresa los datos de un día específico. Se acumula día por día para mostrar la tabla en el dashboard del cliente.</div>
    <div class="irow-inp">
      <div><div class="inpl">Fecha (YYYY-MM-DD)</div><input class="inp" id="dl-date" placeholder="${new Date().toISOString().slice(0,10)}"></div>
      <div><div class="inpl">Rutas</div><input class="inp" id="dl-rutas" placeholder="0"></div>
      <div><div class="inpl">Llamadas</div><input class="inp" id="dl-llamadas" placeholder="0"></div>
      <div><div class="inpl">Impresiones</div><input class="inp" id="dl-impresiones" placeholder="0"></div>
    </div>
    <button class="savebtn" id="dailyBtn" onclick="saveDailyLog()">GUARDAR DÍA</button>
  </div>

  <!-- PALABRAS CLAVE -->
  <div class="kvsec" id="keywordsSection">
    <div class="kvtitle">Palabras clave (búsquedas Google)</div>
    <div style="font-size:12px;color:#888;margin-bottom:12px">Copia y pega directo de Google Business Profile (&laquo;Cómo encuentran tu empresa&raquo;). Acepta el formato de dos líneas (término, luego número) o &laquo;término 1964&raquo; por línea. Las que digan &laquo;&lt; 15&raquo; se respetan. Editar y guardar reemplaza la lista completa.</div>
    <textarea class="inp full" id="kw-input" placeholder="toyo&#10;1,964&#10;toyota&#10;210&#10;accesorios toyota&#10;&lt; 15" style="height:160px;resize:vertical;margin-bottom:12px;font-family:monospace;font-size:12px">${(ficha.keywords||[]).map(function(k){return (k.term+' '+k.count).replace(/</g,'&lt;').replace(/>/g,'&gt;')}).join('\n')}</textarea>
    <button class="savebtn" id="kwBtn" onclick="saveKeywords()">GUARDAR PALABRAS CLAVE</button>
  </div>

  <!-- ETIQUETAS / PALABRAS CLAVE OBJETIVO -->
  <div class="kvsec" id="tagsSection">
    <div class="kvtitle">Etiquetas (palabras clave que estamos posicionando)</div>
    <div style="font-size:12px;color:#888;margin-bottom:12px">Una etiqueta por línea. Son las palabras clave objetivo que el cliente ve en la columna &laquo;Palabras clave que estamos posicionando&raquo; (al lado de las búsquedas reales). Guardar reemplaza la lista completa; guardar vacío la borra.</div>
    <textarea class="inp full" id="tag-input" placeholder="Rines de Lujo para Toyota, repuestos&#10;Llantas Todoterreno para Toyota&#10;Accesorios 4x4 para Toyota" style="height:160px;resize:vertical;margin-bottom:12px;font-family:monospace;font-size:12px">${(ficha.tags||[]).join('\n')}</textarea>
    <button class="savebtn" id="tagBtn" onclick="saveTags()">GUARDAR ETIQUETAS</button>
  </div>

  <!-- DESCUBRIMIENTO POR PLATAFORMA -->
  <div class="kvsec" id="platSection">
    <div class="kvtitle">Cómo descubrieron tu empresa (plataforma / dispositivo)</div>
    <div style="font-size:12px;color:#888;margin-bottom:12px">Copia y pega directo de GBP (&laquo;Cómo descubrieron tu empresa las personas&raquo; &rarr; &laquo;Desglose por plataforma y dispositivo&raquo;). Acepta el pegado crudo (la línea &laquo;4,445&middot;62%&raquo; y debajo la plataforma) o &laquo;Plataforma | 4445&raquo; por línea. El total y los porcentajes se calculan solos. Guardar vacío borra la sección.</div>
    <textarea class="inp full" id="plat-input" placeholder="4,445&middot;62%&#10;Búsqueda de Google – dispositivos móviles&#10;1,337&middot;19%&#10;Búsqueda de Google – computadoras de escritorio" style="height:150px;resize:vertical;margin-bottom:12px;font-family:monospace;font-size:12px">${(ficha.platforms||[]).map(function(p){return p.label+' | '+p.count}).join('\n')}</textarea>
    <button class="savebtn" id="platBtn" onclick="savePlatforms()">GUARDAR PLATAFORMAS</button>
  </div>

  <!-- FORMULARIO AGREGAR ACCION -->
  <div class="kvsec" id="actionSection">
    <div class="kvtitle">Agregar accion al registro</div>
    <div class="inpl" style="margin-bottom:6px">Descripcion publica (el cliente ve esto)</div>
    <input class="inp full" id="a-pub" placeholder="Optimizacion de autoridad digital ejecutada" style="margin-bottom:12px">
    <div class="inpl" style="margin-bottom:6px">Detalle tecnico (solo tu lo ves)</div>
    <textarea class="inp full" id="a-priv" placeholder="Keywords trabajadas, acciones especificas..." style="height:70px;resize:vertical;margin-bottom:12px"></textarea>
    <div class="inpl" style="margin-bottom:6px">Estado</div>
    <select class="inp" id="a-status" style="margin-bottom:12px"><option value="done">Completado</option><option value="prog">En curso</option><option value="plan">Planificado</option></select><br>
    <button class="savebtn" id="actionBtn" onclick="saveAction()">AGREGAR ACCION</button>
  </div>

</div>
</div>
<div class="toast" id="toast"></div>
<script>
var currentFichaId='${ficha.id}';
function showToast(msg,type){var t=document.getElementById('toast');t.textContent=msg;t.className='toast show '+(type||'ok');clearTimeout(window._tt);window._tt=setTimeout(function(){t.className='toast'},3500)}
function setBtn(id,loading,original){var b=document.getElementById(id);if(!b)return;b.disabled=loading;b.textContent=loading?'Guardando...':original}

async function syncPlaces(){
  var btn=document.getElementById('syncPlacesBtn');
  var query=document.getElementById('u-places-query').value.trim();
  if(query){
    var sr=await fetch('/api/ficha/'+currentFichaId+'/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({places_query:query})});
    if(!sr.ok){showToast('Error guardando consulta','error');return;}
  }
  btn.disabled=true;btn.textContent='Consultando Google...';
  showToast('Consultando Google Places...','info');
  var r=await fetch('/api/ficha/'+currentFichaId+'/sync',{method:'POST'});
  if(r.ok){
    var d=await r.json();
    showToast('Sincronizado: '+d.stars+'★ · '+d.totalReviews+' resenas','ok');
    setTimeout(function(){location.reload()},1800);
  } else {
    var err=await r.json().catch(function(){return{}});
    showToast(err.error||'Error al sincronizar','error');
    btn.disabled=false;btn.textContent='↻ Sincronizar con Google';
  }
}

async function saveBaseline(){
  var r=await fetch('/api/ficha/'+currentFichaId);if(!r.ok)return showToast('Error','error');var c=await r.json();
  showToast('Congelando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/baseline',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({baseline_score:c.score||0,baseline_impressions:c.impressions_new||0,baseline_directions:c.directions||0,baseline_calls:c.calls||0,baseline_web:c.web||0,baseline_stars:c.stars||0,baseline_date:Date.now()})});
  if(res.ok){showToast('Baseline congelado','ok');setTimeout(function(){location.reload()},1500)}else showToast('Error','error');
}

async function saveMetrics(){
  var payload={updated:Date.now()};
  var impr_new=document.getElementById('u-impr-new').value;
  var dir=document.getElementById('u-dir').value;
  var calls=document.getElementById('u-calls').value;
  var web=document.getElementById('u-web').value;
  var wa=document.getElementById('u-wa').value;
  var basedays=document.getElementById('u-basedays').value;
  var stars=document.getElementById('u-stars').value;
  var score=document.getElementById('u-score').value;
  var askpresence=document.getElementById('u-askpresence').value;
  var askconv=document.getElementById('u-askconv').value;
  var askscore=document.getElementById('u-askscore').value;
  var askprog=document.getElementById('u-askprog').value;
  var projscore=document.getElementById('u-projscore').value;
  var projstars=document.getElementById('u-projstars').value;
  var projask=document.getElementById('u-projask').value;
  var sentpos=document.getElementById('u-sentpos').value;
  var sentneu=document.getElementById('u-sentneu').value;
  var sentneg=document.getElementById('u-sentneg').value;

  if(!impr_new&&!dir&&!calls&&!web&&!wa&&!stars&&!score&&!askpresence&&!askconv&&!askscore&&!askprog&&!projscore&&!projstars&&!projask&&!sentpos&&!sentneu&&!sentneg)
    return showToast('Ingresa al menos una metrica','error');

  if(impr_new)payload.impressions_new=parseInt(impr_new);
  if(basedays)payload.baseline_period_days=parseInt(basedays);
  if(dir)payload.directions=parseInt(dir);
  if(calls)payload.calls=parseInt(calls);
  if(web)payload.web=parseInt(web);
  if(wa)payload.waConversations=parseInt(wa);
  if(stars)payload.stars=parseFloat(stars);
  if(score)payload.score=parseInt(score);
  if(askpresence)payload.askPresence=askpresence;
  if(askconv)payload.askConversations=parseInt(askconv);
  if(askscore)payload.askScore=askscore;
  if(askprog)payload.askProgress=parseInt(askprog);
  if(projscore)payload.projScore=projscore;
  if(projstars)payload.projStars=projstars;
  if(projask)payload.projAsk=projask;
  if(sentpos)payload.sentPositive=parseInt(sentpos);
  if(sentneu)payload.sentNeutral=parseInt(sentneu);
  if(sentneg)payload.sentNegative=parseInt(sentneg);

  setBtn('metricsBtn',true);showToast('Guardando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if(res.ok){showToast('Metricas actualizadas','ok');setBtn('metricsBtn',false,'GUARDAR TODAS LAS METRICAS');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error','error');setBtn('metricsBtn',false,'GUARDAR TODAS LAS METRICAS')}
}

function parseKeywords(text){
  var lines=text.split('\\n').map(function(l){return l.trim()}).filter(function(l){return l && !/^\\d+\\.$/.test(l)});
  var qPure=/^[<>]?\\s*[\\d.,]+\\+?$/;
  var qEnd=/^(.+?)\\s+([<>]?\\s*[\\d.,]+\\+?)$/;
  function mkCount(raw){var digits=raw.replace(/[^0-9]/g,'');if(/[<>]/.test(raw))return '< '+digits;return parseInt(digits)||0}
  var out=[],pending=null;
  lines.forEach(function(l){
    if(qPure.test(l)){if(pending!==null){out.push({term:pending,count:mkCount(l)});pending=null}}
    else{var m=l.match(qEnd);if(m){out.push({term:m[1].trim(),count:mkCount(m[2])})}else{pending=l}}
  });
  return out;
}

async function saveKeywords(){
  var text=document.getElementById('kw-input').value;
  var kws=text.trim()?parseKeywords(text):[];
  if(text.trim()&&!kws.length)return showToast('No pude interpretar el formato','error');
  setBtn('kwBtn',true);showToast('Guardando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({keywords:kws})});
  if(res.ok){showToast(kws.length+' palabras clave guardadas','ok');setBtn('kwBtn',false,'GUARDAR PALABRAS CLAVE');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error','error');setBtn('kwBtn',false,'GUARDAR PALABRAS CLAVE')}
}

async function saveTags(){
  var text=document.getElementById('tag-input').value;
  var tags=text.split('\\n').map(function(l){return l.trim()}).filter(function(l){return l});
  setBtn('tagBtn',true);showToast('Guardando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tags:tags})});
  if(res.ok){showToast(tags.length+' etiquetas guardadas','ok');setBtn('tagBtn',false,'GUARDAR ETIQUETAS');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error','error');setBtn('tagBtn',false,'GUARDAR ETIQUETAS')}
}

function parsePlatforms(text){
  var lines=text.split('\\n').map(function(l){return l.trim()}).filter(function(l){return l});
  var countRe=/^([\\d.,]+)\\s*[·•.]\\s*\\d+\\s*%/;
  var pipeRe=/^(.+?)\\s*[|=]\\s*([\\d.,]+)\\s*(?:[·•.]\\s*\\d+\\s*%)?$/;
  var out=[],pending=null;
  lines.forEach(function(l){
    var pm=l.match(pipeRe);
    if(pm){out.push({label:pm[1].trim(),count:parseInt(pm[2].replace(/[^0-9]/g,''))||0});pending=null;return}
    var cm=l.match(countRe);
    if(cm){pending=parseInt(cm[1].replace(/[^0-9]/g,''))||0;return}
    if(pending!==null){out.push({label:l,count:pending});pending=null}
  });
  return out;
}

async function savePlatforms(){
  var text=document.getElementById('plat-input').value;
  var arr=text.trim()?parsePlatforms(text):[];
  if(text.trim()&&!arr.length)return showToast('No pude interpretar el formato','error');
  setBtn('platBtn',true);showToast('Guardando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({platforms:arr})});
  if(res.ok){showToast(arr.length+' plataformas guardadas','ok');setBtn('platBtn',false,'GUARDAR PLATAFORMAS');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error','error');setBtn('platBtn',false,'GUARDAR PLATAFORMAS')}
}

async function saveAction(){
  var pub=document.getElementById('a-pub').value.trim();
  var priv=document.getElementById('a-priv').value.trim();
  var status=document.getElementById('a-status').value;
  if(!pub)return showToast('Escribe la descripcion publica','error');
  var action={public:pub,private:priv,status:status,date:new Date().toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'})};
  setBtn('actionBtn',true);showToast('Registrando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(action)});
  if(res.ok){showToast('Accion registrada','ok');document.getElementById('a-pub').value='';document.getElementById('a-priv').value='';setBtn('actionBtn',false,'AGREGAR ACCION');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error','error');setBtn('actionBtn',false,'AGREGAR ACCION')}
}

function scrollToUpdate(){document.getElementById('updateSection').scrollIntoView({behavior:'smooth',block:'start'})}
function scrollToAction(){document.getElementById('actionSection').scrollIntoView({behavior:'smooth',block:'start'});setTimeout(function(){document.getElementById('a-pub').focus()},500)}
function scrollToDailyLog(){document.getElementById('dailyLogSection').scrollIntoView({behavior:'smooth',block:'start'})}
async function saveDailyLog(){
  var date=document.getElementById('dl-date').value.trim();
  var rutas=parseInt(document.getElementById('dl-rutas').value)||0;
  var llamadas=parseInt(document.getElementById('dl-llamadas').value)||0;
  var impresiones=parseInt(document.getElementById('dl-impresiones').value)||0;
  if(!date||!/^\\d{4}-\\d{2}-\\d{2}$/.test(date))return showToast('Ingresa la fecha en formato YYYY-MM-DD','error');
  setBtn('dailyBtn',true);showToast('Guardando...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/daily',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date:date,rutas:rutas,llamadas:llamadas,impresiones:impresiones})});
  if(res.ok){showToast('Día '+date+' guardado','ok');document.getElementById('dl-rutas').value='';document.getElementById('dl-llamadas').value='';document.getElementById('dl-impresiones').value='';setBtn('dailyBtn',false,'GUARDAR DÍA')}
  else{showToast('Error guardando día','error');setBtn('dailyBtn',false,'GUARDAR DÍA')}
}
async function closeMonth(){
  if(!confirm('¿Cerrar el mes actual? Esto archivará los totales actuales como "mes anterior" en el dashboard del cliente.'))return;
  showToast('Cerrando mes...','info');
  var res=await fetch('/api/ficha/'+currentFichaId+'/close-month',{method:'POST'});
  if(res.ok){showToast('Mes cerrado y archivado','ok');setTimeout(function(){location.reload()},1500)}
  else{showToast('Error al cerrar mes','error')}
}
async function logout(){await fetch('/logout',{method:'POST'});location.href='/'}
</script><script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body></html>`;
}

// ═══════════════════════════════════════════════════
// RADAR — PÁGINA PÚBLICA DE PROSPECTO
// ═══════════════════════════════════════════════════
function buildRadarPage(d) {
  var score = d.score || 0;
  var scoreColor = score < 40 ? '#ff3b30' : score < 65 ? '#ff9500' : '#1d9e75';
  var statusLabel = score < 40 ? 'PERDIENDO' : score < 65 ? 'EN RIESGO' : 'CRECIENDO';
  var circumference = 2 * Math.PI * 54;
  var dashOffset = circumference - (score / 100) * circumference;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Business Visibility Status | Boostraffic</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#04060d;font-family:'Inter',sans-serif;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.wrap{width:min(480px,100%)}
.brand{display:flex;align-items:center;gap:8px;justify-content:center;margin-bottom:28px}
.brand-dot{width:6px;height:6px;border-radius:50%;background:#1a56ff;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.brand-name{font-family:'DM Mono',monospace;font-size:13px;color:rgba(255,255,255,.4);letter-spacing:.1em}
.brand-name span{color:#1a56ff}
.card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden}
.card-header{background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.07);padding:20px 24px}
.card-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.25em;color:rgba(255,255,255,.3);text-transform:uppercase;margin-bottom:6px}
.card-biz{font-size:17px;font-weight:600;color:#fff;line-height:1.2}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07)}
.metric{background:#04060d;padding:18px 16px;text-align:center}
.metric-icon{font-size:15px;margin-bottom:6px;color:rgba(255,255,255,.4)}
.metric-val{font-family:'DM Mono',monospace;font-size:22px;font-weight:500;color:#fff;line-height:1;margin-bottom:4px}
.metric-lbl{font-size:10px;color:rgba(255,255,255,.35);letter-spacing:.06em;text-transform:uppercase}
.alert-box{margin:20px;padding:16px;background:rgba(255,59,48,.08);border:1px solid rgba(255,59,48,.2);border-radius:8px}
.alert-label{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;color:#ff3b30;text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.alert-label::before{content:'';width:6px;height:6px;border-radius:50%;background:#ff3b30;animation:pulse 1s infinite;flex-shrink:0}
.alert-text{font-size:11px;color:rgba(255,255,255,.55);line-height:1.6;font-family:'DM Mono',monospace}
.countdown-row{display:flex;align-items:center;justify-content:space-between;padding:0 20px 16px}
.countdown-label{font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.15em;text-transform:uppercase;display:flex;align-items:center;gap:6px}
.cdot{width:5px;height:5px;border-radius:50%;background:#ff3b30;animation:pulse 1s infinite}
.countdown-val{font-family:'DM Mono',monospace;font-size:18px;color:#ff3b30;font-weight:500;letter-spacing:.08em}
.score-section{padding:20px;border-top:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:20px}
.score-ring{position:relative;width:120px;height:120px;flex-shrink:0}
.score-ring svg{transform:rotate(-90deg)}
.score-inner{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.score-num{font-family:'DM Mono',monospace;font-size:28px;font-weight:500;line-height:1;color:#fff}
.score-max{font-size:11px;color:rgba(255,255,255,.3);font-family:'DM Mono',monospace}
.score-info{flex:1}
.score-status{font-family:'DM Mono',monospace;font-size:18px;font-weight:500;margin-bottom:8px;color:${scoreColor}}
.score-desc{font-size:12px;color:rgba(255,255,255,.4);line-height:1.5;margin-bottom:14px}
.vulns{display:flex;flex-direction:column;gap:6px}
.vuln{display:flex;align-items:center;gap:8px;font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,.5)}
.vuln::before{content:'!';width:16px;height:16px;border-radius:50%;background:rgba(255,149,0,.15);border:1px solid rgba(255,149,0,.3);color:#ff9500;font-size:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;line-height:1}
.cta{padding:20px;border-top:1px solid rgba(255,255,255,.07)}
.cta-btn{display:block;width:100%;padding:14px;background:#1a56ff;border:none;border-radius:8px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:#fff;text-align:center;text-decoration:none;cursor:pointer;transition:background .2s}
.cta-btn:hover{background:#2266ff}
.cta-sub{text-align:center;margin-top:10px;font-size:10px;color:rgba(255,255,255,.2);font-family:'DM Mono',monospace;letter-spacing:.06em}
.footer{text-align:center;margin-top:20px;font-family:'DM Mono',monospace;font-size:9px;color:rgba(255,255,255,.15);letter-spacing:.1em}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand">
    <div class="brand-dot"></div>
    <div class="brand-name">boost<span>traffic</span> · radar</div>
  </div>
  <div class="card">
    <div class="card-header">
      <div class="card-label">Business Visibility Status</div>
      <div class="card-biz">${d.businessName}</div>
    </div>
    <div class="metrics">
      <div class="metric">
        <div class="metric-icon">★</div>
        <div class="metric-val">${d.rating||'—'}</div>
        <div class="metric-lbl">Reputacion</div>
      </div>
      <div class="metric">
        <div class="metric-icon">✦</div>
        <div class="metric-val">${d.reviews||0}</div>
        <div class="metric-lbl">Resenas</div>
      </div>
      <div class="metric">
        <div class="metric-icon">▲</div>
        <div class="metric-val" style="color:${scoreColor}">${score}</div>
        <div class="metric-lbl">Visibilidad</div>
      </div>
    </div>
    <div class="alert-box">
      <div class="alert-label">Alerta de sistema detectada</div>
      <div class="alert-text">ESTADO DE EMERGENCIA TÉCNICA: Se detectó una brecha de tracción crítica en ${d.city||'Bogota'}. El sensor de capas profundas marca un fallo de indexación estructural (${score}/100). El activo [${d.businessName}] presenta latencia de renderizado y requiere Sincronización Técnica de Nodo inmediata. El Ingeniero Elkin Patiño determinará la inversión tras validar la integridad del nodo central.</div>
    </div>
    <div class="countdown-row">
      <div class="countdown-label"><div class="cdot"></div>Oportunidad activa</div>
      <div class="countdown-val" id="cd">15:00</div>
    </div>
    <div class="score-section">
      <div class="score-ring">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="8"/>
          <circle cx="60" cy="60" r="54" fill="none" stroke="${scoreColor}" stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="${circumference.toFixed(1)}"
            stroke-dashoffset="${circumference.toFixed(1)}"
            id="scoreArc"
            style="transition:stroke-dashoffset 2s ease"/>
        </svg>
        <div class="score-inner">
          <div class="score-num" id="scoreNum">0</div>
          <div class="score-max">/100</div>
        </div>
      </div>
      <div class="score-info">
        <div class="score-status">${statusLabel}</div>
        <div class="score-desc">Su perfil no está capturando el tráfico disponible en Google Maps. Cada día sin optimización es ingreso que va a la competencia.</div>
        <div class="vulns">
          <div class="vuln">Baja Autoridad Digital</div>
          <div class="vuln">Perfil No Optimizado</div>
          <div class="vuln">Vulnerable a Competencia</div>
        </div>
      </div>
    </div>
    <div class="cta">
      <a class="cta-btn" href="https://wa.me/573105647638?text=Hola%2C%20vi%20mi%20reporte%20de%20visibilidad%20y%20quiero%20la%20auditoria">Solicitar Auditoria Tecnica &rarr;</a>
      <div class="cta-sub">El Ing. Elkin Patiño validara su nodo · boostraffic.com</div>
    </div>
  </div>
  <div class="footer">BOOSTRAFFIC · SISTEMA DE INTELIGENCIA LOCAL · ${d.city||'BOGOTA'}</div>
</div>
<script>
var target=${JSON.stringify(score)};
var arc=document.getElementById('scoreArc');
var num=document.getElementById('scoreNum');
var offset=${dashOffset.toFixed(1)};
setTimeout(function(){
  if(arc)arc.style.strokeDashoffset=offset;
  var c=0,t=setInterval(function(){c++;num.textContent=c;if(c>=target)clearInterval(t)},40);
},400);
var secs=15*60;
var cd=document.getElementById('cd');
var iv=setInterval(function(){
  secs--;
  if(secs<=0){clearInterval(iv);cd.textContent='00:00';return}
  var m=Math.floor(secs/60),s=secs%60;
  cd.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
},1000);
</script>
<script type="text/javascript">var sc_project=13238883;var sc_invisible=1;var sc_security="7040d998";</script><script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script></body>
</html>`;
}

// ═══════════════════════════════════════════════════
// WORKER PRINCIPAL
// ═══════════════════════════════════════════════════
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const admin = isAdminHost(host);
    const subdomain = admin ? null : host.split('.')[0].toUpperCase();

    const jsonRes = (d, s) => new Response(JSON.stringify(d), {
      status: s||200, headers: {'Content-Type':'application/json'}
    });

    async function verifySession(req, type) {
      const cookieName = type==='admin' ? 'bt_dash' : 'bt_client_'+subdomain;
      const cookies = req.headers.get('Cookie')||'';
      const re = new RegExp(cookieName.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'=([^;]+)');
      const m = cookies.match(re);
      if(!m) return false;
      const kvKey = type==='admin' ? 'dash:session:'+m[1] : 'dash:client_session:'+subdomain+':'+m[1];
      try {
        const d = await env.RADAR_KV.get(kvKey);
        if(!d) return false;
        return JSON.parse(d).expires > Date.now();
      } catch(e) { return false; }
    }

    // AUTH
    if(url.pathname==='/auth' && request.method==='POST') {
      const body = await request.json();
      const type = body.type||'admin';
      if(type==='admin') {
        if(body.key!==env.MASTER_KEY) return jsonRes({error:'Clave incorrecta'},401);
        const token = crypto.randomUUID();
        await env.RADAR_KV.put('dash:session:'+token, JSON.stringify({expires:Date.now()+28800000}), {expirationTtl:28800});
        return new Response('{"ok":true}', {headers:{'Content-Type':'application/json','Set-Cookie':'bt_dash='+token+'; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800'}});
      }
      if(type==='client') {
        const sub = (body.subdomain||subdomain||'').toUpperCase();
        let accountKey = sub;
        const mapping = await env.RADAR_KV.get('dash:subdomain:'+sub);
        if(mapping) accountKey = mapping;
        const accountRaw = await env.RADAR_KV.get('dash:account:'+accountKey);
        if(!accountRaw) return jsonRes({error:'Cuenta no encontrada'},401);
        const account = JSON.parse(accountRaw);
        if(body.key.toUpperCase()!==account.key.toUpperCase()) return jsonRes({error:'Clave incorrecta'},401);
        const token = crypto.randomUUID();
        const cookieName = 'bt_client_'+sub;
        await env.RADAR_KV.put('dash:client_session:'+sub+':'+token, JSON.stringify({expires:Date.now()+28800000,accountKey:account.key}), {expirationTtl:28800});
        return new Response('{"ok":true}', {headers:{'Content-Type':'application/json','Set-Cookie':cookieName+'='+token+'; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800'}});
      }
      return jsonRes({error:'Tipo invalido'},400);
    }

    // LOGOUT
    if(url.pathname==='/logout' && request.method==='POST') {
      const cookies = request.headers.get('Cookie')||'';
      if(admin) {
        const m = cookies.match(/bt_dash=([^;]+)/);
        if(m) await env.RADAR_KV.delete('dash:session:'+m[1]);
        return new Response('{"ok":true}', {headers:{'Content-Type':'application/json','Set-Cookie':'bt_dash=; Max-Age=0; Path=/'}});
      } else {
        const cookieName = 'bt_client_'+subdomain;
        const re = new RegExp(cookieName+'=([^;]+)');
        const m = cookies.match(re);
        if(m) await env.RADAR_KV.delete('dash:client_session:'+subdomain+':'+m[1]);
        return new Response('{"ok":true}', {headers:{'Content-Type':'application/json','Set-Cookie':cookieName+'=; Max-Age=0; Path=/'}});
      }
    }

    // RUTAS CLIENTE
    if(!admin) {
      let accountKey = subdomain;
      const mapping = await env.RADAR_KV.get('dash:subdomain:'+subdomain);
      if(mapping) accountKey = mapping;
      const accountRaw = await env.RADAR_KV.get('dash:account:'+accountKey);
      const account = accountRaw ? JSON.parse(accountRaw) : null;

      if(url.pathname==='/' && request.method==='GET') {
        const ok = await verifySession(request, 'client');
        if(!ok) return new Response(buildClientLogin(account?.name, subdomain), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
        const fichas = [];
        if(account && account.fichas) {
          for(let i=0;i<account.fichas.length;i++){
            const fr = await env.RADAR_KV.get('dash:ficha:'+account.fichas[i]);
            if(fr) fichas.push(JSON.parse(fr));
          }
        }
        if(fichas.length===1) {
          return new Response(buildFichaDetail(fichas[0], account?.name), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
        }
        return new Response(buildAccountSummary(account||{name:'Mi Panel'}, fichas), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
      }

      const fichaMatch = url.pathname.match(/^\/ficha\/([^\/]+)$/);
      if(fichaMatch && request.method==='GET') {
        const ok = await verifySession(request, 'client');
        if(!ok) return new Response('', {status:302, headers:{Location:'/'}});
        const fr = await env.RADAR_KV.get('dash:ficha:'+fichaMatch[1]);
        if(!fr) return new Response('Ficha no encontrada', {status:404});
        return new Response(buildFichaDetail(JSON.parse(fr), account?.name), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
      }

      return new Response('Not found', {status:404});
    }

    // RUTAS ADMIN
    if(url.pathname==='/' && request.method==='GET') {
      const ok = await verifySession(request, 'admin');
      if(!ok) return new Response(LOGIN_ADMIN, {headers:{'Content-Type':'text/html;charset=UTF-8'}});
      const list = await env.RADAR_KV.list({prefix:'dash:account:'});
      const accounts = [];
      for(let i=0;i<list.keys.length;i++){
        const d = await env.RADAR_KV.get(list.keys[i].name);
        if(d) try{accounts.push(JSON.parse(d))}catch(e){}
      }
      const page = ADMIN_CSS + ADMIN_BODY_TOP + buildAdminAccounts(accounts) + ADMIN_BODY_BOT;
      return new Response(page, {headers:{'Content-Type':'text/html;charset=UTF-8'}});
    }

    const accountDetailMatch = url.pathname.match(/^\/detail-account\/([^\/]+)$/);
    if(accountDetailMatch && request.method==='GET') {
      const ok = await verifySession(request, 'admin');
      if(!ok) return new Response('', {status:302, headers:{Location:'/'}});
      const accountRaw = await env.RADAR_KV.get('dash:account:'+accountDetailMatch[1]);
      if(!accountRaw) return new Response('Cuenta no encontrada', {status:404});
      const account = JSON.parse(accountRaw);
      const fichas = [];
      if(account.fichas) {
        for(let i=0;i<account.fichas.length;i++){
          const fr = await env.RADAR_KV.get('dash:ficha:'+account.fichas[i]);
          if(fr) try{fichas.push(JSON.parse(fr))}catch(e){}
        }
      }
      return new Response(buildAccountDetail(account, fichas), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
    }

    const fichaDetailMatch = url.pathname.match(/^\/detail-ficha\/([^\/]+)$/);
    if(fichaDetailMatch && request.method==='GET') {
      const ok = await verifySession(request, 'admin');
      if(!ok) return new Response('', {status:302, headers:{Location:'/'}});
      const fr = await env.RADAR_KV.get('dash:ficha:'+fichaDetailMatch[1]);
      if(!fr) return new Response('Ficha no encontrada', {status:404});
      const ficha = JSON.parse(fr);
      return new Response(buildFichaDetailAdmin(ficha, ficha.accountKey), {headers:{'Content-Type':'text/html;charset=UTF-8'}});
    }

    const authOk = await verifySession(request, 'admin');
    if(!authOk) return jsonRes({error:'No autorizado'}, 401);

    // API ACCOUNT
    const acm = url.pathname.match(/^\/api\/account\/([^\/]+)(\/.*)?$/);
    if(acm) {
      const accountKey = acm[1];
      const sub = acm[2]||'';
      if(sub==='/create' && request.method==='POST') {
        const body = await request.json();
        body.fichas = body.fichas||[];
        await env.RADAR_KV.put('dash:account:'+accountKey, JSON.stringify(body));
        if(body.subdomain) await env.RADAR_KV.put('dash:subdomain:'+body.subdomain.toUpperCase(), accountKey);
        return jsonRes({ok:true});
      }
      if(request.method==='GET' && sub==='') {
        const raw = await env.RADAR_KV.get('dash:account:'+accountKey);
        if(!raw) return jsonRes({error:'No encontrado'}, 404);
        return jsonRes(JSON.parse(raw));
      }
    }

    // API FICHA
    const fcm = url.pathname.match(/^\/api\/ficha\/([^\/]+)(\/.*)?$/);
    if(fcm) {
      const fichaId = fcm[1];
      const sub = fcm[2]||'';

      if(request.method==='GET' && sub==='') {
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        if(!raw) return jsonRes({error:'No encontrado'}, 404);
        return jsonRes(JSON.parse(raw));
      }

      if(sub==='/create' && request.method==='POST') {
        const body = await request.json();
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(body));
        const accountRaw = await env.RADAR_KV.get('dash:account:'+body.accountKey);
        if(accountRaw) {
          const account = JSON.parse(accountRaw);
          account.fichas = account.fichas||[];
          if(!account.fichas.includes(fichaId)) account.fichas.push(fichaId);
          await env.RADAR_KV.put('dash:account:'+body.accountKey, JSON.stringify(account));
        }
        return jsonRes({ok:true});
      }

      if(sub==='/metrics' && request.method==='POST') {
        // Permitir acceso con Master Key por header (para n8n automático)
        const masterKeyHeader = request.headers.get('X-Master-Key');
        const sessionOk = await verifySession(request, 'admin');
        if(!sessionOk && masterKeyHeader !== env.MASTER_KEY) {
          return jsonRes({error:'No autorizado'}, 401);
        }
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        const ficha = raw ? JSON.parse(raw) : {};
        const body = await request.json();
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(Object.assign({}, ficha, body)));
        return jsonRes({ok:true});
      }

      if(sub==='/sync' && request.method==='POST') {
        const masterKeyHeader = request.headers.get('X-Master-Key');
        const sessionOk = await verifySession(request, 'admin');
        if(!sessionOk && masterKeyHeader !== env.MASTER_KEY) return jsonRes({error:'No autorizado'}, 401);
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        if(!raw) return jsonRes({error:'Ficha no encontrada'}, 404);
        const ficha = JSON.parse(raw);
        if(!ficha.places_query) return jsonRes({error:'places_query no configurado en esta ficha'}, 400);
        if(!env.PLACES_API_KEY) return jsonRes({error:'PLACES_API_KEY no configurado como secret del worker'}, 500);
        try {
          const pr = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': env.PLACES_API_KEY,
              'X-Goog-FieldMask': 'places.name,places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.googleMapsUri,places.reviews'
            },
            body: JSON.stringify({textQuery: ficha.places_query})
          });
          if(!pr.ok) {
            const errText = await pr.text();
            return jsonRes({error:'Places API error '+pr.status, detail: errText}, 502);
          }
          const pd = await pr.json();
          const place = pd.places && pd.places[0];
          if(!place) return jsonRes({error:'Negocio no encontrado en Places API con esa consulta'}, 404);
          const sentUpdates = {};
          if(place.reviews && place.reviews.length) {
            let pos=0,neu=0,neg=0;
            for(const rv of place.reviews){ if(rv.rating>=4)pos++; else if(rv.rating===3)neu++; else neg++; }
            const tot=place.reviews.length;
            sentUpdates.sentPositive=Math.round(pos/tot*100);
            sentUpdates.sentNeutral=Math.round(neu/tot*100);
            sentUpdates.sentNegative=Math.round(neg/tot*100);
          }
          const updates = {
            stars: place.rating || ficha.stars,
            totalReviews: place.userRatingCount || 0,
            placeId: place.name,
            googleMapsUri: place.googleMapsUri,
            placesLastSync: Date.now(),
            updated: Date.now(),
            ...sentUpdates
          };
          await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(Object.assign({}, ficha, updates)));
          return jsonRes({ok:true, stars: updates.stars, totalReviews: updates.totalReviews, name: place.displayName?.text, address: place.formattedAddress});
        } catch(e) {
          return jsonRes({error:'Error interno: '+e.message}, 500);
        }
      }

      if(sub==='/baseline' && request.method==='POST') {
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        const ficha = raw ? JSON.parse(raw) : {};
        const body = await request.json();
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(Object.assign({}, ficha, body)));
        return jsonRes({ok:true});
      }

      if(sub==='/daily' && request.method==='POST') {
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        const ficha = raw ? JSON.parse(raw) : {};
        const body = await request.json();
        if(!body.date || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) return jsonRes({error:'Fecha inválida'}, 400);
        ficha.daily_log = ficha.daily_log || {};
        ficha.daily_log[body.date] = {rutas: body.rutas||0, llamadas: body.llamadas||0, impresiones: body.impresiones||0};
        ficha.updated = Date.now();
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(ficha));
        return jsonRes({ok:true, date:body.date});
      }

      if(sub==='/close-month' && request.method==='POST') {
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        if(!raw) return jsonRes({error:'Ficha no encontrada'}, 404);
        const ficha = JSON.parse(raw);
        const now = new Date();
        const monthKey = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
        ficha.prev_month = {
          month: monthKey,
          directions: ficha.directions||0,
          calls: ficha.calls||0,
          impressions: ficha.impressions_new||0,
          web: ficha.web||0,
          stars: ficha.stars||0,
          archived: Date.now()
        };
        ficha.updated = Date.now();
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(ficha));
        return jsonRes({ok:true, month:monthKey});
      }

      if(sub==='/action' && request.method==='POST') {
        const raw = await env.RADAR_KV.get('dash:ficha:'+fichaId);
        const ficha = raw ? JSON.parse(raw) : {};
        const body = await request.json();
        const ap = ficha.actions_pro||[];
        const a = ficha.actions||[];
        ap.push(body);
        a.push({text:body.public, status:body.status, date:body.date});
        ficha.actions_pro = ap;
        ficha.actions = a;
        await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(ficha));
        return jsonRes({ok:true});
      }
    }

    // MIGRACIÓN
    if(url.pathname==='/migrate' && request.method==='POST') {
      const body = await request.json().catch(()=>({}));
      const clientKey = body.clientKey || 'HTL2026';
      const oldRaw = await env.RADAR_KV.get('dash:client:'+clientKey);
      if(!oldRaw) return jsonRes({error:'No encontrado: dash:client:'+clientKey}, 404);
      const old = JSON.parse(oldRaw);
      const accountKey = clientKey;
      const fichaId = clientKey+'-PRINCIPAL';
      const subdomain = body.subdomain || clientKey.toLowerCase().replace(/[^a-z0-9]/g,'');
      const ficha = Object.assign({}, old, {id: fichaId, accountKey: accountKey, name: old.name || clientKey, updated: Date.now()});
      await env.RADAR_KV.put('dash:ficha:'+fichaId, JSON.stringify(ficha));
      const account = {name: old.name || clientKey, key: accountKey, subdomain: subdomain, fichas: [fichaId], created: old.started || Date.now()};
      await env.RADAR_KV.put('dash:account:'+accountKey, JSON.stringify(account));
      await env.RADAR_KV.put('dash:subdomain:'+subdomain.toUpperCase(), accountKey);
      return jsonRes({ok:true, message:'Migrado correctamente', account: accountKey, ficha: fichaId, subdomain: subdomain});
    }

    return new Response('Not found', {status:404});
  },

  async scheduled(event, env, ctx) {
    if(!env.PLACES_API_KEY) return;
    const list = await env.RADAR_KV.list({prefix:'dash:ficha:'});
    for(const key of list.keys) {
      const raw = await env.RADAR_KV.get(key.name);
      if(!raw) continue;
      const ficha = JSON.parse(raw);
      if(!ficha.places_query) continue;
      try {
        const pr = await fetch('https://places.googleapis.com/v1/places:searchText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': env.PLACES_API_KEY,
            'X-Goog-FieldMask': 'places.name,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.reviews'
          },
          body: JSON.stringify({textQuery: ficha.places_query})
        });
        if(!pr.ok) continue;
        const pd = await pr.json();
        const place = pd.places && pd.places[0];
        if(!place) continue;
        const sentUpd = {};
        if(place.reviews && place.reviews.length) {
          let pos=0,neu=0,neg=0;
          for(const rv of place.reviews){ if(rv.rating>=4)pos++; else if(rv.rating===3)neu++; else neg++; }
          const tot=place.reviews.length;
          sentUpd.sentPositive=Math.round(pos/tot*100);
          sentUpd.sentNeutral=Math.round(neu/tot*100);
          sentUpd.sentNegative=Math.round(neg/tot*100);
        }
        const updates = {
          stars: place.rating || ficha.stars,
          totalReviews: place.userRatingCount || 0,
          placeId: place.name,
          googleMapsUri: place.googleMapsUri,
          placesLastSync: Date.now(),
          updated: Date.now(),
          ...sentUpd
        };
        await env.RADAR_KV.put(key.name, JSON.stringify(Object.assign({}, ficha, updates)));
      } catch(e) { /* continúa con la siguiente ficha */ }
    }
  }
};
