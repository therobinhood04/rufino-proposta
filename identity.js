/* Identidade Rufino: símbolo e conjunto de ícones de traço uniforme.
   Símbolo "navalha-R": um R de alto contraste cuja perna é a lâmina de uma
   navalha, presa ao corpo por um pino. Desenhado em grade de 64, sem
   depender de fonte, para funcionar de 16 px (favicon) a cartaz. */
(function(){
  const SYMBOL_PATHS = {
    // haste com serifas finas
    stem: 'M17 10.5h7.2v43H17z M12.5 10.5h12.2v1.4H12.5z M12 52.1h17.5v1.4H12z',
    // bojo: fino à esquerda e no topo, encorpado à direita (contraste de Bodoni)
    bowl: 'M24.2 10.5H33c8.3 0 13.4 4.6 13.4 11.3S41.3 33.1 33 33.1h-8.8v-1.5h7.6c4.7 0 7.4-3.9 7.4-9.8s-2.7-9.8-7.4-9.8h-7.6z',
    // perna = lâmina da navalha (dorso reto, fio levemente curvo, ponta arredondada)
    blade: 'M28.4 31.5 31.9 30.3 56.3 55.1 51.3 57.3Q39.4 46.6 28.4 34.6Z',
    pin: { cx: 31.2, cy: 32.8, r: 1.55 }
  };
  function symbol(opts){
    const o = Object.assign({ color: 'currentColor', bg: null, cut: '#0d0e0c', size: 64, title: null }, opts || {});
    const p = SYMBOL_PATHS;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="' + o.size + '" height="' + o.size + '"' + (o.title ? ' role="img" aria-label="' + o.title + '"' : ' aria-hidden="true"') + '>' +
      (o.bg ? '<rect width="64" height="64" rx="12" fill="' + o.bg + '"/>' : '') +
      '<path fill="' + o.color + '" d="' + p.stem + ' ' + p.bowl + '"/>' +
      '<path fill="' + o.color + '" d="' + p.blade + '"/>' +
      '<circle cx="' + p.pin.cx + '" cy="' + p.pin.cy + '" r="' + p.pin.r + '" fill="' + (o.bg || o.cut) + '"/>' +
      '</svg>';
  }

  /* Ícones de interface: grade 24, traço 1.5, pontas arredondadas. */
  const I = {
    mirror:   '<circle cx="12" cy="8.5" r="5.5"/><path d="M9.2 6.6a3.4 3.4 0 0 1 3.2-1.9"/><path d="M12 14v3.2"/><path d="M10.2 17.2h3.6l-.6 4.3h-2.4z"/>',
    towel:    '<path d="M4 15.5h16a1.5 1.5 0 0 1 1.5 1.5v1.5A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5V17A1.5 1.5 0 0 1 4 15.5z"/><path d="M6.5 15.5v4.5"/><path d="M8.5 12c-1-1.2 1-2.2 0-3.5s1-2.3 0-3.5M12 12c-1-1.2 1-2.2 0-3.5s1-2.3 0-3.5M15.5 12c-1-1.2 1-2.2 0-3.5s1-2.3 0-3.5"/>',
    razor:    '<path d="M3 15.5 12.8 6l1.7.4L5 18.4c-.6.5-1.5.4-2-.2v0c-.4-.8-.4-1.9 0-2.7z"/><path d="m14.2 6.6 6.3-3.4"/><circle cx="13.6" cy="6.3" r=".6"/><path d="M5.5 14.4 11 9"/>',
    scissors: '<circle cx="6" cy="6.5" r="2.6"/><circle cx="6" cy="17.5" r="2.6"/><path d="M8.2 8 20.5 17.5M8.2 16 20.5 6.5"/><path d="M12.6 12h.01"/>',
    clipper:  '<path d="M8 3.5h8l-.6 3H8.6z"/><path d="M8.6 6.5h6.8l.9 12.5a2 2 0 0 1-2 2.1h-4.6a2 2 0 0 1-2-2.1z"/><path d="M10 3.5V2M12 3.5V2M14 3.5V2"/><path d="M10.5 11h3"/>',
    comb:     '<path d="M3 9.5h18v3.5H3z"/><path d="M5 13v5M7.5 13v5M10 13v5M12.5 13v5M15 13v5M17.5 13v5M20 13v5"/>',
    jar:      '<path d="M6 9.5h12v9.5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M5 6.5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3H5z"/><path d="M9 14.5h6"/>',
    clock:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin:      '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    user:     '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/>',
    check:    '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    route:    '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H16"/>',
    share:    '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
    link:     '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    lock:     '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    x:        '<path d="M6 6l12 12M18 6 6 18"/>',
    camera:   '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.8"/><path d="m8.5 7 1.5-2.5h4L15.5 7"/>',
    star:     '<path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9z"/>',
    play:     '<path d="M8 5.5v13l10.5-6.5z"/>',
    pause:    '<path d="M8 5.5v13M16 5.5v13"/>'
  };
  function icon(name, size, extra){
    return '<svg class="ico' + (extra ? ' ' + extra : '') + '" viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[name] + '</svg>';
  }
  function brand(name, size){
    const d = (window.BRAND_ICONS || {})[name];
    return d ? '<svg class="ico brand" viewBox="0 0 24 24" width="' + (size || 20) + '" height="' + (size || 20) + '" fill="currentColor" aria-hidden="true"><path d="' + d + '"/></svg>' : '';
  }
  window.RUFINO_ID = { symbol, icon, brand, ICONS: I };
})();
