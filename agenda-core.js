/* =====================================================================
   AGENDA · núcleo e camada de dados
   - Núcleo puro: calcula horários livres a partir do expediente, da
     duração estimada, dos agendamentos e dos bloqueios.
   - Adaptadores de dados com a mesma interface:
       LocalBackend     → só neste navegador (demonstração offline)
       ClaudeBackend    → banco compartilhado do artifact (demonstração)
       SupabaseBackend  → produção (validação e trava no servidor)
   A agenda é dividida em "células" do tamanho do passo (15 min). Um
   horário só é oferecido se todas as células que ele ocupa, incluindo
   a folga entre clientes, estiverem livres para o profissional.
   ===================================================================== */
(function(){
'use strict';

/* ---------- datas no fuso da barbearia ---------- */
function nowIn(tz){
  const p = {};
  new Intl.DateTimeFormat('en-US', { timeZone: tz, year:'numeric', month:'numeric', day:'numeric', hour:'numeric', minute:'numeric', hour12:false })
    .formatToParts(new Date()).forEach(x => p[x.type] = x.value);
  const key = p.year + '-' + String(p.month).padStart(2,'0') + '-' + String(p.day).padStart(2,'0');
  return { key, min: (+p.hour % 24) * 60 + (+p.minute) };
}
const toDate = k => { const [y,m,d] = k.split('-').map(Number); return new Date(Date.UTC(y, m-1, d)); };
const keyOf = d => d.toISOString().slice(0,10);
const addDays = (k, n) => keyOf(new Date(toDate(k).getTime() + n * 864e5));
const weekday = k => toDate(k).getUTCDay();
const toMin = s => { const [h,m] = s.split(':').map(Number); return h*60 + m; };
const fmt = m => String(Math.floor(m/60)).padStart(2,'0') + ':' + String(m%60).padStart(2,'0');
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id' + Date.now().toString(36) + Math.random().toString(36).slice(2));
const code = () => 'RB-' + Math.random().toString(36).slice(2,8).toUpperCase();

/* ---------- configuração efetiva (arquivo + ajustes do painel) ---------- */
function effective(T, settings){
  const s = settings || {};
  return {
    horarios: s.horarios || T.horarios,
    servicos: s.servicos || T.servicos,
    equipe: s.equipe || T.equipe,
    agenda: Object.assign({}, T.agenda, s.agenda || {}),
    fuso: T.fuso
  };
}

/* ---------- núcleo de disponibilidade ---------- */
function canDo(prof, svc){ return prof.ativo !== false && (prof.servicos === 'todos' || !prof.servicos || prof.servicos.includes(svc.id)); }
function cellsFor(ini, dur, cfg){
  const step = cfg.agenda.passoMin, end = ini + dur + (cfg.agenda.intervaloEntreAtendimentosMin || 0);
  const out = []; for (let m = Math.floor(ini/step)*step; m < end; m += step) out.push(m); return out;
}
/* mapa profissional -> Set(min) ocupado num dia, a partir de agendamentos (ou intervalos ocupados) e bloqueios */
function busyMap(dateKey, cfg, busy, blocks){
  const map = {};
  const mark = (p, m) => (map[p] = map[p] || new Set()).add(m);
  busy.filter(b => b.dateKey === dateKey && b.status !== 'cancelado').forEach(b => {
    (b.cells || cellsFor(b.ini, b.fim - b.ini, cfg)).forEach(m => (b.profIds || []).forEach(p => mark(p, m)));
  });
  const wd = weekday(dateKey), step = cfg.agenda.passoMin;
  (blocks || []).forEach(bl => {
    const inRange = dateKey >= bl.de && dateKey <= (bl.ate || bl.de);
    const recurring = Array.isArray(bl.diasSemana) && bl.diasSemana.length;
    if (!inRange && !recurring) return;
    if (recurring && !bl.diasSemana.includes(wd)) return;
    if (recurring && (dateKey < bl.de || (bl.ate && dateKey > bl.ate))) return;
    const ini = bl.ini == null ? 0 : bl.ini, fim = bl.fim == null ? 24*60 : bl.fim;
    const profs = bl.profId === 'todos' ? cfg.equipe.map(p => p.id) : [bl.profId];
    for (let m = Math.floor(ini/step)*step; m < fim; m += step) profs.forEach(p => mark(p, m));
  });
  return map;
}
/* horários livres para um serviço num dia: [{ini, profIds}] */
function freeSlots({ cfg, dateKey, svc, profChoice, busy, blocks, ignoreBookingId }){
  const h = cfg.horarios[weekday(dateKey)];
  if (!h || !svc) return [];
  const step = cfg.agenda.passoMin, dur = svc.min, need = svc.cadeiras || 1;
  const open = toMin(h.abre), close = toMin(h.fecha);
  const pausa = h.pausa ? [toMin(h.pausa[0]), toMin(h.pausa[1])] : null;
  const now = nowIn(cfg.fuso);
  if (dateKey < now.key) return [];
  const earliest = dateKey === now.key ? now.min + cfg.agenda.antecedenciaMin : -1;
  const list = ignoreBookingId ? busy.filter(b => b.id !== ignoreBookingId) : busy;
  const bm = busyMap(dateKey, cfg, list, blocks);
  let pool = cfg.equipe.filter(p => canDo(p, svc));
  if (profChoice && profChoice !== 'any') pool = pool.filter(p => p.id === profChoice);
  // equilíbrio: em "sem preferência", quem tem menos atendimentos no dia vem primeiro
  const load = p => (bm[p.id] ? bm[p.id].size : 0);
  const out = [];
  for (let m = open; m + dur <= close; m += step) {
    if (m < earliest) continue;
    if (pausa && m < pausa[1] && m + dur > pausa[0]) continue;
    const cells = cellsFor(m, dur, cfg).filter(c => c < close); // a folga final pode passar do fechamento
    const free = pool.filter(p => !cells.some(c => bm[p.id] && bm[p.id].has(c))).sort((a,b) => load(a) - load(b));
    if (free.length >= need) out.push({ ini: m, profIds: free.slice(0, need).map(p => p.id) });
  }
  return out;
}
/* confere se um horário específico continua livre (usado antes de gravar e ao reagendar) */
function isFree({ cfg, dateKey, ini, svc, profIds, busy, blocks, ignoreBookingId }){
  const s = freeSlots({ cfg, dateKey, svc: Object.assign({}, svc, { cadeiras: 1 }), profChoice: 'any', busy, blocks, ignoreBookingId });
  const slot = s.find(x => x.ini === ini); if (!slot) return false;
  const list = ignoreBookingId ? busy.filter(b => b.id !== ignoreBookingId) : busy;
  const bm = busyMap(dateKey, cfg, list, blocks);
  const close = toMin(cfg.horarios[weekday(dateKey)].fecha);
  const cells = cellsFor(ini, svc.min, cfg).filter(c => c < close);
  return profIds.every(p => { const prof = cfg.equipe.find(x => x.id === p); return prof && canDo(prof, svc) && !cells.some(c => bm[p] && bm[p].has(c)); });
}
function daysWithSlots(args, n){
  const now = nowIn(args.cfg.fuso), out = [];
  for (let i = 0; i < n; i++) {
    const k = addDays(now.key, i);
    if (!args.cfg.horarios[weekday(k)]) continue;
    const s = freeSlots(Object.assign({}, args, { dateKey: k }));
    out.push({ key: k, i, count: s.length });
  }
  return out;
}
function validatePhone(t){ const d = String(t || '').replace(/\D/g, ''); return d.length === 10 || d.length === 11 || (d.length >= 12 && d.startsWith('55')); }

/* =====================================================================
   ADAPTADORES
   Interface: kind, label, init(), isAdmin(), getSettings(), saveSettings(s),
   listBusy(fromKey, toKey), listBookings(fromKey, toKey) [admin],
   listBlocks(), createBooking(b), updateBooking(id, patch), addBlock(b),
   removeBlock(id), onChange(cb)
   ===================================================================== */

/* ---------- 1. navegador (localStorage) ---------- */
function LocalBackend(T){
  const KEY = 'rb:' + T.slug;
  const mem = { bookings: [], blocks: [], settings: null };
  let ok = true;
  const RO = !!(T.painel && T.painel.modo === 'leitura');
  function load(){
    try { Object.assign(mem, JSON.parse(localStorage.getItem(KEY)) || {}); } catch(e) { ok = false; }
    // demonstração: descarta agendamentos antigos e limita a quantidade guardada
    const cut = addDays(nowIn(T.fuso).key, -2);
    mem.bookings = (mem.bookings || []).filter(valid).filter(b => b.dateKey >= cut).slice(-60);
    mem.blocks = (mem.blocks || []).filter(bl => bl && /^[\w-]{1,60}$/.test(bl.id) && /^\d{4}-\d{2}-\d{2}$/.test(bl.de));
    if (RO) mem.settings = null;   // painel somente leitura: ajustes antigos deste navegador são ignorados
  }
  // o que vem do localStorage pode ter sido alterado: só aceita registros no formato esperado
  function valid(b){
    return b && /^[\w-]{1,60}$/.test(b.id) && /^\d{4}-\d{2}-\d{2}$/.test(b.dateKey) && Number.isInteger(b.ini) && Number.isInteger(b.fim) && b.fim > b.ini
      && ['confirmado','cancelado','atendido','falta'].includes(b.status) && Array.isArray(b.profIds) && b.profIds.every(p => /^[\w-]{1,40}$/.test(p));
  }
  // nome e telefone reduzidos ao mínimo necessário para exibir o comprovante
  function minimize(c){
    if (!T.privacidadeDemo || !c) return c;
    const d = String(c.telefone || '').replace(/\D/g, '');
    return { nome: String(c.nome || '').trim().split(/\s+/)[0].slice(0, 40), telefone: d.length >= 4 ? '(••) •••••-' + d.slice(-4) : '', obs: null };
  }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch(e) { ok = false; } emit(); }
  const subs = []; const emit = () => subs.forEach(f => f());
  return {
    kind: 'local',
    label: 'Demonstração: os agendamentos ficam só neste navegador e nenhum dado é enviado.',
    readOnly: RO,
    async init(){ load(); return true; },
    async isAdmin(){ return T.modoDemonstracao === true && !(T.painel && T.painel.modo === 'desligado'); },
    adminNote: RO ? 'Demonstração somente leitura: veja como a barbearia gerencia a agenda. As alterações ficam desativadas; em produção o acesso exige login.'
                  : 'Painel de demonstração sem senha: as alterações valem só neste navegador. Em produção o acesso exige login.',
    async getSettings(){ return mem.settings; },
    async saveSettings(s){ if (RO) throw new Error('somente leitura'); mem.settings = s; save(); },
    async listBusy(){ return mem.bookings.map(({ id, dateKey, ini, fim, profIds, status }) => ({ id, dateKey, ini, fim, profIds, status })); },
    async listBookings(){ return mem.bookings.slice(); },
    async listBlocks(){ return mem.blocks.slice(); },
    async createBooking(b, cfg, blocks){
      load();
      if (!isFree({ cfg, dateKey: b.dateKey, ini: b.ini, svc: b._svc, profIds: b.profIds, busy: mem.bookings, blocks })) return { ok: false, error: 'Esse horário acabou de ser ocupado. Escolha outro.' };
      const rec = Object.assign({}, b); delete rec._svc;
      rec.cliente = minimize(rec.cliente);
      mem.bookings.push(rec); save(); return { ok: true, booking: rec };
    },
    async updateBooking(id, patch, cfg){
      load(); const b = mem.bookings.find(x => x.id === id); if (!b) return { ok: false, error: 'Agendamento não encontrado.' };
      const p = Object.assign({}, patch); delete p._old;
      if (p.ini != null && cfg) {
        const base = cfg.servicos.find(s => s.id === b.servicoId) || { id: b.servicoId };
        const svc = Object.assign({}, base, { min: p.fim - p.ini });
        if (!isFree({ cfg, dateKey: p.dateKey, ini: p.ini, svc, profIds: p.profIds, busy: mem.bookings, blocks: mem.blocks, ignoreBookingId: id })) return { ok: false, error: 'O novo horário está ocupado.' };
      }
      Object.assign(b, p); save(); return { ok: true, booking: b };
    },
    async addBlock(bl){ if (RO) throw new Error('somente leitura'); mem.blocks.push(bl); save(); },
    async removeBlock(id){ if (RO) throw new Error('somente leitura'); mem.blocks = mem.blocks.filter(b => b.id !== id); save(); },
    onChange(cb){ subs.push(cb); addEventListener('storage', e => { if (e.key === KEY) { load(); cb(); } }); },
    usable(){ return ok; }
  };
}

/* ---------- 2. banco compartilhado do artifact (demonstração online) ---------- */
function ClaudeBackend(T, db, user){
  const P = 't/' + T.slug;   // documento-raiz da barbearia: t/<slug>/...
  const col = n => db.collection(P + '/' + n);
  const subs = []; const emit = () => subs.forEach(f => f());
  let admin = false, me = null;
  // agendamentos (com dados do cliente) ficam num documento por pessoa: bookings/<id-do-visitante>
  // regra do banco: cada visitante lê e grava só o seu; a equipe (editores) lê e grava todos.
  const ownDoc = () => col('bookings').doc(me || 'anon');
  async function findBooking(id){
    const own = await ownDoc().get();
    if (own.exists && own.data().items && own.data().items[id]) return { ref: ownDoc(), doc: own.data() };
    if (!admin) return null;
    const all = await col('bookings').limit(1000).get();
    for (const d of all.docs) { const x = d.data(); if (x.items && x.items[id]) return { ref: col('bookings').doc(d.id), doc: x }; }
    return null;
  }
  async function claimCells(cells, bookingId){
    const taken = [];
    for (const c of cells) {
      const ref = col('cells').doc(c.id);
      const lease = await ref.acquire({ holder: bookingId, ttlMs: 8000 });
      if (!lease.acquired) return { ok: false, taken };
      const snap = await ref.get();
      if (snap.exists && snap.data().bookingId && snap.data().bookingId !== bookingId) return { ok: false, taken };
      await ref.set({ prof: c.prof, dateKey: c.dateKey, min: c.min, bookingId });
      taken.push(ref);
    }
    return { ok: true, taken };
  }
  function cellDocs(b, cfg){
    const out = [];
    cellsFor(b.ini, b.fim - b.ini, cfg).forEach(m => b.profIds.forEach(p => out.push({ id: p + '_' + b.dateKey + '_' + m, prof: p, dateKey: b.dateKey, min: m })));
    return out;
  }
  return {
    kind: 'claude',
    label: 'Demonstração online: os agendamentos ficam salvos no banco de teste deste site.',
    adminNote: 'Acesso liberado para quem pode editar este site (proprietário e editores).',
    async init(){
      try { admin = user ? !!(await user.canEdit()) : false; } catch(e) { admin = false; }
      try { me = user ? await user.id() : null; } catch(e) { me = null; }
      if (!me) return false;
      const s = await col('meta').doc('ping').get().catch(() => null); // testa leitura
      return s !== null;
    },
    async isAdmin(){ return admin; },
    async getSettings(){ const s = await db.doc(P + '/config/settings').get(); return s.exists ? s.data() : null; },
    async saveSettings(s){ await db.doc(P + '/config/settings').set(s); emit(); },
    async listBusy(fromKey){
      const snap = await col('cells').where('dateKey', '>=', fromKey).limit(1000).get();
      // reconstrói intervalos a partir das células
      const by = {};
      snap.docs.forEach(d => { const x = d.data(); const k = x.bookingId + '|' + x.prof; (by[k] = by[k] || { id: x.bookingId, dateKey: x.dateKey, profIds: [x.prof], mins: [] }).mins.push(x.min); });
      return Object.values(by).map(o => ({ id: o.id, dateKey: o.dateKey, profIds: o.profIds, cells: o.mins, ini: Math.min(...o.mins), fim: Math.max(...o.mins) + 1, status: 'ativo' }));
    },
    async listBookings(fromKey){ const s = await col('bookings').limit(1000).get(); const out = []; s.docs.forEach(d => Object.values(d.data().items || {}).forEach(b => { if (!fromKey || b.dateKey >= fromKey) out.push(b); })); return out; },
    async listBlocks(){ const s = await col('blocks').limit(500).get(); return s.docs.map(d => d.data()); },
    async createBooking(b, cfg){
      const rec = Object.assign({}, b); delete rec._svc;
      const res = await claimCells(cellDocs(rec, cfg), rec.id);
      if (!res.ok) { for (const r of res.taken) await r.delete().catch(() => {}); return { ok: false, error: 'Esse horário acabou de ser ocupado. Escolha outro.' }; }
      rec.owner = me;
      const own = await ownDoc().get();
      const doc = own.exists ? own.data() : { items: {} };
      doc.items = Object.assign({}, doc.items || {}, { [rec.id]: rec });
      await ownDoc().set(doc);
      emit(); return { ok: true, booking: rec };
    },
    async updateBooking(id, patch, cfg){
      const found = await findBooking(id);
      const old = found ? found.doc.items[id] : patch._old;
      if (!old) return { ok: false, error: 'Agendamento não encontrado.' };
      const next = Object.assign({}, old, patch); delete next._old;
      // libera as células antigas
      for (const c of cellDocs(old, cfg)) { const r = col('cells').doc(c.id); const cs = await r.get(); if (cs.exists && cs.data().bookingId === id) await r.delete(); }
      if (next.status !== 'cancelado') {
        const res = await claimCells(cellDocs(next, cfg), id);
        if (!res.ok) { for (const r of res.taken) await r.delete().catch(() => {}); await claimCells(cellDocs(old, cfg), id); return { ok: false, error: 'O novo horário está ocupado.' }; }
      }
      if (found) { const doc = Object.assign({}, found.doc); doc.items = Object.assign({}, doc.items, { [id]: next }); await found.ref.set(doc); }
      emit(); return { ok: true, booking: next };
    },
    async addBlock(bl){ await col('blocks').doc(bl.id).set(bl); emit(); },
    async removeBlock(id){ await col('blocks').doc(id).delete(); emit(); },
    onChange(cb){ subs.push(cb); try { col('cells').onSnapshot(() => cb(), () => {}); } catch(e) {} },
    usable(){ return true; }
  };
}

/* ---------- 3. Supabase (produção) ----------
   Requer o schema de backend/supabase/migrations. A disponibilidade pública
   vem de rb_busy (sem dados de clientes); a reserva passa por rb_book, que
   valida tudo no servidor e é protegida por uma restrição de exclusão. */
function SupabaseBackend(T){
  let sb = null, session = null, member = false, tenantId = null;
  const subs = []; const emit = () => subs.forEach(f => f());
  const one = async q => { const { data, error } = await q; if (error) throw error; return data; };
  return {
    kind: 'supabase',
    label: '',
    adminNote: 'Acesso restrito à equipe cadastrada da barbearia.',
    async init(){
      if (!window.supabase || !T.backend.supabaseUrl) return false;
      sb = window.supabase.createClient(T.backend.supabaseUrl, T.backend.supabaseAnonKey);
      tenantId = await one(sb.rpc('rb_tenant_id', { p_slug: T.slug }));
      const s = await sb.auth.getSession(); session = s.data.session;
      if (session) member = !!(await one(sb.rpc('rb_is_staff', { p_tenant: tenantId })));
      return !!tenantId;
    },
    async signIn(email, password){
      const { data, error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return { ok: false, error: 'E-mail ou senha incorretos.' };
      session = data.session; member = !!(await one(sb.rpc('rb_is_staff', { p_tenant: tenantId })));
      return member ? { ok: true } : { ok: false, error: 'Este usuário não faz parte da equipe desta barbearia.' };
    },
    async signOut(){ await sb.auth.signOut(); session = null; member = false; },
    needsLogin(){ return !session; },
    async isAdmin(){ return member; },
    async getSettings(){ return await one(sb.rpc('rb_public_settings', { p_tenant: tenantId })); },
    async saveSettings(s){ await one(sb.rpc('rb_save_settings', { p_tenant: tenantId, p_settings: s })); emit(); },
    async listBusy(fromKey, toKey){ return await one(sb.rpc('rb_busy', { p_tenant: tenantId, p_from: fromKey, p_to: toKey })); },
    async listBookings(fromKey, toKey){ return await one(sb.rpc('rb_admin_bookings', { p_tenant: tenantId, p_from: fromKey, p_to: toKey })); },
    async listBlocks(){ return await one(sb.rpc('rb_blocks', { p_tenant: tenantId })); },
    async createBooking(b){
      const { data, error } = await sb.rpc('rb_book', { p_tenant: tenantId, p_service: b.servicoId, p_prof: b.profChoice, p_date: b.dateKey, p_start_min: b.ini,
        p_name: b.cliente.nome, p_phone: b.cliente.telefone, p_note: b.cliente.obs || null });
      if (error) return { ok: false, error: error.message.includes('slot_taken') ? 'Esse horário acabou de ser ocupado. Escolha outro.' : 'Não foi possível concluir o agendamento. Tente de novo.' };
      emit(); return { ok: true, booking: data };
    },
    async updateBooking(id, patch){
      const phone = patch._old && patch._old.cliente ? patch._old.cliente.telefone : null;
      const fn = patch.status === 'cancelado' ? sb.rpc('rb_cancel', { p_booking: id, p_phone: phone })
        : patch.status ? sb.rpc('rb_set_status', { p_booking: id, p_status: patch.status })
        : sb.rpc('rb_reschedule', { p_booking: id, p_date: patch.dateKey, p_start_min: patch.ini, p_prof: (patch.profIds || [])[0] || null });
      const { data, error } = await fn; if (error) return { ok: false, error: error.message.includes('slot_taken') ? 'O novo horário está ocupado.' : error.message };
      emit(); return { ok: true, booking: data };
    },
    async addBlock(bl){ await one(sb.rpc('rb_add_block', { p_tenant: tenantId, p_block: bl })); emit(); },
    async removeBlock(id){ await one(sb.rpc('rb_remove_block', { p_block: id })); emit(); },
    onChange(cb){ subs.push(cb); if (sb) sb.channel('rb-' + T.slug).on('broadcast', { event: 'agenda' }, () => cb()).subscribe(); },
    usable(){ return !!sb; }
  };
}

/* ---------- escolha do adaptador ---------- */
async function pickBackend(T){
  const mode = T.backend.modo;
  if (mode === 'local') { const l = LocalBackend(T); await l.init(); return l; }
  if ((mode === 'auto' || mode === 'supabase') && T.backend.supabaseUrl && T.backend.supabaseAnonKey) {
    const s = SupabaseBackend(T);
    try { if (await s.init()) return s; } catch(e) { console.warn('Supabase indisponível', e); }
    if (mode === 'supabase') return null;
  }
  if ((mode === 'auto' || mode === 'demo') && window.claude && typeof window.claude.use === 'function') {
    try {
      const timeout = new Promise(r => setTimeout(() => r(null), 6000));
      const db = await Promise.race([window.claude.use('db'), timeout]);
      const user = db ? await Promise.race([window.claude.use('user'), timeout]) : null;
      if (db) {
        let canWrite = null; try { canWrite = user ? await user.can('data.write') : null; } catch(e) {}
        if (canWrite !== false) { const c = ClaudeBackend(T, db, user); if (await c.init()) return c; }
      }
    } catch(e) { console.warn('Banco de demonstração indisponível', e); }
  }
  const l = LocalBackend(T); await l.init(); return l;
}

window.Agenda = { nowIn, addDays, weekday, toMin, fmt, uid, code, effective, freeSlots, isFree, daysWithSlots, cellsFor, busyMap, canDo, validatePhone, pickBackend, LocalBackend };
})();
