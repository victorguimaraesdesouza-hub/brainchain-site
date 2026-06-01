/* ============================================================
   BrainChain · cockpit.js
   Live animated multi-pane IDE simulation.
   Operates on every <div class="bc-cockpit" data-cockpit="...">.
============================================================ */
(function () {
  'use strict';

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isWide  = () => window.matchMedia('(min-width: 1024px)').matches;
  const versionLabel = (kind) => {
    const siteVersion = window.BrainChainSiteVersion;
    return siteVersion ? siteVersion.format(kind) : '0.0.8 Alpha';
  };

  /* ---------- Scripts per agent (formal PT-BR) ---------- */
  const SCRIPTS = {
    claude: [
      { t: 'cmd',  txt: '$ claude code --workspace ~/projeto' },
      { t: 'ok',   txt: '✓ OAuth Anthropic · Claude Opus 4.7' },
      { t: 'wait', txt: '⠿ Analisando estrutura do repositório…', delay: 400 },
      { t: 'ok',   txt: '✓ Lido src/auth/middleware.ts (4.2k tokens)' },
      { t: 'ok',   txt: '✓ Lido src/payments/stripe.ts (18.4k tokens)' },
      { t: 'ok',   txt: '✓ Lido src/db/schema.prisma' },
      { t: 'ruler', txt: '─── raciocinando · 1m 12s ───' },
      { t: 'accent', txt: '› 12 componentes identificados em app/src/renderer/' },
      { t: 'accent', txt: '› Recomendação: extrair chrome de pane em hook compartilhado.' },
      { t: 'accent', txt: '› Delegando refatoração para @codex.' },
      { t: 'prompt', txt: 'aguardando comando do operador…' },
    ],
    codex: [
      { t: 'cmd',  txt: '$ codex --workspace ~/projeto' },
      { t: 'ok',   txt: '✓ OAuth OpenAI · GPT-4o' },
      { t: 'wait', txt: '⠿ Gerando diff para hook pane-chrome…', delay: 400 },
      { t: 'diff', txt: '+ export function usePaneChrome(id: string) {' },
      { t: 'diff', txt: '+   const focused = useFocused(id);' },
      { t: 'diff', txt: '+   const layout  = useLayout(id);' },
      { t: 'diff', txt: '+   return { focused, layout };' },
      { t: 'diff', txt: '+ }' },
      { t: 'rem',  txt: '- import { useFocus } from "./focus";' },
      { t: 'ok',   txt: '✓ Escrito src/hooks/usePaneChrome.ts (+24 -3)' },
      { t: 'ruler', txt: '─── concluído · 22s ───' },
      { t: 'prompt', txt: 'operação concluída. próxima instrução?' },
    ],
    gemini: [
      { t: 'cmd',  txt: '$ gemini --workspace ~/projeto' },
      { t: 'ok',   txt: '✓ OAuth Google · Gemini 2.0 Flash' },
      { t: 'wait', txt: '⠿ Elaborando plano de testes…', delay: 400 },
      { t: 'accent', txt: '## Plano · refatoração usePaneChrome' },
      { t: '',     txt: '1. teste unitário do hook layout' },
      { t: '',     txt: '2. teste unitário do hook focused' },
      { t: '',     txt: '3. integração · 2x2 → cols' },
      { t: '',     txt: '4. snapshot · 3 estados de pane' },
      { t: 'ok',   txt: '✓ 4 tarefas enfileiradas · @qwen' },
      { t: 'ruler', txt: '─── concluído · 14s ───' },
      { t: 'prompt', txt: 'aguardando comando…' },
    ],
    browser: [],
  };

  /* ---------- 2x2 / 2-col pane configs ---------- */
  const CONFIGS = {
    hero: {
      layout: '2col',
      panes: [
        { id: 'claude-1', agent: 'claude',   label: 'CLAUDE',  sub: 'OAuth Anthropic · Opus 4.7', cwd: '~/projeto', script: 'claude' },
        { id: 'codex-1',  agent: 'codex',    label: 'CODEX',   sub: 'OAuth OpenAI · GPT-4o',     cwd: '~/projeto', script: 'codex'  },
      ],
    },
    big: {
      layout: '2x2',
      panes: [
        { id: 'claude-2',  agent: 'claude',  label: 'CLAUDE',  sub: 'Opus 4.7 · papel: LIDERANÇA',         cwd: '~/projeto', script: 'claude' },
        { id: 'codex-2',   agent: 'codex',   label: 'CODEX',   sub: 'GPT-4o · papel: IMPLEMENTAÇÃO',         cwd: '~/projeto', script: 'codex'  },
        { id: 'gemini-1',  agent: 'gemini',  label: 'GEMINI',  sub: 'Gemini 2.0 Flash · papel: PESQUISA',   cwd: '~/projeto', script: 'gemini' },
        { id: 'browser-1', agent: 'browser', label: 'BROWSER', sub: 'live preview · localhost:5173',         cwd: '',          script: 'browser', kind: 'browser' },
      ],
    },
  };

  /* ---------- SVG cursor ---------- */
  const FAUX_CURSOR_SVG = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 L2 13 L5 10 L7.5 14.5 L9.2 13.6 L6.7 9 L11 9 Z" fill="white" stroke="#7c3aed" stroke-width="0.8" stroke-linejoin="round"/>
  </svg>`;

  /* ---------- Construct cockpit DOM ---------- */
  function build(root) {
    const kind = root.dataset.cockpit || 'hero';
    const cfg = CONFIGS[kind] || CONFIGS.hero;

    const titlebar = `
      <div class="bc-cockpit__titlebar">
        <span class="bc-titlebar__dot"></span>
        <span data-bc-version="orchestrator">${versionLabel('orchestrator')}</span>
        <span class="right">
          <span>−</span><span>□</span><span>×</span>
        </span>
      </div>`;

    const header = `
      <div class="bc-cockpit__header">
        <span class="seg seg--accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="17.5" y1="14" x2="17.5" y2="21"/><line x1="14" y1="17.5" x2="21" y2="17.5"/></svg>
          BrainChain ▾
        </span>
        <span class="seg">+</span>
        <span class="seg">Reorganizar</span>
        <span class="seg">Layout</span>
        <span class="seg">Files</span>
        <span class="seg">${cfg.panes.length} panes</span>
        <span class="seg">Tasks</span>
        <span class="seg">MAP</span>
        <span class="spacer"></span>
        <span class="seg" data-add-pane>+ Pane</span>
        <span class="seg">⚙</span>
        <span class="avatar" aria-label="Conta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </span>
      </div>`;

    const panes = cfg.panes.map((p, i) => paneHTML(p, i === 0)).join('');

    const statusbar = `
      <div class="bc-cockpit__statusbar">
        <span>BrainChain</span><span class="sep">·</span>
        <span><span class="green">${cfg.panes.length} ativos</span></span><span class="sep">·</span>
        <span>sync ok</span><span class="sep">·</span>
        <span>CPU <span data-stat="cpu">18</span>%</span><span class="sep">·</span>
        <span>RAM <span data-stat="ram">51</span>%</span><span class="sep">·</span>
        <span>GPU <span data-stat="gpu">14</span>%</span><span class="sep">·</span>
        <span>FlyKey <span class="green">●</span></span><span class="sep">·</span>
        <span>layout: ${cfg.layout === '2x2' ? '2x2' : '2col'}</span><span class="sep">·</span>
        <span>$<span data-stat="cost">0.32</span>/min</span><span class="sep">·</span>
        <span>Eco <span class="green">●</span></span>
      </div>`;

    const fauxCursor = `<div class="bc-fauxcursor">${FAUX_CURSOR_SVG}</div>`;

    const flykey = `
      <div class="bc-flykey" data-flykey>
        <div class="bc-flykey__title">FlyKey · BrainChain</div>
        <div class="bc-flykey__input">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input data-flykey-input placeholder="Comandos, agentes, arquivos…" />
        </div>
        <div class="bc-flykey__list">
          <div class="bc-flykey__row"><span class="name">Reorganizar panes</span><span class="kbd">⌘ R</span></div>
          <div class="bc-flykey__row"><span class="name">+ Pane (Claude Opus)</span><span class="kbd">⌘ 1</span></div>
          <div class="bc-flykey__row"><span class="name">+ Pane (GPT-4o)</span><span class="kbd">⌘ 2</span></div>
          <div class="bc-flykey__row"><span class="name">+ Pane (Gemini 2.0)</span><span class="kbd">⌘ 3</span></div>
          <div class="bc-flykey__row"><span class="name">Abrir Arquivos</span><span class="kbd">⌘ F</span></div>
          <div class="bc-flykey__row"><span class="name">Alterar layout: 2x2</span><span class="kbd">⌘ L</span></div>
        </div>
      </div>`;

    root.innerHTML = `
      ${titlebar}
      ${header}
      <div class="bc-cockpit__panes bc-cockpit__panes--${cfg.layout === '2x2' ? '2x2' : '2col'}">${panes}</div>
      ${statusbar}
      ${fauxCursor}
      ${flykey}`;

    root._cfg = cfg;
    if (window.BrainChainSiteVersion) window.BrainChainSiteVersion.apply(root);
  }

  function paneHTML(p, focused) {
    if (p.kind === 'browser') {
      return `
        <div class="bc-pane bc-pane--browser" data-pane-id="${p.id}" data-agent="${p.agent}" data-focused="${focused}">
          <div class="bc-pane__header">
            <span class="ident">
              <span class="agent-chip">${p.label}</span>
              <span class="id">ID b00b1e</span>
              <span>·</span>
              <span>browser</span>
            </span>
            <span class="right"><span>⤢</span><span>×</span></span>
          </div>
          <div class="bc-pane__addressbar">
            <span>◀</span><span>▶</span><span>↻</span>
            <span class="url">localhost:5173</span>
            <span class="bc-dot" style="width:5px;height:5px"></span><span>live</span>
          </div>
          <div class="bc-browser-content">
            <h3 data-bc-version="brand">${versionLabel('brand')}</h3>
            <div class="row" style="margin-bottom:6px"><span style="color:#10b981">●</span> hot reload ok</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">
              <div style="background:#f3f4f6;border-radius:4px;padding:6px;font-size:10px">
                <strong style="color:#111">Pane chrome</strong>
                <div style="color:#6b7280">12 components</div>
              </div>
              <div style="background:#f3f4f6;border-radius:4px;padding:6px;font-size:10px">
                <strong style="color:#111">Layout hook</strong>
                <div style="color:#6b7280">2x2 · cols · single</div>
              </div>
            </div>
            <div class="row" style="margin-top:8px;font-family:'JetBrains Mono',monospace;color:#6b7280">
              › refactor applied · 24 lines changed
            </div>
          </div>
          <div class="bc-pane__footer">
            <span>localhost:5173</span>
            <span class="right">
              <span>chromium · live</span>
            </span>
          </div>
        </div>`;
    }
    return `
      <div class="bc-pane" data-pane-id="${p.id}" data-agent="${p.agent}" data-focused="${focused}">
        <div class="bc-pane__header">
          <span class="ident">
            <span class="agent-chip">${p.label}</span>
            <span class="id">ID ${randomId()}</span>
            <span>·</span>
            <span>terminal</span>
          </span>
          <span class="right"><span>⤢</span><span>×</span></span>
        </div>
        <div class="bc-pane__subhead">
          <span>${p.sub}</span>
          <span style="margin-left:auto">${p.cwd}</span>
        </div>
        <div class="bc-pane__body" data-pane-body></div>
        <div class="bc-pane__footer">
          <span>» bypass off</span>
          <span>@ agents</span>
          <span>Foco</span>
          <span class="right">
            <span class="tok"><span data-stat="tok-${p.id}">4.2k</span> tok</span>
            <span class="cost">$<span data-stat="cost-${p.id}">0.32</span></span>
          </span>
        </div>
      </div>`;
  }

  function randomId() {
    const c = 'abcdef0123456789';
    let r = '';
    for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * 16)];
    return r;
  }

  /* ---------- Animate a single pane body ---------- */
  function streamPane(pane, script, opts = {}) {
    const body = pane.querySelector('[data-pane-body]');
    if (!body) return Promise.resolve();
    body.innerHTML = '';
    let i = 0;

    return new Promise((resolve) => {
      function next() {
        if (i >= script.length) return resolve();
        const line = script[i++];
        const div = document.createElement('div');
        div.className = 'line';
        if (line.t === 'ruler') div.className = 'ruler';
        else if (line.t === 'prompt') div.className = 'prompt';

        body.appendChild(div);

        const cls = mapClass(line.t);
        const txt = line.txt || '';
        const typeMs = prefersReduced ? 0 : (opts.speed || 14);

        type(div, txt, cls, typeMs).then(() => {
          // Trim if too tall
          while (body.scrollHeight > body.clientHeight && body.firstChild && body.children.length > 3) {
            body.removeChild(body.firstChild);
          }
          const delay = (line.delay || 280) + (Math.random() * 220);
          setTimeout(next, prefersReduced ? 50 : delay);
        });
      }
      next();
    });
  }

  function mapClass(t) {
    if (t === 'ok') return 'ok';
    if (t === 'err' || t === 'rem') return 'err';
    if (t === 'warn' || t === 'wait') return 'warn';
    if (t === 'accent') return 'accent';
    if (t === 'diff') return 'diff-add';
    if (t === 'cmd') return 'accent';
    return '';
  }

  function type(el, text, cls, msPerChar) {
    return new Promise((resolve) => {
      const span = document.createElement('span');
      if (cls) span.className = cls;
      el.appendChild(span);

      if (msPerChar === 0) {
        span.textContent = text;
        resolve();
        return;
      }

      let idx = 0;
      const interval = setInterval(() => {
        if (idx > text.length) {
          clearInterval(interval);
          resolve();
          return;
        }
        span.textContent = text.slice(0, idx);
        idx++;
      }, msPerChar);
    });
  }

  /* ---------- Tilt the cockpit by real cursor ---------- */
  function attachTilt(root) {
    if (prefersReduced || !isWide()) return;
    const panes = root.querySelector('.bc-cockpit__panes');
    root.addEventListener('mousemove', (e) => {
      const r = root.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      root.style.transform = `perspective(1400px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    });
    root.addEventListener('mouseleave', () => {
      root.style.transform = '';
    });
  }

  /* ---------- Faux cursor scripted path ---------- */
  function animateFauxCursor(root) {
    if (prefersReduced || !isWide()) return;
    const cursor = root.querySelector('.bc-fauxcursor');
    if (!cursor) return;

    const panes = [...root.querySelectorAll('.bc-pane')];
    const addBtn = root.querySelector('[data-add-pane]');

    let realActive = false;
    let realX = 0, realY = 0;
    let x = 60, y = 60, tx = 60, ty = 60;

    root.addEventListener('mousemove', (e) => {
      const r = root.getBoundingClientRect();
      realX = e.clientX - r.left;
      realY = e.clientY - r.top;
      realActive = true;
      clearTimeout(root._realTimer);
      root._realTimer = setTimeout(() => realActive = false, 1400);
    });

    function setTarget(rect) {
      const r = root.getBoundingClientRect();
      tx = rect.left - r.left + rect.width * 0.4;
      ty = rect.top  - r.top + rect.height * 0.5;
    }

    // Scripted path: rotate between target elements every 3s
    const targets = panes.length > 2
      ? [panes[0], panes[1], addBtn, panes[2], panes[3]].filter(Boolean)
      : [panes[0], addBtn, panes[1]].filter(Boolean);
    let ti = 0;
    const scheduleNext = () => {
      const node = targets[ti % targets.length];
      ti++;
      if (node) {
        const r = node.getBoundingClientRect();
        setTarget(r);
      }
    };
    setInterval(scheduleNext, 3200);
    scheduleNext();

    function frame() {
      const targetX = realActive ? realX : tx;
      const targetY = realActive ? realY : ty;
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Status bar ticker ---------- */
  function tickStats(root) {
    const cpuEl = root.querySelector('[data-stat="cpu"]');
    const ramEl = root.querySelector('[data-stat="ram"]');
    const gpuEl = root.querySelector('[data-stat="gpu"]');
    const costEl = root.querySelector('[data-stat="cost"]');
    let cpu = 18, ram = 51, gpu = 14, cost = 0.32;

    setInterval(() => {
      if (document.hidden) return;
      cpu = clamp(cpu + (Math.random() - 0.5) * 8, 8, 65);
      ram = clamp(ram + (Math.random() - 0.5) * 4, 40, 78);
      gpu = clamp(gpu + (Math.random() - 0.5) * 6, 8, 55);
      cost = clamp(cost + (Math.random() - 0.4) * 0.15, 0.10, 1.20);
      if (cpuEl) cpuEl.textContent = Math.round(cpu);
      if (ramEl) ramEl.textContent = Math.round(ram);
      if (gpuEl) gpuEl.textContent = Math.round(gpu);
      if (costEl) costEl.textContent = cost.toFixed(2);
    }, 1500);

    // pane token + cost
    root.querySelectorAll('.bc-pane[data-pane-id]').forEach((pane) => {
      const id = pane.dataset.paneId;
      const tokEl = root.querySelector(`[data-stat="tok-${id}"]`);
      const cstEl = root.querySelector(`[data-stat="cost-${id}"]`);
      let tok = 4 + Math.random() * 8;
      let cst = 0.10 + Math.random() * 0.3;
      setInterval(() => {
        if (document.hidden) return;
        tok = clamp(tok + Math.random() * 0.4, 1, 28);
        cst = clamp(cst + Math.random() * 0.04, 0.10, 5.0);
        if (tokEl) tokEl.textContent = tok.toFixed(1) + 'k';
        if (cstEl) cstEl.textContent = cst.toFixed(2);
      }, 1800 + Math.random() * 700);
    });
  }

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  /* ---------- FlyKey scripted ---------- */
  function flykeyLoop(root) {
    if (prefersReduced) return;
    const fk = root.querySelector('[data-flykey]');
    if (!fk) return;
    const input = fk.querySelector('[data-flykey-input]');
    const rows = [...fk.querySelectorAll('.bc-flykey__row')];

    const queries = ['reorganizar', 'pane claude opus', 'layout 2x2', 'arquivos'];
    let qi = 0;

    function pos() {
      // Center the flykey near the middle of the cockpit
      const r = root.getBoundingClientRect();
      fk.style.left = (r.width - 380) / 2 + 'px';
      fk.style.top  = (r.height / 2 - 100) + 'px';
    }
    pos();
    window.addEventListener('resize', pos);

    async function cycle() {
      while (!root._dead) {
        await sleep(8000);
        if (document.hidden) continue;
        fk.dataset.open = 'true';
        await typeInput(input, queries[qi % queries.length], 50);
        // highlight a row
        const idx = Math.min(qi, rows.length - 1);
        rows.forEach((r, i) => r.dataset.active = i === idx ? 'true' : 'false');
        await sleep(900);
        qi++;
        fk.dataset.open = 'false';
        input.value = '';
        rows.forEach(r => r.dataset.active = 'false');
      }
    }
    cycle();
  }

  function typeInput(el, text, msPerChar) {
    return new Promise((resolve) => {
      let i = 0;
      const t = setInterval(() => {
        i++;
        el.value = text.slice(0, i);
        if (i >= text.length) { clearInterval(t); resolve(); }
      }, msPerChar);
    });
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  /* ---------- Idle pause on offscreen ---------- */
  function visibleObserver(root, onShow, onHide) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onShow();
        else onHide();
      });
    }, { threshold: 0.1 });
    obs.observe(root);
  }

  /* ---------- Boot a cockpit ---------- */
  async function boot(root) {
    build(root);
    attachTilt(root);
    animateFauxCursor(root);
    tickStats(root);
    flykeyLoop(root);

    const cfg = root._cfg;
    // Stream each pane in parallel
    const tasks = cfg.panes.map((p, i) => {
      if (p.kind === 'browser') return Promise.resolve();
      const pane = root.querySelector(`[data-pane-id="${p.id}"]`);
      return (async () => {
        // small stagger so they look organic
        await sleep(i * 600);
        // loop forever
        while (!root._dead) {
          if (!document.hidden) {
            await streamPane(pane, SCRIPTS[p.script] || [], { speed: 14 });
            await sleep(2000);
          } else {
            await sleep(1000);
          }
        }
      })();
    });
    // Don't await — fire-and-forget
  }

  /* ---------- Init all cockpits on the page ---------- */
  function init() {
    document.querySelectorAll('.bc-cockpit[data-cockpit]').forEach((root) => {
      boot(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
