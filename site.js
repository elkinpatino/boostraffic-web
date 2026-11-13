/* Boostraffic · menú compartido (landing + páginas internas). Fuente: tools/partials/site.js */
(function(){
  if(typeof window.openForm!=='function'){ window.openForm=function(){ var f=document.getElementById('formulario'); if(f){ f.scrollIntoView({behavior:'smooth'}); } else { location.href='/contacto/'; } }; }
  var ul=document.getElementById('nvl'); if(!ul) return;
  var path=location.pathname.replace(/index\.html$/,''), enInicio=(path==='/'||path==='');
  var ind=ul.querySelector('.nv-ind'), links=[].slice.call(ul.querySelectorAll('a')), btn=document.getElementById('nvb'), nav=document.querySelector('nav');
  var secs=links.map(function(a){ var h=a.getAttribute('href'); return (enInicio&&h.indexOf('/#')===0)?document.querySelector(h.slice(1)):null; });
  var act=-1, prog=document.createElement('span'); prog.className='nv-prog'; nav.appendChild(prog); nav.style.position='sticky';
  function marcar(i){ act=i; links.forEach(function(a,k){ a.classList.toggle('on',k===act); if(k===act) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); }); mover(act); }
  function mover(i){ if(i<0||!links[i]||getComputedStyle(ind).display==='none'){ ul.classList.remove('listo'); return; } var a=links[i]; ind.style.width=a.offsetWidth+'px'; ind.style.transform='translateX('+a.offsetLeft+'px)'; ul.classList.add('listo'); }
  function progreso(){ var e=document.documentElement, max=e.scrollHeight-e.clientHeight; prog.style.setProperty('--sp',max>0?Math.min(1,scrollY/max).toFixed(4):0); }
  function espia(){ var y=innerHeight*.38, mejor=-1; secs.forEach(function(s,i){ if(!s) return; var r=s.getBoundingClientRect(); if(r.top<=y&&r.bottom>y) mejor=i; }); if(mejor!==act) marcar(mejor); progreso(); }
  if(!enInicio){ var p=path.replace(/^\//,''); links.forEach(function(a,i){ var d=a.getAttribute('data-p'); if(d&&d.split(',').some(function(x){ return p.indexOf(x)===0; })) act=i; }); }
  var tick=false; addEventListener('scroll',function(){ if(!tick){ tick=true; requestAnimationFrame(function(){ tick=false; if(enInicio) espia(); else progreso(); }); } },{passive:true});
  addEventListener('resize',function(){ mover(act); });
  if(enInicio) espia(); else { marcar(act); progreso(); }
  setTimeout(function(){ mover(act); },400);
  links.forEach(function(a){ a.addEventListener('click',function(e){ var h=a.getAttribute('href'); if(!(enInicio&&h.indexOf('/#')===0)) return; var t=document.querySelector(h.slice(1)); if(!t) return; e.preventDefault(); t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); ul.classList.remove('abierto'); btn.setAttribute('aria-expanded','false'); history.replaceState(null,'',h.slice(1)); }); });
  btn&&btn.addEventListener('click',function(){ var o=ul.classList.toggle('abierto'); btn.setAttribute('aria-expanded',o); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ ul.classList.remove('abierto'); btn&&btn.setAttribute('aria-expanded','false'); } });
  var lg=document.querySelector('a.nav-logo'); lg&&lg.addEventListener('click',function(e){ if(enInicio){ e.preventDefault(); scrollTo({top:0,behavior:'smooth'}); history.replaceState(null,'',location.pathname); } });
})();
