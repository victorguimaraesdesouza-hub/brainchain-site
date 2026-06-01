/* ============================================================
   BrainChain · projects-demo.js
   Animated multi-project demo with the same live treatment
   as the big cockpit: per-pane streaming text, faux cursor,
   live status tickers, plus tab undock / pane detach actions.
============================================================ */
(function () {
  'use strict';

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const versionLabel = (kind) => {
    const siteVersion = window.BrainChainSiteVersion;
    return siteVersion ? siteVersion.format(kind) : '0.0.8 Alpha';
  };

  /* ---------- Streaming scripts per agent role ---------- */
  const SCRIPTS = {
    claude_lead: [
      { c: 'accent', t: '$ claude code --workspace ~/projeto' },
      { c: 'ok',     t: '✓ OAuth Anthropic · Claude Opus 4.7' },
      { c: 'warn',   t: '⠿ Analisando estrutura do repositório…' },
      { c: 'ok',     t: '✓ Read src/auth/middleware.ts' },
      { c: 'ok',     t: '✓ Read src/payments/stripe.ts (18.4k tok)' },
      { c: 'muted',  t: '─── raciocinando · 1m 12s ───' },
      { c: 'accent', t: '› 12 componentes em app/src/renderer/' },
      { c: 'accent', t: '› Delegando refatoração para @codex.' },
    ],
    claude_review: [
      { c: 'accent', t: '$ claude code --review PR-428' },
      { c: 'ok',     t: '✓ OAuth · Claude Sonnet 4.6' },
      { c: 'warn',   t: '⠿ Verificando regressões…' },
      { c: 'ok',     t: '✓ 6 arquivos · 124 linhas' },
      { c: 'muted',  t: '─── revisão · 38s ───' },
      { c: 'accent', t: '› 2 sugestões · 0 bloqueios' },
      { c: 'ok',     t: '✓ Aprovação enviada' },
    ],
    claude_synth: [
      { c: 'accent', t: '$ claude code --synthesize' },
      { c: 'ok',     t: '✓ Opus 4.7 · decisões consolidadas' },
      { c: 'warn',   t: '⠿ Compilando ADR-014…' },
      { c: 'ok',     t: '✓ docs/adr/014-pane-chrome.md' },
      { c: 'muted',  t: 'aguardando aprovação da liderança' },
    ],
    codex: [
      { c: 'accent', t: '$ codex --workspace ~/projeto' },
      { c: 'ok',     t: '✓ OAuth OpenAI · GPT-4o' },
      { c: 'warn',   t: '⠿ Gerando diff usePaneChrome…' },
      { c: 'add',    t: '+ export function usePaneChrome(id: string) {' },
      { c: 'add',    t: '+   const focused = useFocused(id);' },
      { c: 'add',    t: '+   const layout  = useLayout(id);' },
      { c: 'add',    t: '+   return { focused, layout };' },
      { c: 'rem',    t: '- import { useFocus } from "./focus";' },
      { c: 'ok',     t: '✓ Escrito src/hooks/usePaneChrome.ts' },
    ],
    codex_skills: [
      { c: 'accent', t: '$ codex /skills' },
      { c: 'ok',     t: '✓ 12 skills disponíveis' },
      { c: 'muted',  t: '· refactor · test-gen · doc-gen' },
      { c: 'muted',  t: '· lint · format · deps-audit' },
      { c: 'accent', t: '> use /skill <nome>' },
    ],
    codex_docs: [
      { c: 'accent', t: '$ codex --improve-docs' },
      { c: 'ok',     t: '✓ README.md atualizado' },
      { c: 'ok',     t: '✓ docs/install.md · 3 seções' },
      { c: 'ok',     t: '✓ docs/api.md · 12 rotas' },
      { c: 'muted',  t: '─── conclusão · 1m 04s ───' },
    ],
    codex_tests: [
      { c: 'accent', t: '$ codex --write-tests @filename' },
      { c: 'ok',     t: '✓ jest.config.ts criado' },
      { c: 'ok',     t: '✓ src/**/__tests__/*.spec.ts' },
      { c: 'muted',  t: '12 arquivos · 86 casos gerados' },
      { c: 'warn',   t: '⠿ pnpm test --watch' },
      { c: 'ok',     t: '✓ 142 passed · 0 failed' },
      { c: 'accent', t: '› cobertura: 87% · +3.2%' },
    ],
    gemini: [
      { c: 'accent', t: '$ gemini --workspace ~/projeto' },
      { c: 'ok',     t: '✓ OAuth Google · Gemini 2.0 Flash' },
      { c: 'warn',   t: '⠿ Pesquisando docs externas…' },
      { c: 'ok',     t: '✓ 3 referências indexadas' },
      { c: 'muted',  t: '· TanStack Query · Zod · Effect-TS' },
      { c: 'accent', t: '## Plano · refatoração' },
      { c: '',       t: '1. teste unitário hook layout' },
      { c: '',       t: '2. teste unitário hook focused' },
      { c: '',       t: '3. integração 2x2 → cols' },
      { c: 'ok',     t: '✓ 3 tarefas enfileiradas · @qwen' },
    ],
    llama: [
      { c: 'accent', t: '$ llama --workspace ~/projeto' },
      { c: 'ok',     t: '✓ Llama 3.3 · self-hosted' },
      { c: 'warn',   t: '⠿ Rodando suíte de testes…' },
      { c: 'ok',     t: '✓ 142 passed · 0 failed' },
      { c: 'ok',     t: '✓ cobertura: 87% (+3.2%)' },
      { c: 'muted',  t: '─── conclusão · 28s ───' },
      { c: 'accent', t: '› aguardando próxima missão' },
    ],
  };

  /* ---------- Projects ---------- */
  const PROJECTS = [
    {
      id: 'brainchain',
      name: 'BrainChain',
      color: '#7c3aed',
      layout: '2x3',
      panes: [
        { agent: 'claude',  id: '0acdab', model: 'Opus 4.7',  role: 'LIDERANÇA',    script: 'claude_lead' },
        { agent: 'codex',   id: '8fc5c0', model: 'GPT-4o',    role: 'IMPLEMENTAÇÃO', script: 'codex' },
        { agent: 'claude',  id: 'd50f3e', model: 'Sonnet 4.6',role: 'REVISÃO',      script: 'claude_review' },
        { agent: 'gemini',  id: '0b6dba', model: 'Gemini 2.0',role: 'PESQUISA',     script: 'gemini' },
        { agent: 'claude',  id: '60e50d', model: 'Opus 4.7',  role: 'SÍNTESE',      script: 'claude_synth' },
        { agent: 'llama',   id: 'a9e10b', model: 'Llama 3.3', role: 'TESTES',       script: 'llama' },
      ],
    },
    {
      id: 'vcore',
      name: 'VCore',
      color: '#f59e0b',
      layout: '2col',
      panes: [
        { agent: 'codex',   id: '6fb28a', model: 'GPT-4o',    role: 'SKILLS',      script: 'codex_skills' },
        { agent: 'codex',   id: '2adc88', model: 'GPT-4o',    role: 'DOCS',        script: 'codex_docs' },
      ],
    },
    {
      id: 'site',
      name: 'Site cliente teste',
      color: '#10b981',
      layout: 'single',
      panes: [
        { agent: 'codex',   id: 'b6ae08', model: 'GPT-4o',    role: 'TESTES',      script: 'codex_tests' },
      ],
    },
  ];

  /* ---------- State sequence ---------- */
  const STATES = [
    { kind: 'activate', project: 'brainchain', caption: 'Projeto ativo · 6 panes em 2×3',                       dwell: 6000 },
    { kind: 'activate', project: 'vcore',      caption: 'Alternando para VCore · 2 panes em paralelo',           dwell: 5000 },
    { kind: 'activate', project: 'site',       caption: 'Site cliente teste · pane única',                        dwell: 4500 },
    { kind: 'undock',   project: 'vcore',      caption: 'Destacando aba VCore para nova janela',                  dwell: 2000 },
    { kind: 'split',    project: 'vcore',      caption: 'Dois projetos em janelas independentes',                 dwell: 6000 },
    { kind: 'redock',   project: 'vcore',      caption: 'Restaurando janela única',                                dwell: 2000 },
    { kind: 'detach',   project: 'brainchain', caption: 'Pane destacada · janela flutuante independente',         dwell: 5500 },
  ];

  /* ---------- DOM helper ---------- */
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'style' && typeof attrs[k] === 'object') {
          for (const sk in attrs[k]) {
            if (sk.startsWith('--')) e.style.setProperty(sk, attrs[k][sk]);
            else e.style[sk] = attrs[k][sk];
          }
        }
        else if (k === 'class') e.className = attrs[k];
        else if (k.startsWith('data-') || k === 'role' || k === 'aria-label') e.setAttribute(k, attrs[k]);
        else e[k] = attrs[k];
      }
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (c == null) return;
        if (typeof c === 'string') e.appendChild(document.createTextNode(c));
        else e.appendChild(c);
      });
    }
    return e;
  }

  function svgX()     { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`; }
  function svgPlus()  { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`; }
  function svgDetach(){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`; }
  const FAUX_CURSOR_SVG = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 L2 13 L5 10 L7.5 14.5 L9.2 13.6 L6.7 9 L11 9 Z" fill="white" stroke="#7c3aed" stroke-width="0.8" stroke-linejoin="round"/>
  </svg>`;

  function sleep(ms) {
    return new Promise((resolve) => {
      const start = Date.now();
      function step() {
        if (document.hidden) { setTimeout(step, 200); return; }
        const elapsed = Date.now() - start;
        if (elapsed >= ms) resolve();
        else setTimeout(step, Math.min(120, ms - elapsed));
      }
      step();
    });
  }

  /* ---------- Streaming logic ---------- */
  function streamLine(target, line, msPerChar) {
    return new Promise((resolve) => {
      const div = document.createElement('div');
      const cls = line.c === 'add' ? 'ok' : line.c === 'rem' ? 'warn' : line.c;
      if (cls) {
        const span = document.createElement('span');
        span.className = cls;
        div.appendChild(span);
      }
      target.appendChild(div);
      const host = cls ? div.firstChild : div;
      const txt = line.t;

      if (msPerChar === 0 || prefersReduced) {
        host.textContent = txt;
        resolve();
        return;
      }
      let i = 0;
      const iv = setInterval(() => {
        if (target._dead) { clearInterval(iv); resolve(); return; }
        i++;
        host.textContent = txt.slice(0, i);
        if (i >= txt.length) { clearInterval(iv); resolve(); }
      }, msPerChar);
    });
  }

  async function streamPane(linesContainer, script) {
    if (!script || !script.length) return;
    while (!linesContainer._dead) {
      linesContainer.innerHTML = '';
      for (const line of script) {
        if (linesContainer._dead) return;
        await streamLine(linesContainer, line, 14);
        // trim if overflow
        while (linesContainer.scrollHeight > linesContainer.clientHeight &&
               linesContainer.children.length > 3 &&
               linesContainer.firstChild) {
          linesContainer.removeChild(linesContainer.firstChild);
        }
        await sleep(180 + Math.random() * 220);
        if (document.hidden) await sleep(400);
      }
      await sleep(800);
    }
  }

  /* ---------- Build a pane (uses the same .bc-pane chrome as the cockpit) ---------- */
  function buildPane(p) {
    const pane = el('div', { class: 'bc-pane', 'data-agent': p.agent, 'data-pane-id': p.id });

    const header = el('div', { class: 'bc-pane__header' });
    header.innerHTML =
      `<span class="ident">` +
        `<span class="agent-chip">${p.agent.toUpperCase()}</span>` +
        `<span class="id">ID ${p.id}</span>` +
        `<span>·</span>` +
        `<span>terminal</span>` +
      `</span>` +
      `<span class="right" data-detach-target>` +
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>` +
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>` +
      `</span>`;
    pane.appendChild(header);

    const sub = el('div', { class: 'bc-pane__subhead' });
    sub.innerHTML = `<span>${p.model} · papel: ${p.role}</span><span style="margin-left:auto">~/projeto</span>`;
    pane.appendChild(sub);

    const body = el('div', { class: 'bc-pane__body', 'data-pane-body': '' });
    pane.appendChild(body);

    const footer = el('div', { class: 'bc-pane__footer' });
    footer.innerHTML =
      `<span>» bypass off</span>` +
      `<span>@ agents</span>` +
      `<span>Foco</span>` +
      `<span class="right">` +
        `<span class="tok"><span data-stat="tok-${p.id}">4.2</span>k tok</span>` +
        `<span class="cost">$<span data-stat="cost-${p.id}">0.32</span></span>` +
      `</span>`;
    pane.appendChild(footer);

    // Kick streaming
    body._dead = false;
    streamPane(body, SCRIPTS[p.script] || []);

    // per-pane ticker
    tickPane(pane, p.id);

    return pane;
  }

  function tickPane(pane, id) {
    let tok = 4 + Math.random() * 6;
    let cost = 0.10 + Math.random() * 0.3;
    const iv = setInterval(() => {
      if (!pane.isConnected) { clearInterval(iv); return; }
      if (document.hidden) return;
      tok = clamp(tok + Math.random() * 0.3, 1, 24);
      cost = clamp(cost + Math.random() * 0.04, 0.10, 4.0);
      const tokEl = pane.querySelector(`[data-stat="tok-${id}"]`);
      const cstEl = pane.querySelector(`[data-stat="cost-${id}"]`);
      if (tokEl) tokEl.textContent = tok.toFixed(1);
      if (cstEl) cstEl.textContent = cost.toFixed(2);
    }, 1700 + Math.random() * 600);
  }

  /* ---------- Build sections ---------- */
  function buildTabs(tabbar, activeId, hideIds = []) {
    tabbar.innerHTML = '';
    PROJECTS.forEach((p) => {
      if (hideIds.includes(p.id)) return;
      const tab = el('div', {
        class: 'bc-pd-tab',
        'data-active': p.id === activeId ? 'true' : 'false',
        'data-tab-id': p.id,
        style: { '--bc-tabcolor': p.color },
      });
      const dot = el('span', { class: 'dot' });
      const name = el('span'); name.textContent = p.name;
      const count = el('span', { class: 'count' }); count.textContent = p.panes.length;
      const close = el('span');
      close.innerHTML = svgX();
      close.style.cssText = 'opacity:.4;width:12px;height:12px;color:var(--bc-text-muted)';
      tab.appendChild(dot); tab.appendChild(name); tab.appendChild(count); tab.appendChild(close);
      tabbar.appendChild(tab);
    });
    const newt = el('button', { class: 'bc-pd-newtab', 'aria-label': 'Novo projeto' });
    newt.innerHTML = svgPlus();
    tabbar.appendChild(newt);
    const spacer = el('div', { style: { flex: '1' } });
    tabbar.appendChild(spacer);
  }

  function buildHeader(header, project) {
    header.innerHTML = '';
    const layoutLabel = project.layout === '2x3'    ? '2×3'
                      : project.layout === '2x2'    ? '2×2'
                      : project.layout === '2col'   ? '2 cols'
                                                     : 'single';
    function seg(text, variant) {
      const s = el('span', { class: 'seg' + (variant ? ' seg--' + variant : '') });
      s.textContent = text;
      return s;
    }
    header.appendChild(seg('Reorganizar'));
    header.appendChild(seg('Layout · ' + layoutLabel, 'layout'));
    header.appendChild(seg('Tasks'));
    header.appendChild(seg('Files'));
    header.appendChild(seg('MAP'));
    const spacer = el('div', { class: 'spacer' });
    header.appendChild(spacer);
    const ap = el('span', { class: 'seg', 'data-add-pane-btn': '' });
    ap.style.setProperty('background', 'color-mix(in srgb, ' + project.color + ' 22%, transparent)');
    ap.style.color = project.color;
    ap.style.borderColor = project.color;
    ap.textContent = '+ Pane';
    header.appendChild(ap);
  }

  function buildStatus(status, project, telemetryRef) {
    status.innerHTML = '';
    const parts = [
      ['',     project.name],
      ['sep',  '·'],
      ['accent', project.panes.length + ' ativos'],
      ['sep',  '·'],
      ['',     '0 destacados'],
      ['sep',  '·'],
      ['green','sync ok'],
      ['sep',  '·'],
      ['',     'CPU '], ['cpu', '12%'],
      ['sep',  '·'],
      ['',     'RAM '], ['ram', '54%'],
      ['sep',  '·'],
      ['',     'GPU '], ['gpu', '20%'],
      ['sep',  '·'],
      ['',     'layout: ' + (project.layout === '2x3' ? '2×3' : project.layout === '2col' ? '2 cols' : project.layout === '2x2' ? '2×2' : 'single')],
      ['sep',  '·'],
      ['accent', '$'], ['cost', '0.32'], ['accent', '/min'],
    ];
    parts.forEach(([cls, txt]) => {
      const s = el('span', cls ? { class: cls } : {});
      s.textContent = txt;
      if (cls === 'cpu' || cls === 'ram' || cls === 'gpu' || cls === 'cost') s.setAttribute('data-stat', cls);
      status.appendChild(s);
    });
  }

  function buildPanes(grid, project) {
    // kill old streams
    grid.querySelectorAll('.bc-pane__body').forEach(n => n._dead = true);
    grid.querySelectorAll('.bc-pane').forEach(n => n.remove());
    grid.dataset.layout = project.layout;
    project.panes.forEach((p) => grid.appendChild(buildPane(p)));
  }

  function buildWindow(project, hideTabs = []) {
    const win = el('div', { class: 'bc-pd-win', style: { '--bc-tabcolor': project.color } });

    const titlebar = el('div', { class: 'bc-pd-titlebar' });
    titlebar.innerHTML =
      `<span class="bc-titlebar__dot" style="background:${project.color}"></span>` +
      `<span data-bc-version="orchestrator">${versionLabel('orchestrator')}</span>` +
      `<span class="controls"><span>−</span><span>□</span><span>×</span></span>`;
    win.appendChild(titlebar);

    const tabbar = el('div', { class: 'bc-pd-tabs' });
    buildTabs(tabbar, project.id, hideTabs);
    win.appendChild(tabbar);

    const header = el('div', { class: 'bc-pd-header' });
    buildHeader(header, project);
    win.appendChild(header);

    const grid = el('div', { class: 'bc-pd-grid', 'data-layout': project.layout });
    project.panes.forEach((p) => grid.appendChild(buildPane(p)));

    // Floating detached pane — hidden until activated
    const floating = el('div', { class: 'bc-pd-floating' });
    floating.innerHTML =
      `<div class="ttl"><span>pane destacada · janela flutuante</span><span class="x">×</span></div>` +
      `<div class="body" data-floating-body>` +
        `<div><span style="color:var(--bc-accent-light)">claude</span> · ID a9e10b · ` +
        `<span style="color:var(--bc-text-muted)">~/projeto</span></div>` +
        `<div data-floating-lines></div>` +
      `</div>`;
    floating.style.top = '70px';
    floating.style.right = '20px';
    grid.appendChild(floating);

    win.appendChild(grid);

    const status = el('div', { class: 'bc-pd-status' });
    buildStatus(status, project);
    win.appendChild(status);
    if (window.BrainChainSiteVersion) window.BrainChainSiteVersion.apply(win);

    // Faux cursor (per window)
    const cursor = el('div', { class: 'bc-pd-fauxcursor' });
    cursor.innerHTML = FAUX_CURSOR_SVG;
    win.appendChild(cursor);

    return { win, tabbar, header, grid, status, floating, cursor };
  }

  /* ---------- Faux cursor animation ---------- */
  function animateCursor(win, getTargets) {
    if (prefersReduced) {
      win.cursor.style.display = 'none';
      return () => {};
    }
    const c = win.cursor;
    let x = 80, y = 80, tx = 80, ty = 80;
    let alive = true;
    let realActive = false;
    let realX = 0, realY = 0;

    win.win.addEventListener('mousemove', (e) => {
      const r = win.win.getBoundingClientRect();
      realX = e.clientX - r.left;
      realY = e.clientY - r.top;
      realActive = true;
      clearTimeout(win._realTimer);
      win._realTimer = setTimeout(() => realActive = false, 1500);
    });

    function nextTarget() {
      const targets = getTargets();
      if (!targets.length) return;
      const t = targets[Math.floor(Math.random() * targets.length)];
      const winRect = win.win.getBoundingClientRect();
      const r = t.getBoundingClientRect();
      tx = r.left - winRect.left + r.width * (0.3 + Math.random() * 0.4);
      ty = r.top  - winRect.top  + r.height * 0.5;
    }
    const iv = setInterval(() => {
      if (!alive) return clearInterval(iv);
      if (!realActive) nextTarget();
    }, 2400);
    nextTarget();

    function frame() {
      if (!alive) return;
      const targetX = realActive ? realX : tx;
      const targetY = realActive ? realY : ty;
      x += (targetX - x) * 0.07;
      y += (targetY - y) * 0.07;
      c.style.left = x + 'px';
      c.style.top = y + 'px';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    return () => { alive = false; clearInterval(iv); };
  }

  function getStandardTargets(win) {
    return () => {
      const list = [];
      const tabs = win.tabbar.querySelectorAll('.bc-pd-tab');
      tabs.forEach(t => list.push(t));
      const addPane = win.header.querySelector('[data-add-pane-btn]');
      if (addPane) list.push(addPane);
      const panes = win.grid.querySelectorAll('.bc-pane');
      panes.forEach(p => list.push(p));
      return list;
    };
  }

  /* ---------- Status bar telemetry ---------- */
  function tickStatus(win) {
    let cpu = 12, ram = 54, gpu = 20, cost = 0.32;
    const iv = setInterval(() => {
      if (!win._alive) { clearInterval(iv); return; }
      if (document.hidden) return;
      cpu = clamp(cpu + (Math.random() - 0.5) * 6, 5, 55);
      ram = clamp(ram + (Math.random() - 0.5) * 3, 38, 78);
      gpu = clamp(gpu + (Math.random() - 0.5) * 5, 6, 50);
      cost = clamp(cost + (Math.random() - 0.4) * 0.15, 0.10, 1.20);
      const set = (sel, v) => {
        const s = win.status.querySelector(`[data-stat="${sel}"]`);
        if (s) s.textContent = v;
      };
      set('cpu', Math.round(cpu) + '%');
      set('ram', Math.round(ram) + '%');
      set('gpu', Math.round(gpu) + '%');
      set('cost', cost.toFixed(2));
    }, 1500);
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ---------- Boot ---------- */
  function boot(root) {
    root.innerHTML = '';
    const stage = el('div', { class: 'bc-pd-stage', 'data-split': 'false' });
    let main = buildWindow(PROJECTS[0]);
    main.win._alive = true;
    stage.appendChild(main.win);
    root.appendChild(stage);
    main.cursorKill = animateCursor(main, getStandardTargets(main));
    tickStatus(main);

    const caption = el('div', { class: 'bc-pd-caption' });
    caption.innerHTML = `<span class="pill"><span class="d"></span><span data-caption>Inicializando…</span></span>`;
    root.appendChild(caption);

    let secondary = null;
    let stateIdx = 0;
    let dead = false;
    root._die = () => { dead = true; };

    function setCaption(text, project) {
      const pill = caption.querySelector('.pill');
      pill.style.setProperty('--bc-tabcolor', project ? project.color : '#7c3aed');
      const cap = caption.querySelector('[data-caption]');
      cap.style.opacity = '0';
      setTimeout(() => {
        cap.textContent = text;
        cap.style.opacity = '1';
      }, 150);
    }

    async function activate(project) {
      stage.dataset.split = 'false';
      if (secondary) {
        secondary.win._alive = false;
        if (secondary.cursorKill) secondary.cursorKill();
        secondary.win.remove();
        secondary = null;
      }
      main.win.style.setProperty('--bc-tabcolor', project.color);
      buildTabs(main.tabbar, project.id);
      buildHeader(main.header, project);
      buildPanes(main.grid, project);
      buildStatus(main.status, project);
      main.floating.dataset.visible = 'false';
      main.grid.appendChild(main.floating);
    }

    async function undockTab(targetId) {
      const tab = main.tabbar.querySelector(`[data-tab-id="${targetId}"]`);
      if (!tab) return;
      // First make sure the cursor is on the tab (visual)
      tab.dataset.flying = 'true';
      await sleep(700);
      tab.dataset.flying = 'false';
      tab.dataset.fading = 'true';
    }

    async function splitMode(secondaryProjectId) {
      const mainProj = PROJECTS.find(p => p.id === 'brainchain');
      await activate(mainProj);
      buildTabs(main.tabbar, mainProj.id, [secondaryProjectId]);

      const secProj = PROJECTS.find(p => p.id === secondaryProjectId);
      secondary = buildWindow(secProj, PROJECTS.filter(p => p.id !== secondaryProjectId).map(p => p.id));
      secondary.win.dataset.spawning = 'true';
      secondary.win._alive = true;
      stage.appendChild(secondary.win);
      requestAnimationFrame(() => { stage.dataset.split = 'true'; });
      secondary.cursorKill = animateCursor(secondary, getStandardTargets(secondary));
      tickStatus(secondary);
    }

    async function redock(secondaryProjectId) {
      if (secondary) {
        secondary.win._alive = false;
        if (secondary.cursorKill) secondary.cursorKill();
        secondary.win.style.transition = 'opacity 300ms';
        secondary.win.style.opacity = '0';
        await sleep(320);
        secondary.win.remove();
        secondary = null;
      }
      stage.dataset.split = 'false';
      buildTabs(main.tabbar, 'brainchain');
    }

    async function detachPane() {
      const project = PROJECTS.find(p => p.id === 'brainchain');
      await activate(project);
      await sleep(500);
      const panes = [...main.grid.querySelectorAll('.bc-pane')];
      const last = panes[panes.length - 1];
      if (last) {
        last.style.transition = 'opacity 300ms, transform 300ms';
        last.style.opacity = '0';
        last.style.transform = 'scale(.92) translate(30px, -10px)';
        const body = last.querySelector('.bc-pane__body');
        if (body) body._dead = true;
      }
      main.floating.dataset.visible = 'true';
      // Stream into the floating pane
      const flines = main.floating.querySelector('[data-floating-lines]');
      if (flines) {
        flines._dead = true;
        flines.innerHTML = '';
        flines._dead = false;
        streamPane(flines, SCRIPTS.llama);
      }
    }

    async function tick() {
      while (!dead) {
        const s = STATES[stateIdx];
        const project = PROJECTS.find(p => p.id === s.project);
        setCaption(s.caption, project);
        if (s.kind === 'activate') await activate(project);
        else if (s.kind === 'undock') await undockTab(s.project);
        else if (s.kind === 'split') await splitMode(s.project);
        else if (s.kind === 'redock') await redock(s.project);
        else if (s.kind === 'detach') await detachPane();
        await sleep(s.dwell);
        stateIdx = (stateIdx + 1) % STATES.length;
      }
    }

    if (prefersReduced) {
      activate(PROJECTS[0]);
      setCaption('Múltiplos projetos · cada um com seu próprio workspace.', PROJECTS[0]);
      return;
    }
    tick();
  }

  /* ---------- Init ---------- */
  function init() {
    document.querySelectorAll('[data-projects-demo]').forEach(boot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
