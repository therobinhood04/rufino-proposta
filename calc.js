/* Regras puras da proposta: usadas pela página e pelos testes (node --test). Sem acesso ao DOM. */
(function(root){
'use strict';
const SLUG = /^[a-z0-9-]{2,80}$/;
/* Só devolve os dados da chave pedida. Chave desconhecida ou inválida → null (versão geral). */
function resolveProposal(slug, base){
  if (!slug || !SLUG.test(slug) || !base || !base.itens) return null;
  if (!Object.prototype.hasOwnProperty.call(base.itens, slug)) return null;
  return Object.assign({ slug }, base.itens[slug]);
}
/* Simulação: faturamento bruto potencial e horas que poderiam ser poupadas. */
function simulate(c, semanasPorMes){
  const mensal = c.novos * c.ticket, anual = mensal * 12;
  const hMes = c.horas * semanasPorMes * (c.economia / 100), hAno = hMes * 12;
  return { mensal, anual, hMes, hAno };
}
/* Investimento do primeiro ano = valor inicial + 12 mensalidades. */
const firstYear = (inicial, mensalidade) => Math.round((inicial + 12 * mensalidade) * 100) / 100;
/* Atendimentos por mês para cobrir a mensalidade, com o ticket informado. */
const toCover = (mensalidade, ticket) => ticket > 0 ? Math.ceil(mensalidade / ticket) : null;
const api = { resolveProposal, simulate, firstYear, toCover, SLUG };
root.RUFINO_CALC = api;
})(typeof window !== 'undefined' ? window : globalThis);
