/**
 * BPF ENGENHARIA — Conteúdo institucional
 * Fonte inicial: página pública bpfengenharia.eng.br
 * Todos os dados abaixo são configuráveis. `isPlaceholder: true` indica
 * campo que ainda precisa de validação da BPF antes da publicação.
 */

export const brand = {
  name: 'BPF Engenharia',
  tagline: 'Engenharia de instalações e eficiência energética',
  since: 1990,
  worksDelivered: 400, // "mais de 400 obras entregues" — informação publicada no site atual (revalidar)
  contact: {
    email: 'contato@bpfengenharia.eng.br',
    phone: '(21) 2210-5298',
    phoneHref: 'tel:+552122105298',
    webmail: 'https://webmail-seguro.com.br/bpfengenharia.eng.br/',
    address: { value: null, isPlaceholder: true }, // não confirmado publicamente
  },
};

export const navigation = [
  { label: 'Sobre', href: '/sobre.html', num: '01' },
  { label: 'Soluções', href: '/solucoes.html', num: '02' },
  { label: 'Obras', href: '/obras.html', num: '03' },
  { label: 'Andamento', href: '/obras-em-andamento.html', num: '04' },
  { label: 'Clientes', href: '/clientes.html', num: '05' },
  { label: 'Contato', href: '/contato.html', num: '06' },
];

export const solutions = [
  {
    num: '01',
    title: 'Engenharia de instalações',
    lede: 'Instalações que acompanham a complexidade, o ritmo e as exigências de cada empreendimento.',
    description:
      'Atuação técnica em instalações aplicadas a obras residenciais, comerciais, industriais e institucionais. Coordenação, execução e integração com o projeto do empreendimento.',
    tag: 'INSTALAÇÕES',
  },
  {
    num: '02',
    title: 'Eficiência energética e gestão de energia',
    lede: 'Soluções para compreender, acompanhar e melhorar o uso da energia em edificações e operações.',
    description:
      'Frente de atuação orientada por novas tecnologias e melhoria contínua, com foco em uso consciente e eficiente da energia — sem promessas de percentual de economia sem dado validado.',
    tag: 'EFICIÊNCIA',
  },
  {
    num: '03',
    title: 'Energia fotovoltaica',
    lede: 'Instalações fotovoltaicas aplicadas a diferentes contextos de obra.',
    description:
      'Frente de trabalho que se soma às instalações elétricas e à eficiência energética, conforme o portfólio da BPF.',
    tag: 'FOTOVOLTAICA',
  },
];

export const approach = [
  {
    num: '01',
    title: 'Entender o empreendimento',
    desc: 'Contexto, necessidades e complexidade técnica. A conversa começa pelo projeto, não por uma solução genérica.',
  },
  {
    num: '02',
    title: 'Definir a solução',
    desc: 'Instalações, energia e escopo compatíveis com a obra — respeitando prazo, uso e coordenação técnica.',
  },
  {
    num: '03',
    title: 'Executar com precisão',
    desc: 'Coordenação com projetistas e construtoras, atenção aos detalhes e qualidade de atendimento em obra.',
  },
  {
    num: '04',
    title: 'Entregar valor',
    desc: 'Uma instalação que agrega valor ao empreendimento, aos clientes e aos parceiros envolvidos.',
  },
];

export const sectors = [
  { num: '01', name: 'Torres residenciais e comerciais', slug: 'torres-comerciais-e-residenciais' },
  { num: '02', name: 'Instalações fotovoltaicas', slug: 'fotovoltaicas' },
  { num: '03', name: 'Obras industriais, infraestrutura e galpões', slug: 'obras-industriais-de-infraestrutura-e-galpoes' },
  { num: '04', name: 'Hotéis', slug: 'hoteis' },
  { num: '05', name: 'Hospitais e clínicas', slug: 'hospitais-e-clinicas' },
  { num: '06', name: 'Escolas', slug: 'escolas' },
  { num: '07', name: 'Shoppings e lojas', slug: 'shoppings-e-lojas' },
  { num: '08', name: 'Residências de alto padrão', slug: 'residencias-alto-padrao' },
  { num: '09', name: 'Concessionárias', slug: 'concessionarias' },
  { num: '10', name: 'Restaurações', slug: 'restauracoes' },
  { num: '11', name: 'Restaurantes', slug: 'restaurantes' },
];

/**
 * Obras selecionadas — apresentação editorial (4 peças).
 * Os itens correspondem a exemplos identificados no portfólio público.
 * Localização é preenchida com [CONFIRMAR] quando não publicada.
 */
export const featuredProjects = [
  {
    slug: 'e-t-e-sao-pedro-da-aldeia',
    title: 'E.T.E. São Pedro da Aldeia',
    sector: 'Infraestrutura',
    partner: 'Carioca Engenharia / Prolagos',
    location: 'São Pedro da Aldeia — RJ',
    description:
      'Frente de trabalho em obra de infraestrutura sanitária, aplicada a uma estação de tratamento de esgoto operada em parceria com concessionária.',
    layout: 'p-tall',
    variant: 'infra',
    status: 'completed',
    progress: null,
    lastUpdated: '2024-01',
  },
  {
    slug: 'sig-h-stern',
    title: 'SIG H. Stern',
    sector: 'Comercial',
    partner: null,
    location: '[CONFIRMAR LOCALIZAÇÃO]',
    description:
      'Instalações em ambiente comercial de alto padrão, com integração ao projeto arquitetônico e às operações do empreendimento.',
    layout: 'p-wide',
    variant: 'commercial',
    status: 'completed',
    progress: null,
    lastUpdated: '2024-01',
  },
  {
    slug: 'novatech-hsi-leblon',
    title: 'Novatech HSI — Leblon',
    sector: 'Residencial de alto padrão',
    partner: 'Novatech',
    location: 'Rio de Janeiro — RJ',
    description:
      'Instalações para empreendimento residencial em bairro consolidado, com atenção aos detalhes de acabamento e coordenação de obra.',
    layout: 'p-med',
    variant: 'residential',
    status: 'completed',
    progress: null,
    lastUpdated: '2024-01',
  },
  {
    slug: 'residencial-portogalo',
    title: 'Residencial Portogalo',
    sector: 'Residencial / hotelaria',
    partner: 'Laer',
    location: 'Angra dos Reis — RJ',
    description:
      'Frente de instalações em empreendimento com forte relação com o entorno natural e complexidade técnica de infraestrutura.',
    layout: 'p-med',
    variant: 'coastal',
    status: 'completed',
    progress: null,
    lastUpdated: '2024-01',
  },
];

/**
 * Obras em andamento — dados identificados no site público.
 * `progress` mantido como null quando não há revisão recente;
 * `lastUpdated` obrigatório. Frontend oculta % sem revisão.
 */
export const ongoingProjects = [
  { title: 'Residência AC', partner: 'Baggio', progress: null, lastUpdated: null },
  { title: 'Residência DRC', partner: 'Laer Engenharia', progress: null, lastUpdated: null },
  { title: 'Residência EM', partner: 'Stewart Engenharia', progress: null, lastUpdated: null },
  { title: 'Residência RMP', partner: 'CMN Construtora', progress: null, lastUpdated: null },
  { title: 'E.T.E. São Pedro da Aldeia', partner: 'Carioca Engenharia / Prolagos', progress: null, lastUpdated: null },
  { title: 'Residencial Portogalo', partner: 'Laer', progress: null, lastUpdated: null },
  { title: 'Residencial OS Angra', partner: 'Laer', progress: null, lastUpdated: null },
  { title: 'Edicin', partner: 'Novatec', progress: null, lastUpdated: null },
  { title: 'Itaipava', partner: 'Stewart', progress: null, lastUpdated: null },
  { title: 'SIG H. Stern', partner: null, progress: null, lastUpdated: null },
  { title: 'Novatech HSI — Leblon', partner: null, progress: null, lastUpdated: null },
  { title: 'Laer Residencial Peri — JB', partner: 'Laer', progress: null, lastUpdated: null },
  { title: 'Portus — Be in Rio', partner: null, progress: null, lastUpdated: null },
  { title: 'Baggio PUC Behring', partner: 'Baggio', progress: null, lastUpdated: null },
  { title: 'Laer Mombaça', partner: 'Laer', progress: null, lastUpdated: null },
];

// Clientes: nomes vistos no portfólio público; usar como texto quando não houver logo oficial validado.
export const clients = [
  'Sesc', 'Sebrae', 'Laer Engenharia', 'Baggio', 'Stewart Engenharia',
  'CMN Construtora', 'Novatec', 'Carioca Engenharia', 'Prolagos', 'Be in Rio',
];

export const timeline = [
  { year: 'ANOS 1990', title: 'Fundação e início da trajetória', desc: 'A BPF Engenharia começa atendendo ao setor industrial, com foco em instalações de galpões e subestações.' },
  { year: 'CONSOLIDAÇÃO', title: 'Reconhecimento pela eficiência', desc: 'A eficiência, a flexibilidade, a qualidade de atendimento e a busca de novas soluções tornam-se marcas da empresa.' },
  { year: 'EXPANSÃO', title: 'Diferentes segmentos', desc: 'A atuação se estende a diferentes segmentos da construção civil e industrial — do residencial ao institucional.' },
  { year: 'NOVAS TECNOLOGIAS', title: 'Energia fotovoltaica e eficiência energética', desc: 'A empresa passa a atuar também em energia fotovoltaica, gestão de energia e eficiência energética.' },
  { year: 'TRAJETÓRIA ATUAL', title: 'Referência em instalações', desc: 'Mais de 400 obras entregues, conforme informação publicada no site atual, e uma atuação orientada por respeito, ética e melhoria contínua.' },
];

export const faq = [
  {
    q: 'Em quais tipos de obra a BPF atua?',
    a: 'A BPF atua em obras residenciais e comerciais, hospitais, clínicas, escolas, shoppings, laboratórios, hotéis, concessionárias, galpões industriais, lojas, restaurantes, restauração de patrimônio histórico e residências de alto padrão. A lista de segmentos reflete o portfólio publicado e pode evoluir conforme novos projetos.',
  },
  {
    q: 'A BPF atua com energia fotovoltaica?',
    a: 'Sim. O portfólio atual apresenta instalações fotovoltaicas como parte da frente de energia — que também inclui gestão de energia e eficiência energética.',
  },
  {
    q: 'A BPF atende obras residenciais e comerciais?',
    a: 'Sim. A atuação da empresa se estende a diferentes segmentos da construção civil e industrial, incluindo obras residenciais e comerciais, com portfólio publicado em cada categoria.',
  },
  {
    q: 'Como iniciar uma conversa sobre um projeto?',
    a: 'Pelo formulário desta página, pelo e-mail contato@bpfengenharia.eng.br ou pelo telefone (21) 2210-5298. A equipe da BPF entende o contexto e orienta o próximo passo.',
  },
  {
    q: 'Os percentuais das obras em andamento são atuais?',
    a: 'Os percentuais representam a última atualização publicada e podem mudar conforme o andamento de cada obra. Quando não há revisão recente confiável, o percentual não é exibido — a obra aparece com o status "acompanhamento".',
  },
];

export const mvv = {
  mission:
    'Atender ao mercado de engenharia de instalações e eficiência energética com alto padrão de qualidade, novas tecnologias e transparência, agregando valor a todos os empreendimentos dos nossos clientes e parceiros.',
  vision:
    'Ser a empresa referência em instalações e eficiência energética, pelo conhecimento técnico, atendimento, qualidade, parceria e soluções que apresenta para todas as suas obras.',
  values: [
    { title: 'Respeito', desc: 'Aos clientes, colaboradores, parceiros e ao meio ambiente.' },
    { title: 'Ética', desc: 'Em cada atitude, decisão e relação de trabalho.' },
    { title: 'Melhoria contínua', desc: 'Foco constante em processos, estudo e desenvolvimento de tecnologia.' },
  ],
};
