/* =====================================================================
   RUFINO WEBDESIGN · MODELO PARA BARBEARIAS
   Arquivo de configuração do estabelecimento (um por barbearia).

   Para criar o site de uma nova barbearia: copie este arquivo, troque
   os dados e as fotos da pasta img/. Nada do layout precisa mudar.

   Regra da casa: dado que ainda não foi confirmado pelo cliente fica
   null (o site esconde o recurso ou mostra "a configurar") ou fica
   marcado como demonstração (demo: true). Nunca invente dados reais.
   ===================================================================== */
window.TENANT = {
  slug: 'rufino-demo',                 // identificador único (também usado no banco de dados)
  modoDemonstracao: true,              // mostra os avisos de demonstração e libera o painel de teste

  marca: {
    nome: 'Rufino Barber',
    nomeCurto: 'Rufino',
    assinatura: 'Barber · Fortaleza',
    simbolo: 'navalha-r',              // símbolo embutido; ou o caminho de um SVG próprio, ex. 'img/logo.svg'
    cores: {                           // identidade de cada casa: só mude aqui
      fundo: '#0d0e0c', fundo2: '#161714', fundo3: '#20211d',
      texto: '#ece4d5', suave: '#a9a293', destaque: '#c39b5c', destaqueClaro: '#e6c995'
    }
  },

  seo: {
    titulo: 'Rufino Barber · Barbearia no Cocó, Fortaleza',
    descricao: 'Barbearia no Cocó, em Fortaleza. Corte masculino, degradê navalhado e barba com toalha quente, com agendamento online.',
    siteUrl: null                      // PENDENTE: domínio definitivo, ex. 'https://www.rufinobarber.com.br/'
  },

  endereco: {
    demo: true,                        // endereço fornecido para o protótipo, ainda não confirmado
    rua: 'Av. Engenheiro Santana Júnior, 01',
    bairro: 'Cocó', cidade: 'Fortaleza', uf: 'CE', cep: null
  },

  mapa: {
    googleApiKey: null,                // PENDENTE: chave da Maps Embed API (restrita ao domínio do site)
    placeId: null,                     // PENDENTE: Place ID do perfil da empresa no Google (marcador exato)
    coordenadas: null,                 // PENDENTE: { lat: -3.7..., lng: -38.4... }
    zoom: 16
  },

  contato: {
    whatsapp: null,                    // PENDENTE: só dígitos com DDI e DDD, ex. '5585999999999'
    telefone: null,                    // PENDENTE: ex. '(85) 3000-0000'
    email: null
  },

  redes: {                             // só aparecem no site as redes preenchidas
    instagram: null,                   // PENDENTE: usuário sem @
    tiktok: null,
    facebook: null,                    // URL completa da página
    youtube: null,                     // URL completa do canal
    googlePerfil: null                 // URL do perfil da empresa no Google
  },
  instagramPosts: [],                  // URLs de publicações para incorporar (ex. 'https://www.instagram.com/p/XXXX/')

  // 0 = domingo ... 6 = sábado. null = fechado. Intervalo de almoço opcional.
  horarios: {
    0: null, 1: null,
    2: { abre: '09:00', fecha: '20:00', pausa: ['12:30', '13:30'] },
    3: { abre: '09:00', fecha: '20:00', pausa: ['12:30', '13:30'] },
    4: { abre: '09:00', fecha: '20:00', pausa: ['12:30', '13:30'] },
    5: { abre: '09:00', fecha: '20:00', pausa: ['12:30', '13:30'] },
    6: { abre: '08:00', fecha: '18:00', pausa: null }
  },
  fuso: 'America/Fortaleza',

  agenda: {
    passoMin: 15,                      // grade de horários de início
    antecedenciaMin: 60,               // menor antecedência para agendar
    diasAFrente: 21,
    intervaloEntreAtendimentosMin: 5   // folga de limpeza entre clientes
  },

  // Preços revisados para o mercado de Fortaleza (faixa intermediária-premium).
  // tipo: 'servico' | 'combo'. 'de' = soma dos avulsos, para mostrar a economia.
  servicos: [
    { id: 'corte',     tipo: 'servico', categoria: 'Cabelo', nome: 'Corte masculino',          desc: 'Tesoura ou máquina, lavagem e finalização.',             min: 40, preco: 45 },
    { id: 'degrade',   tipo: 'servico', categoria: 'Cabelo', nome: 'Degradê navalhado',        desc: 'Transição baixa, média ou alta com acabamento na navalha.', min: 45, preco: 50, destaque: true },
    { id: 'infantil',  tipo: 'servico', categoria: 'Cabelo', nome: 'Corte infantil',           desc: 'Até 12 anos, com paciência e sem pressa.',               min: 35, preco: 40 },
    { id: 'barba',     tipo: 'servico', categoria: 'Barba',  nome: 'Barba',                    desc: 'Desenho pelo formato do rosto, navalha e balm.',          min: 30, preco: 35 },
    { id: 'barba-tq',  tipo: 'servico', categoria: 'Barba',  nome: 'Barba com toalha quente',  desc: 'Ritual completo: toalha quente, navalha e hidratação.',   min: 40, preco: 45, premium: true },
    { id: 'sobrancelha', tipo: 'servico', categoria: 'Detalhes', nome: 'Sobrancelha',          desc: 'Limpeza na navalha ou na pinça.',                        min: 10, preco: 15 },
    { id: 'pezinho',   tipo: 'servico', categoria: 'Detalhes', nome: 'Pezinho e contorno',     desc: 'Manutenção entre um corte e outro.',                     min: 15, preco: 15 },
    { id: 'pigment',   tipo: 'servico', categoria: 'Detalhes', nome: 'Pigmentação',            desc: 'Preenchimento de falhas na barba ou no cabelo.',          min: 30, preco: 35 },

    { id: 'combo-cb',  tipo: 'combo', nome: 'Corte + barba',             desc: 'O combo mais pedido da casa.',                         itens: ['corte', 'barba'],              min: 65, preco: 70, de: 80, destaque: true },
    { id: 'combo-cs',  tipo: 'combo', nome: 'Corte + sobrancelha',       desc: 'Acabamento completo do rosto.',                        itens: ['corte', 'sobrancelha'],        min: 50, preco: 55, de: 60 },
    { id: 'combo-rit', tipo: 'combo', nome: 'Ritual Rufino',             desc: 'Degradê, barba com toalha quente, sobrancelha e massagem.', itens: ['degrade', 'barba-tq', 'sobrancelha'], min: 95, preco: 95, de: 110, premium: true },
    { id: 'combo-pf',  tipo: 'combo', nome: 'Pai e filho',               desc: 'Dois cortes na mesma hora, cadeiras lado a lado.',      itens: ['corte', 'infantil'],           min: 45, preco: 75, de: 85, cadeiras: 2 }
  ],
  observacaoDuracao: 'Os tempos são estimativas médias. Podem variar conforme o tipo de cabelo, o volume e o que cada cliente precisa.',

  clube: {
    nome: 'Clube Rufino',
    intro: 'Assinatura mensal para manter o visual em dia sem pensar em preço a cada visita.',
    planos: [
      { id: 'essencial', nome: 'Essencial', preco: 99.9,  inclui: ['Cortes ilimitados', '10% em produtos da casa'] },
      { id: 'completo',  nome: 'Completo',  preco: 169.9, inclui: ['Cortes e barbas ilimitados', '1 sobrancelha por mês', '10% em produtos da casa'], destaque: true }
    ],
    condicoes: ['Uso pessoal e intransferível', 'Agendamento de terça a sexta', 'Sem fidelidade: cancele quando quiser']
  },

  // Nomes de exemplo do protótipo. PENDENTE: equipe real com retratos 4:5.
  equipe: [
    { id: 'davi',  nome: 'Davi Rufino', especialidade: 'Fundador · degradê',     bio: 'Transições baixas e cabelo crespo.',           foto: null, servicos: 'todos', demo: true },
    { id: 'italo', nome: 'Ítalo Moura', especialidade: 'Barba · navalha',        bio: 'Desenho de barba e toalha quente.',            foto: null, servicos: 'todos', demo: true },
    { id: 'breno', nome: 'Breno Sá',    especialidade: 'Tesoura · cabelo longo', bio: 'Cortes clássicos e cabelo comprido na tesoura.', foto: null, servicos: ['corte', 'infantil', 'sobrancelha', 'pezinho', 'combo-cs', 'combo-pf'], demo: true }
  ],

  fotos: {
    hero: null,                        // { jpg, webp, w, h, alt }
    galeria: [
      { legenda: 'Ambiente · salão', foto: null },
      { legenda: 'Corte finalizado', foto: null },
      { legenda: 'Barba finalizada', foto: null },
      { legenda: 'Fachada', foto: null },
      { legenda: 'Ferramentas', foto: null }
    ]
  },

  // Cada item é uma "cena". Para incluir mais trabalhos, copie um bloco.
  // foco = ponto de enquadramento (object-position) para manter as fotos alinhadas.
  antesDepois: [
    { id: 'cena-01', titulo: 'Degradê com textura', tecnica: 'Degradê baixo, topo texturizado', barbeiro: null,
      antes: { jpg: 'img/antes-01.jpg', webp: 'img/antes-01.webp' }, depois: { jpg: 'img/depois-01.jpg', webp: 'img/depois-01.webp' },
      w: 508, h: 1024, foco: '50% 40%', demo: true }
  ],

  // fonte: 'google' (real, verificada) ou 'demo' (exemplo de layout, nunca apresentar como real)
  avaliacoes: {
    googleRating: null,                // nota real do perfil, quando houver
    googleTotal: null,
    itens: [
      { fonte: 'demo', autor: 'Cliente de exemplo A.', nota: 5, data: null, servico: 'Degradê navalhado', texto: 'Exemplo de avaliação para visualizar o layout: atendimento pontual, corte exatamente como combinado.' },
      { fonte: 'demo', autor: 'Cliente de exemplo B.', nota: 5, data: null, servico: 'Barba com toalha quente', texto: 'Exemplo de avaliação: ambiente tranquilo e barba bem desenhada.' },
      { fonte: 'demo', autor: 'Cliente de exemplo C.', nota: 4, data: null, servico: 'Corte + barba', texto: 'Exemplo de avaliação com nota 4, para mostrar como a seção exibe notas diferentes.' }
    ]
  },

  // Onde a agenda é gravada.
  // 'auto': usa Supabase se configurado; senão, o banco de demonstração do Claude; senão, o navegador.
  // DEMONSTRAÇÃO PÚBLICA (Vercel): 'local' = agendamentos só no navegador do visitante, nenhum banco é contatado.
  // Futuro: 'auto' ou 'supabase' com supabaseUrl e supabaseAnonKey preenchidos.
  backend: {
    modo: 'local',
    supabaseUrl: null,                 // PENDENTE: https://xxxx.supabase.co
    supabaseAnonKey: null,             // chave pública "anon" (segura no navegador, protegida por RLS)
    whatsappAutomatico: false          // true só depois de configurar a WhatsApp Cloud API no servidor
  },

  // Área da barbearia na demonstração: 'leitura' (visitante vê, mas não altera nada), 'local' (altera só no próprio navegador) ou 'desligado'.
  painel: { modo: 'leitura' },
  // Na demonstração, nome e telefone digitados não são guardados: ficam só o primeiro nome e o telefone mascarado.
  privacidadeDemo: true,

  creditos: { nome: 'Rufino WebDesign', url: null }
};
