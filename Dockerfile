FROM nginx:alpine

# Copy the complete HTML file
RUN cat > /usr/share/nginx/html/index.html << 'EOFHTML'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BoostrAffic | Sistema de Optimización GMB de Alto Rendimiento</title>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&family=General+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root{--bg:#030712;--bg-layer:#0b1120;--card:#111827;--accent:#00f2ff;--accent-secondary:#0066ff;--accent-glow:rgba(0,242,255,0.3);--text:#f8fafc;--text-dim:#94a3b8;--gradient:linear-gradient(135deg,#00f2ff 0%,#0066ff 100%);--border:rgba(0,242,255,0.15)}*{margin:0;padding:0;box-sizing:border-box}body{background-color:var(--bg);color:var(--text);font-family:"General Sans",sans-serif;overflow-x:hidden;line-height:1.6}.grid-background{position:fixed;top:0;left:0;width:100%;height:100%;background-image:linear-gradient(rgba(0,242,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,242,255,0.03) 1px,transparent 1px);background-size:60px 60px;z-index:-2;animation:gridFlow 30s linear infinite}@keyframes gridFlow{0%{transform:translate(0,0)}100%{transform:translate(60px,60px)}}.orb{position:fixed;border-radius:50%;filter:blur(100px);z-index:-1;pointer-events:none}.orb-1{width:800px;height:800px;background:radial-gradient(circle,var(--accent-glow) 0%,transparent 70%);top:-20%;left:-10%;animation:float 20s ease-in-out infinite}.orb-2{width:600px;height:600px;background:radial-gradient(circle,rgba(0,102,255,0.2) 0%,transparent 70%);top:40%;right:-10%;animation:float 25s ease-in-out infinite reverse}.orb-3{width:700px;height:700px;background:radial-gradient(circle,var(--accent-glow) 0%,transparent 70%);bottom:-20%;left:30%;animation:float 30s ease-in-out infinite}@keyframes float{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(50px,-50px) scale(1.1)}66%{transform:translate(-30px,30px) scale(0.9)}}.particles{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none}.particle{position:absolute;width:2px;height:2px;background:var(--accent);border-radius:50%;opacity:0.3;animation:particleFloat 15s linear infinite}@keyframes particleFloat{0%{transform:translateY(100vh) translateX(0);opacity:0}10%{opacity:0.3}90%{opacity:0.3}100%{transform:translateY(-100px) translateX(100px);opacity:0}}.container{max-width:1400px;margin:0 auto;padding:0 2rem;position:relative}header{padding:2rem 0;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;backdrop-filter:blur(20px);background:rgba(3,7,18,0.8);z-index:100;border-bottom:1px solid var(--border)}.logo{font-family:"Bricolage Grotesque";font-size:1.8rem;font-weight:800;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-1px}.nav-status{display:flex;align-items:center;gap:0.5rem;color:var(--accent);font-weight:700;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px}.status-dot{width:8px;height:8px;background:var(--accent);border-radius:50%;animation:pulse 2s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 10px var(--accent)}50%{opacity:0.5;box-shadow:0 0 20px var(--accent)}}.hero{padding:10rem 0 6rem;text-align:center;position:relative}.badge{display:inline-block;padding:0.6rem 1.8rem;border-radius:50px;background:rgba(0,242,255,0.1);border:1px solid var(--accent);color:var(--accent);font-weight:600;font-size:0.85rem;margin-bottom:2.5rem;text-transform:uppercase;letter-spacing:2px;animation:badgePulse 3s ease-in-out infinite}@keyframes badgePulse{0%,100%{box-shadow:0 0 20px rgba(0,242,255,0.2)}50%{box-shadow:0 0 40px rgba(0,242,255,0.4)}}h1{font-family:"Bricolage Grotesque";font-size:clamp(2.5rem,8vw,6rem);line-height:1;margin-bottom:2rem;letter-spacing:-3px;font-weight:800}.gradient-text{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:inline-block}.hero-subtitle{font-size:clamp(1.1rem,2vw,1.4rem);color:var(--text-dim);max-width:900px;margin:0 auto 3rem;line-height:1.8}.cta-group{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:5rem}.cta-primary{display:inline-flex;align-items:center;gap:0.75rem;background:var(--gradient);color:#000;padding:1.4rem 3.5rem;border-radius:12px;font-weight:700;font-size:1.1rem;text-decoration:none;transition:all 0.3s ease;box-shadow:0 0 40px rgba(0,242,255,0.3)}.cta-primary:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 10px 60px rgba(0,242,255,0.5)}.cta-secondary{display:inline-flex;align-items:center;gap:0.75rem;background:transparent;color:var(--accent);padding:1.4rem 3.5rem;border:2px solid var(--accent);border-radius:12px;font-weight:700;font-size:1.1rem;text-decoration:none;transition:all 0.3s ease}.cta-secondary:hover{background:rgba(0,242,255,0.1);transform:translateY(-3px)}.metrics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin:4rem 0}.metric-card{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:2.5rem;text-align:center;position:relative;overflow:hidden;transition:all 0.4s ease}.metric-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:var(--gradient);transform:scaleX(0);transition:transform 0.4s ease}.metric-card:hover{transform:translateY(-10px) scale(1.02);border-color:var(--accent);box-shadow:0 20px 60px rgba(0,0,0,0.5)}.metric-card:hover::before{transform:scaleX(1)}.metric-value{font-family:"Bricolage Grotesque";font-size:4rem;font-weight:800;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:1rem}.metric-label{color:var(--text-dim);font-size:1.05rem;font-weight:500}.tech-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(350px,1fr));gap:2.5rem;margin:6rem 0}.tech-card{background:var(--card);border:1px solid var(--border);border-radius:24px;padding:3.5rem;position:relative;overflow:hidden;transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}.tech-card::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(0,242,255,0.1) 0%,transparent 70%);opacity:0;transition:opacity 0.5s ease}.tech-card:hover::before{opacity:1}.tech-card:hover{transform:translateY(-15px) rotateX(5deg);border-color:var(--accent);box-shadow:0 30px 80px rgba(0,0,0,0.6),0 0 60px rgba(0,242,255,0.2)}.tech-icon{width:80px;height:80px;background:var(--gradient);border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin-bottom:2rem;box-shadow:0 10px 30px rgba(0,242,255,0.3)}.tech-card h3{font-family:"Bricolage Grotesque";font-size:1.75rem;margin-bottom:1rem;font-weight:800}.tech-card p{color:var(--text-dim);line-height:1.8;margin-bottom:1.5rem}.feature-list{list-style:none;display:flex;flex-direction:column;gap:1rem}.feature-list li{display:flex;align-items:center;gap:1rem;color:var(--text);font-size:0.95rem}.feature-list li::before{content:'▸';color:var(--accent);font-weight:bold;font-size:1.2rem}.section{padding:8rem 0;position:relative}.section-header{text-align:center;margin-bottom:5rem}.section-badge{display:inline-block;background:rgba(0,102,255,0.1);border:1px solid var(--accent-secondary);color:var(--accent-secondary);padding:0.6rem 1.8rem;border-radius:50px;font-size:0.85rem;font-weight:600;margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:2px}.section-title{font-family:"Bricolage Grotesque";font-size:clamp(2.5rem,5vw,4.5rem);font-weight:800;margin-bottom:1.5rem;letter-spacing:-2px}.section-subtitle{font-size:1.3rem;color:var(--text-dim);max-width:800px;margin:0 auto;line-height:1.8}.dashboard-3d{margin:6rem 0;perspective:2000px}.dashboard-container{background:var(--card);border:2px solid var(--border);border-radius:30px;padding:4rem;transform-style:preserve-3d;transition:transform 0.6s ease;position:relative;overflow:hidden}.dashboard-container:hover{transform:rotateY(5deg) rotateX(2deg)}.dashboard-container::before{content:'';position:absolute;top:-50%;right:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(0,242,255,0.05) 0%,transparent 70%)}.browser-bar{display:flex;gap:0.75rem;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border)}.browser-dot{width:14px;height:14px;border-radius:50%;background:var(--border)}.dashboard-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:2rem}.dash-metric{background:var(--bg-layer);padding:2rem;border-radius:16px;border:1px solid var(--border);transition:all 0.3s ease}.dash-metric:hover{border-color:var(--accent);transform:scale(1.05)}.dash-value{font-size:2.5rem;font-weight:800;color:var(--accent);font-family:"Bricolage Grotesque";margin-bottom:0.5rem}.dash-label{font-size:0.9rem;color:var(--text-dim)}.timeline{position:relative;margin:6rem 0;padding-left:3rem}.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--gradient)}.timeline-item{position:relative;margin-bottom:4rem;padding-left:3rem}.timeline-dot{position:absolute;left:-3.5rem;top:0;width:80px;height:80px;background:var(--gradient);border-radius:20px;display:flex;align-items:center;justify-content:center;font-family:"Bricolage Grotesque";font-size:2rem;font-weight:800;color:#000;box-shadow:0 0 30px rgba(0,242,255,0.5)}.timeline-content{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:3rem;transition:all 0.4s ease}.timeline-content:hover{border-color:var(--accent);transform:translateX(10px);box-shadow:0 20px 60px rgba(0,0,0,0.5)}.timeline-duration{display:inline-block;background:rgba(0,242,255,0.1);color:var(--accent);padding:0.5rem 1.2rem;border-radius:20px;font-size:0.85rem;font-weight:600;margin-bottom:1rem;text-transform:uppercase}.timeline-content h4{font-family:"Bricolage Grotesque";font-size:1.75rem;margin-bottom:1rem;font-weight:800}.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:2.5rem;margin-top:5rem}.pricing-card{background:var(--card);border:2px solid var(--border);border-radius:30px;padding:4rem 3rem;text-align:center;position:relative;overflow:hidden;transition:all 0.5s cubic-bezier(0.4,0,0.2,1)}.pricing-card.featured{border-color:var(--accent);transform:scale(1.08);box-shadow:0 30px 80px rgba(0,0,0,0.6),0 0 80px rgba(0,242,255,0.3)}.pricing-card.featured::before{content:'ÓPTIMO';position:absolute;top:-15px;left:50%;transform:translateX(-50%);background:var(--gradient);color:#000;padding:0.5rem 2rem;border-radius:20px;font-size:0.75rem;font-weight:700;letter-spacing:2px}.pricing-card:hover{transform:translateY(-15px) scale(1.05);border-color:var(--accent);box-shadow:0 40px 100px rgba(0,0,0,0.7),0 0 100px rgba(0,242,255,0.4)}.pricing-name{font-size:1.4rem;font-weight:600;margin-bottom:1.5rem;color:var(--text)}.price-tag{font-family:"Bricolage Grotesque";font-size:4.5rem;font-weight:800;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1;margin-bottom:0.5rem}.price-tag span{font-size:1.8rem;color:var(--text-dim)}.pricing-features{list-style:none;margin:3rem 0;text-align:left}.pricing-features li{display:flex;align-items:center;gap:1rem;padding:1rem 0;border-bottom:1px solid var(--border);color:var(--text)}.pricing-features li::before{content:'✓';color:var(--accent);font-weight:bold;font-size:1.2rem}.pricing-cta{width:100%;background:var(--gradient);color:#000;padding:1.4rem;border:none;border-radius:12px;font-weight:700;font-size:1.1rem;cursor:pointer;transition:all 0.3s ease;margin-top:2rem;text-transform:uppercase;letter-spacing:1px}.pricing-cta:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(0,242,255,0.5)}.case-study{background:var(--card);border:2px solid var(--border);border-radius:40px;padding:5rem;margin:8rem 0;display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;position:relative;overflow:hidden}.case-study::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(0,242,255,0.05) 0%,transparent 70%)}.case-content{position:relative;z-index:1}.case-company{color:var(--accent);font-weight:600;margin-bottom:1rem;font-size:1.1rem}.case-content h3{font-family:"Bricolage Grotesque";font-size:2.5rem;margin-bottom:1.5rem;font-weight:800}.results-grid{display:grid;gap:2rem;margin-top:3rem;position:relative;z-index:1}.result-box{display:flex;align-items:center;gap:1.5rem;background:var(--bg-layer);padding:2rem;border-radius:16px;border:1px solid var(--border);transition:all 0.3s ease}.result-box:hover{border-color:var(--accent);transform:translateX(10px)}.result-icon{width:60px;height:60px;background:rgba(0,242,255,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.8rem}.result-data h4{font-size:2.2rem;font-weight:800;color:var(--accent);font-family:"Bricolage Grotesque"}.result-data p{color:var(--text-dim);font-size:0.95rem}.final-cta{margin:10rem 0 8rem;background:var(--gradient);border-radius:50px;padding:8rem 5rem;text-align:center;position:relative;overflow:hidden}.final-cta::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%);animation:rotate 40s linear infinite}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.final-cta-content{position:relative;z-index:1}.final-cta h2{font-family:"Bricolage Grotesque";font-size:clamp(2.5rem,6vw,5rem);color:#000;font-weight:800;margin-bottom:2rem;letter-spacing:-2px}.final-cta p{font-size:1.5rem;color:#000;opacity:0.8;margin-bottom:3rem;max-width:800px;margin-left:auto;margin-right:auto}.final-cta-buttons{display:flex;gap:2rem;justify-content:center;flex-wrap:wrap}.cta-dark{background:#000;color:var(--accent);padding:1.6rem 4rem;border-radius:12px;font-weight:700;font-size:1.2rem;text-decoration:none;transition:all 0.3s ease}.cta-dark:hover{transform:translateY(-5px) scale(1.05);box-shadow:0 20px 60px rgba(0,0,0,0.5)}.cta-outline{background:transparent;color:#000;padding:1.6rem 4rem;border:3px solid #000;border-radius:12px;font-weight:700;font-size:1.2rem;text-decoration:none;transition:all 0.3s ease}.cta-outline:hover{background:#000;color:var(--accent);transform:translateY(-5px)}footer{padding:6rem 0 3rem;border-top:1px solid var(--border)}.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:4rem;margin-bottom:4rem}.footer-brand h3{font-family:"Bricolage Grotesque";font-size:1.8rem;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1.5rem}.footer-brand p{color:var(--text-dim);line-height:1.8}.footer-links h4{margin-bottom:1.5rem;font-weight:600}.footer-links ul{list-style:none}.footer-links a{color:var(--text-dim);text-decoration:none;display:block;padding:0.5rem 0;transition:color 0.3s ease}.footer-links a:hover{color:var(--accent)}.footer-bottom{padding-top:3rem;border-top:1px solid var(--border);text-align:center;color:var(--text-dim);font-size:0.95rem}@media (max-width:1024px){.case-study{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr 1fr}}@media (max-width:768px){.hero{padding:6rem 0 3rem}.tech-grid,.pricing-grid{grid-template-columns:1fr}.timeline{padding-left:0}.timeline::before{display:none}.timeline-dot{position:relative;left:0;margin-bottom:1rem}.timeline-item{padding-left:0}.footer-grid{grid-template-columns:1fr}.final-cta{padding:4rem 2rem}}[data-scroll]{opacity:0;transform:translateY(50px);transition:all 0.8s cubic-bezier(0.4,0,0.2,1)}[data-scroll].visible{opacity:1;transform:translateY(0)}
    </style>
</head>
<body>
    <div class="grid-background"></div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <div class="particles" id="particles"></div>
    <div class="container">
        <header>
            <div class="logo">BOOSTRAFFIC</div>
            <div class="nav-status"><span class="status-dot"></span>NODAL_LEVEL_03</div>
        </header>
        <section class="hero">
            <div class="badge">Protocolo de Sincronización Técnica</div>
            <h1>Domina Google Maps con<br><span class="gradient-text">IA de Alto Rendimiento</span></h1>
            <p class="hero-subtitle">Sistema avanzado de optimización GMB con tecnología propietaria de análisis, automatización y monitoreo 24/7. Convertimos datos en autoridad local y tracción comercial inmediata mediante algoritmos de última generación.</p>
            <div class="cta-group">
                <a href="#contacto" class="cta-primary">INICIAR PROTOCOLO →</a>
                <a href="#casos" class="cta-secondary">CASOS VERIFICADOS</a>
            </div>
            <div class="metrics-grid" data-scroll>
                <div class="metric-card"><div class="metric-value">+127%</div><div class="metric-label">Incremento Visibilidad Promedio</div></div>
                <div class="metric-card"><div class="metric-value">90d</div><div class="metric-label">Ciclo de Optimización</div></div>
                <div class="metric-card"><div class="metric-value">24/7</div><div class="metric-label">Monitoreo Continuo</div></div>
                <div class="metric-card"><div class="metric-value">47+</div><div class="metric-label">Puntos de Análisis</div></div>
            </div>
        </section>
        <section class="section">
            <div class="section-header" data-scroll>
                <div class="section-badge">⚡ TECNOLOGÍA PROPIETARIA</div>
                <h2 class="section-title">Sistema de Optimización Automatizado</h2>
                <p class="section-subtitle">Plataforma de análisis multinivel que escanea 47 puntos críticos de tu ficha GMB y genera estrategias personalizadas con precisión algorítmica</p>
            </div>
            <div class="tech-grid">
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">📊</div>
                    <h3>Análisis Profundo</h3>
                    <p>Sistema de scoring 0-100 con matriz competitiva y detección automática de vulnerabilidades críticas</p>
                    <ul class="feature-list">
                        <li>Score visibilidad en tiempo real</li>
                        <li>Score reputación ponderado</li>
                        <li>Benchmarking vs. competencia local</li>
                        <li>Identificación de brechas críticas</li>
                        <li>Mapeo de oportunidades de alto ROI</li>
                    </ul>
                </div>
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">🎯</div>
                    <h3>Informes Ejecutivos</h3>
                    <p>Generación automática de reportes de 25+ páginas con análisis detallado y plan de acción priorizado</p>
                    <ul class="feature-list">
                        <li>Diagnóstico con código de prioridades</li>
                        <li>Roadmap de optimización 90 días</li>
                        <li>KPIs y proyecciones a 3/6 meses</li>
                        <li>Templates de respuestas IA-optimizadas</li>
                        <li>Calendario de contenido estratégico</li>
                    </ul>
                </div>
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">🚀</div>
                    <h3>Dashboard Interactivo</h3>
                    <p>Panel de control donde implementas mejoras con un clic y visualizas impacto en tiempo real</p>
                    <ul class="feature-list">
                        <li>9 mejoras priorizadas por ROI</li>
                        <li>Sistema de pago por mejora</li>
                        <li>Actualización automática de scores</li>
                        <li>Visualización de impacto inmediato</li>
                        <li>Proyecciones de resultados 6 meses</li>
                    </ul>
                </div>
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">⭐</div>
                    <h3>Gestión de Reputación</h3>
                    <p>Sistema automatizado de generación y gestión de reseñas con IA conversacional</p>
                    <ul class="feature-list">
                        <li>Solicitud automática post-servicio</li>
                        <li>Templates respuesta GPT-4 optimizados</li>
                        <li>Códigos QR + emails de seguimiento</li>
                        <li>Respuesta profesional <24h</li>
                        <li>Meta: 50+ reseñas nuevas/trimestre</li>
                    </ul>
                </div>
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">📸</div>
                    <h3>Contenido Visual 4K</h3>
                    <p>Producción profesional de assets visuales optimizados para máximo engagement</p>
                    <ul class="feature-list">
                        <li>40+ fotos profesionales HDR</li>
                        <li>Optimización SEO de metadatos</li>
                        <li>Publicaciones con calendario IA</li>
                        <li>Videos cortos formato Stories</li>
                        <li>Tour virtual 360° (opcional)</li>
                    </ul>
                </div>
                <div class="tech-card" data-scroll>
                    <div class="tech-icon">📈</div>
                    <h3>Monitoreo Radar 24/7</h3>
                    <p>Vigilancia continua de métricas clave con alertas automáticas y reportes mensuales</p>
                    <ul class="feature-list">
                        <li>Búsquedas directas vs. descubrimiento</li>
                        <li>Llamadas generadas desde GMB</li>
                        <li>Solicitudes de indicaciones</li>
                        <li>CTR y conversiones web</li>
                        <li>Alertas de amenazas competitivas</li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="dashboard-3d" data-scroll>
            <div class="section-header">
                <div class="section-badge">🖥️ INTERFAZ DE CONTROL</div>
                <h2 class="section-title">Dashboard Inteligente de Optimización</h2>
                <p class="section-subtitle">Panel de control donde visualizas progreso en tiempo real y aplicas mejoras con un clic. Cada acción actualiza métricas automáticamente con proyecciones de impacto.</p>
            </div>
            <div class="dashboard-container">
                <div class="browser-bar">
                    <div class="browser-dot"></div>
                    <div class="browser-dot"></div>
                    <div class="browser-dot"></div>
                </div>
                <div class="dashboard-metrics">
                    <div class="dash-metric"><div class="dash-value">42 → 78</div><div class="dash-label">SCORE GMB</div></div>
                    <div class="dash-metric"><div class="dash-value">8 → 53</div><div class="dash-label">RESEÑAS TOTALES</div></div>
                    <div class="dash-metric"><div class="dash-value">4 → 40+</div><div class="dash-label">ASSETS VISUALES</div></div>
                    <div class="dash-metric"><div class="dash-value">6/9</div><div class="dash-label">MEJORAS ACTIVAS</div></div>
                </div>
                <div style="text-align:center;margin-top:3rem;color:var(--text-dim)"><p>⚡ Sincronización en tiempo real · Cada mejora actualiza métricas automáticamente</p></div>
            </div>
        </section>
        <section class="case-study" id="casos" data-scroll>
            <div class="case-content">
                <p class="case-company">📍 HOTEL HTL · CENTRO HISTÓRICO, BOGOTÁ</p>
                <h3>De 3.8★ a 4.7★ en 4 Meses</h3>
                <p style="color:var(--text-dim);line-height:1.8">Hotel boutique de 30 habitaciones con presencia digital descuidada. Aplicamos protocolo completo de optimización GMB con tecnología automatizada.</p>
            </div>
            <div class="results-grid">
                <div class="result-box"><div class="result-icon">⭐</div><div class="result-data"><h4>3.8 → 4.7</h4><p>Calificación promedio</p></div></div>
                <div class="result-box"><div class="result-icon">📝</div><div class="result-data"><h4>+285%</h4><p>Incremento reseñas</p></div></div>
                <div class="result-box"><div class="result-icon">📈</div><div class="result-data"><h4>+156%</h4><p>Búsquedas mensuales</p></div></div>
                <div class="result-box"><div class="result-icon">💰</div><div class="result-data"><h4>+73%</h4><p>Reservas directas</p></div></div>
            </div>
        </section>
        <section class="section">
            <div class="section-header" data-scroll>
                <div class="section-badge">🎯 METODOLOGÍA</div>
                <h2 class="section-title">Protocolo de 4 Fases</h2>
                <p class="section-subtitle">Sistema estructurado que garantiza resultados medibles en 90 días mediante optimización continua y ajustes algorítmicos</p>
            </div>
            <div class="timeline">
                <div class="timeline-item" data-scroll>
                    <div class="timeline-dot">01</div>
                    <div class="timeline-content">
                        <span class="timeline-duration">DÍA 1-7</span>
                        <h4>Análisis y Diagnóstico Profundo</h4>
                        <p style="color:var(--text-dim);line-height:1.8">Escaneo completo con IA de 47 puntos críticos. Generación de informe ejecutivo de 25+ páginas con diagnóstico detallado, matriz competitiva y roadmap priorizado por ROI estimado.</p>
                    </div>
                </div>
                <div class="timeline-item" data-scroll>
                    <div class="timeline-dot">02</div>
                    <div class="timeline-content">
                        <span class="timeline-duration">SEMANA 2-3</span>
                        <h4>Implementación de Mejoras Críticas</h4>
                        <p style="color:var(--text-dim);line-height:1.8">Optimización SEO de descripción, sesión fotográfica 4K (40+ assets), configuración completa de atributos, implementación de sistema automatizado de reseñas y capacitación de personal con protocolo estandarizado.</p>
                    </div>
                </div>
                <div class="timeline-item" data-scroll>
                    <div class="timeline-dot">03</div>
                    <div class="timeline-content">
                        <span class="timeline-duration">MES 2-3</span>
                        <h4>Gestión Activa y Contenido</h4>
                        <p style="color:var(--text-dim);line-height:1.8">Publicaciones con calendario IA-optimizado, respuesta automática a reseñas <24h, generación sistemática de nuevas reseñas, actualización de assets visuales y monitoreo continuo con alertas automáticas.</p>
                    </div>
                </div>
                <div class="timeline-item" data-scroll>
                    <div class="timeline-dot">04</div>
                    <div class="timeline-content">
                        <span class="timeline-duration">CONTINUO</span>
                        <h4>Optimización y Reportes</h4>
                        <p style="color:var(--text-dim);line-height:1.8">Reportes mensuales con análisis comparativo, ajustes estratégicos basados en datos en tiempo real, pruebas A/B de contenido, escalamiento de tácticas exitosas y defensa activa de reputación.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="section-header" data-scroll>
                <div class="section-badge">💎 INVERSIÓN</div>
                <h2 class="section-title">Planes de Sincronización</h2>
                <p class="section-subtitle">Inversión transparente con ROI medible. Dashboard automatizado y soporte técnico incluidos en todos los planes</p>
            </div>
            <div class="pricing-grid">
                <div class="pricing-card" data-scroll>
                    <div class="pricing-name">Análisis Pro</div>
                    <div class="price-tag">$350K</div>
                    <ul class="pricing-features">
                        <li>Informe ejecutivo 25+ páginas</li>
                        <li>Análisis de 47 puntos críticos</li>
                        <li>Matriz competitiva detallada</li>
                        <li>Roadmap de acción priorizado</li>
                        <li>Templates de optimización</li>
                        <li>Acceso dashboard 30 días</li>
                    </ul>
                    <button class="pricing-cta" onclick="window.location.href='https://wa.me/573105617616'">Iniciar Análisis</button>
                </div>
                <div class="pricing-card featured" data-scroll>
                    <div class="pricing-name">Optimización Elite</div>
                    <div class="price-tag">$1.8M</div>
                    <ul class="pricing-features">
                        <li>Todo lo de Análisis Pro +</li>
                        <li>Implementación 9 mejoras críticas</li>
                        <li>Sesión fotográfica 4K (40+ fotos)</li>
                        <li>Optimización descripción SEO</li>
                        <li>Sistema reseñas automatizado</li>
                        <li>Códigos QR + templates email</li>
                        <li>Calendario contenido 3 meses</li>
                        <li>Dashboard premium perpetuo</li>
                    </ul>
                    <button class="pricing-cta" onclick="window.location.href='https://wa.me/573105617616'">Activar Protocolo</button>
                </div>
                <div class="pricing-card" data-scroll>
                    <div class="pricing-name">Gestión Radar</div>
                    <div class="price-tag">$850K<span>/mes</span></div>
                    <ul class="pricing-features">
                        <li>Todo lo de Elite +</li>
                        <li>Gestión reputación 24/7</li>
                        <li>Publicaciones semanales IA</li>
                        <li>Respuesta reseñas <24h</li>
                        <li>Actualización assets mensual</li>
                        <li>Reportes desempeño mensuales</li>
                        <li>Ajustes estratégicos continuos</li>
                        <li>Soporte prioritario WhatsApp</li>
                    </ul>
                    <button class="pricing-cta" onclick="window.location.href='https://wa.me/573105617616'">Contratar Radar</button>
                </div>
            </div>
        </section>
        <section class="final-cta" id="contacto" data-scroll>
            <div class="final-cta-content">
                <h2>¿Listo Para Activar el Protocolo?</h2>
                <p>Obtén análisis gratuito de tu ficha GMB con scoring exacto de visibilidad y reputación. Descubre qué necesitas optimizar para dominar Google Maps.</p>
                <div class="final-cta-buttons">
                    <a href="mailto:contacto@boostraffic.com?subject=Solicitud Análisis GMB" class="cta-dark">ANÁLISIS GRATUITO</a>
                    <a href="https://wa.me/573105617616?text=Quiero optimizar mi Google My Business" class="cta-outline">CONSULTA WHATSAPP</a>
                </div>
            </div>
        </section>
    </div>
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>BOOSTRAFFIC</h3>
                    <p>Sistema de optimización automatizada de Google My Business con tecnología de IA propietaria. Convertimos datos en autoridad local y tracción comercial medible.</p>
                </div>
                <div class="footer-links">
                    <h4>Servicios</h4>
                    <ul><li><a href="#casos">Análisis GMB</a></li><li><a href="#casos">Dashboard Automatizado</a></li><li><a href="#casos">Gestión Reputación</a></li><li><a href="#casos">Contenido Visual 4K</a></li></ul>
                </div>
                <div class="footer-links">
                    <h4>Protocolo</h4>
                    <ul><li><a href="#casos">Casos Verificados</a></li><li><a href="#casos">Metodología 4 Fases</a></li><li><a href="#casos">Planes y Pricing</a></li><li><a href="#contacto">Iniciar Análisis</a></li></ul>
                </div>
                <div class="footer-links">
                    <h4>Contacto</h4>
                    <ul><li><a href="mailto:contacto@boostraffic.com">contacto@boostraffic.com</a></li><li><a href="https://wa.me/573105617616">+57 310 561 7616</a></li><li><a>Bogotá, Colombia</a></li></ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 BoostrAffic · NODAL_LEVEL_03 · Sistema de Optimización GMB Automatizado</p>
            </div>
        </div>
    </footer>
    <script>
        function createParticles(){const t=document.getElementById("particles"),e=30;for(let i=0;i<e;i++){const e=document.createElement("div");e.className="particle",e.style.left=100*Math.random()+"%",e.style.animationDelay=15*Math.random()+"s",e.style.animationDuration=15+10*Math.random()+"s",t.appendChild(e)}}function revealOnScroll(){document.querySelectorAll("[data-scroll]").forEach(t=>{new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},{threshold:.1}).observe(t)})}document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(t){t.preventDefault();const e=document.querySelector(this.getAttribute("href"));e&&e.scrollIntoView({behavior:"smooth",block:"start"})})}),document.addEventListener("DOMContentLoaded",()=>{createParticles(),revealOnScroll()}),document.addEventListener("mousemove",t=>{const e=document.querySelectorAll(".orb"),i=t.clientX/window.innerWidth,o=t.clientY/window.innerHeight;e.forEach((t,e)=>{const n=20*(e+1),s=(i-.5)*n,r=(o-.5)*n;t.style.transform=`translate(${s}px, ${r}px)`})});
    </script>
</body>
</html>
EOFHTML

EXPOSE 80
