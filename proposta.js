/* Rufino · proposta comercial interativa
   Dados: data/rufino.js (preços, contato), data/propostas.js (barbearias), site-demo/config/tenant.js (modelo de agenda).
   Nada é enviado a servidor: respostas, simulações e agendamentos de teste vivem só na memória desta página. */
(function(){
'use strict';
const K = window.RUFINO_CALC, R = window.RUFINO, P = window.RUFINO_PROPOSTAS, ID = window.RUFINO_ID, A = window.Agenda, TT = window.TENANT;
const $ = (s, el) => (el || document).querySelector(s), $$ = (s, el) => [...(el || document).querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const brl = (v, cents = true) => 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
const brl0 = v => brl(Math.round(v), false);
const int = v => Math.round(v).toLocaleString('pt-BR');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const icon = (n, s) => ID.icon(n, s || 20);
function toast(m){ const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3000); }
function copy(text, ok, fail){ (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(ok, fail); }
const DIAS = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'], D3 = ['dom','seg','ter','qua','qui','sex','sáb'], MES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

/* =====================================================================
   PROPOSTA ATUAL (isolada: só os dados da chave pedida são lidos)
   ?proposta=<chave>  ou, em prévias que não aceitam parâmetros, #p-<chave>
   ===================================================================== */
function readSlug(){
  const q = new URLSearchParams(location.search).get('proposta');
  if (q) return q.toLowerCase();
  const h = location.hash.match(/^#p-([a-z0-9-]{2,80})$/);
  if (h) { try { sessionStorage.setItem('rp:slug', h[1]); } catch(e) {} return h[1]; }
  try { return sessionStorage.getItem('rp:slug'); } catch(e) { return null; }
}
const askedSlug = readSlug();
const prop = K.resolveProposal(askedSlug, P);
const notFound = !!askedSlug && !prop;

const S = {
  ans: { canais: [], equipe: null, ticket: null, clientes: null, horas: null, perda: null },
  calc: { ticket: R.calculadora.ticket.inicial, novos: R.calculadora.novos.inicial, horas: R.calculadora.horas.inicial, economia: R.calculadora.economia.inicial },
  plan: (prop && prop.planoSugerido) || R.planoPadrao,
  forma: {},
  nomeBarbearia: prop ? prop.nome : '',
  responsavel: (prop && prop.proprietario) || ''
};
R.planos.forEach(p => S.forma[p.id] = p.formas[0].id);
const plan = id => R.planos.find(p => p.id === id);
const forma = p => p.formas.find(f => f.id === S.forma[p.id]) || p.formas[0];

/* =====================================================================
   IDENTIDADE, CABEÇALHO, NAVEGAÇÃO
   ===================================================================== */
$('#favicon').href = 'data:image/svg+xml,' + encodeURIComponent(ID.symbol({ size: 64, color: '#c07a4f', bg: '#0b0b0a' }));
$('#logo').innerHTML = ID.symbol({ size: 36, color: 'currentColor', cut: '#0b0b0a' }) + '<span class="wm"><b>Rufino</b><small>WebDesign</small></span>';
$('#topMid').innerHTML = prop ? 'Proposta para <b>' + esc(prop.nome) + '</b>' : 'Proposta Rufino WebDesign';
document.title = prop ? 'Proposta Rufino · ' + prop.nome : 'Proposta Rufino · Site e agenda para barbearias';

// símbolo metálico com brilho que percorre a lâmina
(function mark(){
  const sym = ID.symbol({ size: 600, color: 'url(#mg)', cut: '#0b0b0a' });
  const defs = '<defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5e3820"/><stop offset=".35" stop-color="#b8734a"/><stop offset=".5" stop-color="#f3cfae"/><stop offset=".65" stop-color="#b8734a"/><stop offset="1" stop-color="#4d2d1a"/>' +
    (reduce ? '' : '<animateTransform attributeName="gradientTransform" type="translate" values="-0.6 -0.6; 0.6 0.6; -0.6 -0.6" dur="9s" repeatCount="indefinite"/>') + '</linearGradient></defs>';
  $('#mark').innerHTML = sym.replace(/(<svg[^>]*>)/, '$1' + defs).replace('aria-hidden="true"', 'aria-hidden="true" style="opacity:.55"');
})();

const chapters = $$('section.chap');
$('#rail').innerHTML = chapters.map((s, i) => '<a href="#' + s.id + '" data-id="' + s.id + '"><span>' + String(i + 1).padStart(2, '0') + ' · ' + esc(s.dataset.ch) + '</span><i></i></a>').join('');
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('#rail a').forEach(a => a.classList.toggle('on', a.dataset.id === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
chapters.forEach(s => io.observe(s));
// "próximo capítulo" ao fim de cada seção
chapters.slice(0, -1).forEach((s, i) => { const n = chapters[i + 1]; const w = $('.wrap', s); if (w && s.id !== 'abertura') w.insertAdjacentHTML('beforeend', '<div class="next"><a href="#' + n.id + '">' + icon('arrow', 16).replace('<svg', '<svg style="transform:rotate(90deg)"') + 'Próximo · ' + esc(n.dataset.ch) + '</a></div>'); });

let tick = false;
function onScroll(){ tick = false; const h = document.documentElement.scrollHeight - innerHeight; $('#bar').style.setProperty('--p', h > 0 ? scrollY / h : 0); $('#top').classList.toggle('solid', scrollY > 30); }
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* grão estático e fumaça (só com a abertura visível) */
(function(){ const c = document.createElement('canvas'); c.width = c.height = 220; const x = c.getContext('2d'); const d = x.createImageData(220,220);
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.random()*255; d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 255; }
  x.putImageData(d,0,0); $('#grain').style.backgroundImage = 'url(' + c.toDataURL() + ')'; })();
(function smoke(){
  if (prop && prop.capa) return;
  const cv = $('#smoke'), ctx = cv.getContext('2d'); let w, h, parts = [], t = 0, run = false, vis = true, raf;
  const N = innerWidth < 760 ? 140 : 320;
  const size = () => { const r = Math.min(devicePixelRatio || 1, 1.5); w = cv.clientWidth; h = cv.clientHeight; cv.width = w*r; cv.height = h*r; ctx.setTransform(r,0,0,r,0,0); ctx.fillStyle = '#0b0b0a'; ctx.fillRect(0,0,w,h); };
  const spawn = () => ({ x: w*(.3+Math.random()*.8), y: h*(.2+Math.random()*.9), life: 0, max: 200+Math.random()*240 });
  size(); for (let i = 0; i < N; i++) { const p = spawn(); p.life = Math.random()*p.max; parts.push(p); }
  addEventListener('resize', () => { clearTimeout(size.t); size.t = setTimeout(size, 150); });
  const f = (x,y) => Math.sin(x*.0031+t*.6)*1.3 + Math.cos(y*.0043-t*.4)*1.1 + Math.sin((x+y)*.0017+t*.25);
  function step(){ t += .006; ctx.fillStyle = 'rgba(11,11,10,.07)'; ctx.fillRect(0,0,w,h);
    for (const p of parts) { const a = f(p.x,p.y), ox = p.x, oy = p.y; p.x += Math.cos(a)*.9-.4; p.y += Math.sin(a)*.9-.5; p.life++;
      ctx.strokeStyle = 'rgba(214,140,92,' + (.1*Math.sin(Math.PI*p.life/p.max)) + ')'; ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(p.x,p.y); ctx.stroke();
      if (p.life > p.max || p.x < -20 || p.y < -20) Object.assign(p, spawn()); } }
  const loop = () => { step(); raf = requestAnimationFrame(loop); };
  const upd = () => { const go = vis && !document.hidden && !reduce; if (go && !run) { run = true; loop(); } else if (!go && run) { run = false; cancelAnimationFrame(raf); } };
  if (reduce) { for (let i = 0; i < 200; i++) step(); return; }
  new IntersectionObserver(es => { vis = es[0].isIntersecting; upd(); }).observe($('#abertura'));
  document.addEventListener('visibilitychange', upd); upd();
})();

/* =====================================================================
   01 · ABERTURA
   ===================================================================== */
(function opening(){
  const words = 'Sua barbearia merece uma presença à altura.'.split(' ');
  $('#h1').innerHTML = words.map((w, i) => '<span class="w" style="animation-delay:' + (0.15 + i * 0.06).toFixed(2) + 's">' + (i >= 4 ? '<em>' + esc(w) + '</em>' : esc(w)) + '</span>').join(' ');
  if (prop && prop.capa) $('#stage').insertAdjacentHTML('afterbegin', '<div class="photo"><picture>' + (prop.capa.webp ? '<source type="image/webp" srcset="' + esc(prop.capa.webp) + '">' : '') + '<img src="' + esc(prop.capa.jpg) + '" alt="' + esc(prop.capa.alt || prop.nome) + '" fetchpriority="high"></picture></div>');
  const fl = $('#forLine');
  if (prop) {
    fl.innerHTML = (prop.logo ? '<img class="logo-cli" src="' + esc(prop.logo) + '" alt="' + esc(prop.nome) + '">' : '') + '<span>' + (prop.proprietario ? 'Olá, ' + esc(prop.proprietario) + ' · ' : '') + 'Proposta para ' + esc(prop.nome) + '</span><span style="color:var(--muted)">' + esc(prop.bairro) + ', ' + esc(prop.cidade) + '</span>';
    const g = prop.google;
    if (g && g.nota) {
      const d = (prop.levantamento || P.levantamento).split('-').reverse().join('/');
      $('#rep').innerHTML = '<span class="score num">' + g.nota.toFixed(1).replace('.', ',') + '</span><p>' + esc(prop.nome) + ' tem nota ' + g.nota.toFixed(1).replace('.', ',') + ' no Google, com ' + int(g.avaliacoes) + ' avaliações. A reputação já existe; o próximo passo é uma presença digital à altura dela.<small>Dados públicos do Google Maps consultados em ' + d + '.</small></p>';
    } else $('#rep').remove();
  } else {
    fl.innerHTML = '<span>Proposta Rufino WebDesign</span><span style="color:var(--muted)">Site profissional e agenda online para barbearias</span>';
    $('#rep').innerHTML = notFound ? '<p style="color:var(--muted);font-size:14px">Não encontramos uma proposta com o código informado. Esta é a versão geral da apresentação.</p>' : '<p style="color:var(--muted);font-size:14px">' + ['Site profissional', 'Agendamento online', 'Painel da barbearia'].map(t => '<span style="margin-right:18px;color:var(--bone)">' + t + '</span>').join('') + '</p>';
  }
})();

/* =====================================================================
   02 · DIAGNÓSTICO
   ===================================================================== */
const Q = [
  { id: 'canais', tipo: 'multi', t: 'Como seus clientes costumam agendar?', hint: 'Pode marcar mais de um.', ops: [['whatsapp','WhatsApp','chat'],['instagram','Instagram','camera'],['telefone','Telefone','phone'],['presencial','Presencialmente','user']] },
  { id: 'equipe', tipo: 'one', t: 'Quantas pessoas trabalham na barbearia?', ops: [['1','Apenas eu'],['2','Duas pessoas'],['3-5','Três a cinco'],['6+','Mais de cinco']] },
  { id: 'ticket', tipo: 'range', t: 'Qual é o valor médio gasto por cliente?', min: 20, max: 300, step: 5, start: 50, fmt: v => brl0(v), unit: 'por atendimento' },
  { id: 'clientes', tipo: 'range', t: 'Quantos clientes você atende por mês, aproximadamente?', min: 0, max: 1500, step: 10, start: 200, fmt: v => int(v), unit: 'clientes por mês' },
  { id: 'horas', tipo: 'range', t: 'Quanto tempo por semana vai para responder mensagens e organizar horários?', min: 0, max: 40, step: 1, start: 6, fmt: v => v + ' h', unit: 'por semana' },
  { id: 'perda', tipo: 'one', t: 'Você sente que perde clientes por demora na resposta ou falta de horário visível?', ops: [['sim','Sim, com frequência'],['asvezes','Às vezes'],['nao','Não percebo isso'],['naosei','Não sei dizer']] }
];
const extraIcons = { chat: '<path d="M4 5h16v11H9l-5 4z"/>', phone: '<path d="M6.5 3.5 9 4l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5.5 2.5c0 1-1 2-2 2C10 19.5 4.5 14 4.5 6c0-1 1-2.5 2-2.5z"/>' };
Object.assign(ID.ICONS, extraIcons);
$('#diagPrivacy').innerHTML = icon('lock', 16) + '<span>As respostas ficam só nesta página e não são enviadas a ninguém, a menos que você mesmo as inclua na mensagem final.</span>';
let qi = 0;
function qRender(dir){
  const box = $('#qbox');
  const head = '<div class="qtop"><span>' + (qi < Q.length ? 'Pergunta ' + (qi + 1) + ' de ' + Q.length : 'Seu retrato') + '</span><span class="qdots">' + Q.map((_, i) => '<i class="' + (i <= qi ? 'on' : '') + '"></i>').join('') + '</span></div>';
  if (qi >= Q.length) { box.innerHTML = head + summaryHtml(); bindSummary(); return; }
  const q = Q[qi], a = S.ans[q.id];
  let body = '<h3>' + esc(q.t) + '</h3>' + (q.hint ? '<p class="hint">' + q.hint + '</p>' : '');
  if (q.tipo === 'multi' || q.tipo === 'one') body += '<div class="opts">' + q.ops.map(([v, l, ic]) => '<button type="button" class="opt" data-v="' + v + '" aria-pressed="' + (q.tipo === 'multi' ? a.includes(v) : a === v) + '">' + (ic ? icon(ic, 20) : '') + '<span>' + l + '</span></button>').join('') + '</div>';
  if (q.tipo === 'range') { const v = a == null ? q.start : a; body += '<div class="range-big"><div class="range-val num" id="rv">' + q.fmt(v) + ' <small>' + q.unit + '</small></div><input type="range" id="rr" min="' + q.min + '" max="' + q.max + '" step="' + q.step + '" value="' + v + '" aria-label="' + esc(q.t) + '"></div>'; }
  body += '<div class="qfoot"><div style="display:flex;gap:8px">' + (qi > 0 ? '<button type="button" class="btn ghost sm" data-q="back">Voltar</button>' : '') + (q.tipo !== 'one' ? '<button type="button" class="btn sm" data-q="next">Continuar</button>' : '') + '</div><button type="button" class="skip-q" data-q="skip">Pular pergunta</button></div>';
  box.innerHTML = head + '<div class="q on' + (dir < 0 ? ' back' : '') + '">' + body + '</div>';
  const rr = $('#rr');
  if (rr) { const paint = () => { rr.style.setProperty('--v', ((rr.value - rr.min) / (rr.max - rr.min) * 100) + '%'); $('#rv').innerHTML = q.fmt(+rr.value) + ' <small>' + q.unit + '</small>'; }; rr.addEventListener('input', paint); paint(); }
}
$('#qbox').addEventListener('click', e => {
  const q = Q[qi]; const o = e.target.closest('.opt'), nav = e.target.closest('[data-q]');
  if (o && q) {
    if (q.tipo === 'multi') { const v = o.dataset.v, arr = S.ans[q.id]; const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); o.setAttribute('aria-pressed', i < 0); }
    else { S.ans[q.id] = o.dataset.v; $$('.opt', $('#qbox')).forEach(x => x.setAttribute('aria-pressed', x === o)); setTimeout(() => { qi++; qRender(1); }, reduce ? 0 : 220); }
    return;
  }
  if (!nav) return;
  const k = nav.dataset.q;
  if (k === 'back') { qi = Math.max(0, qi - 1); qRender(-1); return; }
  if (k === 'next' && q && q.tipo === 'range') S.ans[q.id] = +$('#rr').value;
  if (k === 'skip' && q) S.ans[q.id] = q.tipo === 'multi' ? [] : null;
  if (k === 'next' || k === 'skip') { qi++; qRender(1); }
  if (k === 'redo') { qi = 0; qRender(-1); }
});
const CANAL = { whatsapp: 'WhatsApp', instagram: 'Instagram', telefone: 'telefone', presencial: 'presencialmente' };
const EQUIPE = { '1': 'só você', '2': '2 pessoas', '3-5': '3 a 5 pessoas', '6+': 'mais de 5 pessoas' };
const join = l => l.length > 1 ? l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1] : (l[0] || '');
function summaryHtml(){
  const a = S.ans, chips = [], ins = [];
  if (a.canais.length) chips.push('Agenda por <b>' + join(a.canais.map(c => CANAL[c])) + '</b>');
  if (a.equipe) chips.push('Equipe: <b>' + EQUIPE[a.equipe] + '</b>');
  if (a.ticket != null) chips.push('Ticket médio <b>' + brl0(a.ticket) + '</b>');
  if (a.clientes != null) chips.push('<b>' + int(a.clientes) + '</b> clientes/mês');
  if (a.horas != null) chips.push('<b>' + a.horas + ' h</b>/semana em mensagens');
  const msg = a.canais.filter(c => c !== 'presencial');
  if (msg.length) ins.push('Hoje o horário depende de alguém responder por ' + join(msg.map(c => CANAL[c])) + '. Com a agenda online, o cliente vê os horários livres e reserva sozinho, a qualquer hora.');
  if (a.horas) ins.push('São cerca de ' + (a.horas * R.calculadora.semanasPorMes).toFixed(0) + ' horas por mês (' + a.horas + ' h × 4,33 semanas) dedicadas a mensagens e encaixes.');
  if (a.clientes != null && a.ticket != null) ins.push('Pelas suas respostas, o faturamento bruto atual fica perto de ' + brl0(a.clientes * a.ticket) + ' por mês (' + int(a.clientes) + ' × ' + brl0(a.ticket) + ').');
  if (a.perda === 'sim' || a.perda === 'asvezes') ins.push('Você percebe clientes perdidos por demora. Mostrar a disponibilidade 24 horas por dia é exatamente o papel do agendamento online.');
  if (a.equipe && a.equipe !== '1') ins.push('Com mais de um profissional, a agenda separada por profissional evita conflitos de horário.');
  if (!chips.length) ins.push('Sem problema: você pode ajustar todos os números diretamente na simulação.');
  return '<div class="q on"><h3>Seu retrato, em poucas linhas</h3>' + (chips.length ? '<div class="chips">' + chips.map(c => '<span class="chip">' + c + '</span>').join('') + '</div>' : '') +
    '<div class="summary">' + ins.map(i => '<p class="insight">' + i + '</p>').join('') + '</div>' +
    '<div class="qfoot"><a class="btn" href="#simulacao" id="toCalc">Ver a simulação com meus números</a><button type="button" class="skip-q" data-q="redo">Refazer</button></div></div>';
}
function bindSummary(){
  if (S.ans.ticket != null) S.calc.ticket = S.ans.ticket;
  if (S.ans.horas != null) S.calc.horas = S.ans.horas;
  calcRender(); orderRender();
}
qRender(1);

/* =====================================================================
   03 · CALCULADORA
   ===================================================================== */
const C = R.calculadora;
const ctrlDefs = [
  { k: 'ticket', l: 'Ticket médio por cliente', pre: 'R$', d: 'Valor médio que cada cliente gasta.' },
  { k: 'novos', l: 'Novos clientes por mês (premissa)', d: 'Estimativa sua. Não é uma taxa de mercado nem uma promessa.' },
  { k: 'horas', l: 'Horas por semana com mensagens e horários', suf: 'h' },
  { k: 'economia', l: 'Parte desse tempo que poderia ser poupada', suf: '%', d: 'Premissa editável: depende de quantos clientes passarem a agendar sozinhos.' }
];
$('#ctrls').innerHTML = ctrlDefs.map(c => { const cfg = C[c.k]; return '<div class="ctrl"><div class="ctrl-top"><label for="c-' + c.k + '">' + c.l + '</label><span class="val">' + (c.pre ? '<span style="font-size:16px;color:var(--muted)">' + c.pre + '</span>' : '') + '<input type="number" inputmode="decimal" id="n-' + c.k + '" min="' + cfg.min + '" max="' + cfg.max + '" step="' + cfg.passo + '" aria-label="' + c.l + ' (valor)">' + (c.suf ? '<span style="font-size:16px;color:var(--muted)">' + c.suf + '</span>' : '') + '</span></div>' +
  '<input type="range" id="c-' + c.k + '" min="' + cfg.min + '" max="' + cfg.max + '" step="' + cfg.passo + '">' + (c.d ? '<small>' + c.d + '</small>' : '') + '</div>'; }).join('') +
  '<div class="disclaim"><b style="color:var(--bone);font-weight:500">Simulação ilustrativa.</b><span>Faturamento bruto não é lucro: dele saem custos, comissões e impostos. O tempo poupado não é dinheiro recebido e por isso não entra na soma. Os resultados dependem de conquistar os clientes e de haver horários para atendê-los.</span></div>';
ctrlDefs.forEach(c => {
  const r = $('#c-' + c.k), n = $('#n-' + c.k), cfg = C[c.k];
  const set = (v, from) => { v = Math.min(cfg.max, Math.max(cfg.min, Number(v) || 0)); S.calc[c.k] = v; if (from !== 'r') r.value = v; if (from !== 'n') n.value = v; r.style.setProperty('--v', ((v - cfg.min) / (cfg.max - cfg.min) * 100) + '%'); calcUpdate(); };
  r.addEventListener('input', () => set(r.value, 'r'));
  n.addEventListener('change', () => set(n.value)); n.addEventListener('input', () => { if (n.value !== '') set(n.value, 'n'); });
  c.set = set;
});
function calcRender(){ ctrlDefs.forEach(c => c.set(S.calc[c.k])); }
const tweens = {};
function tween(el, to, fmt){
  const from = tweens[el.id] != null ? tweens[el.id] : 0; tweens[el.id] = to;
  if (reduce || Math.abs(to - from) < 0.01) { el.textContent = fmt(to); return; }
  const s = performance.now(), d = 600;
  cancelAnimationFrame(el._r);
  (function f(n){ const k = Math.min(1, (n - s) / d), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(from + (to - from) * e); if (k < 1) el._r = requestAnimationFrame(f); })(s);
}
const calcValues = c => K.simulate(c, C.semanasPorMes);
$('#results').innerHTML =
  '<div class="kpis"><div class="kpi money"><span>Faturamento bruto adicional · mês</span><b class="num" id="k1">R$ 0</b><em>potencial, não garantido</em></div>' +
  '<div class="kpi money"><span>Faturamento bruto adicional · ano</span><b class="num" id="k2">R$ 0</b><em>mensal × 12</em></div>' +
  '<div class="kpi"><span>Horas poupadas · mês</span><b class="num" id="k3">0 h</b><em>h/semana × 4,33 × %</em></div>' +
  '<div class="kpi"><span>Horas poupadas · ano</span><b class="num" id="k4">0 h</b><em>mensal × 12</em></div></div>' +
  '<div class="chart"><h4>Potencial bruto no ano × investimento no primeiro ano</h4><p>Investimento do 1º ano = valor inicial + 12 mensalidades. Comparação ilustrativa, não é projeção de lucro.</p><svg id="chart" viewBox="0 0 600 210" role="img" aria-label="Gráfico comparando o potencial bruto anual com o investimento no primeiro ano de cada plano"></svg></div>' +
  '<div class="cover" id="cover"></div>';
function calcUpdate(){
  const c = S.calc, v = calcValues(c);
  tween($('#k1'), v.mensal, brl0); tween($('#k2'), v.anual, brl0);
  tween($('#k3'), v.hMes, x => x.toFixed(1).replace('.', ',') + ' h'); tween($('#k4'), v.hAno, x => int(x) + ' h');
  // gráfico
  const bars = [{ l: 'Potencial bruto em 12 meses', v: v.anual, hl: true }].concat(R.planos.map(p => { const f = forma(p); return { l: '1º ano · ' + p.nome, v: K.firstYear(f.valor, p.mensalidade) }; }));
  const max = Math.max(1, ...bars.map(b => b.v)), W = 600, x0 = 0, bw = 360, rowH = 62;
  $('#chart').innerHTML = bars.map((b, i) => { const w = Math.max(2, b.v / max * bw), y = i * rowH + 8;
    return '<text x="' + x0 + '" y="' + (y + 10) + '">' + esc(b.l) + '</text><rect x="' + x0 + '" y="' + (y + 18) + '" width="' + bw + '" height="20" fill="rgba(239,231,218,.05)"/>' +
      '<rect x="' + x0 + '" y="' + (y + 18) + '" height="20" width="' + w.toFixed(1) + '" fill="' + (b.hl ? 'url(#cg)' : '#4a4a46') + '" style="transition:width .6s cubic-bezier(.2,.8,.1,1)"/>' +
      '<text x="' + (x0 + bw + 14) + '" y="' + (y + 33) + '" style="fill:' + (b.hl ? '#e8b48c' : '#efe7da') + ';font-size:14px">' + brl0(b.v) + '</text>'; }).join('') +
    '<defs><linearGradient id="cg"><stop offset="0" stop-color="#7a4a2c"/><stop offset=".5" stop-color="#e8b48c"/><stop offset="1" stop-color="#c07a4f"/></linearGradient></defs>';
  // atendimentos para cobrir a mensalidade
  $('#cover').innerHTML = R.planos.map(p => { const n = K.toCover(p.mensalidade, c.ticket);
    return '<div><span>Para cobrir a mensalidade do plano ' + esc(p.nome.toLowerCase()) + ' (' + brl(p.mensalidade) + ')</span><b class="num">' + (n == null ? '–' : n + ' atendimento' + (n > 1 ? 's' : '')) + '</b><span>por mês, com ticket de ' + brl0(c.ticket) + '</span></div>'; }).join('') +
    (S.ans.clientes ? '<div style="grid-column:1/-1"><span>Capacidade</span><b class="num" style="font-size:24px">' + (c.novos ? '+' + Math.round(c.novos / S.ans.clientes * 100) + '% de clientes' : 'Sem novos clientes na premissa') + '</b><span>em relação aos ' + int(S.ans.clientes) + ' que você já atende. Confirme se a equipe e a agenda comportam esse volume.</span></div>' : '');
  orderRender();
}
calcRender();

/* =====================================================================
   04 · DEMONSTRAÇÃO DO SITE (prévia real, mesmo domínio)
   ===================================================================== */
const FEATS = [
  ['topo', 'Página inicial', 'Abertura com a marca, a proposta e o botão de agendar.', 'arrow'],
  ['ritual', 'Apresentação da barbearia', 'Como vocês trabalham, contado em etapas.', 'mirror'],
  ['servicos', 'Serviços e preços', 'Carta com valores, combos e duração estimada.', 'scissors'],
  ['equipe', 'Profissionais', 'Cada barbeiro com foto e especialidade.', 'user'],
  ['trabalhos', 'Galeria e antes e depois', 'Comparador arrastável dos resultados.', 'camera'],
  ['como-chegar', 'Localização no Google Maps', 'Mapa, rota e horário de funcionamento.', 'pin'],
  ['redes', 'Redes sociais e contato', 'Instagram, WhatsApp e compartilhamento.', 'share'],
  ['agendar', 'Agendamento', 'O cliente reserva sozinho o horário livre.', 'calendar']
];
const framed = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
const SITE = framed && R.siteDemoLocal ? R.siteDemoLocal : R.siteDemo;
let dev = innerWidth < 760 ? 'phone' : 'desk', cur = 'topo', frame = null;
$$('.devices button').forEach(b => { b.innerHTML = (b.dataset.dev === 'desk' ? '<svg class="ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/></svg>Computador' : '<svg class="ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/></svg>Celular'); b.setAttribute('aria-pressed', b.dataset.dev === dev); });
$('#feat').innerHTML = FEATS.map(([id, t, d, ic]) => '<button type="button" data-sec="' + id + '" aria-pressed="' + (id === cur) + '">' + icon(ic, 20) + '<span><b>' + t + '</b><small>' + d + '</small></span></button>').join('');
const domain = prop ? 'www.' + prop.slug.replace(/-/g, '') + '.com.br' : 'www.suabarbearia.com.br';
function deviceRender(){
  const st = $('#deviceStage');
  const vw = dev === 'desk' ? 1280 : 390, vh = dev === 'desk' ? 800 : 800;
  st.innerHTML = dev === 'desk'
    ? '<div class="desk"><div class="chrome"><i></i><i></i><i></i><span class="url" title="Endereço ilustrativo">' + esc(domain) + '</span></div><div class="viewport" id="vp"><span class="loading">Carregando prévia…</span></div></div>'
    : '<div class="phone-wrap"><div class="phone"><div class="viewport" id="vp"><span class="loading">Carregando prévia…</span></div></div></div>';
  const vp = $('#vp');
  frame = document.createElement('iframe');
  frame.title = 'Prévia navegável do site modelo Rufino Barber';
  frame.loading = 'lazy'; frame.width = vw; frame.height = vh; frame.style.width = vw + 'px'; frame.style.height = vh + 'px';
  frame.src = SITE + (cur !== 'topo' ? '#' + cur : '');
  frame.addEventListener('load', () => { const l = $('.loading', vp); if (l) l.remove(); });
  vp.appendChild(frame);
  st.insertAdjacentHTML('beforeend', '<p class="note" style="margin-top:12px">' + icon('link', 14) + '<span>' + (SITE !== R.siteDemo ? 'Nesta prévia aparece uma cópia do modelo. ' : '') + 'Prefere ver em tela cheia? <a href="' + esc(R.siteDemo) + '" target="_blank" rel="noopener" style="color:var(--copper-hi)">Abrir o site modelo em nova aba</a>.</span></p>');
  const fit = () => { const s = vp.clientWidth / vw; frame.style.transform = 'scale(' + s + ')'; frame.style.height = (vp.clientHeight / s) + 'px'; };
  fit(); new ResizeObserver(fit).observe(vp);
}
function goSection(id){
  cur = id; $$('#feat button').forEach(b => b.setAttribute('aria-pressed', b.dataset.sec === id));
  try { const d = frame.contentDocument; const el = d && d.getElementById(id); if (el) { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); return; } } catch(e) {}
  frame.src = SITE + '#' + id;
}
$('#feat').addEventListener('click', e => { const b = e.target.closest('[data-sec]'); if (b) goSection(b.dataset.sec); });
$$('.devices button').forEach(b => b.addEventListener('click', () => { dev = b.dataset.dev; $$('.devices button').forEach(x => x.setAttribute('aria-pressed', x === b)); deviceRender(); }));
// a prévia só carrega quando a seção se aproxima (economiza dados no celular)
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); deviceRender(); } }, { rootMargin: '400px' }).observe($('#site'));

/* =====================================================================
   05 · AGENDAMENTO (demonstração em memória, com o motor real de horários)
   ===================================================================== */
const cfg = A.effective(TT, null);
const svcList = cfg.servicos.filter(s => s.ativo !== false);
const today = A.nowIn(cfg.fuso).key;
const days = []; for (let i = 0; days.length < 7 && i < 21; i++) { const k = A.addDays(today, i); if (cfg.horarios[A.weekday(k)]) days.push(k); }
const W = { step: 1, svc: null, prof: 'any', day: null, slot: null, nome: '' };
const demo = { busy: [], blocks: [], mine: [], boardDay: days[0], tab: 'agenda' };
// agenda de exemplo: gerada de forma determinística para cada dia, sem nomes de pessoas
function seed(k){ let s = 0; for (const ch of k) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
const examples = ['corte','degrade','barba','combo-cb','barba-tq','sobrancelha'].map(id => cfg.servicos.find(s => s.id === id)).filter(Boolean);
days.forEach((k, di) => {
  const r = seed(k), h = cfg.horarios[A.weekday(k)]; let n = 0;
  cfg.equipe.forEach(p => {
    for (let m = A.toMin(h.abre); m < A.toMin(h.fecha); m += 30) {
      if (r() > 0.42) continue;
      const svc = examples[Math.floor(r() * examples.length)];
      if (!A.canDo(p, svc)) continue;
      const bm = A.busyMap(k, cfg, demo.busy, []), cells = A.cellsFor(m, svc.min, cfg);
      if (m + svc.min > A.toMin(h.fecha) || (h.pausa && m < A.toMin(h.pausa[1]) && m + svc.min > A.toMin(h.pausa[0])) || cells.some(c => bm[p.id] && bm[p.id].has(c))) continue;
      demo.busy.push({ id: 'ex' + di + '-' + (n++), dateKey: k, ini: m, fim: m + svc.min, profIds: [p.id], status: 'confirmado', servicoNome: svc.nome, cliente: 'Cliente exemplo ' + String(n).padStart(2, '0'), exemplo: true });
    }
  });
});
const allBusy = () => demo.busy.concat(demo.mine);
const profName = id => (cfg.equipe.find(p => p.id === id) || {}).nome || id;
const dLabel = k => { const d = new Date(k + 'T12:00:00Z'); return { wd: D3[A.weekday(k)], d: d.getUTCDate(), m: MES[d.getUTCMonth()] }; };
const dLong = k => { const l = dLabel(k); return DIAS[A.weekday(k)].toLowerCase() + ', ' + l.d + ' de ' + l.m; };

function wizard(){
  const el = $('#wizard');
  const steps = '<ol class="wsteps">' + [1,2,3,4,5,6].map(i => '<li class="' + (i < W.step ? 'done' : i === W.step ? 'on' : '') + '"></li>').join('') + '</ol>';
  const head = '<div class="panel-h"><b>' + icon('calendar', 18) + 'O que o cliente vê</b><span class="tag dashed">Demonstração</span></div>';
  let b = '';
  const back = W.step > 1 && W.step < 6 ? '<button type="button" class="btn ghost sm" data-w="back">Voltar</button>' : '<span></span>';
  if (W.step === 1) b = '<h4>1 · Escolha o serviço</h4><div class="wopts">' + svcList.slice(0, 7).map(s => '<button type="button" class="wopt" data-svc="' + s.id + '"><span>' + esc(s.nome) + '<small>Duração média estimada: ' + s.min + ' min</small></span><span class="p num">' + brl0(s.preco) + '</span></button>').join('') + '</div>';
  if (W.step === 2) b = '<h4>2 · Escolha o profissional</h4><div class="wopts"><button type="button" class="wopt" data-prof="any"><span>Sem preferência<small>Primeiro horário livre</small></span></button>' + cfg.equipe.filter(p => A.canDo(p, W.svc)).map(p => '<button type="button" class="wopt" data-prof="' + p.id + '"><span>' + esc(p.nome) + '<small>' + esc(p.especialidade) + '</small></span></button>').join('') + '</div>';
  if (W.step === 3) b = '<h4>3 · Escolha a data</h4><div class="wdays">' + days.map((k, i) => { const l = dLabel(k), n = A.freeSlots({ cfg, dateKey: k, svc: W.svc, profChoice: W.prof, busy: allBusy(), blocks: demo.blocks }).length; return '<button type="button" class="wday" data-day="' + k + '"' + (n ? '' : ' disabled') + ' aria-pressed="' + (W.day === k) + '"><span>' + (i === 0 && k === today ? 'hoje' : l.wd) + '</span><b>' + l.d + '</b><span>' + (n ? n + ' livres' : 'lotado') + '</span></button>'; }).join('') + '</div>';
  if (W.step === 4) { const sl = A.freeSlots({ cfg, dateKey: W.day, svc: W.svc, profChoice: W.prof, busy: allBusy(), blocks: demo.blocks }); W._slots = sl;
    b = '<h4>4 · Escolha o horário</h4><p style="font-size:13px;color:var(--muted)">' + dLong(W.day) + ' · só aparecem horários em que o serviço inteiro cabe.</p><div class="wslots">' + (sl.length ? sl.map(s => '<button type="button" class="wslot" data-ini="' + s.ini + '">' + A.fmt(s.ini) + '</button>').join('') : '<p style="color:var(--muted)">Sem horários livres.</p>') + '</div>'; }
  if (W.step === 5) b = '<h4>5 · Seus dados</h4><p style="font-size:13px;color:var(--muted)">Use um nome fictício: nada é salvo nem enviado.</p><label class="sr-only" for="wNome">Nome</label><input class="winp" id="wNome" maxlength="40" placeholder="Seu nome (fictício)" value="' + esc(W.nome) + '"><button type="button" class="btn" data-w="confirm">Confirmar agendamento de teste</button>';
  if (W.step === 6) { const m = demo.mine[demo.mine.length - 1];
    b = '<h4>Confirmação simulada</h4><div class="ticket"><span class="code">' + esc(m.code) + '</span><dl><dt>Serviço</dt><dd>' + esc(m.servicoNome) + '</dd><dt>Profissional</dt><dd>' + m.profIds.map(profName).map(esc).join(' e ') + '</dd><dt>Quando</dt><dd>' + dLong(m.dateKey) + ', ' + A.fmt(m.ini) + '</dd><dt>Cliente</dt><dd>' + esc(m.cliente) + '</dd></dl></div>' +
      '<p style="font-size:13px;color:var(--muted)">Nenhuma reserva real foi criada. Veja o horário marcado no painel ao lado.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn sm" data-w="see">Ver no painel</button><button type="button" class="btn ghost sm" data-w="again">Fazer outro teste</button></div>'; }
  el.innerHTML = head + steps + '<div class="wbody">' + b + (W.step > 1 && W.step < 6 ? '<div class="wnav">' + back + '</div>' : '') + '</div>';
}
$('#wizard').addEventListener('click', e => {
  const t = e.target;
  const sv = t.closest('[data-svc]'); if (sv) { W.svc = cfg.servicos.find(s => s.id === sv.dataset.svc); const el = cfg.equipe.filter(p => A.canDo(p, W.svc)); W.prof = 'any'; W.step = (W.svc.cadeiras || 1) > 1 || el.length < 2 ? 3 : 2; return wizard(); }
  const pr = t.closest('[data-prof]'); if (pr) { W.prof = pr.dataset.prof; W.step = 3; return wizard(); }
  const dy = t.closest('[data-day]'); if (dy && !dy.disabled) { W.day = dy.dataset.day; demo.boardDay = W.day; W.step = 4; board(); return wizard(); }
  const sl = t.closest('[data-ini]'); if (sl) { W.slot = W._slots.find(s => s.ini === +sl.dataset.ini); W.step = 5; wizard(); setTimeout(() => { const i = $('#wNome'); if (i) i.focus({ preventScroll: true }); }, 30); return; }
  const w = t.closest('[data-w]'); if (!w) return;
  if (w.dataset.w === 'back') { W.step = W.step === 3 && (!W.svc || cfg.equipe.filter(p => A.canDo(p, W.svc)).length < 2 || (W.svc.cadeiras || 1) > 1) ? 1 : W.step - 1; wizard(); }
  if (w.dataset.w === 'confirm') {
    W.nome = ($('#wNome').value || '').trim().slice(0, 40) || 'Cliente teste';
    if (!A.isFree({ cfg, dateKey: W.day, ini: W.slot.ini, svc: W.svc, profIds: W.slot.profIds, busy: allBusy(), blocks: demo.blocks })) { toast('Esse horário acabou de ser bloqueado no painel. Escolha outro.'); W.step = 4; return wizard(); }
    demo.mine.push({ id: 'voce-' + Date.now(), code: 'TESTE-' + Math.random().toString(36).slice(2, 6).toUpperCase(), dateKey: W.day, ini: W.slot.ini, fim: W.slot.ini + W.svc.min, profIds: W.slot.profIds, status: 'confirmado', servicoNome: W.svc.nome, preco: W.svc.preco, cliente: W.nome, you: true });
    W.step = 6; demo.boardDay = W.day; demo.tab = 'agenda'; wizard(); board();
  }
  if (w.dataset.w === 'see') { const c = $('.cell.you'); (c || $('#adminPanel')).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
  if (w.dataset.w === 'again') { W.step = 1; W.slot = null; wizard(); }
});
$('#wizard').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'wNome') $('[data-w="confirm"]').click(); });

function board(){
  const el = $('#adminPanel'), k = demo.boardDay, h = cfg.horarios[A.weekday(k)];
  const tabs = [['agenda','Agenda do dia'],['profissionais','Profissionais'],['servicos','Serviços'],['clientes','Clientes']];
  let body = '';
  if (demo.tab === 'agenda') {
    const open = A.toMin(h.abre), close = A.toMin(h.fecha), rows = [];
    for (let m = open; m < close; m += 30) rows.push(m);
    const list = allBusy().filter(b => b.dateKey === k && b.status !== 'cancelado');
    const cols = cfg.equipe.length;
    let g = '<div class="sched" style="grid-template-columns:56px repeat(' + cols + ',minmax(90px,1fr))"><div class="h t" style="z-index:2"></div>' + cfg.equipe.map(p => '<div class="h">' + esc(p.nome.split(' ')[0]) + '</div>').join('');
    rows.forEach(m => {
      g += '<div class="t">' + A.fmt(m) + '</div>';
      cfg.equipe.forEach(p => {
        const b = list.find(x => x.profIds.includes(p.id) && x.ini < m + 30 && x.fim > m);
        const bl = demo.blocks.find(x => x.profId === p.id && x.de === k && x.ini === m);
        const pausa = h.pausa && m < A.toMin(h.pausa[1]) && m + 30 > A.toMin(h.pausa[0]);
        if (b) { const first = b.ini >= m && b.ini < m + 30; g += '<div class="cell ' + (b.you ? 'you' : 'busy') + '" title="' + esc(b.servicoNome) + ' · ' + A.fmt(b.ini) + '–' + A.fmt(b.fim) + '">' + (first ? (b.you ? 'Você · ' : '') + esc(b.servicoNome) : '') + '</div>'; }
        else if (bl) g += '<button type="button" class="cell block" data-unblock="' + bl.id + '" aria-label="Desbloquear ' + A.fmt(m) + ' de ' + esc(p.nome) + '">Bloqueado</button>';
        else if (pausa) g += '<div class="cell closed" title="Pausa">' + (m === A.toMin(h.pausa[0]) ? 'Pausa' : '') + '</div>';
        else g += '<button type="button" class="cell free" data-block="' + p.id + '|' + m + '" aria-label="Bloquear ' + A.fmt(m) + ' de ' + esc(p.nome) + '"></button>';
      });
    });
    g += '</div>';
    const busyN = list.length, totalSlots = rows.length * cols;
    body = '<div class="board-legend"><span><i class="lg-busy"></i>Ocupado (exemplo)</span><span><i class="lg-you"></i>Seu teste</span><span><i class="lg-free"></i>Livre · toque para bloquear</span><span><i class="lg-block"></i>Bloqueado</span></div>' +
      '<div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:10px">' + days.map(d => { const l = dLabel(d); return '<button type="button" class="wday" style="flex-basis:56px" data-bday="' + d + '" aria-pressed="' + (d === k) + '"><span>' + l.wd + '</span><b>' + l.d + '</b></button>'; }).join('') + '</div>' + g +
      '<p style="font-size:12.5px;color:var(--muted);margin-top:10px">' + busyN + ' atendimentos neste dia · horários de 30 min · ' + h.abre + ' às ' + h.fecha + '</p>';
  }
  if (demo.tab === 'profissionais') body = '<table class="mini"><thead><tr><th>Profissional</th><th>Especialidade</th><th>Atendimentos no dia</th></tr></thead><tbody>' + cfg.equipe.map(p => '<tr><td>' + esc(p.nome) + '</td><td>' + esc(p.especialidade) + '</td><td class="num">' + allBusy().filter(b => b.dateKey === k && b.profIds.includes(p.id)).length + '</td></tr>').join('') + '</tbody></table>';
  if (demo.tab === 'servicos') body = '<table class="mini"><thead><tr><th>Serviço</th><th>Duração média</th><th>Preço</th></tr></thead><tbody>' + svcList.map(s => '<tr><td>' + esc(s.nome) + '</td><td class="num">' + s.min + ' min</td><td class="num">' + brl0(s.preco) + '</td></tr>').join('') + '</tbody></table><p style="font-size:12.5px;color:var(--muted);margin-top:10px">No painel real, preços e durações são editados aqui e o site atualiza na hora.</p>';
  if (demo.tab === 'clientes') { const l = allBusy().filter(b => b.dateKey === k).sort((a, b) => a.ini - b.ini);
    body = '<table class="mini"><thead><tr><th>Cliente</th><th>Horário</th><th>Serviço</th></tr></thead><tbody>' + l.map(b => '<tr><td>' + esc(b.cliente) + (b.you ? ' <span class="tag">seu teste</span>' : '') + '</td><td class="num">' + A.fmt(b.ini) + '</td><td>' + esc(b.servicoNome) + '</td></tr>').join('') + '</tbody></table><p style="font-size:12.5px;color:var(--muted);margin-top:10px">Clientes de exemplo, sem dados reais.</p>'; }
  el.innerHTML = '<div class="panel-h"><b>' + icon('lock', 18) + 'Painel da barbearia · ' + dLong(k) + '</b><span class="tag dashed">Dados de exemplo</span></div><div class="board-tabs" role="tablist">' + tabs.map(([id, l]) => '<button role="tab" data-btab="' + id + '" aria-selected="' + (demo.tab === id) + '">' + l + '</button>').join('') + '</div><div class="board">' + body + '</div>';
}
$('#adminPanel').addEventListener('click', e => {
  const t = e.target;
  const tb = t.closest('[data-btab]'); if (tb) { demo.tab = tb.dataset.btab; return board(); }
  const bd = t.closest('[data-bday]'); if (bd) { demo.boardDay = bd.dataset.bday; return board(); }
  const bl = t.closest('[data-block]'); if (bl) { const [p, m] = bl.dataset.block.split('|'); demo.blocks.push({ id: 'bl' + Date.now(), profId: p, de: demo.boardDay, ate: demo.boardDay, ini: +m, fim: +m + 30, tipo: 'bloqueio' }); board(); if (W.step >= 3 && W.step <= 4) wizard(); toast('Horário bloqueado: ele some do agendamento do cliente.'); return; }
  const ub = t.closest('[data-unblock]'); if (ub) { demo.blocks = demo.blocks.filter(x => x.id !== ub.dataset.unblock); board(); if (W.step >= 3 && W.step <= 4) wizard(); }
});
$('#waNote').innerHTML = icon('lock', 16) + '<span><b style="color:var(--bone);font-weight:500">Sobre o WhatsApp:</b> no site, o cliente fala com a barbearia por um toque, em qualquer plano. Confirmações e lembretes automáticos pelo WhatsApp dependem da configuração e ativação da WhatsApp Business Platform (oficial da Meta). Sem essa ativação, nada é enviado automaticamente.</span>';
wizard(); board();

/* =====================================================================
   06 · ROTINA
   ===================================================================== */
const ROT = [
  ['Informações espalhadas entre conversas e perfis', 'Presença profissional, com tudo num só endereço', 'link'],
  ['Cada horário depende de uma resposta manual', 'Informações centralizadas: serviços, preços e equipe', 'scissors'],
  ['Difícil mostrar serviços, preços e trabalhos', 'Agendamento online, com horários livres à vista', 'calendar'],
  ['Agenda em papel, áudio ou memória', 'Agenda organizada por profissional, sem conflitos', 'clock'],
  ['Menos fácil de encontrar quando alguém procura online', 'Mais conveniente para o cliente encontrar e reservar', 'pin']
];
$('#routine').innerHTML = ROT.map((r, i) => '<div class="rrow"><span class="n">' + String(i + 1).padStart(2, '0') + '</span><span class="a">' + icon('x', 18) + r[0] + '</span><span class="b">' + icon(r[2], 20) + r[1] + '</span></div>').join('');
$('#rotNote').innerHTML = icon('check', 16) + '<span>Uma estrutura digital melhora a apresentação e a organização. Ela não garante aumento de vendas: o resultado depende do uso e da divulgação.</span>';
function setRoutine(v){ const r = $('#routine'); r.classList.toggle('with', v === 'with'); r.classList.toggle('without', v === 'without'); $$('#switch button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v)); const b = $('#switch button[data-v="' + v + '"]'); $('#knob').style.width = b.offsetWidth + 'px'; $('#knob').style.transform = 'translateX(' + (b.offsetLeft - 4) + 'px)'; }
$$('#switch button').forEach(b => b.addEventListener('click', () => setRoutine(b.dataset.v)));
setRoutine('without');
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); setTimeout(() => setRoutine('with'), reduce ? 0 : 900); } }, { threshold: .5 }).observe($('#routine'));
addEventListener('resize', () => setRoutine($('#routine').classList.contains('with') ? 'with' : 'without'));

/* =====================================================================
   07 · PLANOS
   ===================================================================== */
function plansRender(){
  $('#plans').innerHTML = R.planos.map(p => {
    const f = forma(p), pct = Math.round(p.desconto / p.precoOriginal * 100);
    const formas = p.formas.length > 1
      ? '<div class="forms" role="group" aria-label="Forma de pagamento">' + p.formas.map(x => '<button type="button" class="forma" data-plan="' + p.id + '" data-forma="' + x.id + '" aria-pressed="' + (x.id === f.id) + '"><span>' + esc(x.rotulo) + (x.comDesconto ? '<small>com desconto ' + esc(R.cupom.nome) + '</small>' : '') + '</span><b class="num">' + brl(x.valor) + '</b></button>').join('') + '</div>'
      : '<div class="big num">' + brl(f.valor) + '<small>' + esc(f.rotulo) + '</small></div>';
    return '<article class="plan rv' + (p.destaque ? ' hl' : '') + (S.plan === p.id ? ' sel' : '') + '">' + (p.destaque ? '<span class="ribbon">' + esc(p.destaque) + '</span>' : '') +
      '<span class="pn">Plano ' + p.numero + '</span><h3>' + esc(p.nome) + '</h3><p class="res">' + esc(p.resumo) + '</p>' +
      '<div class="price-block"><div class="was"><span>De <s class="num">' + brl(p.precoOriginal) + '</s></span><span class="coupon">Cupom ' + esc(R.cupom.nome) + ' · −' + brl(p.desconto) + (p.descontoCondicao ? ' ' + esc(p.descontoCondicao) : '') + '</span></div>' +
      formas + '<span class="save-badge">Economia de ' + brl(p.desconto) + ' (' + pct + '%)' + (p.descontoCondicao ? ' ' + esc(p.descontoCondicao) : '') + '</span>' +
      '<div class="monthly"><span>Mensalidade (recorrente)</span><b class="num">' + brl(p.mensalidade) + '<span style="font-family:var(--body);font-size:13px;color:var(--muted)">/mês</span></b></div>' +
      '<p class="year1">Primeiro ano: ' + brl(f.valor) + ' + 12 × ' + brl(p.mensalidade) + ' = <b style="color:var(--bone);font-weight:500">' + brl(K.firstYear(f.valor, p.mensalidade)) + '</b></p></div>' +
      (p.incluiPrefixo ? '<p class="pre">' + esc(p.incluiPrefixo) + '</p>' : '') + '<ul>' + p.inclui.map(i => '<li>' + icon('check', 16) + esc(i) + '</li>').join('') + '</ul>' +
      '<button type="button" class="btn' + (S.plan === p.id ? '' : ' ghost') + '" data-choose="' + p.id + '">' + (S.plan === p.id ? 'Plano escolhido' : 'Escolher este plano') + '</button></article>';
  }).join('');
  const val = (prop && prop.validade) || R.cupom.validade;
  $('#planNote').innerHTML = icon('clock', 16) + '<span>' + (val ? 'Condição ' + esc(R.cupom.nome) + ' válida até ' + val.split('-').reverse().join('/') + '. ' : '') + 'O investimento inicial cobre a criação e a publicação. A mensalidade cobre hospedagem, domínio e suporte' + ' (e o sistema de agendamento, no plano 02). Formas de pagamento além das indicadas são combinadas na contratação.</span>';
}
$('#plans').addEventListener('click', e => {
  const fb = e.target.closest('[data-forma]'); if (fb) { S.forma[fb.dataset.plan] = fb.dataset.forma; S.plan = fb.dataset.plan; plansRender(); calcUpdate(); return; }
  const cb = e.target.closest('[data-choose]'); if (cb) { S.plan = cb.dataset.choose; plansRender(); orderRender(); toast('Plano selecionado. Ele já aparece no resumo final.'); }
});
plansRender();

/* =====================================================================
   08 · PERGUNTAS
   ===================================================================== */
const ps = plan('site'), pc = plan('combo');
const FAQ = [
  ['Preciso ter domínio próprio?', 'Não. O domínio está incluído nos planos. Se você já tiver um, usamos o seu.'],
  ['O site funciona no celular?', 'Sim. O design é responsivo: se adapta a celular, tablet e computador.'],
  ['Posso atualizar preços e serviços?', 'Sim. No plano Site institucional, as atualizações são feitas pelo nosso suporte, que está incluído. No plano com agendamento, você também pode alterar serviços e preços pelo painel administrativo.'],
  ['Como funciona o agendamento?', 'O cliente escolhe o serviço, o profissional, o dia e um horário livre. A agenda considera a duração estimada de cada serviço, o horário de funcionamento e os bloqueios que você cadastrar.'],
  ['Os clientes conseguem escolher horários?', 'Sim, entre os horários realmente livres. Um horário ocupado ou bloqueado não aparece para o cliente.'],
  ['O sistema funciona pelo WhatsApp?', 'O site tem botões que abrem conversa no WhatsApp da barbearia. Confirmações e lembretes automáticos dependem da ativação da WhatsApp Business Platform (oficial da Meta), que exige configuração própria e pode ter custos cobrados pela Meta.'],
  ['A hospedagem está incluída?', 'Sim, nos dois planos, junto com o domínio, dentro da mensalidade.'],
  ['Como funciona a mensalidade?', 'É um valor mensal fixo: ' + brl(ps.mensalidade) + ' no plano Site institucional e ' + brl(pc.mensalidade) + ' no plano Site + agendamento. Ela cobre hospedagem, domínio e suporte, e o sistema de agendamento no plano 02. A forma de pagamento é combinada na contratação.'],
  ['Quanto tempo leva para desenvolver e publicar?', R.prazoImplantacao ? 'O prazo é ' + R.prazoImplantacao + '.' : 'O prazo é combinado na contratação e depende do envio do material da barbearia (fotos, serviços, preços e textos).']
];
$('#faq').innerHTML = FAQ.map(([q, a]) => '<details><summary>' + esc(q) + '<svg class="ico" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></summary><p>' + esc(a) + '</p></details>').join('');

/* =====================================================================
   09 · CONVERSÃO
   ===================================================================== */
function message(){
  const p = plan(S.plan), f = forma(p), a = S.ans, parts = [];
  if (a.canais.length) parts.push('hoje os clientes agendam por ' + join(a.canais.map(c => CANAL[c])));
  if (a.equipe) parts.push('equipe: ' + EQUIPE[a.equipe]);
  if (a.horas != null) parts.push('cerca de ' + a.horas + ' h por semana com mensagens e horários');
  if (a.perda === 'sim' || a.perda === 'asvezes') parts.push('sinto que perco clientes por demora na resposta');
  const nome = S.nomeBarbearia.trim() || '(informar)';
  return 'Olá, Rufino! Quero minha barbearia na Rufino.\n\n' +
    'Barbearia: ' + nome + (prop ? ' (' + prop.bairro + ', ' + prop.cidade + ')' : '') + '\n' +
    (S.responsavel.trim() ? 'Responsável: ' + S.responsavel.trim() + '\n' : '') +
    'Plano: ' + p.nome + '\n' +
    'Investimento inicial: ' + brl(f.valor) + (p.formas.length > 1 ? ' (' + f.rotulo.toLowerCase() + ')' : '') + ' com o cupom ' + R.cupom.nome + (((prop && prop.validade) || R.cupom.validade) ? ' (válido até ' + ((prop && prop.validade) || R.cupom.validade).split('-').reverse().join('/') + ')' : '') + '\n' +
    'Mensalidade: ' + brl(p.mensalidade) + '\n' +
    (parts.length ? 'Resumo do interesse: ' + parts.join('; ') + '.\n' : 'Resumo do interesse: quero uma presença digital profissional' + (p.id === 'combo' ? ' com agendamento online' : '') + '.\n') +
    (prop ? 'Proposta: ' + prop.slug : '');
}
function orderRender(){
  const el = $('#order'); if (!el) return;
  const p = plan(S.plan), f = forma(p);
  const active = document.activeElement && document.activeElement.closest && document.activeElement.closest('#order') ? document.activeElement.id : null;
  const wa = R.whatsapp ? 'https://wa.me/' + R.whatsapp + '?text=' + encodeURIComponent(message()) : null;
  el.innerHTML = '<span class="tag">Resumo da sua escolha</span>' +
    '<div class="row-sel" role="group" aria-label="Plano">' + R.planos.map(x => '<button type="button" data-oplan="' + x.id + '" aria-pressed="' + (x.id === p.id) + '">' + esc(x.nome) + '</button>').join('') + '</div>' +
    (p.formas.length > 1 ? '<div class="row-sel" role="group" aria-label="Forma de pagamento">' + p.formas.map(x => '<button type="button" data-oforma="' + x.id + '" aria-pressed="' + (x.id === f.id) + '">' + esc(x.rotulo) + ' · ' + brl(x.valor) + '</button>').join('') + '</div>' : '') +
    '<dl><dt>Plano</dt><dd>' + esc(p.nome) + '</dd><dt>Investimento inicial</dt><dd class="num">' + brl(f.valor) + '</dd><dt>Mensalidade</dt><dd class="num">' + brl(p.mensalidade) + '/mês</dd><dt>Economia ' + esc(R.cupom.nome) + '</dt><dd class="num">' + (f.comDesconto || p.formas.length === 1 ? brl(p.desconto) : '–') + '</dd></dl>' +
    '<div class="field"><label for="oNome">Nome da barbearia</label><input class="winp" id="oNome" maxlength="80" value="' + esc(S.nomeBarbearia) + '" placeholder="Nome da sua barbearia"></div>' +
    '<div class="field"><label for="oResp">Seu nome (opcional)</label><input class="winp" id="oResp" maxlength="60" value="' + esc(S.responsavel) + '" placeholder="Como prefere ser chamado"></div>' +
    '<details><summary style="cursor:pointer;font-size:13px;color:var(--muted)">Ver a mensagem que será enviada</summary><div class="msgbox" id="oMsg" style="margin-top:10px"></div></details>' +
    (wa ? '<a class="btn" id="oGo" target="_blank" rel="noopener" href="' + wa + '">' + ID.brand('whatsapp', 18) + 'Quero minha barbearia na Rufino</a>'
        : '<button type="button" class="btn" id="oGo">' + ID.brand('whatsapp', 18) + 'Quero minha barbearia na Rufino</button><p class="note" style="margin-top:-4px">' + icon('lock', 14) + '<span>O WhatsApp da Rufino ainda não foi configurado nesta versão. O botão copia a mensagem pronta.</span></p>');
  $('#oMsg').textContent = message();
  if (active) { const a = $('#' + active); if (a) { a.focus(); const v = a.value; a.setSelectionRange && a.setSelectionRange(v.length, v.length); } }
}
$('#order').addEventListener('click', e => {
  const pb = e.target.closest('[data-oplan]'); if (pb) { S.plan = pb.dataset.oplan; plansRender(); orderRender(); return; }
  const fb = e.target.closest('[data-oforma]'); if (fb) { S.forma[S.plan] = fb.dataset.oforma; plansRender(); orderRender(); return; }
  if (e.target.closest('button#oGo')) copy(message(), () => toast('Mensagem copiada. Cole no WhatsApp da Rufino.'), () => { const d = $('#order details'); d.open = true; toast('Selecione e copie a mensagem acima.'); });
});
$('#order').addEventListener('input', e => {
  if (e.target.id === 'oNome') S.nomeBarbearia = e.target.value;
  if (e.target.id === 'oResp') S.responsavel = e.target.value;
  $('#oMsg').textContent = message();
  const go = $('a#oGo'); if (go) go.href = 'https://wa.me/' + R.whatsapp + '?text=' + encodeURIComponent(message());
});
orderRender();

$('#footL').textContent = '© ' + new Date().getFullYear() + ' ' + R.empresa + ' · Proposta comercial' + (prop ? ' para ' + prop.nome : '');
$('#footR').textContent = 'Simulações ilustrativas · demonstrações sem reservas reais';

/* entrada por rolagem: só o que começa fora da tela */
if ('IntersectionObserver' in window && !reduce) {
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.remove('pre'); ro.unobserve(e.target); } }), { threshold: .1 });
  $$('.rv').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('pre'); ro.observe(el); } });
}
})();
