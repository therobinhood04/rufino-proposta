/* =====================================================================
   RUFINO WEBDESIGN · dados comerciais centralizados
   Preços, descontos, contato e textos da proposta. Altere aqui; o
   layout e os cálculos se atualizam sozinhos.
   ===================================================================== */
window.RUFINO = {
  empresa: 'Rufino WebDesign',
  whatsapp: '5585986651233',            // (85) 98665-1233 · DDI + DDD + número, só dígitos
  email: null,
  // Prévia navegável do modelo Rufino Barber exibida na seção 04.
  // Endereço publicado (versão aperfeiçoada no AI Studio). Para voltar à cópia local, use 'site-demo/index.html'.
  // Se mudar o domínio, atualize também o frame-src em vercel.json.
  siteDemo: 'https://rufino-barber.vercel.app/?v=2',
  // Usado quando a própria proposta está dentro de outra moldura (ex.: prévia no Claude), onde sites externos são bloqueados.
  siteDemoLocal: null,

  cupom: {
    nome: 'BlackRufino',
    validade: '2026-11-30'   // AAAA-MM-DD. null = sem data exibida (nunca invente prazo)
  },

  // Valores exatamente como definidos pela Rufino. Não inclua parcelas, juros ou condições não acordadas.
  planos: [
    {
      id: 'site',
      numero: '01',
      nome: 'Site institucional',
      resumo: 'Presença profissional completa para apresentar a barbearia e receber contatos.',
      precoOriginal: 997.00,
      desconto: 350.00,
      formas: [ { id: 'promo', rotulo: 'Investimento promocional', valor: 647.00 } ],
      mensalidade: 59.90,
      inclui: ['Site profissional personalizado', 'Apresentação de serviços e profissionais', 'Galeria de imagens', 'Integração com Google Maps',
               'Links para redes sociais', 'Botões de contato e WhatsApp', 'Design responsivo', 'Hospedagem', 'Domínio', 'Suporte para atualizações']
    },
    {
      id: 'combo',
      numero: '02',
      nome: 'Site + sistema de agendamento',
      resumo: 'Tudo do site institucional, mais a agenda online e o painel de gestão.',
      destaque: 'A solução mais completa',
      precoOriginal: 1997.00,
      desconto: 700.00,
      descontoCondicao: 'para pagamento à vista',
      formas: [
        { id: 'avista', rotulo: 'À vista', valor: 1297.00, comDesconto: true },
        { id: 'cartao', rotulo: 'No cartão', valor: 1347.00 }
      ],
      mensalidade: 147.00,
      incluiPrefixo: 'Tudo do plano institucional, mais:',
      inclui: ['Sistema de agendamento online', 'Consulta de disponibilidade', 'Escolha de serviços e profissionais', 'Gestão da agenda',
               'Painel administrativo', 'Organização de clientes', 'Recursos de confirmação e lembretes, conforme integrações habilitadas']
    }
  ],
  planoPadrao: 'combo',

  prazoImplantacao: null,    // ex.: 'até 15 dias úteis após o envio do material'. null = "combinado na contratação"

  // Premissas iniciais da calculadora: são pontos de partida editáveis, não dados de mercado.
  calculadora: {
    ticket:     { min: 20, max: 300, passo: 5,  inicial: 50 },
    novos:      { min: 0,  max: 100, passo: 1,  inicial: 5 },
    horas:      { min: 0,  max: 40,  passo: 1,  inicial: 6 },
    economia:   { min: 0,  max: 80,  passo: 5,  inicial: 30 },
    semanasPorMes: 4.33
  }
};
