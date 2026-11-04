/* BrainChain community Discord simulation */
(function () {
  'use strict';

  const messages = [
    { user: 'victor.dev', avatar: 'V', tone: 'teal', text: 'Alguém testou Claude + Codex no mesmo workspace? Meu refactor saiu em 3 panes.', reactions: [] },
    { user: 'marina.ai', avatar: 'M', tone: 'blue', text: 'Usei para separar review, testes e docs. O mapa de orquestração ajudou demais.', reactions: [] },
    { user: 'brainchain-team', avatar: 'BC', tone: 'purple', text: 'Drop novo: presets de agentes por tipo de projeto entraram no alpha interno.', hot: true, reactions: ['24', '18', '11'] },
    { user: 'lucas.fullstack', avatar: 'L', tone: 'amber', text: 'Consegui rodar build, playwright e changelog em paralelo. Salvou minha noite.', reactions: [] },
    { user: 'ana.codes', avatar: 'A', tone: 'red', text: 'Thread com configs para Gemini e Mistral fixada em #setups. Ficou bem direto.', reactions: [] },
    { user: 'rafa.ops', avatar: 'R', tone: 'green', text: 'Coloquei Sonnet revisando enquanto Codex mexia no CSS. O diff ficou muito mais limpo.', reactions: [] },
    { user: 'bianca.ui', avatar: 'B', tone: 'pink', text: 'Alguém tem preset bom para landing page? Quero um agente só para contraste e responsivo.', reactions: [] },
    { user: 'nando.dev', avatar: 'N', tone: 'orange', text: 'Meu fluxo agora é liderança no Opus, implementação no Codex e testes em pane separada.', reactions: [] },
    { user: 'brainchain-team', avatar: 'BC', tone: 'purple', text: 'Mandem prints do workflow em #showcases. Vamos puxar os melhores para o changelog.', hot: true, reactions: ['31', '9'] }
  ];

  const typers = ['marina.ai', 'lucas.fullstack', 'ana.codes', 'rafa.ops', 'bianca.ui'];

  function time() {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date());
  }

  function renderMessage(message) {
    const item = document.createElement('div');
    item.className = `bc-discord-msg is-new${message.hot ? ' is-hot' : ''}`;

    const reactions = message.reactions && message.reactions.length
      ? `<div class="reactions">${message.reactions.map((count, index) => {
          const icons = ['⚡', '👀', '🧪'];
          return `<span>${icons[index] || '✓'} ${count}</span>`;
        }).join('')}</div>`
      : '';

    item.innerHTML = `
      <span class="avatar avatar--${message.tone}">${message.avatar}</span>
      <div><strong>${message.user}</strong><p>${message.text}</p>${reactions}</div>
      <span class="time">${time()}</span>
    `;

    setTimeout(() => item.classList.remove('is-new'), 650);
    return item;
  }

  function initDiscordSim(root) {
    const feed = root.querySelector('[data-discord-feed]');
    const typing = root.querySelector('[data-discord-typing] span');
    if (!feed) return;

    let index = 0;
    const visible = 6;

    function push(next) {
      feed.appendChild(renderMessage(next));
      while (feed.children.length > visible) {
        feed.removeChild(feed.firstElementChild);
      }
      feed.scrollTop = feed.scrollHeight;
    }

    messages.slice(0, 5).forEach(push);
    index = 5;

    window.setInterval(() => {
      if (typing) typing.textContent = `${typers[index % typers.length]} está digitando`;
      push(messages[index % messages.length]);
      index += 1;
    }, 2600);
  }

  function init() {
    document.querySelectorAll('[data-discord-sim]').forEach(initDiscordSim);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
