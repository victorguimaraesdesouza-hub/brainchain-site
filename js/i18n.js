/* BrainChain site i18n: PT-BR source -> EN / ES */
(function () {
  'use strict';

  const KEY = 'bc-lang';
  const SOURCE = new WeakMap();
  const ATTR_SOURCE = new WeakMap();
  const TRANSLATABLE_ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content'];
  let TITLE_SOURCE = '';

  const DICT = {
    en: {
      'Recursos': 'Features',
      'Agentes': 'Agents',
      'Documentação': 'Docs',
      'Changelog': 'Changelog',
      'Preços': 'Pricing',
      'Entrar': 'Sign in',
      'Baixar': 'Download',
      'Produto': 'Product',
      'Sobre': 'About',
      'Múltiplos agentes,\num único workspace.*': 'Multiple agents,\none workspace.*',
      'Orquestre Claude, GPT-4o, Gemini, Mistral, Llama e outros modelos em paralelo. Mesmo workspace, mesmo contexto, custo controlado por agente — sem transferência manual entre terminais.': 'Orchestrate Claude, GPT-4o, Gemini, Mistral, Llama and other models in parallel. Same workspace, same context, controlled cost per agent, without manual terminal handoffs.',
      'Baixar para Windows': 'Download for Windows',
      'Ver planos →': 'View plans ->',
      'Disponível para Windows · macOS e Linux em breve · Sem cartão de crédito': 'Available for Windows · macOS and Linux soon · No credit card',
      'Instalação direta.\nConfiguração mínima.*': 'Direct install.\nMinimal setup.*',
      'Sem configuração.\nSem dependências.*': 'No setup.\nNo dependencies.*',
      'Conecte com sua API key, em segundos.': 'Connect your API key in seconds.',
      'Já tem Claude Code ou Codex CLI? Eles são detectados.': 'Already have Claude Code or Codex CLI? They are detected.',
      'Qual modelo usar\npara cada tarefa.*': 'Which model to use\nfor each task.*',
      'Antes de baixar.*': 'Before downloading.*',
      'Mensal ou anual.\nCancele quando precisar.*': 'Monthly or yearly.\nCancel whenever needed.*',
      'Começar grátis →': 'Start free ->',
      'Começar grátis': 'Start free',
      'Assinar Pro →': 'Subscribe to Pro ->',
      'Assinar Pro': 'Subscribe to Pro',
      'Falar com vendas →': 'Talk to sales ->',
      'Falar com vendas': 'Talk to sales',
      'Sem cartão · sem cobrança': 'No card · no charge',
      'valor comercial será publicado antes do billing': 'commercial pricing will be published before billing',
      'Mínimo 3 seats': 'Minimum 3 seats',
      'EM BREVE': 'SOON',
      'EM BREVE · VALORES EM BREVE': 'SOON · PRICING SOON',
      'Pronto para orquestrar?*': 'Ready to orchestrate?*',
      'Baixe agora. Conecte seus modelos. Execute em paralelo em menos de 2 minutos.': 'Download now. Connect your models. Run in parallel in under 2 minutes.',
      'Ver documentação →': 'Read docs ->',
      'Gratuito · sem cartão · sem cadastro para baixar': 'Free · no card · no account to download',
      'Um cockpit para coordenar modelos, tarefas e contexto.': 'A cockpit to coordinate models, tasks and context.',
      'Panes de agentes': 'Agent panes',
      'Projetos independentes': 'Independent projects',
      'Telemetria de uso': 'Usage telemetry',
      'Browser e terminal': 'Browser and terminal',
      'Use cada modelo no papel em que ele rende melhor.': 'Use each model in the role where it performs best.',
      'Documentação para sair do zero sem perder tempo.': 'Docs to get started without wasting time.',
      'Windows alpha disponível. macOS e Linux em preparação.': 'Windows alpha available. macOS and Linux are in preparation.',
      'Conta BrainChain será liberada junto com billing e sync.': 'BrainChain accounts will launch with billing and sync.',
      'Free agora. Pro e Team quando billing estiver pronto.': 'Free now. Pro and Team when billing is ready.',
      'Build in public, com mudanças legíveis.': 'Build in public, with readable changes.',
      'Construído por quem trabalha com agentes todos os dias.': 'Built by people who work with agents every day.',
      'Privacidade': 'Privacy',
      'Termos de uso': 'Terms of use',
      'Essa rota não está no workspace.': 'This route is not in the workspace.',
      'Volte para a home ou abra a documentação para encontrar o caminho certo.': 'Go back home or open the docs to find the right path.',
      'Voltar para home': 'Back home',
      'Versão inicial para o alpha público. Última atualização: 25 de maio de 2026.': 'Initial version for the public alpha. Last updated: May 25, 2026.',
      'BrainChain é uma aplicação em alpha. O site pode coletar emails enviados voluntariamente em formulários de interesse. Nesta versão estática local, a captura demonstrativa salva o email apenas no navegador por localStorage.': 'BrainChain is an alpha application. The site may collect emails submitted voluntarily in interest forms. In this local static version, the demo capture saves the email only in the browser through localStorage.',
      'Dados de uso': 'Usage data',
      'O uso de provedores de IA depende das suas credenciais e dos termos de cada provedor. BrainChain não inclui tokens de modelos nos planos descritos no site.': 'Use of AI providers depends on your credentials and each provider terms. BrainChain does not include model tokens in the plans described on the site.',
      'Solicitações sobre privacidade podem ser enviadas para': 'Privacy requests can be sent to',
      'BrainChain é disponibilizado em alpha e pode mudar sem aviso prévio. Recursos descritos como em breve, Pro, Team, billing, sync e Orchestration Map podem não estar disponíveis na versão atual.': 'BrainChain is provided as an alpha and may change without prior notice. Features described as soon, Pro, Team, billing, sync and Orchestration Map may not be available in the current version.',
      'Uso responsável': 'Responsible use',
      'Você é responsável por revisar comandos, diffs, saídas de agentes e custos de API gerados nos provedores conectados.': 'You are responsible for reviewing commands, diffs, agent outputs and API costs generated through connected providers.',
      'Sem garantia': 'No warranty',
      'A versão alpha é fornecida para avaliação e feedback, sem garantia de disponibilidade contínua.': 'The alpha version is provided for evaluation and feedback, with no guarantee of continuous availability.',
      'Voltar': 'Back',
      'Home': 'Home',
      'Contato': 'Contact',
      'Comunidade': 'Community',
      'Entrar com Google': 'Sign in with Google',
      'Entrar no Discord': 'Join Discord',
      'Entre com Google para sincronizar seu workspace.': 'Sign in with Google to sync your workspace.',
      'A conta BrainChain usa apenas autenticação Google. No alpha, ela prepara acesso a billing, licenças, sync opcional e recursos de equipe sem criar mais uma senha para gerenciar.': 'BrainChain accounts use Google authentication only. In alpha, this prepares access to billing, licenses, optional sync and team features without creating another password to manage.',
      'Acessar conta': 'Access account',
      'Use sua conta Google para entrar no portal BrainChain.': 'Use your Google account to access the BrainChain portal.',
      'Continuar com Google': 'Continue with Google',
      'Ao continuar, você será direcionado para o fluxo OAuth do Google quando o portal de conta estiver conectado ao backend.': 'By continuing, you will be sent to the Google OAuth flow when the account portal is connected to the backend.',
      'Entre no Discord onde os agentes viram workflow.*': 'Join the Discord where agents become workflows.*',
      'Um espaço para trocar prompts, comparar modelos, pedir ajuda de instalação, mostrar stacks multi-agente e acompanhar o build in public do BrainChain.': 'A space to share prompts, compare models, get installation help, show multi-agent stacks and follow BrainChain being built in public.',
      'membros': 'members',
      'online': 'online',
      'threads ativas': 'active threads',
      'Atividade simulada da comunidade': 'Simulated community activity',
      'Simulação de conversa no Discord': 'Discord conversation simulation',
      'Mensagem em #brainchain-lab': 'Message in #brainchain-lab',
      'Use sua conta Google para entrar no portal BrainChain.': 'Use your Google account to access the BrainChain portal.',
      'Acesso à comunidade no Discord': 'Access to the Discord community',
      'Se você já clonou um repositório e abriu um terminal, está pronto. A documentação cobre os fluxos principais, e a comunidade no Discord concentra feedback, setups, bugs e ideias vindas de usuários reais.': 'If you have cloned a repository and opened a terminal, you are ready. The docs cover the main flows, and the Discord community concentrates feedback, setups, bugs and ideas from real users.',
      'Informe um email válido.': 'Enter a valid email.',
      'Email registrado localmente. Obrigado.': 'Email saved locally. Thank you.',
      'Produto — BrainChain Orchestrator': 'Product — BrainChain Orchestrator',
      'Agentes — BrainChain Orchestrator': 'Agents — BrainChain Orchestrator',
      'Documentação — BrainChain Orchestrator': 'Docs — BrainChain Orchestrator',
      'Download — BrainChain Orchestrator': 'Download — BrainChain Orchestrator',
      'Preços — BrainChain Orchestrator': 'Pricing — BrainChain Orchestrator',
      'Sobre — BrainChain Orchestrator': 'About — BrainChain Orchestrator',
      'Entrar — BrainChain Orchestrator': 'Sign in — BrainChain Orchestrator',
      'Privacidade — BrainChain Orchestrator': 'Privacy — BrainChain Orchestrator',
      'Termos — BrainChain Orchestrator': 'Terms — BrainChain Orchestrator',
      'Changelog — BrainChain Orchestrator': 'Changelog — BrainChain Orchestrator'
      ,
      'Entre na sua conta BrainChain Orchestrator usando login com Google.': 'Sign in to your BrainChain Orchestrator account with Google login.',
      'BrainChain Orchestrator — Múltiplos agentes, um único workspace.': 'BrainChain Orchestrator — Multiple agents, one workspace.',
      'IDE multi-agente para times de IA. Orquestre Claude, GPT-4o, Gemini, Mistral, Llama e outros modelos lado a lado, no mesmo workspace, em paralelo.': 'Multi-agent IDE for AI teams. Orchestrate Claude, GPT-4o, Gemini, Mistral, Llama and other models side by side, in the same workspace, in parallel.',
      'IDE multi-agente para orquestrar Claude, Codex, Gemini, Llama e outros modelos em paralelo no mesmo workspace.': 'Multi-agent IDE to orchestrate Claude, Codex, Gemini, Llama and other models in parallel in the same workspace.',
      'Seu orçamento de IA está sendo drenado. Você paga por modelos de alto desempenho para executar': 'Your AI budget is being drained. You pay for high-performance models to run',
      'as tarefas — incluindo aquelas que modelos eficientes resolveriam com a mesma qualidade.': 'tasks, including work that efficient models would solve with the same quality.',
      'Sem opções: pagar upgrade, esperar renovação ou suspender entregas em andamento.': 'No good options: pay for an upgrade, wait for renewal or pause deliveries in progress.',
      'Ferramentas de IA não conversam entre si. Você copia e cola entre abas, terminais e contextos, perdendo informação no caminho.': 'AI tools do not talk to each other. You copy and paste between tabs, terminals and contexts, losing information along the way.',
      'Seu orçamento de IA está sendo drenado. Você paga por modelos de alto desempenho para executar todas as tarefas — incluindo aquelas que modelos eficientes resolveriam com a mesma qualidade.': 'Your AI budget is being drained. You pay for high-performance models to run every task, including work that efficient models would solve with the same quality.',
      '70% das tarefas': '70% of tasks',
      'não exigem inteligência de topo. Leitura, busca, processamento, formatação — tudo isso consome limite valioso de modelos premium.': 'do not require top-tier intelligence. Reading, search, processing and formatting all consume valuable premium model limits.',
      'Modelos premium para raciocínio complexo. Modelos eficientes para lógica estruturada. Modelos leves para processamento em massa. Todos executando em paralelo, no mesmo workspace, sob seu comando.': 'Premium models for complex reasoning. Efficient models for structured logic. Lightweight models for mass processing. All running in parallel, in the same workspace, under your command.',
      'Dados públicos consolidados. Nenhum modelo vence em todas as dimensões — existe o modelo certo para cada tipo de tarefa. Com BrainChain, você escolhe por tarefa, não por projeto inteiro.': 'Consolidated public data. No model wins across every dimension. There is a right model for each task type. With BrainChain, you choose by task, not by the whole project.',
      'Conclusão.': 'Conclusion.',
      'Não existe modelo certo universal — existe modelo certo para cada tarefa. Com BrainChain você escolhe por papel, não por projeto inteiro. *Custo: menos pontos = mais barato.': 'There is no universal right model. There is a right model for each task. With BrainChain, you choose by role, not by the whole project. *Cost: fewer points means cheaper.',
      'Depende do uso. Times que executam apenas modelos premium em todas as tarefas registram economia de 60–75% ao distribuir as cargas. A economia vem de transferir trabalho repetitivo para modelos eficientes.': 'It depends on usage. Teams that run only premium models for every task see 60-75% savings by distributing workloads. The savings come from moving repetitive work to efficient models.',
      'Em tarefas complexas (refatoração arquitetural, lógica de autenticação, decisões de design), modelos premium ainda lideram. Modelos eficientes brilham em execução estruturada: rotas, schemas, testes, processamento em massa. A composição correta é decisão sua.': 'For complex tasks (architecture refactors, authentication logic, design decisions), premium models still lead. Efficient models shine in structured execution: routes, schemas, tests and bulk processing. The right mix is your decision.',
      'Cada workspace recebe uma cor de identificação que se propaga na aba, no header e no statusbar.': 'Each workspace gets an identifying color that carries into the tab, header and status bar.',
      'Um agente abre uma URL, lê o código, registra um insight nas anotações, passa a referência para outro agente refatorar — tudo dentro do mesmo workspace, em paralelo.': 'An agent opens a URL, reads the code, records an insight in notes and passes the reference to another agent to refactor, all inside the same workspace in parallel.',
      'Se você já configurou CLIs no seu sistema, BrainChain os reconhece automaticamente. Use APIs oficiais, CLIs locais — ou combine as duas abordagens no mesmo workspace.': 'If you have already configured CLIs on your system, BrainChain detects them automatically. Use official APIs, local CLIs, or combine both approaches in the same workspace.',
      'é desenvolvido por uma equipe enxuta de engenheiros que enfrentaram o mesmo problema que o produto resolve: orquestrar múltiplos modelos de IA sem perder contexto, sem inflar custos, sem trocar de ferramenta a cada tarefa.': 'is built by a lean engineering team that faced the same problem the product solves: orchestrating multiple AI models without losing context, inflating costs or switching tools for every task.'
      ,
      'Modelos integrados nativamente. Você cola sua credencial, o BrainChain pluga o agente. Nenhum CLI externo necessário.': 'Natively integrated models. Paste your credential and BrainChain plugs in the agent. No external CLI required.',
      'Cada agente tem uma função específica. Você escolhe o modelo correto para cada papel. Resultado típico: código refatorado e testado em 2 dias, contra 5 dias usando um único modelo premium.': 'Each agent has a specific role. You choose the right model for each role. Typical result: refactored and tested code in 2 days, versus 5 days using a single premium model.',
      'Não. Você paga API diretamente a cada provedor (Anthropic, OpenAI, Google, Mistral, Meta, DeepSeek, Alibaba, xAI, Cohere). BrainChain orquestra os modelos — não revende tokens.': 'No. You pay API costs directly to each provider (Anthropic, OpenAI, Google, Mistral, Meta, DeepSeek, Alibaba, xAI, Cohere). BrainChain orchestrates models. It does not resell tokens.'
      ,
      'VISÃO GERAL': 'OVERVIEW',
      'SOBRE': 'ABOUT',
      'PREÇOS': 'PRICING',
      'GUIA RÁPIDO': 'QUICK GUIDE',
      'BrainChain organiza agentes em panes visíveis, com workspace compartilhado, troca rápida de contexto, comandos globais e telemetria de custo para times que usam IA de forma intensiva.': 'BrainChain organizes agents into visible panes with a shared workspace, fast context switching, global commands and cost telemetry for teams that use AI intensively.',
      'Rode Claude, Codex, Gemini, Llama e outros lado a lado, cada um com uma função clara e contexto comum.': 'Run Claude, Codex, Gemini, Llama and others side by side, each with a clear role and shared context.',
      'Alterne, destaque ou reorganize projetos sem perder o estado mental do trabalho em andamento.': 'Switch, highlight or reorganize projects without losing the mental state of the work in progress.',
      'Comando global para abrir agentes, layouts, arquivos e ações sem caçar botões na interface.': 'Global command to open agents, layouts, files and actions without hunting for buttons in the interface.',
      'Visibilidade de tokens, custo e atividade por agente para evitar gastar modelo premium onde não precisa.': 'Visibility into tokens, cost and activity per agent to avoid spending premium models where they are not needed.',
      'Ferramentas de execução e inspeção ficam no mesmo cockpit em vez de espalhadas em abas externas.': 'Execution and inspection tools stay in the same cockpit instead of being scattered across external tabs.',
      'Mapa visual de tarefas e dependências em preparação para coordenar trabalho multi-agente com menos ruído.': 'Visual task and dependency map in preparation to coordinate multi-agent work with less noise.',
      'unificado': 'unified',
      'Credenciais': 'Credentials',
      'alpha público': 'public alpha',
      'BrainChain não tenta forçar um único modelo para tudo. Ele organiza um squad de agentes com funções claras: liderança, implementação, revisão, pesquisa, testes e síntese.': 'BrainChain does not try to force a single model for everything. It organizes a squad of agents with clear roles: leadership, implementation, review, research, tests and synthesis.',
      'Documentação inicial do BrainChain Orchestrator: instalação, agentes, workspaces, custos e próximos passos.': 'Initial BrainChain Orchestrator docs: installation, agents, workspaces, costs and next steps.',
      'Esta página organiza o que já é necessário para instalar, conectar agentes e operar o BrainChain com clareza durante o alpha.': 'This page organizes what is already needed to install, connect agents and operate BrainChain clearly during alpha.',
      'Abra panes por função: liderança, implementação, revisão e testes.': 'Open panes by function: leadership, implementation, review and tests.',
      'Baixe o BrainChain Orchestrator para Windows ou entre na lista para macOS e Linux.': 'Download BrainChain Orchestrator for Windows or join the list for macOS and Linux.',
      'O instalador público ainda deve apontar para o artefato final. Enquanto isso, esta página centraliza o fluxo correto: registrar interesse, solicitar acesso e acompanhar requisitos.': 'The public installer still needs to point to the final artifact. Until then, this page centralizes the correct flow: register interest, request access and follow requirements.',
      'Registre seu email localmente nesta máquina para testar o fluxo de captura da landing.': 'Save your email locally on this machine to test the landing capture flow.',
      'BrainChain usa BYO API keys: os custos dos modelos continuam sendo pagos diretamente aos provedores. O plano do app cobre orquestração, panes, sync e recursos de equipe.': 'BrainChain uses BYO API keys: model costs are still paid directly to providers. The app plan covers orchestration, panes, sync and team features.',
      '1 workspace ativo': '1 active workspace',
      'Até 8 panes': 'Up to 8 panes',
      'FlyKey completo': 'Full FlyKey',
      '/mês': '/month',
      'BrainChain nasceu de um problema prático: múltiplos modelos são úteis, mas alternar contexto entre terminais, abas e ferramentas consome foco. O produto organiza esse fluxo em uma interface única, densa e operacional.': 'BrainChain was born from a practical problem: multiple models are useful, but switching context between terminals, tabs and tools consumes focus. The product organizes that flow in a single, dense and operational interface.',
      'O changelog separa landing, produto e infraestrutura para ficar claro o que mudou e o que ainda é planejado.': 'The changelog separates landing, product and infrastructure so it is clear what changed and what is still planned.',
      '2026-05-25 · Site navegável com páginas internas, menu mobile, SEO base e captura local': '2026-05-25 · Navigable site with internal pages, mobile menu, base SEO and local capture',
      '2026-05-25 · Passada de responsividade para home e cockpits': '2026-05-25 · Responsiveness pass for home and cockpits',
      '2026-05-25 · Home page de alta fidelidade com cockpit animado': '2026-05-25 · High-fidelity home page with animated cockpit',
      'Política de privacidade inicial do BrainChain Orchestrator.': 'Initial BrainChain Orchestrator privacy policy.',
      'Termos iniciais do BrainChain Orchestrator.': 'Initial BrainChain Orchestrator terms.'
      ,
      'Não é possível continuar.': 'Cannot continue.',
      'Tokens acabam antes do prazo.': 'Tokens run out before the deadline.',
      'Falta orquestração inteligente.': 'Intelligent orchestration is missing.'
    },
    es: {
      'Recursos': 'Recursos',
      'Agentes': 'Agentes',
      'Documentação': 'Documentación',
      'Changelog': 'Cambios',
      'Preços': 'Precios',
      'Entrar': 'Entrar',
      'Baixar': 'Descargar',
      'Produto': 'Producto',
      'Sobre': 'Acerca de',
      'Múltiplos agentes,\num único workspace.*': 'Múltiples agentes,\nun solo workspace.*',
      'Orquestre Claude, GPT-4o, Gemini, Mistral, Llama e outros modelos em paralelo. Mesmo workspace, mesmo contexto, custo controlado por agente — sem transferência manual entre terminais.': 'Orquesta Claude, GPT-4o, Gemini, Mistral, Llama y otros modelos en paralelo. Mismo workspace, mismo contexto y coste controlado por agente, sin transferencias manuales entre terminales.',
      'Baixar para Windows': 'Descargar para Windows',
      'Ver planos →': 'Ver planes ->',
      'Disponível para Windows · macOS e Linux em breve · Sem cartão de crédito': 'Disponible para Windows · macOS y Linux pronto · Sin tarjeta de crédito',
      'Instalação direta.\nConfiguração mínima.*': 'Instalación directa.\nConfiguración mínima.*',
      'Sem configuração.\nSem dependências.*': 'Sin configuración.\nSin dependencias.*',
      'Conecte com sua API key, em segundos.': 'Conecta tu API key en segundos.',
      'Já tem Claude Code ou Codex CLI? Eles são detectados.': '¿Ya tienes Claude Code o Codex CLI? Se detectan automáticamente.',
      'Qual modelo usar\npara cada tarefa.*': 'Qué modelo usar\npara cada tarea.*',
      'Antes de baixar.*': 'Antes de descargar.*',
      'Mensal ou anual.\nCancele quando precisar.*': 'Mensual o anual.\nCancela cuando lo necesites.*',
      'Começar grátis →': 'Empezar gratis ->',
      'Começar grátis': 'Empezar gratis',
      'Assinar Pro →': 'Suscribirse a Pro ->',
      'Assinar Pro': 'Suscribirse a Pro',
      'Falar com vendas →': 'Hablar con ventas ->',
      'Falar com vendas': 'Hablar con ventas',
      'Sem cartão · sem cobrança': 'Sin tarjeta · sin cobro',
      'valor comercial será publicado antes do billing': 'el precio comercial se publicará antes del billing',
      'Mínimo 3 seats': 'Mínimo 3 seats',
      'EM BREVE': 'PRONTO',
      'EM BREVE · VALORES EM BREVE': 'PRONTO · PRECIOS PRONTO',
      'Pronto para orquestrar?*': '¿Listo para orquestar?*',
      'Baixe agora. Conecte seus modelos. Execute em paralelo em menos de 2 minutos.': 'Descarga ahora. Conecta tus modelos. Ejecuta en paralelo en menos de 2 minutos.',
      'Ver documentação →': 'Ver documentación ->',
      'Gratuito · sem cartão · sem cadastro para baixar': 'Gratis · sin tarjeta · sin registro para descargar',
      'Um cockpit para coordenar modelos, tarefas e contexto.': 'Un cockpit para coordinar modelos, tareas y contexto.',
      'Panes de agentes': 'Paneles de agentes',
      'Projetos independentes': 'Proyectos independientes',
      'Telemetria de uso': 'Telemetría de uso',
      'Browser e terminal': 'Navegador y terminal',
      'Use cada modelo no papel em que ele rende melhor.': 'Usa cada modelo en el rol donde rinde mejor.',
      'Documentação para sair do zero sem perder tempo.': 'Documentación para empezar sin perder tiempo.',
      'Windows alpha disponível. macOS e Linux em preparação.': 'Alpha para Windows disponible. macOS y Linux en preparación.',
      'Conta BrainChain será liberada junto com billing e sync.': 'La cuenta BrainChain llegará junto con billing y sync.',
      'Free agora. Pro e Team quando billing estiver pronto.': 'Free ahora. Pro y Team cuando billing esté listo.',
      'Build in public, com mudanças legíveis.': 'Build in public, con cambios legibles.',
      'Construído por quem trabalha com agentes todos os dias.': 'Construido por quienes trabajan con agentes todos los días.',
      'Privacidade': 'Privacidad',
      'Termos de uso': 'Términos de uso',
      'Essa rota não está no workspace.': 'Esta ruta no está en el workspace.',
      'Volte para a home ou abra a documentação para encontrar o caminho certo.': 'Vuelve al inicio o abre la documentación para encontrar el camino correcto.',
      'Voltar para home': 'Volver al inicio',
      'Versão inicial para o alpha público. Última atualização: 25 de maio de 2026.': 'Versión inicial para el alpha público. Última actualización: 25 de mayo de 2026.',
      'BrainChain é uma aplicação em alpha. O site pode coletar emails enviados voluntariamente em formulários de interesse. Nesta versão estática local, a captura demonstrativa salva o email apenas no navegador por localStorage.': 'BrainChain es una aplicación en alpha. El sitio puede recopilar correos enviados voluntariamente en formularios de interés. En esta versión estática local, la captura demostrativa guarda el correo solo en el navegador mediante localStorage.',
      'Dados de uso': 'Datos de uso',
      'O uso de provedores de IA depende das suas credenciais e dos termos de cada provedor. BrainChain não inclui tokens de modelos nos planos descritos no site.': 'El uso de proveedores de IA depende de tus credenciales y de los términos de cada proveedor. BrainChain no incluye tokens de modelos en los planes descritos en el sitio.',
      'Solicitações sobre privacidade podem ser enviadas para': 'Las solicitudes sobre privacidad pueden enviarse a',
      'BrainChain é disponibilizado em alpha e pode mudar sem aviso prévio. Recursos descritos como em breve, Pro, Team, billing, sync e Orchestration Map podem não estar disponíveis na versão atual.': 'BrainChain se ofrece en alpha y puede cambiar sin previo aviso. Los recursos descritos como pronto, Pro, Team, billing, sync y Orchestration Map pueden no estar disponibles en la versión actual.',
      'Uso responsável': 'Uso responsable',
      'Você é responsável por revisar comandos, diffs, saídas de agentes e custos de API gerados nos provedores conectados.': 'Eres responsable de revisar comandos, diffs, salidas de agentes y costos de API generados en los proveedores conectados.',
      'Sem garantia': 'Sin garantía',
      'A versão alpha é fornecida para avaliação e feedback, sem garantia de disponibilidade contínua.': 'La versión alpha se ofrece para evaluación y feedback, sin garantía de disponibilidad continua.',
      'Voltar': 'Volver',
      'Home': 'Inicio',
      'Contato': 'Contacto',
      'Comunidade': 'Comunidad',
      'Entrar com Google': 'Entrar con Google',
      'Entrar no Discord': 'Entrar al Discord',
      'Entre com Google para sincronizar seu workspace.': 'Entra con Google para sincronizar tu workspace.',
      'A conta BrainChain usa apenas autenticação Google. No alpha, ela prepara acesso a billing, licenças, sync opcional e recursos de equipe sem criar mais uma senha para gerenciar.': 'La cuenta BrainChain usa solo autenticación con Google. En alpha, prepara acceso a billing, licencias, sync opcional y recursos de equipo sin crear otra contraseña que gestionar.',
      'Acessar conta': 'Acceder a la cuenta',
      'Use sua conta Google para entrar no portal BrainChain.': 'Usa tu cuenta de Google para entrar al portal BrainChain.',
      'Continuar com Google': 'Continuar con Google',
      'Ao continuar, você será direcionado para o fluxo OAuth do Google quando o portal de conta estiver conectado ao backend.': 'Al continuar, se te enviará al flujo OAuth de Google cuando el portal de cuenta esté conectado al backend.',
      'Entre no Discord onde os agentes viram workflow.*': 'Entra al Discord donde los agentes se vuelven workflow.*',
      'Um espaço para trocar prompts, comparar modelos, pedir ajuda de instalação, mostrar stacks multi-agente e acompanhar o build in public do BrainChain.': 'Un espacio para compartir prompts, comparar modelos, pedir ayuda de instalación, mostrar stacks multiagente y seguir el build in public de BrainChain.',
      'membros': 'miembros',
      'online': 'online',
      'threads ativas': 'threads activas',
      'Atividade simulada da comunidade': 'Actividad simulada de la comunidad',
      'Simulação de conversa no Discord': 'Simulación de conversación en Discord',
      'Mensagem em #brainchain-lab': 'Mensaje en #brainchain-lab',
      'Acesso à comunidade no Discord': 'Acceso a la comunidad en Discord',
      'Se você já clonou um repositório e abriu um terminal, está pronto. A documentação cobre os fluxos principais, e a comunidade no Discord concentra feedback, setups, bugs e ideias vindas de usuários reais.': 'Si ya clonaste un repositorio y abriste una terminal, estás listo. La documentación cubre los flujos principales, y la comunidad en Discord concentra feedback, setups, bugs e ideas de usuarios reales.',
      'Informe um email válido.': 'Introduce un email válido.',
      'Email registrado localmente. Obrigado.': 'Email registrado localmente. Gracias.',
      'Produto — BrainChain Orchestrator': 'Producto — BrainChain Orchestrator',
      'Agentes — BrainChain Orchestrator': 'Agentes — BrainChain Orchestrator',
      'Documentação — BrainChain Orchestrator': 'Documentación — BrainChain Orchestrator',
      'Download — BrainChain Orchestrator': 'Descarga — BrainChain Orchestrator',
      'Preços — BrainChain Orchestrator': 'Precios — BrainChain Orchestrator',
      'Sobre — BrainChain Orchestrator': 'Acerca de — BrainChain Orchestrator',
      'Entrar — BrainChain Orchestrator': 'Entrar — BrainChain Orchestrator',
      'Privacidade — BrainChain Orchestrator': 'Privacidad — BrainChain Orchestrator',
      'Termos — BrainChain Orchestrator': 'Términos — BrainChain Orchestrator',
      'Changelog — BrainChain Orchestrator': 'Cambios — BrainChain Orchestrator'
      ,
      'Entre na sua conta BrainChain Orchestrator usando login com Google.': 'Entra a tu cuenta BrainChain Orchestrator con login de Google.',
      'BrainChain Orchestrator — Múltiplos agentes, um único workspace.': 'BrainChain Orchestrator — Múltiples agentes, un solo workspace.',
      'IDE multi-agente para times de IA. Orquestre Claude, GPT-4o, Gemini, Mistral, Llama e outros modelos lado a lado, no mesmo workspace, em paralelo.': 'IDE multiagente para equipos de IA. Orquesta Claude, GPT-4o, Gemini, Mistral, Llama y otros modelos lado a lado, en el mismo workspace, en paralelo.',
      'IDE multi-agente para orquestrar Claude, Codex, Gemini, Llama e outros modelos em paralelo no mesmo workspace.': 'IDE multiagente para orquestar Claude, Codex, Gemini, Llama y otros modelos en paralelo en el mismo workspace.',
      'Seu orçamento de IA está sendo drenado. Você paga por modelos de alto desempenho para executar': 'Tu presupuesto de IA se está drenando. Pagas por modelos de alto rendimiento para ejecutar',
      'as tarefas — incluindo aquelas que modelos eficientes resolveriam com a mesma qualidade.': 'tareas, incluidas las que modelos eficientes resolverían con la misma calidad.',
      'Sem opções: pagar upgrade, esperar renovação ou suspender entregas em andamento.': 'Sin buenas opciones: pagar upgrade, esperar renovación o suspender entregas en curso.',
      'Ferramentas de IA não conversam entre si. Você copia e cola entre abas, terminais e contextos, perdendo informação no caminho.': 'Las herramientas de IA no conversan entre sí. Copias y pegas entre pestañas, terminales y contextos, perdiendo información por el camino.',
      'Seu orçamento de IA está sendo drenado. Você paga por modelos de alto desempenho para executar todas as tarefas — incluindo aquelas que modelos eficientes resolveriam com a mesma qualidade.': 'Tu presupuesto de IA se está drenando. Pagas por modelos de alto rendimiento para ejecutar todas las tareas, incluidas las que modelos eficientes resolverían con la misma calidad.',
      '70% das tarefas': '70% de las tareas',
      'não exigem inteligência de topo. Leitura, busca, processamento, formatação — tudo isso consome limite valioso de modelos premium.': 'no requieren inteligencia de primer nivel. Lectura, búsqueda, procesamiento y formato consumen límites valiosos de modelos premium.',
      'Modelos premium para raciocínio complexo. Modelos eficientes para lógica estruturada. Modelos leves para processamento em massa. Todos executando em paralelo, no mesmo workspace, sob seu comando.': 'Modelos premium para razonamiento complejo. Modelos eficientes para lógica estructurada. Modelos ligeros para procesamiento masivo. Todos ejecutándose en paralelo, en el mismo workspace, bajo tu mando.',
      'Dados públicos consolidados. Nenhum modelo vence em todas as dimensões — existe o modelo certo para cada tipo de tarefa. Com BrainChain, você escolhe por tarefa, não por projeto inteiro.': 'Datos públicos consolidados. Ningún modelo gana en todas las dimensiones. Existe el modelo correcto para cada tipo de tarea. Con BrainChain, eliges por tarea, no por proyecto entero.',
      'Conclusão.': 'Conclusión.',
      'Não existe modelo certo universal — existe modelo certo para cada tarefa. Com BrainChain você escolhe por papel, não por projeto inteiro. *Custo: menos pontos = mais barato.': 'No existe un modelo correcto universal. Existe un modelo correcto para cada tarea. Con BrainChain eliges por rol, no por proyecto entero. *Costo: menos puntos = más barato.',
      'Depende do uso. Times que executam apenas modelos premium em todas as tarefas registram economia de 60–75% ao distribuir as cargas. A economia vem de transferir trabalho repetitivo para modelos eficientes.': 'Depende del uso. Los equipos que ejecutan solo modelos premium en todas las tareas registran ahorros de 60-75% al distribuir cargas. El ahorro viene de transferir trabajo repetitivo a modelos eficientes.',
      'Em tarefas complexas (refatoração arquitetural, lógica de autenticação, decisões de design), modelos premium ainda lideram. Modelos eficientes brilham em execução estruturada: rotas, schemas, testes, processamento em massa. A composição correta é decisão sua.': 'En tareas complejas (refactorización arquitectural, lógica de autenticación, decisiones de diseño), los modelos premium aún lideran. Los modelos eficientes brillan en ejecución estructurada: rutas, schemas, tests y procesamiento masivo. La mezcla correcta es decisión tuya.',
      'Cada workspace recebe uma cor de identificação que se propaga na aba, no header e no statusbar.': 'Cada workspace recibe un color de identificación que se propaga en la pestaña, el header y la barra de estado.',
      'Um agente abre uma URL, lê o código, registra um insight nas anotações, passa a referência para outro agente refatorar — tudo dentro do mesmo workspace, em paralelo.': 'Un agente abre una URL, lee el código, registra un insight en las notas y pasa la referencia a otro agente para refactorizar, todo dentro del mismo workspace en paralelo.',
      'Se você já configurou CLIs no seu sistema, BrainChain os reconhece automaticamente. Use APIs oficiais, CLIs locais — ou combine as duas abordagens no mesmo workspace.': 'Si ya configuraste CLIs en tu sistema, BrainChain los reconoce automáticamente. Usa APIs oficiales, CLIs locales, o combina ambos enfoques en el mismo workspace.',
      'é desenvolvido por uma equipe enxuta de engenheiros que enfrentaram o mesmo problema que o produto resolve: orquestrar múltiplos modelos de IA sem perder contexto, sem inflar custos, sem trocar de ferramenta a cada tarefa.': 'es desarrollado por un equipo compacto de ingenieros que enfrentaron el mismo problema que resuelve el producto: orquestar múltiples modelos de IA sin perder contexto, inflar costos ni cambiar de herramienta en cada tarea.'
      ,
      'Modelos integrados nativamente. Você cola sua credencial, o BrainChain pluga o agente. Nenhum CLI externo necessário.': 'Modelos integrados de forma nativa. Pegas tu credencial y BrainChain conecta el agente. No se requiere CLI externo.',
      'Cada agente tem uma função específica. Você escolhe o modelo correto para cada papel. Resultado típico: código refatorado e testado em 2 dias, contra 5 dias usando um único modelo premium.': 'Cada agente tiene una función específica. Tú eliges el modelo correcto para cada rol. Resultado típico: código refactorizado y probado en 2 días, contra 5 días usando un único modelo premium.',
      'Não. Você paga API diretamente a cada provedor (Anthropic, OpenAI, Google, Mistral, Meta, DeepSeek, Alibaba, xAI, Cohere). BrainChain orquestra os modelos — não revende tokens.': 'No. Pagas la API directamente a cada proveedor (Anthropic, OpenAI, Google, Mistral, Meta, DeepSeek, Alibaba, xAI, Cohere). BrainChain orquesta los modelos. No revende tokens.'
      ,
      'VISÃO GERAL': 'VISIÓN GENERAL',
      'SOBRE': 'ACERCA DE',
      'PREÇOS': 'PRECIOS',
      'GUIA RÁPIDO': 'GUÍA RÁPIDA',
      'BrainChain organiza agentes em panes visíveis, com workspace compartilhado, troca rápida de contexto, comandos globais e telemetria de custo para times que usam IA de forma intensiva.': 'BrainChain organiza agentes en panes visibles, con workspace compartido, cambio rápido de contexto, comandos globales y telemetría de costo para equipos que usan IA de forma intensiva.',
      'Rode Claude, Codex, Gemini, Llama e outros lado a lado, cada um com uma função clara e contexto comum.': 'Ejecuta Claude, Codex, Gemini, Llama y otros lado a lado, cada uno con una función clara y contexto común.',
      'Alterne, destaque ou reorganize projetos sem perder o estado mental do trabalho em andamento.': 'Alterna, destaca o reorganiza proyectos sin perder el estado mental del trabajo en curso.',
      'Comando global para abrir agentes, layouts, arquivos e ações sem caçar botões na interface.': 'Comando global para abrir agentes, layouts, archivos y acciones sin buscar botones en la interfaz.',
      'Visibilidade de tokens, custo e atividade por agente para evitar gastar modelo premium onde não precisa.': 'Visibilidad de tokens, costo y actividad por agente para evitar gastar modelos premium donde no hace falta.',
      'Ferramentas de execução e inspeção ficam no mesmo cockpit em vez de espalhadas em abas externas.': 'Las herramientas de ejecución e inspección quedan en el mismo cockpit en vez de repartidas en pestañas externas.',
      'Mapa visual de tarefas e dependências em preparação para coordenar trabalho multi-agente com menos ruído.': 'Mapa visual de tareas y dependencias en preparación para coordinar trabajo multiagente con menos ruido.',
      'unificado': 'unificado',
      'Credenciais': 'Credenciales',
      'alpha público': 'alpha público',
      'BrainChain não tenta forçar um único modelo para tudo. Ele organiza um squad de agentes com funções claras: liderança, implementação, revisão, pesquisa, testes e síntese.': 'BrainChain no intenta forzar un único modelo para todo. Organiza un squad de agentes con funciones claras: liderazgo, implementación, revisión, investigación, tests y síntesis.',
      'Documentação inicial do BrainChain Orchestrator: instalação, agentes, workspaces, custos e próximos passos.': 'Documentación inicial de BrainChain Orchestrator: instalación, agentes, workspaces, costos y próximos pasos.',
      'Esta página organiza o que já é necessário para instalar, conectar agentes e operar o BrainChain com clareza durante o alpha.': 'Esta página organiza lo que ya es necesario para instalar, conectar agentes y operar BrainChain con claridad durante el alpha.',
      'Abra panes por função: liderança, implementação, revisão e testes.': 'Abre panes por función: liderazgo, implementación, revisión y tests.',
      'Baixe o BrainChain Orchestrator para Windows ou entre na lista para macOS e Linux.': 'Descarga BrainChain Orchestrator para Windows o entra en la lista para macOS y Linux.',
      'O instalador público ainda deve apontar para o artefato final. Enquanto isso, esta página centraliza o fluxo correto: registrar interesse, solicitar acesso e acompanhar requisitos.': 'El instalador público aún debe apuntar al artefacto final. Mientras tanto, esta página centraliza el flujo correcto: registrar interés, solicitar acceso y seguir requisitos.',
      'Registre seu email localmente nesta máquina para testar o fluxo de captura da landing.': 'Registra tu email localmente en esta máquina para probar el flujo de captura de la landing.',
      'BrainChain usa BYO API keys: os custos dos modelos continuam sendo pagos diretamente aos provedores. O plano do app cobre orquestração, panes, sync e recursos de equipe.': 'BrainChain usa BYO API keys: los costos de los modelos se siguen pagando directamente a los proveedores. El plan de la app cubre orquestación, panes, sync y recursos de equipo.',
      '1 workspace ativo': '1 workspace activo',
      'Até 8 panes': 'Hasta 8 panes',
      'FlyKey completo': 'FlyKey completo',
      '/mês': '/mes',
      'BrainChain nasceu de um problema prático: múltiplos modelos são úteis, mas alternar contexto entre terminais, abas e ferramentas consome foco. O produto organiza esse fluxo em uma interface única, densa e operacional.': 'BrainChain nació de un problema práctico: múltiples modelos son útiles, pero alternar contexto entre terminales, pestañas y herramientas consume foco. El producto organiza ese flujo en una interfaz única, densa y operacional.',
      'O changelog separa landing, produto e infraestrutura para ficar claro o que mudou e o que ainda é planejado.': 'El changelog separa landing, producto e infraestructura para que quede claro qué cambió y qué aún está planeado.',
      '2026-05-25 · Site navegável com páginas internas, menu mobile, SEO base e captura local': '2026-05-25 · Sitio navegable con páginas internas, menú móvil, SEO base y captura local',
      '2026-05-25 · Passada de responsividade para home e cockpits': '2026-05-25 · Pasada de responsividad para home y cockpits',
      '2026-05-25 · Home page de alta fidelidade com cockpit animado': '2026-05-25 · Home page de alta fidelidad con cockpit animado',
      'Política de privacidade inicial do BrainChain Orchestrator.': 'Política de privacidad inicial de BrainChain Orchestrator.',
      'Termos iniciais do BrainChain Orchestrator.': 'Términos iniciales de BrainChain Orchestrator.'
      ,
      'Não é possível continuar.': 'No es posible continuar.',
      'Tokens acabam antes do prazo.': 'Los tokens se acaban antes del plazo.',
      'Falta orquestração inteligente.': 'Falta orquestación inteligente.'
    }
  };

  const PHRASES = {
    en: {
      'Visão geral': 'Overview',
      'Navegação principal': 'Main navigation',
      'Abrir menu': 'Open menu',
      'Seções': 'Sections',
      'Produto': 'Product',
      'Recursos': 'Features',
      'Documentação': 'Docs',
      'Preços': 'Pricing',
      'Entrar': 'Sign in',
      'Baixar': 'Download',
      'Download': 'Download',
      'Sobre': 'About',
      'Comunidade': 'Community',
      'Privacidade': 'Privacy',
      'Termos de uso': 'Terms of use',
      'Termos': 'Terms',
      'Contato': 'Contact',
      'Empresa': 'Company',
      'Legal': 'Legal',
      'Perguntas frequentes': 'Frequently asked questions',
      'Perguntas': 'Questions',
      'frequentes': 'frequent',
      'Primeiros passos': 'First steps',
      'Boas práticas': 'Best practices',
      'Requisitos': 'Requirements',
      'Receber novidades': 'Get updates',
      'Solicitar acesso': 'Request access',
      'Ver guia rápido': 'View quick guide',
      'Guia rápido': 'Quick guide',
      'Solicitar documentação avançada': 'Request advanced docs',
      'Instalação e download': 'Installation and download',
      'Modelos e agentes suportados': 'Supported models and agents',
      'Planos, limites e BYO API keys': 'Plans, limits and BYO API keys',
      'Planos': 'Plans',
      'Plano': 'Plan',
      'Mensal ou anual': 'Monthly or yearly',
      'Cancele quando precisar': 'Cancel whenever needed',
      'Começar grátis': 'Start free',
      'Assinar Pro': 'Subscribe to Pro',
      'Falar com vendas': 'Talk to sales',
      'Sem cartão': 'No card',
      'sem cobrança': 'no charge',
      'sem cadastro para baixar': 'no account to download',
      'Sem garantia': 'No warranty',
      'Uso responsável': 'Responsible use',
      'Dados de uso': 'Usage data',
      'Em breve': 'Soon',
      'em breve': 'soon',
      'não precisa': 'not needed',
      'pra sempre': 'forever',
      'Sob consulta': 'Custom pricing',
      'Mínimo': 'Minimum',
      'Tudo do plano Pro': 'Everything in Pro',
      'Suporte prioritário': 'Priority support',
      'Workspaces compartilhados': 'Shared workspaces',
      'Workspaces ilimitados': 'Unlimited workspaces',
      'Billing centralizado': 'Centralized billing',
      'Acesso': 'Access',
      'acesso': 'access',
      'conta': 'account',
      'senha local': 'local password',
      'sem criar mais uma senha para gerenciar': 'without creating another password to manage',
      'Demonstração ao vivo do BrainChain': 'Live BrainChain demo',
      'demonstração ao vivo': 'live demo',
      'interativa': 'interactive',
      'Instalação direta': 'Direct installation',
      'Configuração mínima': 'Minimal setup',
      'Instale a aplicação': 'Install the app',
      'Conecte seus agentes': 'Connect your agents',
      'Distribua as tarefas': 'Distribute tasks',
      'Workspace unificado': 'Unified workspace',
      'Conecte suas credenciais dos provedores': 'Connect your provider credentials',
      'Abra ou crie um workspace': 'Open or create a workspace',
      'Baixe a versão Windows alpha': 'Download the Windows alpha',
      'Use modelos premium para decisões difíceis': 'Use premium models for difficult decisions',
      'Delegue leitura, formatação e testes para modelos eficientes': 'Delegate reading, formatting and tests to efficient models',
      'Mantenha o workspace limpo e versionado': 'Keep the workspace clean and versioned',
      'Revise diffs antes de aplicar mudanças em produção': 'Review diffs before applying production changes',
      'Windows alpha disponível': 'Windows alpha available',
      'macOS e Linux em preparação': 'macOS and Linux in preparation',
      'Windows hoje': 'Windows today',
      'macOS e Linux em breve': 'macOS and Linux soon',
      'Windows 10 ou 11': 'Windows 10 or 11',
      'Conexão com internet para provedores OAuth/API': 'Internet connection for OAuth/API providers',
      'Credenciais próprias dos modelos usados': 'Your own credentials for the models used',
      'Workspace local versionado recomendado': 'Versioned local workspace recommended',
      'Documentação para sair do zero sem perder tempo': 'Docs to get started without wasting time',
      'Esta página organiza': 'This page organizes',
      'o que já é necessário': 'what is already needed',
      'para instalar': 'to install',
      'conectar agentes': 'connect agents',
      'operar o BrainChain': 'operate BrainChain',
      'com clareza durante o alpha': 'clearly during alpha',
      'Construído por quem trabalha com agentes todos os dias': 'Built by people who work with agents every day',
      'Construído por quem usa': 'Built by people who use it',
      'Build in public': 'Build in public',
      'Princípios': 'Principles',
      'Densidade sem bagunça': 'Density without clutter',
      'Controle explícito de custo e contexto': 'Explicit control of cost and context',
      'BYO API keys sempre claro': 'BYO API keys always clear',
      'Sem prometer autonomia mágica': 'No promises of magic autonomy',
      'Feedback, parcerias e reports podem ser enviados para': 'Feedback, partnerships and reports can be sent to',
      'Essa rota não está no workspace': 'This route is not in the workspace',
      'Volte para a home ou abra a documentação para encontrar o caminho certo': 'Go back home or open the docs to find the right path',
      'Voltar para home': 'Back home',
      'Voltar': 'Back',
      'Orquestre': 'Orchestrate',
      'Múltiplos agentes': 'Multiple agents',
      'um único workspace': 'one workspace',
      'Múltiplos modelos': 'Multiple models',
      'agentes': 'agents',
      'modelos': 'models',
      'tarefas': 'tasks',
      'tarefa': 'task',
      'contexto': 'context',
      'custo': 'cost',
      'custos': 'costs',
      'barato': 'cheap',
      'menos': 'fewer',
      'mais': 'more',
      'pontos': 'points',
      'projeto inteiro': 'whole project',
      'projeto': 'project',
      'você': 'you',
      'escolhe': 'choose',
      'papel': 'role',
      'não': 'not',
      'tokens': 'tokens',
      'provedores': 'providers',
      'credenciais': 'credentials',
      'chaves': 'keys',
      'suas chaves': 'your keys',
      'público': 'public',
      'pesquisa': 'research',
      'implementação': 'implementation',
      'revisão': 'review',
      'testes': 'tests',
      'raciocínio': 'reasoning',
      'local': 'local',
      'Panes simultâneas': 'Simultaneous panes',
      'Panes de agentes': 'Agent panes',
      'Projetos independentes': 'Independent projects',
      'Telemetria de uso': 'Usage telemetry',
      'Browser e terminal': 'Browser and terminal',
      'Navegador': 'Browser',
      'terminal': 'terminal',
      'Comando global': 'Global command',
      'abrir agentes': 'open agents',
      'layouts': 'layouts',
      'arquivos': 'files',
      'ações': 'actions',
      'sem caçar botões na interface': 'without hunting for buttons in the interface',
      'Mapa visual de tarefas e dependências': 'Visual map of tasks and dependencies',
      'em preparação': 'in preparation',
      'coordenar trabalho multi-agente': 'coordinate multi-agent work',
      'com menos ruído': 'with less noise',
      'Use cada modelo no papel em que ele rende melhor': 'Use each model in the role where it performs best',
      'não tenta forçar um único modelo para tudo': 'does not try to force one model for everything',
      'funções claras': 'clear roles',
      'liderança': 'leadership',
      'síntese': 'synthesis',
      'O modelo certo para a tarefa certa': 'The right model for the right task',
      'Qual modelo usar para cada tarefa': 'Which model to use for each task',
      'Antes de baixar': 'Before downloading',
      'Para quem é': 'Who it is for',
      'E para quem ainda não é': 'And who it is not for yet',
      'Você deve usar BrainChain se': 'You should use BrainChain if',
      'BrainChain ainda não é para você se': 'BrainChain is not for you yet if',
      'É confortável com terminal e linha de comando': 'You are comfortable with terminal and command line',
      'Precisa orquestrar': 'You need to orchestrate',
      'Quer visibilidade de custo': 'You want cost visibility',
      'Já consome IA': 'You already use AI',
      'Está aberto a produto em evolução': 'You are open to an evolving product',
      'Nunca abriu um terminal': 'You have never opened a terminal',
      'Trabalha exclusivamente com um único modelo de IA': 'You work exclusively with one AI model',
      'Não tem interesse em multi-agente neste momento': 'You are not interested in multi-agent right now',
      'Precisa de produto de produção polido': 'You need a polished production product',
      'Exige SLA contratual': 'You require contractual SLA',
      'Requer suporte 24/7 por telefone': 'You require 24/7 phone support',
      'Qual é a economia real em custos de API': 'What is the real API cost saving',
      'Está disponível para macOS e Linux': 'Is it available for macOS and Linux',
      'O produto é estável': 'Is the product stable',
      'BrainChain inclui tokens dos modelos': 'Does BrainChain include model tokens',
      'É adequado para desenvolvedores em início de carreira': 'Is it suitable for early-career developers',
      'Modelos eficientes substituem modelos premium': 'Do efficient models replace premium models',
      'Quando o pricing comercial será publicado': 'When will commercial pricing be published',
      'Documentação cobre os fluxos principais': 'Docs cover the main flows',
      'feedback': 'feedback',
      'bugs': 'bugs',
      'ideias': 'ideas',
      'usuários reais': 'real users',
      'Avisar': 'Notify me',
      'seu@email.com': 'your@email.com',
      'email': 'email',
      'cartão': 'card',
      'Cartão': 'Card',
      'Versão inicial': 'Initial version',
      'Última atualização': 'Last updated',
      'Solicitações sobre privacidade podem ser enviadas para': 'Privacy requests can be sent to',
      'Você é responsável por revisar comandos, diffs, saídas de agentes e custos de API gerados nos provedores conectados': 'You are responsible for reviewing commands, diffs, agent outputs and API costs generated through connected providers',
      'A versão alpha é fornecida para avaliação e feedback': 'The alpha version is provided for evaluation and feedback',
      'sem garantia de disponibilidade contínua': 'with no guarantee of continuous availability'
    },
    es: {
      'Visão geral': 'Visión general',
      'Navegação principal': 'Navegación principal',
      'Abrir menu': 'Abrir menú',
      'Seções': 'Secciones',
      'Produto': 'Producto',
      'Recursos': 'Recursos',
      'Documentação': 'Documentación',
      'Preços': 'Precios',
      'Entrar': 'Entrar',
      'Baixar': 'Descargar',
      'Download': 'Descarga',
      'Sobre': 'Acerca de',
      'Comunidade': 'Comunidad',
      'Privacidade': 'Privacidad',
      'Termos de uso': 'Términos de uso',
      'Termos': 'Términos',
      'Contato': 'Contacto',
      'Empresa': 'Empresa',
      'Legal': 'Legal',
      'Perguntas frequentes': 'Preguntas frecuentes',
      'Primeiros passos': 'Primeros pasos',
      'Boas práticas': 'Buenas prácticas',
      'Requisitos': 'Requisitos',
      'Receber novidades': 'Recibir novedades',
      'Solicitar acesso': 'Solicitar acceso',
      'Ver guia rápido': 'Ver guía rápida',
      'Guia rápido': 'Guía rápida',
      'Solicitar documentação avançada': 'Solicitar documentación avanzada',
      'Instalação e download': 'Instalación y descarga',
      'Modelos e agentes suportados': 'Modelos y agentes soportados',
      'Planos, limites e BYO API keys': 'Planes, límites y BYO API keys',
      'Planos': 'Planes',
      'Plano': 'Plan',
      'Mensal ou anual': 'Mensual o anual',
      'Cancele quando precisar': 'Cancela cuando lo necesites',
      'Começar grátis': 'Empezar gratis',
      'Assinar Pro': 'Suscribirse a Pro',
      'Falar com vendas': 'Hablar con ventas',
      'Sem cartão': 'Sin tarjeta',
      'sem cobrança': 'sin cobro',
      'sem cadastro para baixar': 'sin registro para descargar',
      'Sem garantia': 'Sin garantía',
      'Uso responsável': 'Uso responsable',
      'Dados de uso': 'Datos de uso',
      'Em breve': 'Pronto',
      'em breve': 'pronto',
      'não precisa': 'no hace falta',
      'pra sempre': 'para siempre',
      'Sob consulta': 'A consultar',
      'Mínimo': 'Mínimo',
      'Tudo do plano Pro': 'Todo lo del plan Pro',
      'Suporte prioritário': 'Soporte prioritario',
      'Workspaces compartilhados': 'Workspaces compartidos',
      'Workspaces ilimitados': 'Workspaces ilimitados',
      'Billing centralizado': 'Billing centralizado',
      'Acesso': 'Acceso',
      'acesso': 'acceso',
      'conta': 'cuenta',
      'senha local': 'contraseña local',
      'Demonstração ao vivo do BrainChain': 'Demo en vivo de BrainChain',
      'demonstração ao vivo': 'demo en vivo',
      'interativa': 'interactiva',
      'Instalação direta': 'Instalación directa',
      'Configuração mínima': 'Configuración mínima',
      'Instale a aplicação': 'Instala la aplicación',
      'Conecte seus agentes': 'Conecta tus agentes',
      'Distribua as tarefas': 'Distribuye las tareas',
      'Workspace unificado': 'Workspace unificado',
      'Conecte suas credenciais dos provedores': 'Conecta tus credenciales de los proveedores',
      'Abra ou crie um workspace': 'Abre o crea un workspace',
      'Baixe a versão Windows alpha': 'Descarga la versión Windows alpha',
      'Use modelos premium para decisões difíceis': 'Usa modelos premium para decisiones difíciles',
      'Delegue leitura, formatação e testes para modelos eficientes': 'Delega lectura, formato y tests a modelos eficientes',
      'Mantenha o workspace limpo e versionado': 'Mantén el workspace limpio y versionado',
      'Revise diffs antes de aplicar mudanças em produção': 'Revisa diffs antes de aplicar cambios en producción',
      'Windows alpha disponível': 'Windows alpha disponible',
      'macOS e Linux em preparação': 'macOS y Linux en preparación',
      'Windows hoje': 'Windows hoy',
      'macOS e Linux em breve': 'macOS y Linux pronto',
      'Windows 10 ou 11': 'Windows 10 u 11',
      'Conexão com internet para provedores OAuth/API': 'Conexión a internet para proveedores OAuth/API',
      'Credenciais próprias dos modelos usados': 'Credenciales propias de los modelos usados',
      'Workspace local versionado recomendado': 'Workspace local versionado recomendado',
      'Documentação para sair do zero sem perder tempo': 'Documentación para empezar sin perder tiempo',
      'Esta página organiza': 'Esta página organiza',
      'o que já é necessário': 'lo que ya es necesario',
      'para instalar': 'para instalar',
      'conectar agentes': 'conectar agentes',
      'operar o BrainChain': 'operar BrainChain',
      'com clareza durante o alpha': 'con claridad durante el alpha',
      'Construído por quem trabalha com agentes todos os dias': 'Construido por quienes trabajan con agentes todos los días',
      'Construído por quem usa': 'Construido por quienes lo usan',
      'Build in public': 'Build in public',
      'Princípios': 'Principios',
      'Densidade sem bagunça': 'Densidad sin desorden',
      'Controle explícito de custo e contexto': 'Control explícito de costo y contexto',
      'BYO API keys sempre claro': 'BYO API keys siempre claro',
      'Sem prometer autonomia mágica': 'Sin prometer autonomía mágica',
      'Feedback, parcerias e reports podem ser enviados para': 'Feedback, alianzas y reportes pueden enviarse a',
      'Essa rota não está no workspace': 'Esta ruta no está en el workspace',
      'Volte para a home ou abra a documentação para encontrar o caminho certo': 'Vuelve al inicio o abre la documentación para encontrar el camino correcto',
      'Voltar para home': 'Volver al inicio',
      'Voltar': 'Volver',
      'Orquestre': 'Orquesta',
      'Múltiplos agentes': 'Múltiples agentes',
      'um único workspace': 'un solo workspace',
      'Múltiplos modelos': 'Múltiples modelos',
      'agentes': 'agentes',
      'modelos': 'modelos',
      'tarefas': 'tareas',
      'tarefa': 'tarea',
      'contexto': 'contexto',
      'custo': 'costo',
      'custos': 'costos',
      'barato': 'barato',
      'menos': 'menos',
      'mais': 'más',
      'pontos': 'puntos',
      'projeto inteiro': 'proyecto entero',
      'projeto': 'proyecto',
      'você': 'tú',
      'escolhe': 'eliges',
      'papel': 'rol',
      'não': 'no',
      'tokens': 'tokens',
      'provedores': 'proveedores',
      'credenciais': 'credenciales',
      'chaves': 'claves',
      'suas chaves': 'tus claves',
      'público': 'público',
      'pesquisa': 'investigación',
      'implementação': 'implementación',
      'revisão': 'revisión',
      'testes': 'tests',
      'raciocínio': 'razonamiento',
      'local': 'local',
      'Panes simultâneas': 'Panes simultáneas',
      'Panes de agentes': 'Panes de agentes',
      'Projetos independentes': 'Proyectos independientes',
      'Telemetria de uso': 'Telemetría de uso',
      'Browser e terminal': 'Navegador y terminal',
      'Navegador': 'Navegador',
      'terminal': 'terminal',
      'Comando global': 'Comando global',
      'abrir agentes': 'abrir agentes',
      'layouts': 'layouts',
      'arquivos': 'archivos',
      'ações': 'acciones',
      'sem caçar botões na interface': 'sin buscar botones en la interfaz',
      'Mapa visual de tarefas e dependências': 'Mapa visual de tareas y dependencias',
      'em preparação': 'en preparación',
      'coordenar trabalho multi-agente': 'coordinar trabajo multiagente',
      'com menos ruído': 'con menos ruido',
      'Use cada modelo no papel em que ele rende melhor': 'Usa cada modelo en el rol donde rinde mejor',
      'não tenta forçar um único modelo para tudo': 'no intenta forzar un único modelo para todo',
      'funções claras': 'funciones claras',
      'liderança': 'liderazgo',
      'síntese': 'síntesis',
      'O modelo certo para a tarefa certa': 'El modelo correcto para la tarea correcta',
      'Qual modelo usar para cada tarefa': 'Qué modelo usar para cada tarea',
      'Antes de baixar': 'Antes de descargar',
      'Para quem é': 'Para quién es',
      'E para quem ainda não é': 'Y para quién aún no es',
      'Você deve usar BrainChain se': 'Deberías usar BrainChain si',
      'BrainChain ainda não é para você se': 'BrainChain aún no es para ti si',
      'É confortável com terminal e linha de comando': 'Te sientes cómodo con terminal y línea de comando',
      'Precisa orquestrar': 'Necesitas orquestar',
      'Quer visibilidade de custo': 'Quieres visibilidad de costo',
      'Já consome IA': 'Ya usas IA',
      'Está aberto a produto em evolução': 'Estás abierto a un producto en evolución',
      'Nunca abriu um terminal': 'Nunca abriste una terminal',
      'Trabalha exclusivamente com um único modelo de IA': 'Trabajas exclusivamente con un único modelo de IA',
      'Não tem interesse em multi-agente neste momento': 'No tienes interés en multiagente ahora',
      'Precisa de produto de produção polido': 'Necesitas un producto de producción pulido',
      'Exige SLA contratual': 'Exiges SLA contractual',
      'Requer suporte 24/7 por telefone': 'Requiere soporte 24/7 por teléfono',
      'Qual é a economia real em custos de API': 'Cuál es el ahorro real en costos de API',
      'Está disponível para macOS e Linux': 'Está disponible para macOS y Linux',
      'O produto é estável': 'El producto es estable',
      'BrainChain inclui tokens dos modelos': 'BrainChain incluye tokens de los modelos',
      'É adequado para desenvolvedores em início de carreira': 'Es adecuado para desarrolladores al inicio de carrera',
      'Modelos eficientes substituem modelos premium': 'Los modelos eficientes sustituyen a los modelos premium',
      'Quando o pricing comercial será publicado': 'Cuándo se publicará el pricing comercial',
      'Documentação cobre os fluxos principais': 'La documentación cubre los flujos principales',
      'feedback': 'feedback',
      'bugs': 'bugs',
      'ideias': 'ideas',
      'usuários reais': 'usuarios reales',
      'Avisar': 'Avisar',
      'seu@email.com': 'tu@email.com',
      'email': 'email',
      'cartão': 'tarjeta',
      'Cartão': 'Tarjeta',
      'Versão inicial': 'Versión inicial',
      'Última atualização': 'Última actualización',
      'Solicitações sobre privacidade podem ser enviadas para': 'Las solicitudes sobre privacidad pueden enviarse a',
      'Você é responsável por revisar comandos, diffs, saídas de agentes e custos de API gerados nos provedores conectados': 'Eres responsable de revisar comandos, diffs, salidas de agentes y costos de API generados en los proveedores conectados',
      'A versão alpha é fornecida para avaliação e feedback': 'La versión alpha se ofrece para evaluación y feedback',
      'sem garantia de disponibilidade contínua': 'sin garantía de disponibilidad continua'
    }
  };

  function textNodes(root) {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, .bc-cockpit, [data-projects-demo], .bc-pd-stage')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function original(node) {
    if (!SOURCE.has(node)) SOURCE.set(node, node.nodeValue);
    return SOURCE.get(node);
  }

  function originalAttr(el, attr) {
    let store = ATTR_SOURCE.get(el);
    if (!store) {
      store = {};
      ATTR_SOURCE.set(el, store);
    }
    if (!(attr in store)) store[attr] = el.getAttribute(attr);
    return store[attr];
  }

  function preserveCase(src, translated) {
    if (!src || !translated) return translated;
    if (src === src.toUpperCase()) return translated.toUpperCase();
    return translated;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function applyPhrases(value, lang) {
    if (lang === 'pt' || !value) return value;
    let out = value;
    const phrases = PHRASES[lang] || {};
    Object.keys(phrases)
      .sort((a, b) => b.length - a.length)
      .forEach((from) => {
        const to = phrases[from];
        const exact = new RegExp(escapeRegExp(from), 'g');
        out = out.replace(exact, to);
        const lower = from.toLowerCase();
        if (lower !== from && lower.length > 3) {
          const lowerRe = new RegExp(escapeRegExp(lower), 'g');
          out = out.replace(lowerRe, to.toLowerCase());
        }
      });
    return out;
  }

  function translateValue(value, lang) {
    const clean = (value || '').trim();
    if (!clean) return value;
    if (lang === 'pt') return clean;
    const dict = DICT[lang] || {};
    return dict[clean] || applyPhrases(clean, lang);
  }

  function translateAttrs(lang) {
    document.title = translateValue(TITLE_SOURCE || document.title, lang);

    document.querySelectorAll('[placeholder], [aria-label], [title], [alt], meta[name="description"], meta[property="og:title"], meta[property="og:description"]').forEach((el) => {
      TRANSLATABLE_ATTRS.forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        const src = originalAttr(el, attr);
        const translated = translateValue(src, lang);
        if (translated) el.setAttribute(attr, translated);
      });
    });
  }

  function translate(lang) {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    textNodes(document.body).forEach((node) => {
      const src = original(node);
      const trimmed = src.trim();
      if (!trimmed) return;
      const translated = translateValue(trimmed, lang);
      if (!translated) {
        node.nodeValue = src;
        return;
      }
      node.nodeValue = src.replace(trimmed, preserveCase(trimmed, translated));
    });
    translateAttrs(lang);
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-current', btn.dataset.lang === lang ? 'true' : 'false');
    });
    localStorage.setItem(KEY, lang);
    window.BCI18N_LANG = lang;
  }

  function ensureSwitcher() {
    let root = document.querySelector('[data-lang-toggle]');
    if (!root) {
      root = document.createElement('div');
      root.className = 'bc-i18n-floating';
      root.setAttribute('data-lang-toggle', '');
      root.setAttribute('aria-label', 'Idioma');
      root.innerHTML = '<button type="button" data-lang="pt">PT</button><button type="button" data-lang="en">EN</button><button type="button" data-lang="es">ES</button>';
      document.body.appendChild(root);
    }
    if (!root.querySelector('[data-lang="es"]')) {
      const sep = document.createElement('span');
      sep.className = 'bc-lang-toggle__sep';
      sep.textContent = '/';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bc-lang-toggle__opt';
      btn.dataset.lang = 'es';
      btn.textContent = 'ES';
      root.appendChild(sep);
      root.appendChild(btn);
    }
    root.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        translate(btn.dataset.lang || 'pt');
      });
    });
  }

  function init() {
    ensureSwitcher();
    TITLE_SOURCE = document.title;
    const requested = new URLSearchParams(window.location.search).get('lang');
    translate(requested || localStorage.getItem(KEY) || 'pt');
    window.BCI18N = {
      get lang() { return localStorage.getItem(KEY) || 'pt'; },
      t(value) { return translateValue(value, this.lang); },
      translate
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
