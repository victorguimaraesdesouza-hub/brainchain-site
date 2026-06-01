(function () {
  'use strict';

  const VERSION = {
    version: '0.0.8',
    channel: 'Alpha',
  };
  const scriptUrl = document.currentScript ? document.currentScript.src : '';

  function channelLabel() {
    return VERSION.channel ? ' ' + VERSION.channel : '';
  }

  function format(kind) {
    const display = VERSION.version + channelLabel();

    switch (kind) {
      case 'plain':
        return VERSION.version;
      case 'prefixed':
        return 'v' + VERSION.version;
      case 'display':
        return display;
      case 'titlebar':
        return 'BrainChain Orchestrator • ' + display;
      case 'hero':
        return 'BRAINCHAIN* · ' + display;
      case 'build':
        return 'Build in public · ' + display;
      case 'footer':
        return '© 2026 BrainChain Orchestrator · ' + display;
      case 'orchestrator':
        return 'BrainChain Orchestrator · ' + display;
      case 'brand':
        return 'BrainChain · ' + display;
      default:
        return display;
    }
  }

  function applyVersionLabels(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-bc-version]').forEach((el) => {
      el.textContent = format(el.getAttribute('data-bc-version'));
    });
  }

  function setVersion(data) {
    if (!data || !data.version) return;
    VERSION.version = data.version;
    VERSION.channel = data.channel || data.label || '';
    applyVersionLabels();
  }

  function loadVersionFile() {
    if (!window.fetch) return Promise.resolve();
    const versionUrl = scriptUrl ? new URL('../version.json', scriptUrl).href : 'version.json';

    return window.fetch(versionUrl, { cache: 'no-cache' })
      .then((response) => (response.ok ? response.json() : null))
      .then(setVersion)
      .catch(() => {});
  }

  const versionLoad = loadVersionFile();

  window.BrainChainSiteVersion = Object.freeze({
    get version() {
      return VERSION.version;
    },
    get channel() {
      return VERSION.channel;
    },
    format,
    apply: applyVersionLabels,
    load: () => versionLoad,
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyVersionLabels());
  } else {
    applyVersionLabels();
  }
})();
