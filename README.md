# BrainChain Orchestrator — Site

Site estático do BrainChain Orchestrator, com home, páginas de produto, agentes,
documentação, preços, download, login, changelog, sobre e páginas legais.

## Estrutura

```text
SiteBrainChain/
├── index.html
├── product.html
├── agents.html
├── docs.html
├── changelog.html
├── download.html
├── pricing.html
├── login.html
├── about.html
├── 404.html
├── legal/
│   ├── privacy.html
│   └── terms.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── chrome.css
│   ├── components.css
│   ├── app-components.css
│   ├── pages.css
│   ├── sections-v2.css
│   ├── projects-demo.css
│   ├── interactions.css
│   ├── responsive.css
│   └── site-pages.css
├── js/
│   ├── version.js
│   ├── i18n.js
│   ├── interactions.js
│   ├── discord-sim.js
│   ├── cockpit.js
│   └── projects-demo.js
├── scripts/
│   └── sync-app-version.js
├── version.json
├── package.json
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

## Rodar localmente

```bash
python -m http.server 8026 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8026/`.

## Sincronizar versão com o app

A versão exibida no site fica centralizada em `version.json`, com fallback em
`js/version.js` para carregamento estático. Para atualizar a versão do site a
partir do app BrainChain, rode na pasta `SiteBrainChain`:

```bash
npm run sync:app-version
```

Por padrão o script lê `../../BrainChain/app/package.json`. Para apontar para
outro caminho, use `BRAINCHAIN_APP_PACKAGE=/caminho/package.json`.

## Notas

- O site ainda é estático, sem build step.
- `js/version.js` deve ser carregado antes dos scripts que renderizam textos com versão.
- A home usa os cockpits animados de `js/cockpit.js` e `js/projects-demo.js`.
- A seção de comunidade usa `js/discord-sim.js` para simular mensagens em tempo real.
- Páginas internas usam a camada compartilhada `css/site-pages.css`.
- O site usa tema escuro fixo, sem alternância de tema.
- O formulário de email valida e registra localmente no navegador via `localStorage`.
- O seletor de idioma troca textos estáticos entre PT-BR, EN e ES via `js/i18n.js`.
- CSS legado/componentes não usados agora foram preservados para páginas futuras.
