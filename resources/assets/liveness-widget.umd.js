// HR Liveness Widget v1.0.0 — https://github.com/HecRdz98/hr-liveness
var LivenessWidgetLib=(()=>{var h=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var T=Object.prototype.hasOwnProperty;var C=(i,t)=>{for(var e in t)h(i,e,{get:t[e],enumerable:!0})},E=(i,t,e,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of S(t))!T.call(i,r)&&r!==e&&h(i,r,{get:()=>t[r],enumerable:!(a=k(t,r))||a.enumerable});return i};var I=i=>E(h({},"__esModule",{value:!0}),i);var A={};C(A,{LivenessWidget:()=>g});var u={colorPrimary:"#0d6efd",colorPrimaryDark:"#0b5ed7",colorAccent:"#0d6efd",colorSuccess:"#198754",colorSuccessDark:"#146c43",colorDanger:"#dc3545",colorBg:"#ffffff",colorSurface:"#ffffff",colorSurface2:"#f8f9fa",colorBorder:"#dee2e6",colorBorderSubtle:"#e9ecef",colorText:"#212529",colorTextMuted:"#6c757d",colorVideoBg:"#111827",fontBody:"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",fontHeading:"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif",radiusCard:"12px",radiusInner:"8px",logoHtml:null,brandName:"SecureID",brandSubtitle:"Verificaci\xF3n de identidad"},f={step1Title:"Verifica tu identidad",step1Desc:"Activa la c\xE1mara y centra tu rostro dentro del \xF3valo. Aseg\xFArate de tener buena iluminaci\xF3n antes de continuar.",step1Ready:"Coloca tu rostro en el \xF3valo",step1ReadyDesc:"Cuando tu rostro est\xE9 bien centrado dentro del \xF3valo, presiona Continuar.",btnStart:"Iniciar verificaci\xF3n",btnStarting:"Conectando c\xE1mara...",btnContinue:"Continuar \u2192",btnRetry:"Intentar de nuevo",btnNewVerification:"Nueva verificaci\xF3n",btnCancel:"\u21A9 Cancelar y reintentar",labelStep1:"Posici\xF3n",labelStep2:"Verificaci\xF3n",labelStep3:"Resultado",step2Title:"Completa el desaf\xEDo",badgeLive:"En vivo",capturingFrames:"Capturando frames...",spinnerText:"Analizando con IA...",spinnerMessages:["Procesando frames capturados\u2026","Verificando movimiento facial\u2026","Comprobando autenticidad\u2026","Calculando m\xE9tricas biom\xE9tricas\u2026","Finalizando an\xE1lisis\u2026"],resultSuccess:"Identidad verificada",resultFailure:"Verificaci\xF3n fallida",resultSuccessDefault:"Verificaci\xF3n completada exitosamente.",resultFailureDefault:"No se pudo verificar la identidad.",snapshotLabel:"Captura registrada",confidenceLabel:"Confianza del an\xE1lisis",framesLabel:"Frames",verifiedLabel:"Verificado",errorTitle:"\u26A0\uFE0F Error de conexi\xF3n",btnRetryConnection:"Volver a intentar",httpsWarningTitle:"\u26A0\uFE0F Se requiere HTTPS en dispositivos m\xF3viles",httpsWarningDesc:"Est\xE1s accediendo por HTTP. Los navegadores m\xF3viles bloquean la c\xE1mara sin conexi\xF3n segura. Accede por https:// o desde localhost en una computadora.",camErrTitle:"\u{1F6AB} Acceso a c\xE1mara denegado",camErrDesc:"Debes permitir el acceso a la c\xE1mara. Ve a la configuraci\xF3n del navegador \u2192 Privacidad \u2192 C\xE1mara y habil\xEDtala para este sitio.",errPermission:{title:"\u{1F6AB} Permiso denegado",desc:"Debes permitir el acceso a la c\xE1mara. En iOS: Ajustes \u2192 Safari \u2192 C\xE1mara \u2192 Permitir. En Android: toca el \xEDcono de c\xE1mara en la barra de direcci\xF3n."},errNotFound:{title:"\u{1F4F7} C\xE1mara no encontrada",desc:"No se detect\xF3 ninguna c\xE1mara en este dispositivo."},errBusy:{title:"\u26A0\uFE0F C\xE1mara ocupada",desc:"La c\xE1mara est\xE1 siendo usada por otra app. Ci\xE9rrala y vuelve a intentarlo."},errConstrained:{title:"\u2699\uFE0F C\xE1mara no compatible",desc:"La c\xE1mara no soporta el modo requerido. Intenta con otro navegador."},errHTTPS:{title:"\u{1F512} Se requiere HTTPS",desc:"El acceso a la c\xE1mara requiere una conexi\xF3n segura (HTTPS). Contacta al administrador para configurar SSL."},errGeneric:{title:"\u{1F6AB} Error de c\xE1mara",desc:"No se pudo acceder a la c\xE1mara."},errNoAPI:{notSecure:"La c\xE1mara requiere HTTPS en dispositivos m\xF3viles. Accede al sitio con https:// o desde localhost.",generic:"Tu navegador no soporta acceso a c\xE1mara. Usa Chrome, Firefox o Safari actualizados."},challenges:{parpadea:{text:"Parpadea 2 veces",icon:"\u{1F441}\uFE0F",hint:"Cierra y abre los ojos lentamente"},derecha:{text:"Gira la cabeza a la derecha",icon:"\u27A1\uFE0F",hint:"Gira suavemente hacia tu derecha"},izquierda:{text:"Gira la cabeza a la izquierda",icon:"\u2B05\uFE0F",hint:"Gira suavemente hacia tu izquierda"},sonrie:{text:"Sonr\xEDe",icon:"\u{1F60A}",hint:"Muestra tu mejor sonrisa"}},previousCaptures:"\u25B8 Capturas anteriores"},x={endpoint:"verify_liveness.php",fetchTimeoutMs:3e4,captureIntervalMs:150,captureDurationMs:4e3,renderMode:"inline",triggerSelector:null,challenges:["parpadea","derecha","izquierda","sonrie"],tokenInputSelector:null,tokenInputName:"liveness_token",photoInputSelector:null,photoInputName:"liveness_photo",photoMaxWidth:640,photoMaxHeight:480,photoQuality:.82,csrfToken:null,photosEndpoint:null,theme:{},texts:{},triggerLabel:"Verificar identidad",triggerClass:null,showSnapshot:true,showGallery:true,onSuccess:null,onFailure:null,onCancel:null,onError:null};function b(i,t){let e=`[data-liveness-widget="${t}"]`;return`

${e} {
    --lv-primary:       ${i.colorPrimary};
    --lv-primary-dark:  ${i.colorPrimaryDark};
    --lv-accent:        ${i.colorAccent};
    --lv-success:       ${i.colorSuccess};
    --lv-success-dark:  ${i.colorSuccessDark};
    --lv-danger:        ${i.colorDanger};
    --lv-bg:            ${i.colorBg};
    --lv-surface:       ${i.colorSurface};
    --lv-surface2:      ${i.colorSurface2};
    --lv-border:        ${i.colorBorder};
    --lv-border-subtle: ${i.colorBorderSubtle};
    --lv-text:          ${i.colorText};
    --lv-text-muted:    ${i.colorTextMuted};
    --lv-video-bg:      ${i.colorVideoBg};
    --lv-font-body:     ${i.fontBody};
    --lv-font-heading:  ${i.fontHeading};
    --lv-radius-card:   ${i.radiusCard};
    --lv-radius-inner:  ${i.radiusInner};

    all: initial;
    font-family: var(--lv-font-body);
    color: var(--lv-text);
    display: block;
    box-sizing: border-box;
}

${e} *, ${e} *::before, ${e} *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

${e} .lv-card {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    background: var(--lv-surface);
    border: 1px solid var(--lv-border);
    border-radius: var(--lv-radius-card);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px var(--lv-border);
}

/* HEADER */
${e} .lv-header {
    padding: 22px 28px 18px;
    border-bottom: 1px solid var(--lv-border);
    display: flex;
    align-items: center;
    gap: 13px;
    background: var(--lv-surface);
}
${e} .lv-logo-icon { width: 42px; height: 42px; flex-shrink: 0; }
${e} .lv-header-text h1 {
    font-family: var(--lv-font-heading);
    font-size: 20px; font-weight: 700; letter-spacing: -0.3px;
    color: var(--lv-text);
}
${e} .lv-header-text p {
    font-size: 11px; color: var(--lv-text-muted); letter-spacing: 1px;
    text-transform: uppercase; font-weight: 500; margin-top: 2px;
}

/* STEPS */
${e} .lv-steps { display: flex; align-items: center; padding: 18px 28px 16px; }
${e} .lv-step { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 0 0 auto; }
${e} .lv-step-circle {
    width: 30px; height: 30px; border-radius: 50%;
    border: 2px solid rgba(136,146,176,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: var(--lv-text-muted);
    transition: all 0.35s ease; background: var(--lv-bg);
    font-family: var(--lv-font-heading);
}
${e} .lv-step-label { font-size: 10px; color: var(--lv-text-muted); font-weight: 500; letter-spacing: 0.3px; transition: color 0.35s ease; white-space: nowrap; }
${e} .lv-step-line { flex: 1; height: 2px; background: rgba(136,146,176,0.12); margin-bottom: 22px; transition: background 0.4s ease; }
${e} .lv-step.active .lv-step-circle { border-color: var(--lv-primary); color: var(--lv-primary); box-shadow: 0 0 0 3px rgba(13,110,253,0.12); }
${e} .lv-step.active .lv-step-label { color: var(--lv-primary); }
${e} .lv-step.done .lv-step-circle { border-color: var(--lv-success); background: var(--lv-success); color: var(--lv-bg); }
${e} .lv-step.done .lv-step-label { color: var(--lv-success); }
${e} .lv-step.done + .lv-step-line { background: linear-gradient(90deg,var(--lv-success),rgba(0,229,160,0.4)); }

/* CONTENT */
${e} .lv-content { padding: 22px 28px 28px; }
${e} .lv-panel { display: none; }
${e} .lv-panel.visible { display: block; animation: lvFadeIn 0.3s ease forwards; }
@keyframes lvFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

/* VIDEO */
${e} .lv-video-wrapper { position: relative; width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-radius-inner); overflow: hidden; background: var(--lv-video-bg); border: 1px solid var(--lv-border); }
${e} .lv-video { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); display: none; }
${e} .lv-video-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--lv-text-muted); }
${e} .lv-video-placeholder svg { opacity: 0.25; }
${e} .lv-video-placeholder p { font-size: 13px; }
${e} .lv-video-overlay { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; display: none; }
${e} .lv-scan-line { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,transparent 0%,var(--lv-accent) 50%,transparent 100%); animation: lvScan 2.2s ease-in-out infinite; display: none; opacity: 0.55; }
@keyframes lvScan { 0% { top: 8%; opacity: 0; } 10% { opacity: 0.55; } 90% { opacity: 0.55; } 100% { top: 92%; opacity: 0; } }
${e} .lv-corner { position: absolute; width: 18px; height: 18px; display: none; }
${e} .lv-corner.tl { top: 10px; left: 10px; border-top: 2px solid var(--lv-accent); border-left: 2px solid var(--lv-accent); }
${e} .lv-corner.tr { top: 10px; right: 10px; border-top: 2px solid var(--lv-accent); border-right: 2px solid var(--lv-accent); }
${e} .lv-corner.bl { bottom: 10px; left: 10px; border-bottom: 2px solid var(--lv-accent); border-left: 2px solid var(--lv-accent); }
${e} .lv-corner.br { bottom: 10px; right: 10px; border-bottom: 2px solid var(--lv-accent); border-right: 2px solid var(--lv-accent); }

/* STEP 1 BOTTOM */
${e} .lv-step1-bottom { text-align: center; margin-top: 18px; }
${e} .lv-step1-bottom h2 { font-family: var(--lv-font-heading); font-size: 20px; font-weight: 700; margin-bottom: 7px; letter-spacing: -0.3px; }
${e} .lv-step1-bottom p { font-size: 13px; color: var(--lv-text-muted); line-height: 1.65; margin-bottom: 18px; }

/* ALERTS */
${e} .lv-alert { background: rgba(255,69,102,0.08); border: 1px solid rgba(255,69,102,0.28); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; display: none; text-align: left; }
${e} .lv-alert h3 { font-size: 13px; font-weight: 600; color: var(--lv-danger); margin-bottom: 5px; }
${e} .lv-alert p { font-size: 12px; color: var(--lv-text-muted); line-height: 1.55; }
${e} .lv-https-warning { display: none; background: rgba(255,165,0,0.1); border: 1px solid rgba(255,165,0,0.4); border-radius: 10px; padding: 12px 16px; margin-bottom: 16px; text-align: left; }
${e} .lv-https-warning h3 { font-size: 13px; font-weight: 600; color: #ffaa00; margin-bottom: 4px; }
${e} .lv-https-warning p { font-size: 12px; color: var(--lv-text-muted); line-height: 1.5; }

/* STEP 2 */
${e} .lv-step2-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
${e} .lv-step2-title { font-family: var(--lv-font-heading); font-size: 15px; font-weight: 600; color: var(--lv-text); }
${e} .lv-badge-live { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 100px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: rgba(0,229,160,0.12); color: var(--lv-success); border: 1px solid rgba(0,229,160,0.28); }
${e} .lv-badge-live::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--lv-success); animation: lvBlink 1.1s ease-in-out infinite; }
@keyframes lvBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
${e} .lv-video-mini-wrapper { position: relative; width: 100%; aspect-ratio: 4/3; border-radius: var(--lv-radius-inner); overflow: hidden; background: var(--lv-video-bg); border: 1px solid var(--lv-border); margin-bottom: 14px; }
${e} .lv-video-mini { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
${e} .lv-video-mini-wrapper { transition: border-color 0.3s; }
${e} .lv-mini-overlay { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
${e} .lv-oval-group { transform-origin: 200px 148px; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
${e} .lv-mini-oval-ring { transition: stroke 0.3s, stroke-width 0.3s, opacity 0.3s; }
${e} .lv-focus-bracket { fill: none; stroke: var(--lv-success); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 38; stroke-dashoffset: 38; opacity: 0; }
${e} .lv-video-mini-wrapper.lv-freeze { border-color: var(--lv-success); }
${e} .lv-video-mini-wrapper.lv-freeze .lv-video-mini { transform: scaleX(-1) scale(1.07); }
${e} .lv-video-mini-wrapper.lv-freeze .lv-oval-group { transform: scale(0.91); }
${e} .lv-video-mini-wrapper.lv-freeze .lv-mini-oval-ring { stroke: var(--lv-success); stroke-dasharray: none; opacity: 1; stroke-width: 2.5; filter: drop-shadow(0 0 6px var(--lv-success)); }
${e} .lv-video-mini-wrapper.lv-freeze .lv-focus-bracket { animation: lvBracketIn 0.3s ease forwards; }
${e} .lv-video-mini-wrapper.lv-freeze .lv-focus-brackets polyline:nth-child(1) { animation-delay: 0s; }
${e} .lv-video-mini-wrapper.lv-freeze .lv-focus-brackets polyline:nth-child(2) { animation-delay: 0.06s; }
${e} .lv-video-mini-wrapper.lv-freeze .lv-focus-brackets polyline:nth-child(3) { animation-delay: 0.12s; }
${e} .lv-video-mini-wrapper.lv-freeze .lv-focus-brackets polyline:nth-child(4) { animation-delay: 0.18s; }
@keyframes lvBracketIn { to { stroke-dashoffset: 0; opacity: 1; } }
${e} .lv-frames-counter { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 3px 8px; font-size: 11px; font-family: monospace; color: #fff; backdrop-filter: blur(4px); }
${e} .lv-challenge-box { text-align: center; padding: 10px 0 4px; }
${e} .lv-challenge-icon { font-size: 46px; margin-bottom: 10px; animation: lvFloat 2.2s ease-in-out infinite; display: block; line-height: 1; }
@keyframes lvFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
${e} .lv-challenge-text { font-family: var(--lv-font-heading); font-size: 22px; font-weight: 700; color: var(--lv-accent); margin-bottom: 5px; letter-spacing: -0.3px; }
${e} .lv-challenge-hint { font-size: 12px; color: var(--lv-text-muted); margin-bottom: 14px; }
${e} .lv-progress-container { margin: 0 0 4px; }
${e} .lv-progress-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--lv-text-muted); margin-bottom: 6px; font-weight: 500; }
${e} .lv-progress-track { height: 5px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: visible; border: 1px solid rgba(255,255,255,0.04); position: relative; }
${e} .lv-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg,var(--lv-primary),var(--lv-accent)); border-radius: 3px; transition: width 0.1s linear; position: relative; }
${e} .lv-progress-fill::after { content: ''; position: absolute; right: -4px; top: -3px; width: 11px; height: 11px; border-radius: 50%; background: var(--lv-primary); box-shadow: none; }
${e} .lv-spinner-box { display: none; flex-direction: column; align-items: center; gap: 14px; padding: 30px 0 10px; }
${e} .lv-spinner { width: 42px; height: 42px; border: 3px solid rgba(0,212,255,0.12); border-top-color: var(--lv-accent); border-radius: 50%; animation: lvSpin 0.75s linear infinite; }
@keyframes lvSpin { to { transform: rotate(360deg); } }
${e} .lv-spinner-text { font-size: 14px; color: var(--lv-text-muted); font-weight: 500; }
${e} .lv-spinner-msg { font-size: 11px; color: rgba(180,190,210,0.5); margin: 6px 0 0; min-height: 16px; transition: opacity 0.4s; }

/* STEP 3 RESULT */
${e} .lv-result-box { text-align: center; padding: 8px 0; }
${e} .lv-result-icon { width: 78px; height: 78px; border-radius: 50%; margin: 0 auto 18px; display: flex; align-items: center; justify-content: center; }
${e} .lv-result-icon.success { background: rgba(25,135,84,0.08); border: 2px solid var(--lv-success); box-shadow: none; }
${e} .lv-result-icon.failure { background: rgba(220,53,69,0.08); border: 2px solid var(--lv-danger); box-shadow: none; }
${e} .lv-check-path { stroke: var(--lv-success); stroke-width: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: lvDrawCheck 0.5s cubic-bezier(0.65,0,0.35,1) forwards 0.15s; }
@keyframes lvDrawCheck { to { stroke-dashoffset: 0; } }
${e} .lv-x-line { stroke: var(--lv-danger); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 25; stroke-dashoffset: 25; }
${e} .lv-x-line:nth-child(1) { animation: lvDrawX 0.3s ease forwards 0.1s; }
${e} .lv-x-line:nth-child(2) { animation: lvDrawX 0.3s ease forwards 0.3s; }
@keyframes lvDrawX { to { stroke-dashoffset: 0; } }
${e} .lv-result-title { font-family: var(--lv-font-heading); font-size: 21px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.3px; }
${e} .lv-result-title.success { color: var(--lv-success); }
${e} .lv-result-title.failure { color: var(--lv-danger); }
${e} .lv-result-reason { font-size: 13px; color: var(--lv-text-muted); line-height: 1.65; margin-bottom: 14px; padding: 0 4px; }
${e} .lv-result-meta { display: flex; justify-content: center; gap: 24px; margin-bottom: 14px; padding: 12px 20px; background: var(--lv-surface2); border: 1px solid var(--lv-border); border-radius: 10px; }
${e} .lv-meta-item { display: flex; flex-direction: column; align-items: center; gap: 3px; }
${e} .lv-meta-value { font-family: var(--lv-font-heading); font-size: 22px; font-weight: 700; color: var(--lv-accent); }
${e} .lv-meta-label { font-size: 10px; color: var(--lv-text-muted); text-transform: uppercase; letter-spacing: 0.6px; }
${e} .lv-result-detail { font-size: 10px; color: rgba(136,146,176,0.55); font-family: 'Space Grotesk',monospace; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.05); padding: 8px 12px; border-radius: 8px; margin-bottom: 18px; text-align: left; word-break: break-all; line-height: 1.5; }
${e} .lv-confidence-wrap { width: 100%; margin-bottom: 16px; }
${e} .lv-confidence-label { display: flex; justify-content: space-between; font-size: 11px; color: rgba(180,190,210,0.7); margin-bottom: 5px; }
${e} .lv-confidence-track { height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; }
${e} .lv-confidence-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg,var(--lv-success),#00c896); width: 0%; transition: width 1s cubic-bezier(.4,0,.2,1); }
${e} .lv-snapshot-container { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-bottom: 16px; }
${e} .lv-snapshot-img { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; border: 2px solid var(--lv-success); box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
${e} .lv-snapshot-label { font-size: 10px; color: var(--lv-success); opacity: 0.75; letter-spacing: 0.5px; }
${e} .lv-error-card { background: rgba(255,69,102,0.07); border: 1px solid rgba(255,69,102,0.25); border-radius: 10px; padding: 16px; margin-bottom: 20px; text-align: left; }
${e} .lv-error-card h3 { font-size: 14px; font-weight: 600; color: var(--lv-danger); margin-bottom: 6px; }
${e} .lv-error-card p { font-size: 12px; color: var(--lv-text-muted); line-height: 1.6; word-break: break-word; }

/* GALLERY */
${e} .lv-gallery-section { width: 100%; margin-top: 18px; }
${e} .lv-gallery-toggle { background: none; border: none; color: rgba(180,190,210,0.55); font-size: 11px; cursor: pointer; padding: 0; display: flex; align-items: center; gap: 5px; letter-spacing: .4px; font-family: var(--lv-font-body); }
${e} .lv-gallery-toggle:hover { color: rgba(255,255,255,0.75); }
${e} .lv-photo-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; margin-top: 10px; }
${e} .lv-photo-thumb { aspect-ratio: 1; object-fit: cover; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); cursor: pointer; transition: transform .2s,border-color .2s; width: 100%; }
${e} .lv-photo-thumb:hover { transform: scale(1.06); border-color: rgba(255,255,255,0.3); }

/* BUTTONS */
${e} .lv-btn { width: 100%; padding: 13px 24px; border-radius: 10px; border: none; font-family: var(--lv-font-body); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.2px; margin-top: 2px; display: block; }
${e} .lv-btn:disabled { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
${e} .lv-btn + .lv-btn { margin-top: 8px; }
${e} .lv-btn-primary { background: var(--lv-primary); color: #fff; box-shadow: 0 2px 6px rgba(13,110,253,0.25); }
${e} .lv-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,110,253,0.35); }
${e} .lv-btn-success { background: var(--lv-success); color: #fff; box-shadow: 0 2px 6px rgba(25,135,84,0.25); }
${e} .lv-btn-success:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(25,135,84,0.35); }
${e} .lv-btn-ghost { background: rgba(255,255,255,0.04); color: var(--lv-text); border: 1px solid var(--lv-border); }
${e} .lv-btn-ghost:hover { background: rgba(255,255,255,0.07); border-color: rgba(0,212,255,0.3); }
${e} .lv-btn-ghost-sm { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(180,190,210,0.6); font-size: 12px; padding: 7px 18px; border-radius: 8px; cursor: pointer; transition: border-color .2s,color .2s; margin-top: 10px; font-family: var(--lv-font-body); }
${e} .lv-btn-ghost-sm:hover { border-color: rgba(255,255,255,0.35); color: rgba(255,255,255,0.85); }

/* CANVAS */
${e} .lv-canvas { display: none; }

/* RESPONSIVE */
@media (max-width: 480px) {
    ${e} .lv-card { max-width: 100%; border-radius: 0; border-left: none; border-right: none; border-top: none; }
    ${e} .lv-header { padding: 16px 18px 14px; }
    ${e} .lv-header-text h1 { font-size: 18px; }
    ${e} .lv-steps { padding: 14px 18px 12px; }
    ${e} .lv-step-label { font-size: 9px; }
    ${e} .lv-step-circle { width: 26px; height: 26px; font-size: 11px; }
    ${e} .lv-content { padding: 16px 18px max(24px,env(safe-area-inset-bottom)); }
    ${e} .lv-step1-bottom h2 { font-size: 17px; }
    ${e} .lv-step1-bottom p { font-size: 12px; }
    ${e} .lv-challenge-icon { font-size: 38px; }
    ${e} .lv-challenge-text { font-size: 18px; }
    ${e} .lv-challenge-hint { font-size: 11px; }
    ${e} .lv-result-title { font-size: 18px; }
    ${e} .lv-result-reason { font-size: 12px; }
    ${e} .lv-meta-value { font-size: 19px; }
    ${e} .lv-btn { padding: 12px 20px; }
}
@media (max-width: 360px) {
    ${e} .lv-challenge-text { font-size: 16px; }
    ${e} .lv-header-text p { display: none; }
}

/* TRIGGER BUTTON */
${e} .lv-trigger-btn { display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 14px 26px; border: none; border-radius: 14px; cursor: pointer; font-family: var(--lv-font-body); font-size: 15px; font-weight: 600; letter-spacing: 0.15px; color: #fff; background: var(--lv-primary); box-shadow: 0 4px 16px rgba(0,0,0,0.2); position: relative; overflow: hidden; transition: transform 0.18s ease, box-shadow 0.18s ease; }
${e} .lv-trigger-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(0,0,0,0.4), 0 0 32px color-mix(in srgb, var(--lv-primary) 40%, transparent), 0 1px 0 rgba(255,255,255,0.12) inset; }
${e} .lv-trigger-btn:active { transform: translateY(0); box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
${e} .lv-trigger-icon { width: 19px; height: 19px; flex-shrink: 0; }
${e} .lv-trigger-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--lv-success); box-shadow: 0 0 0 0 color-mix(in srgb, var(--lv-success) 40%, transparent); animation: lvTrigDot 2.2s ease-in-out infinite; flex-shrink: 0; }
@keyframes lvTrigDot { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb,var(--lv-success) 50%,transparent); } 60% { box-shadow: 0 0 0 7px color-mix(in srgb,var(--lv-success) 0%,transparent); } }

/* MODAL */
${e} .lv-modal-backdrop { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
${e} .lv-modal-backdrop.open { opacity: 1; pointer-events: auto; }
${e} .lv-modal-backdrop .lv-card { max-width: 430px; width: 100%; max-height: 92dvh; overflow-y: auto; overflow-x: hidden; position: relative; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.15) transparent; border: 1px solid var(--lv-border); box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.12); transform: translateY(36px) scale(0.96); transition: transform 0.4s cubic-bezier(0.34,1.25,0.64,1); }
${e} .lv-modal-backdrop.open .lv-card { transform: translateY(0) scale(1); }
${e} .lv-modal-close { position: absolute; top: 13px; right: 13px; z-index: 10; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: var(--lv-text-muted); width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 18px; line-height: 1; display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s, color 0.2s; font-family: sans-serif; flex-shrink: 0; }
${e} .lv-modal-close:hover { background: rgba(255,69,102,0.15); border-color: rgba(255,69,102,0.45); color: var(--lv-danger); }
${e} .lv-modal-backdrop .lv-video-wrapper { aspect-ratio: 3/4; }
${e} .lv-modal-backdrop .lv-video-mini-wrapper { aspect-ratio: 3/4; }
@media (max-width: 520px) {
    ${e} .lv-modal-backdrop { padding: 0; align-items: flex-end; }
    ${e} .lv-modal-backdrop .lv-card { max-width: 100%; max-height: 96dvh; border-radius: 22px 22px 0 0; border-left: none; border-right: none; border-bottom: none; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.32,0.72,0,1); }
    ${e} .lv-modal-backdrop.open .lv-card { transform: translateY(0); }
}
`}async function m(){let i=[{facingMode:"user",width:{ideal:640},height:{ideal:480}},{facingMode:"user",width:{ideal:480},height:{ideal:360}},{facingMode:"user",width:{ideal:320},height:{ideal:240}},{facingMode:"user"}];for(let t of i)try{return await navigator.mediaDevices.getUserMedia({video:t,audio:!1})}catch(e){if(e.name==="OverconstrainedError"||e.name==="ConstraintNotSatisfiedError")continue;throw e}throw new Error("No se encontr\xF3 una configuraci\xF3n de c\xE1mara compatible con este dispositivo.")}function y(i){i&&i.getTracks().forEach(t=>t.stop())}function _(i,t){let e=i.name;return e==="NotAllowedError"||e==="PermissionDeniedError"?t.errPermission:e==="NotFoundError"||e==="DevicesNotFoundError"?t.errNotFound:e==="NotReadableError"||e==="TrackStartError"?t.errBusy:e==="OverconstrainedError"?t.errConstrained:e==="NotSupportedError"?t.errHTTPS:{title:t.errGeneric.title,desc:`${t.errGeneric.desc} ${i.message}`}}async function $({endpoint:i,frames:t,challenge:e,snapshot:a,timeoutMs:r,csrfToken:s}){let o=new AbortController,l=setTimeout(()=>o.abort(),r),n=s??document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")??null,c={"Content-Type":"application/json"};n&&(c["X-CSRF-TOKEN"]=n);try{let d=await fetch(i,{method:"POST",headers:c,body:JSON.stringify({frames:t,challenge:e,snapshot:a}),signal:o.signal});if(clearTimeout(l),!d.ok){let p=await d.json().catch(()=>({error:`Error HTTP ${d.status}`}));throw new Error(p.error||`Error del servidor: ${d.status}`)}return await d.json()}catch(d){throw clearTimeout(l),d.name==="AbortError"?new Error(`La solicitud super\xF3 el l\xEDmite de ${r/1e3}s. Verifica que el servidor est\xE9 activo y que Python/MediaPipe est\xE9n instalados.`):d}}var w=0,g=class{constructor(t,e={}){if(w++,this._id="lv-"+w,this._stream=null,this._frames=[],this._challenge=null,this._captureId=null,this._progressId=null,this._captureStartTime=null,this.cfg=Object.assign({},x,e),this.cfg.theme=Object.assign({},u,e.theme||{}),this.cfg.texts=this._mergeTexts(f,e.texts||{}),typeof t=="string"?this._container=document.querySelector(t):this._container=t,!this._container){console.error("[LivenessWidget] Container no encontrado:",t);return}this._injectStyles(),this._render(),this._bindDOM(),this._detectEnvironment()}open(){this._modal&&this._modal.classList.add("open")}close(){this._modal&&this._modal.classList.remove("open"),this.reset()}reset(){this._limpiarIntervalos(),this._detenerCamara(),this._irAPaso(1),this._resetUI()}destroy(){this._limpiarIntervalos(),this._detenerCamara(),this._styleTag&&this._styleTag.remove(),this._root&&this._root.remove()}_mergeTexts(t,e){let a=Object.assign({},t,e);return e.challenges&&(a.challenges=Object.assign({},t.challenges,e.challenges)),a}_injectStyles(){this._styleTag=document.createElement("style"),this._styleTag.textContent=b(this.cfg.theme,this._id),document.head.appendChild(this._styleTag)}_render(){let t=this.cfg.texts,e=this.cfg,a=this._id,r=e.theme.logoHtml||this._defaultLogo();this._root=document.createElement("div"),this._root.setAttribute("data-liveness-widget",a),this._root.innerHTML=`
<div class="lv-card">
  <!-- HEADER -->
  <div class="lv-header">
    <div class="lv-logo-icon">${r}</div>
    <div class="lv-header-text">
      <h1>${this._esc(e.theme.brandName)}</h1>
      <p>${this._esc(e.theme.brandSubtitle)}</p>
    </div>
  </div>

  <!-- STEPS -->
  <div class="lv-steps">
    <div class="lv-step active" data-lv-step="1">
      <div class="lv-step-circle" data-lv-circle="1">1</div>
      <span class="lv-step-label">${this._esc(t.labelStep1)}</span>
    </div>
    <div class="lv-step-line"></div>
    <div class="lv-step" data-lv-step="2">
      <div class="lv-step-circle" data-lv-circle="2">2</div>
      <span class="lv-step-label">${this._esc(t.labelStep2)}</span>
    </div>
    <div class="lv-step-line"></div>
    <div class="lv-step" data-lv-step="3">
      <div class="lv-step-circle" data-lv-circle="3">3</div>
      <span class="lv-step-label">${this._esc(t.labelStep3)}</span>
    </div>
  </div>

  <!-- CONTENT -->
  <div class="lv-content">

    <!-- PASO 1 -->
    <div class="lv-panel visible" data-lv-panel="1">
      <div class="lv-video-wrapper">
        <video class="lv-video" data-lv="video" autoplay playsinline webkit-playsinline muted></video>
        <div class="lv-video-placeholder" data-lv="placeholder">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
            <path d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14"/>
            <rect x="3" y="6" width="12" height="12" rx="2"/>
          </svg>
          <p>La c\xE1mara aparecer\xE1 aqu\xED</p>
        </div>
        <svg class="lv-video-overlay" data-lv="overlay" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="${a}-oval">
              <rect width="400" height="300" fill="white"/>
              <ellipse cx="200" cy="148" rx="108" ry="132" fill="black"/>
            </mask>
          </defs>
          <rect width="400" height="300" fill="rgba(0,0,0,0.4)" mask="url(#${a}-oval)"/>
          <ellipse cx="200" cy="148" rx="108" ry="132" fill="none" stroke="#00d4ff" stroke-width="1.8" stroke-dasharray="9 5" opacity="0.65"/>
        </svg>
        <div class="lv-corner tl" data-lv="cTL"></div>
        <div class="lv-corner tr" data-lv="cTR"></div>
        <div class="lv-corner bl" data-lv="cBL"></div>
        <div class="lv-corner br" data-lv="cBR"></div>
        <div class="lv-scan-line" data-lv="scanLine"></div>
      </div>
      <div class="lv-step1-bottom">
        <h2 data-lv="s1Title">${this._esc(t.step1Title)}</h2>
        <p data-lv="s1Desc">${this._esc(t.step1Desc)}</p>
        <div class="lv-https-warning" data-lv="httpsWarning">
          <h3>${this._esc(t.httpsWarningTitle)}</h3>
          <p>${this._esc(t.httpsWarningDesc)}</p>
        </div>
        <div class="lv-alert" data-lv="camAlert">
          <h3 data-lv="camAlertTitle">${this._esc(t.camErrTitle)}</h3>
          <p data-lv="camAlertDesc">${this._esc(t.camErrDesc)}</p>
        </div>
        <button type="button" class="lv-btn lv-btn-primary" data-lv="btnStart">${this._esc(t.btnStart)}</button>
        <button type="button" class="lv-btn lv-btn-primary" data-lv="btnContinue" style="display:none">${this._esc(t.btnContinue)}</button>
      </div>
    </div>

    <!-- PASO 2 -->
    <div class="lv-panel" data-lv-panel="2">
      <div class="lv-step2-header">
        <span class="lv-step2-title">${this._esc(t.step2Title)}</span>
        <span class="lv-badge-live">${this._esc(t.badgeLive)}</span>
      </div>
      <div class="lv-video-mini-wrapper">
        <video class="lv-video-mini" data-lv="videoMini" autoplay playsinline webkit-playsinline muted></video>
        <div class="lv-frames-counter" data-lv="framesCounter">0 frames</div>
        <svg class="lv-mini-overlay" data-lv="miniOverlay" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><mask id="${a}-oval2"><rect width="400" height="300" fill="white"/><ellipse cx="200" cy="148" rx="108" ry="132" fill="black"/></mask></defs><rect width="400" height="300" fill="rgba(8,12,24,0.28)" mask="url(#${a}-oval2)"/><g class="lv-oval-group"><ellipse class="lv-mini-oval-ring" cx="200" cy="148" rx="108" ry="132" fill="none" stroke="#00d4ff" stroke-width="2" stroke-dasharray="9 5" opacity="0.45"/><g class="lv-focus-brackets"><polyline class="lv-focus-bracket" points="110,28 92,28 92,48"/><polyline class="lv-focus-bracket" points="290,28 308,28 308,48"/><polyline class="lv-focus-bracket" points="110,268 92,268 92,248"/><polyline class="lv-focus-bracket" points="290,268 308,268 308,248"/></g></g></svg>
      </div>
      <div class="lv-challenge-box" data-lv="challengeBox">
        <span class="lv-challenge-icon" data-lv="chIcon">\u{1F441}\uFE0F</span>
        <div class="lv-challenge-text" data-lv="chText"></div>
        <div class="lv-challenge-hint" data-lv="chHint"></div>
      </div>
      <div class="lv-progress-container" data-lv="progressBox">
        <div class="lv-progress-meta">
          <span>${this._esc(t.capturingFrames)}</span>
          <span data-lv="progTime">${(this.cfg.captureDurationMs/1e3).toFixed(1)}s</span>
        </div>
        <div class="lv-progress-track">
          <div class="lv-progress-fill" data-lv="progFill"></div>
        </div>
      </div>
      <button type="button" class="lv-btn-ghost-sm" data-lv="btnCancelar" style="display:none">${this._esc(t.btnCancel)}</button>
      <div class="lv-spinner-box" data-lv="spinnerBox">
        <div class="lv-spinner"></div>
        <span class="lv-spinner-text">${this._esc(t.spinnerText)}</span>
        <p class="lv-spinner-msg" data-lv="spinnerMsg"></p>
      </div>
    </div>

    <!-- PASO 3 -->
    <div class="lv-panel" data-lv-panel="3">
      <div class="lv-result-box" data-lv="resultBox"></div>
    </div>

  </div><!-- .lv-content -->
</div><!-- .lv-card -->
<canvas class="lv-canvas" data-lv="canvas" width="640" height="480"></canvas>
`;this._modal=null;if(this.cfg.renderMode==="modal"){let tb=document.createElement("button");tb.type="button";tb.className="lv-trigger-btn"+(this.cfg.triggerClass?" "+this.cfg.triggerClass:"");tb.innerHTML=`<span class="lv-trigger-dot"></span><svg class="lv-trigger-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="5.5" width="17" height="12" rx="2.5"/><circle cx="10" cy="11.5" r="3"/><path d="M6.5 5.5l1.2-2.3h4.6l1.2 2.3"/></svg><span>${this._esc(this.cfg.triggerLabel)}</span>`;tb.addEventListener("click",()=>this.open());this._root.insertBefore(tb,this._root.firstChild);let n=document.createElement("div");n.className="lv-modal-backdrop";let c=document.createElement("button");c.type="button";c.className="lv-modal-close";c.setAttribute("aria-label","Cerrar");c.innerHTML="&times;";c.addEventListener("click",()=>this.close());n.addEventListener("click",ev=>{ev.target===n&&this.close()});let p=this._root.querySelector(".lv-card");n.appendChild(c);n.appendChild(p);this._root.appendChild(n);this._modal=n;}this._container.appendChild(this._root)}_bindDOM(){let t=e=>this._root.querySelector(`[data-lv="${e}"]`);this._el={video:t("video"),placeholder:t("placeholder"),overlay:t("overlay"),scanLine:t("scanLine"),cTL:t("cTL"),cTR:t("cTR"),cBL:t("cBL"),cBR:t("cBR"),s1Title:t("s1Title"),s1Desc:t("s1Desc"),httpsWarning:t("httpsWarning"),camAlert:t("camAlert"),camAlertTitle:t("camAlertTitle"),camAlertDesc:t("camAlertDesc"),btnStart:t("btnStart"),btnContinue:t("btnContinue"),videoMini:t("videoMini"),framesCounter:t("framesCounter"),miniOverlay:t("miniOverlay"),chIcon:t("chIcon"),chText:t("chText"),chHint:t("chHint"),challengeBox:t("challengeBox"),progressBox:t("progressBox"),progFill:t("progFill"),progTime:t("progTime"),btnCancelar:t("btnCancelar"),spinnerBox:t("spinnerBox"),spinnerMsg:t("spinnerMsg"),resultBox:t("resultBox"),canvas:t("canvas")},this._el.btnStart.addEventListener("click",()=>this._iniciarCamara()),this._el.btnContinue.addEventListener("click",()=>this._irAPaso2()),this._el.btnCancelar.addEventListener("click",()=>this._cancelarCaptura())}_detectEnvironment(){let t=location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1"||location.hostname==="lvh.me"||location.hostname.endsWith(".lvh.me"),e=/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);!t&&e&&(this._el.httpsWarning.style.display="block")}_irAPaso(t){this._root.querySelectorAll("[data-lv-panel]").forEach(e=>{e.classList.toggle("visible",+e.dataset.lvPanel===t)}),[1,2,3].forEach(e=>{let a=this._root.querySelector(`[data-lv-step="${e}"]`),r=this._root.querySelector(`[data-lv-circle="${e}"]`);a.classList.remove("active","done"),e<t?(a.classList.add("done"),r.textContent="\u2713"):r.textContent=String(e),e===t&&a.classList.add("active")})}async _iniciarCamara(){if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){let a=location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1"||location.hostname==="lvh.me"||location.hostname.endsWith(".lvh.me")?this.cfg.texts.errNoAPI.generic:this.cfg.texts.errNoAPI.notSecure;this._mostrarAlertaCamara("\u274C C\xE1mara no disponible",a);return}let t=this._el.btnStart;t.disabled=!0,t.textContent=this.cfg.texts.btnStarting;try{this._stream=await m();let e=this._el.video;e.srcObject=this._stream,e.style.display="block",await e.play().catch(()=>{}),this._el.placeholder.style.display="none",this._el.overlay.style.display="block",this._el.scanLine.style.display="block",["cTL","cTR","cBL","cBR"].forEach(a=>this._el[a].style.display="block"),this._el.s1Title.textContent=this.cfg.texts.step1Ready,this._el.s1Desc.textContent=this.cfg.texts.step1ReadyDesc,t.style.display="none",this._el.btnContinue.style.display="block",this._el.camAlert.style.display="none"}catch(e){t.disabled=!1,t.textContent=this.cfg.texts.btnStart;let a=_(e,this.cfg.texts);this._mostrarAlertaCamara(a.title,a.desc)}}_mostrarAlertaCamara(t,e){this._el.camAlertTitle.textContent=t,this._el.camAlertDesc.textContent=e,this._el.camAlert.style.display="block"}_irAPaso2(){let t=this.cfg.challenges.filter(s=>this.cfg.texts.challenges[s]),e=t[Math.floor(Math.random()*t.length)],a=this.cfg.texts.challenges[e];this._challenge=a.text,this._el.chIcon.textContent=a.icon,this._el.chText.textContent=a.text,this._el.chHint.textContent=a.hint;let r=this._el.videoMini;r.srcObject=this._stream,r.play().catch(()=>{}),this._frames=[],this._el.progFill.style.width="0%",this._el.progTime.textContent=(this.cfg.captureDurationMs/1e3).toFixed(1)+"s",this._el.framesCounter.textContent="0 frames",this._el.challengeBox.style.display="block",this._el.progressBox.style.display="block",this._el.spinnerBox.style.display="none",this._el.btnCancelar.style.display="block",this._irAPaso(2),setTimeout(()=>this._iniciarCaptura(),350)}_iniciarCaptura(){let t=this._el.canvas,e=this._el.videoMini,a=Date.now(),r=this.cfg.captureDurationMs,s=this.cfg.captureIntervalMs,o=()=>{let n=e.videoWidth||640,c=e.videoHeight||480;(t.width!==n||t.height!==c)&&(t.width=n,t.height=c)};o();let l=t.getContext("2d",{willReadFrequently:!0});this._captureId=setInterval(()=>{if(Date.now()-a>=r){clearInterval(this._captureId),clearInterval(this._progressId),this._el.chHint.textContent="Mantén la posición…",e.closest(".lv-video-mini-wrapper").classList.add("lv-freeze"),setTimeout(()=>this._enviarAlServidor(),450);return}if(!(e.readyState<2)){o();try{l.save(),l.translate(t.width,0),l.scale(-1,1),l.drawImage(e,0,0,t.width,t.height),l.restore(),this._frames.push(t.toDataURL("image/jpeg",.75));let c=this._frames.length;this._el.framesCounter.textContent=c+" frame"+(c!==1?"s":"")}catch{}}},s),this._progressId=setInterval(()=>{let n=Date.now()-a,c=Math.min(n/r*100,100),d=Math.max((r-n)/1e3,0);this._el.progFill.style.width=c+"%",this._el.progTime.textContent=d.toFixed(1)+"s",n>=r&&clearInterval(this._progressId)},50)}async _enviarAlServidor(){this._el.challengeBox.style.display="none",this._el.progressBox.style.display="none",this._el.btnCancelar.style.display="none",this._el.spinnerBox.style.display="flex";let t=this.cfg.texts.spinnerMessages,e=0;this._el.spinnerMsg.textContent=t[0];let a=setInterval(()=>{e=(e+1)%t.length,this._el.spinnerMsg.textContent=t[e]},2500);this._detenerCamara();let r=Math.floor(this._frames.length*.75),s=this._frames[r]||this._frames[0]||null,o=s?await this._redimensionarSnapshot(s):null;try{let l=await $({endpoint:this.cfg.endpoint,frames:this._frames,challenge:this._challenge,snapshot:o,timeoutMs:this.cfg.fetchTimeoutMs,csrfToken:this.cfg.csrfToken??null});clearInterval(a),this._irAPaso(3),this._mostrarResultado(l)}catch(l){clearInterval(a),this._irAPaso(3),this._mostrarError(l.message)}}_mostrarResultado(t){let e=this.cfg.texts,a=this._el.resultBox;if(t.passed){t.token&&this._escribirToken(t.token),t.photo_url&&this._escribirFoto(t.photo_url);let r=t.photo_url&&this.cfg.showSnapshot!==false?`<div class="lv-snapshot-container">
                     <img src="${this._esc(t.photo_url)}" alt="Captura" class="lv-snapshot-img">
                     <span class="lv-snapshot-label">${this._esc(e.snapshotLabel)}</span>
                   </div>`:"",s=t.confidence!==void 0?`<div class="lv-confidence-wrap">
                     <div class="lv-confidence-label">
                       <span>${this._esc(e.confidenceLabel)}</span>
                       <span>${t.confidence}%</span>
                     </div>
                     <div class="lv-confidence-track">
                       <div class="lv-confidence-fill" data-lv-conf="${t.confidence}"></div>
                     </div>
                   </div>`:"";a.innerHTML=`
              <div class="lv-result-icon success">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path class="lv-check-path" d="M10 22 L19 32 L34 13"/>
                </svg>
              </div>
              <div class="lv-result-title success">${this._esc(e.resultSuccess)}</div>
              <p class="lv-result-reason">${this._esc(t.reason||e.resultSuccessDefault)}</p>
              ${r}
              ${s}
              <div class="lv-result-meta">
                <div class="lv-meta-item">
                  <span class="lv-meta-value">${t.frames_analyzed||0}</span>
                  <span class="lv-meta-label">${this._esc(e.framesLabel)}</span>
                </div>
                <div class="lv-meta-item">
                  <span class="lv-meta-value" style="color:var(--lv-success)">\u2713</span>
                  <span class="lv-meta-label">${this._esc(e.verifiedLabel)}</span>
                </div>
              </div>
              ${t.detail?`<div class="lv-result-detail">${this._esc(t.detail)}</div>`:""}
              <button type="button" class="lv-btn lv-btn-success" data-lv-action="reiniciar">${this._esc(e.btnNewVerification)}</button>
              <div class="lv-gallery-section" data-lv="gallerySection" style="display:none">
                <button type="button" class="lv-gallery-toggle" data-lv-action="toggleGallery">
                  <span data-lv="galleryArrow">\u25B8</span> ${this._esc(e.previousCaptures||"Capturas anteriores")}
                </button>
                <div data-lv="photoGrid" style="display:none"></div>
              </div>
            `,t.confidence!==void 0&&setTimeout(()=>{let o=a.querySelector("[data-lv-conf]");o&&(o.style.width=t.confidence+"%")},80),this.cfg.showGallery!==false&&this._cargarGaleria(a),typeof this.cfg.onSuccess=="function"&&this.cfg.onSuccess(t)}else a.innerHTML=`
              <div class="lv-result-icon failure">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <line class="lv-x-line" x1="14" y1="14" x2="30" y2="30"/>
                  <line class="lv-x-line" x1="30" y1="14" x2="14" y2="30"/>
                </svg>
              </div>
              <div class="lv-result-title failure">${this._esc(e.resultFailure)}</div>
              <p class="lv-result-reason">${this._esc(t.reason||e.resultFailureDefault)}</p>
              ${t.detail?`<div class="lv-result-detail">${this._esc(t.detail)}</div>`:""}
              <button type="button" class="lv-btn lv-btn-primary" data-lv-action="reiniciar">${this._esc(e.btnRetry)}</button>
            `,typeof this.cfg.onFailure=="function"&&this.cfg.onFailure(t.reason,t);a.addEventListener("click",r=>{let s=r.target.closest("[data-lv-action]");s&&(s.dataset.lvAction==="reiniciar"&&this.reset(),s.dataset.lvAction==="toggleGallery"&&this._toggleGallery(a))})}_mostrarError(t){let e=this.cfg.texts,a=this._el.resultBox;a.innerHTML=`
          <div class="lv-error-card">
            <h3>${this._esc(e.errorTitle)}</h3>
            <p>${this._esc(t)}</p>
          </div>
          <button type="button" class="lv-btn lv-btn-ghost" data-lv-action="reiniciar">${this._esc(e.btnRetryConnection)}</button>
        `,a.addEventListener("click",r=>{r.target.closest('[data-lv-action="reiniciar"]')&&this.reset()}),typeof this.cfg.onError=="function"&&this.cfg.onError(t)}_cancelarCaptura(){this._limpiarIntervalos(),this._frames=[];let t=this._el.video;this._stream&&(t.srcObject=this._stream,t.style.display="block",t.play().catch(()=>{})),this._el.progFill.style.width="0%",this._el.progTime.textContent=(this.cfg.captureDurationMs/1e3).toFixed(1)+"s",this._el.framesCounter.textContent="0 frames",this._el.challengeBox.style.display="block",this._el.progressBox.style.display="block",this._el.spinnerBox.style.display="none",this._irAPaso(1),typeof this.cfg.onCancel=="function"&&this.cfg.onCancel()}_resetUI(){let t=this._el.video;t.srcObject=null,t.style.display="none",this._el.placeholder.style.display="flex",this._el.overlay.style.display="none",this._el.scanLine.style.display="none",["cTL","cTR","cBL","cBR"].forEach(a=>this._el[a].style.display="none"),this._el.camAlert.style.display="none",this._el.s1Title.textContent=this.cfg.texts.step1Title,this._el.s1Desc.textContent=this.cfg.texts.step1Desc;let e=this._el.btnStart;e.disabled=!1,e.textContent=this.cfg.texts.btnStart,e.style.display="block",this._el.btnContinue.style.display="none",this._el.btnCancelar.style.display="none",this._frames=[],this._challenge=null}_escribirToken(t){if(this.cfg.tokenInputSelector){let e=document.querySelector(this.cfg.tokenInputSelector);e&&(e.value=t,e.dispatchEvent(new Event("change")))}if(this.cfg.tokenInputName){let e=this._container.closest("form");if(e){let a=e.querySelector(`[name="${this.cfg.tokenInputName}"]`);a||(a=document.createElement("input"),a.type="hidden",a.name=this.cfg.tokenInputName,e.appendChild(a)),a.value=t,a.dispatchEvent(new Event("change"))}}}_redimensionarSnapshot(t){let e=this.cfg.photoMaxWidth,a=this.cfg.photoMaxHeight,r=this.cfg.photoQuality??.82;return!e&&!a?t:new Promise(s=>{let o=new Image;o.onload=()=>{let l=o.naturalWidth,n=o.naturalHeight,c=e?e/l:1/0,d=a?a/n:1/0,p=Math.min(1,c,d);l=Math.round(l*p),n=Math.round(n*p);let v=document.createElement("canvas");v.width=l,v.height=n,v.getContext("2d").drawImage(o,0,0,l,n),s(v.toDataURL("image/jpeg",r))},o.onerror=()=>s(t),o.src=t})}_escribirFoto(t){if(this.cfg.photoInputSelector){let e=document.querySelector(this.cfg.photoInputSelector);e&&(e.value=t,e.dispatchEvent(new Event("change")))}if(this.cfg.photoInputName){let e=this._container.closest("form");if(e){let a=e.querySelector(`[name="${this.cfg.photoInputName}"]`);a||(a=document.createElement("input"),a.type="hidden",a.name=this.cfg.photoInputName,e.appendChild(a)),a.value=t,a.dispatchEvent(new Event("change"))}}}_cargarGaleria(t){let e=this.cfg.photosEndpoint||"get_photos.php";fetch(e).then(a=>a.json()).then(a=>{if(!a.photos||a.photos.length<2)return;let r=t.querySelector('[data-lv="gallerySection"]'),s=t.querySelector('[data-lv="photoGrid"]');!r||!s||(s.innerHTML=a.photos.map(o=>`<img src="${this._esc(o.url)}" class="lv-photo-thumb" alt="${this._esc(o.challenge)}" title="${this._esc(o.date)}">`).join(""),s.className="lv-photo-grid",r.style.display="block")}).catch(()=>{})}_toggleGallery(t){let e=t.querySelector('[data-lv="photoGrid"]'),a=t.querySelector('[data-lv="galleryArrow"]');if(!e)return;let r=e.style.display!=="none";e.style.display=r?"none":"block",a.textContent=r?"\u25B8":"\u25BE"}_limpiarIntervalos(){clearInterval(this._captureId),clearInterval(this._progressId)}_detenerCamara(){y(this._stream),this._stream=null}_esc(t){return typeof t!="string"?String(t??""):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}_defaultLogo(){return`<svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="11" fill="url(#lvGrad${this._id})"/>
            <circle cx="21" cy="15.5" r="5.5" stroke="white" stroke-width="1.6"/>
            <path d="M11 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="white" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="30" cy="11" r="5" fill="rgba(0,229,160,0.25)" stroke="#00e5a0" stroke-width="1.2"/>
            <path d="M27.5 11l1.8 1.8 3-3" stroke="#00e5a0" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
                <linearGradient id="lvGrad${this._id}" x1="0" y1="0" x2="42" y2="42">
                    <stop offset="0%"   stop-color="#0066ff"/>
                    <stop offset="100%" stop-color="#0044bb"/>
                </linearGradient>
            </defs>
        </svg>`}};return I(A);})();
if(typeof window!=="undefined"){window.LivenessWidget=LivenessWidgetLib.LivenessWidget;}
//# sourceMappingURL=liveness-widget.umd.js.map
