/* Protocolo da Gordura no Fígado — app de entrega
   HTML/CSS/JS puro. Telas: login, início, jornada, dia, lista, evolução, presentes, premium, conta. */
(function () {
  const C = window.CONFIG, T = window.CONTEUDO;
  const app = document.getElementById('app');
  const DIA_MS = 24 * 60 * 60 * 1000;

  // ---------- armazenamento local (por e-mail) ----------
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  const email = () => ls.get('pgf_email', '');
  const chave = (k) => 'pgf_' + email() + '_' + k;
  const estado = {
    inicio() { let i = ls.get(chave('inicio'), 0); if (!i) { i = Date.now(); ls.set(chave('inicio'), i); } return i; },
    feitos() { return ls.get(chave('feitos'), {}); },
    salvarFeitos(f) { ls.set(chave('feitos'), f); },
    registros() { return ls.get(chave('registros'), []); },
    salvarRegistros(r) { return ls.set(chave('registros'), r); },
    fotos() { return ls.get(chave('fotos'), {}); },
    salvarFotos(f) { return ls.set(chave('fotos'), f); }
  };

  const total = () => Math.min(C.totalDias, T.dias.length);
  function diaAtual() {
    const ini = new Date(estado.inicio()); ini.setHours(0, 0, 0, 0);
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    return Math.max(1, Math.min(total(), Math.floor((hoje - ini) / DIA_MS) + 1));
  }
  function diaConcluido(n) {
    const f = estado.feitos()[n] || {};
    const tarefas = (T.dias[n - 1] || {}).tarefas || [];
    return tarefas.length > 0 && tarefas.every((_, i) => f[i]);
  }

  // ---------- utilidades ----------
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2600); }
  const ic = {
    voltar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    seta: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>',
    ok: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    cadeado: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    cesta: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 11 4-7M19 11l-4-7M2 11h20M3.5 11l1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.6-7.4M9 15v2M15 15v2"/></svg>',
    estrela: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2l-5-4.9 6.9-1z"/></svg>',
    zap: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>',
    cam: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/></svg>',
    presente: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>',
    baixar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    imprimir: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>',
    folha: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/></svg>',
    mapa: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></svg>',
    grafico: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/></svg>',
    usuario: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
  };

  // ---------- acesso ----------
  async function verificarAcesso(em) {
    try {
      const r = await fetch('/api/verificar-acesso?email=' + encodeURIComponent(em), { cache: 'no-store' });
      if (r.status >= 500) return 'erro';
      const j = await r.json();
      return j.acesso ? 'ok' : 'sem_acesso';
    } catch (e) { return 'erro'; }
  }

  // ---------- roteamento ----------
  const rotas = { inicio, jornada, dia, lista, evolucao, presentes, premium, conta };
  function ir(r) { location.hash = '#/' + r; }
  function render() {
    if (!email()) return telaLogin();
    const [nome, arg] = (location.hash.replace(/^#\/?/, '') || 'inicio').split('/');
    const fn = rotas[nome] || inicio;
    window.scrollTo(0, 0);
    fn(arg);
  }
  window.addEventListener('hashchange', render);

  function nav(ativo) {
    const it = [['jornada', 'Jornada', ic.mapa], ['evolucao', 'Evolução', ic.grafico], ['presentes', 'Presentes', ic.presente], ['conta', 'Conta', ic.usuario]];
    return '<nav class="nav no-print">' + it.map(([r, t, i]) => `<button data-ir="${r}" class="${ativo === r ? 'ativo' : ''}">${i}<span>${t}</span></button>`).join('') + '</nav>';
  }
  function topo(titulo, voltar, extra) {
    return `<header class="topo">${voltar ? `<button class="btn-voltar" data-ir="${voltar}" aria-label="Voltar">${ic.voltar}</button>` : `<img class="topo-logo" src="${C.logo}" alt="">`}<h1>${esc(titulo)}</h1>${extra || ''}</header>`;
  }
  function montar(html, opts) {
    opts = opts || {};
    app.className = 'app' + (opts.semNav ? ' sem-nav' : '');
    app.innerHTML = html + (opts.semNav ? '' : nav(opts.ativo));
    app.querySelectorAll('[data-ir]').forEach((b) => b.addEventListener('click', () => ir(b.dataset.ir)));
  }

  // ---------- login ----------
  function telaLogin(msg) {
    montar(`
      <div class="login">
        <img class="logo" src="${C.logo}" alt="${esc(C.nomeApp)}">
        <h2>Bem-vinda ao seu protocolo</h2>
        <p class="texto">Digite o mesmo e-mail que você usou na compra.</p>
        <label class="campo"><span>Seu e-mail</span><input id="em" type="email" inputmode="email" autocomplete="email" placeholder="seuemail@exemplo.com"></label>
        <p class="erro" id="erro">${esc(msg || '')}</p>
        <button class="btn btn-verde" id="entrar">Entrar</button>
        <div class="rodape">Comprou e não consegue entrar?<br>${C.whatsappSuporte ? `<a href="https://wa.me/${C.whatsappSuporte}?text=${encodeURIComponent('Olá! Comprei o Protocolo da Gordura no Fígado e não consigo entrar no app.')}" target="_blank" rel="noopener">Fale com o suporte no WhatsApp</a>` : 'Fale com o suporte.'}</div>
      </div>`, { semNav: true });
    const inp = document.getElementById('em'), btn = document.getElementById('entrar'), erro = document.getElementById('erro');
    async function entrar() {
      const v = inp.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { erro.textContent = 'Confira o e-mail digitado.'; return; }
      btn.disabled = true; btn.textContent = 'Conferindo sua compra...'; erro.textContent = '';
      const r = await verificarAcesso(v);
      btn.disabled = false; btn.textContent = 'Entrar';
      if (r === 'ok') { ls.set('pgf_email', v); estado.inicio(); location.hash = '#/inicio'; render(); }
      else if (r === 'sem_acesso') erro.textContent = 'Não encontramos uma compra com esse e-mail. Confira se é o mesmo e-mail da compra.';
      else erro.textContent = 'Não conseguimos conferir sua compra agora. Tente de novo em instantes.';
    }
    btn.addEventListener('click', entrar);
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') entrar(); });
  }

  // ---------- início ----------
  function inicio() {
    const d = diaAtual();
    montar(`
      <div class="boasvindas">
        <img class="logo" src="${C.logo}" alt="">
        <div class="selo">${ic.folha.replace('width="20" height="20"', 'width="38" height="38"')}</div>
        <p class="rotulo">Você está no</p>
        <h2 class="titulo">Dia ${d} de ${total()}</h2>
        <p class="texto" style="margin-bottom:26px">${esc(T.dias[d - 1].foco)}</p>
        <button class="btn btn-verde" data-ir="dia/${d}">Começar o dia ${d} ${ic.seta}</button>
        <div style="height:12px"></div>
        <button class="btn btn-claro" data-ir="jornada">Ver minha jornada</button>
      </div>`, { ativo: 'jornada' });
  }

  // ---------- jornada ----------
  function jornada() {
    const atual = diaAtual(), n = total();
    const feitos = Array.from({ length: n }, (_, i) => diaConcluido(i + 1)).filter(Boolean).length;
    const of = C.ofertaJornada;
    const dias = Array.from({ length: n }, (_, i) => {
      const k = i + 1;
      if (k > atual) return `<button class="dia bloq" data-bloq="${k - atual}"><span class="cad">${ic.cadeado}</span><span>Dia</span><strong>${k}</strong></button>`;
      const ok = diaConcluido(k) ? `<span class="ok">${ic.ok}</span>` : '';
      if (k === atual) return `<button class="dia hoje" data-ir="dia/${k}"><span class="tag">Hoje</span>${ok}<span>Dia</span><strong>${k}</strong></button>`;
      return `<button class="dia" data-ir="dia/${k}">${ok}<span>Dia</span><strong>${k}</strong></button>`;
    }).join('');
    montar(`
      ${topo(C.nomeApp)}
      <div class="atalhos">
        <button class="atalho" data-ir="premium"><span class="ic">${ic.zap}</span>Acompanhamento</button>
        <button class="atalho" data-ir="evolucao"><span class="ic">${ic.cam}</span>Minha evolução</button>
        <button class="atalho" data-ir="presentes"><span class="ic">${ic.presente}</span>Presentes</button>
      </div>
      <div class="pagina">
        <p class="rotulo">Sua jornada</p>
        <h2 class="titulo">${n} dias para cuidar do seu fígado</h2>
        <div class="progresso"><div class="barra"><i style="width:${Math.round(feitos / n * 100)}%"></i></div><small>${feitos} de ${n}</small></div>
        <button class="card" data-ir="lista"><span class="ic">${ic.cesta}</span><span><b>Lista de compras</b><small>Tudo o que você precisa para o protocolo</small></span><span class="seta">${ic.seta}</span></button>
        ${of && of.link ? `<a class="card oferta" href="${esc(of.link)}" target="_blank" rel="noopener"><span class="ic">${ic.estrela}</span><span><b>${esc(of.titulo)}</b><small>${esc(of.subtitulo)} · ${esc(of.preco)}</small></span><span class="seta">${ic.seta}</span></a>` : ''}
        <div class="grade">${dias}</div>
      </div>`, { ativo: 'jornada' });
    app.querySelectorAll('[data-bloq]').forEach((b) => b.addEventListener('click', () => { const f = +b.dataset.bloq; toast(f === 1 ? 'Esse dia libera amanhã 🌱' : `Esse dia libera em ${f} dias 🌱`); }));
  }

  // ---------- dia ----------
  function dia(arg) {
    const k = Math.max(1, Math.min(total(), parseInt(arg, 10) || 1));
    if (k > diaAtual()) { toast('Esse dia ainda não foi liberado.'); return ir('jornada'); }
    const D = T.dias[k - 1], f = (estado.feitos()[k] || {});
    const receita = (r) => `<div class="bloco"><h3>${ic.folha} ${esc(r.nome)}</h3><ul>${r.ingredientes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul><p style="margin-top:10px">${esc(r.preparo)}</p></div>`;
    montar(`
      ${topo('Dia ' + k, 'jornada', `<button class="btn-imprimir" id="imp">${ic.imprimir} Imprimir</button>`)}
      <div class="pagina">
        <p class="rotulo">Dia ${k} de ${total()}</p>
        <h2 class="titulo">${esc(D.titulo)}</h2>
        <p class="texto" style="margin-bottom:18px">${esc(D.foco)}</p>
        <div class="bloco"><h3>✅ Tarefas de hoje</h3>
          ${D.tarefas.map((t, i) => `<button class="check ${f[i] ? 'feito' : ''}" data-i="${i}"><span class="cx">${f[i] ? ic.ok : ''}</span><span class="t">${esc(t)}</span></button>`).join('')}
        </div>
        ${receita(T.vitamina)}
        ${D.receita ? receita(D.receita) : ''}
        ${D.dica ? `<div class="bloco"><h3>💡 Dica do dia</h3><p>${esc(D.dica)}</p></div>` : ''}
        <p class="aviso">${esc(T.aviso)}</p>
        ${k < diaAtual() ? `<button class="btn btn-claro no-print" data-ir="dia/${k + 1}">Ir para o dia ${k + 1} ${ic.seta}</button>` : ''}
      </div>`, { ativo: 'jornada' });
    document.getElementById('imp').addEventListener('click', () => window.print());
    app.querySelectorAll('.check').forEach((b) => b.addEventListener('click', () => {
      const todos = estado.feitos(); const atual = todos[k] || {}; const i = b.dataset.i;
      atual[i] = !atual[i]; todos[k] = atual; estado.salvarFeitos(todos);
      if (diaConcluido(k)) toast('Dia ' + k + ' concluído! 💚');
      dia(String(k));
    }));
  }

  // ---------- lista de compras ----------
  function lista() {
    const marc = ls.get(chave('lista'), {});
    montar(`
      ${topo('Lista de compras', 'jornada', `<button class="btn-imprimir" id="imp">${ic.imprimir} Imprimir</button>`)}
      <div class="pagina">
        <p class="texto" style="margin-bottom:16px">Toque nos itens para marcar o que já está em casa.</p>
        ${T.listaCompras.map((g, gi) => `<div class="bloco"><h3>${esc(g.grupo)}</h3>${g.itens.map((it, ii) => { const id = gi + '-' + ii; return `<button class="check ${marc[id] ? 'feito' : ''}" data-id="${id}"><span class="cx">${marc[id] ? ic.ok : ''}</span><span class="t">${esc(it)}</span></button>`; }).join('')}</div>`).join('')}
      </div>`, { ativo: 'jornada' });
    document.getElementById('imp').addEventListener('click', () => window.print());
    app.querySelectorAll('.check').forEach((b) => b.addEventListener('click', () => { const m = ls.get(chave('lista'), {}); m[b.dataset.id] = !m[b.dataset.id]; ls.set(chave('lista'), m); lista(); }));
  }

  // ---------- evolução ----------
  function reduzirFoto(file) {
    return new Promise((ok, falha) => {
      const img = new Image(); const url = URL.createObjectURL(file);
      img.onload = () => { const W = 520, H = Math.round(img.height * W / img.width); const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').drawImage(img, 0, 0, W, H); URL.revokeObjectURL(url); ok(c.toDataURL('image/jpeg', 0.72)); };
      img.onerror = falha; img.src = url;
    });
  }
  function evolucao() {
    const regs = estado.registros().slice().sort((a, b) => b.data - a.data);
    const fotos = estado.fotos();
    const fmt = (t) => new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const delta = (a, b, un) => { if (a == null || b == null) return ''; const d = +(a - b).toFixed(1); if (!d) return ''; return `<span class="delta ${d < 0 ? 'desce' : 'sobe'}">${d > 0 ? '+' : ''}${d} ${un}</span>`; };
    montar(`
      ${topo('Minha evolução', 'jornada')}
      <div class="pagina">
        <p class="texto" style="margin-bottom:16px">Registre peso e cintura uma vez por semana. Fica salvo só neste aparelho.</p>
        <div class="bloco">
          <h3>Novo registro</h3>
          <div class="linha2">
            <label class="campo"><span>Peso (kg)</span><input id="peso" type="number" inputmode="decimal" step="0.1" placeholder="Ex.: 82,5"></label>
            <label class="campo"><span>Cintura (cm)</span><input id="cint" type="number" inputmode="decimal" step="0.5" placeholder="Ex.: 98"></label>
          </div>
          <button class="btn btn-verde" id="salvar">Salvar registro</button>
        </div>
        <div class="bloco"><h3>Histórico</h3>
          ${regs.length ? regs.map((r, i) => { const ant = regs[i + 1]; return `<div class="registro"><span>${fmt(r.data)}</span><span><b>${r.peso != null ? r.peso + ' kg' : '—'}</b> ${delta(r.peso, ant && ant.peso, 'kg')}</span><span>${r.cintura != null ? r.cintura + ' cm' : '—'} ${delta(r.cintura, ant && ant.cintura, 'cm')}</span></div>`; }).join('') : '<p class="vazio">Nenhum registro ainda. Faça o primeiro hoje!</p>'}
        </div>
        <div class="bloco"><h3>Fotos: antes e depois</h3>
          <div class="fotos">
            ${['antes', 'depois'].map((k) => `<label class="foto">${fotos[k] ? `<img src="${fotos[k].img}" alt=""><em>${k === 'antes' ? 'Antes' : 'Depois'} · ${fmt(fotos[k].data)}</em>` : `${ic.cam}<span>Foto ${k === 'antes' ? 'de antes' : 'de depois'}</span>`}<input type="file" accept="image/*" data-foto="${k}" hidden></label>`).join('')}
          </div>
        </div>
      </div>`, { ativo: 'evolucao' });
    const num = (id) => { const v = document.getElementById(id).value.replace(',', '.'); return v === '' ? null : +v; };
    document.getElementById('salvar').addEventListener('click', () => {
      const peso = num('peso'), cintura = num('cint');
      if (peso == null && cintura == null) return toast('Preencha o peso ou a cintura.');
      if ((peso != null && (peso < 25 || peso > 350)) || (cintura != null && (cintura < 40 || cintura > 250))) return toast('Confira os números digitados.');
      const r = estado.registros(); r.push({ data: Date.now(), peso, cintura });
      estado.salvarRegistros(r); toast('Registro salvo! 💚'); evolucao();
    });
    app.querySelectorAll('[data-foto]').forEach((inp) => inp.addEventListener('change', async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try { const img = await reduzirFoto(f); const fs = estado.fotos(); fs[inp.dataset.foto] = { img, data: Date.now() }; if (!estado.salvarFotos(fs)) return toast('Sem espaço no aparelho para salvar a foto.'); evolucao(); }
      catch (e) { toast('Não foi possível abrir essa foto.'); }
    }));
  }

  // ---------- presentes ----------
  function presentes() {
    montar(`
      ${topo('Presentes', 'jornada')}
      <div class="pagina">
        <p class="texto" style="margin-bottom:6px">Seus bônus para baixar e usar quando quiser.</p>
        <p class="rotulo" style="margin:16px 0 10px;letter-spacing:.15em">PARA BAIXAR</p>
        ${T.presentes.map((p) => p.arquivo
          ? `<a class="card" href="${esc(p.arquivo)}" target="_blank" rel="noopener" download><span class="ic" style="background:linear-gradient(160deg,var(--dourado-claro),var(--dourado));color:var(--verde-900)">${ic.doc}</span><span><b>${esc(p.titulo)}</b><small>${esc(p.sub)}</small></span><span class="seta">${ic.baixar}</span></a>`
          : `<div class="card" style="opacity:.7"><span class="ic" style="background:#e7e5dc;color:#8a948e">${ic.doc}</span><span><b>${esc(p.titulo)}</b><small>${esc(p.sub)} · em breve</small></span></div>`).join('')}
      </div>`, { ativo: 'presentes' });
  }

  // ---------- premium ----------
  function premium() {
    const P = C.premium;
    montar(`
      ${topo(P.titulo, 'jornada')}
      <div class="pagina premium-topo">
        <div class="selo">${ic.zap.replace('width="22" height="22"', 'width="38" height="38"')}</div>
        <h2 class="titulo">${esc(P.titulo)}</h2>
        <p class="texto">${esc(P.chamada)}</p>
        ${P.vturbId && P.vturbScript ? `<div class="video"><vturb-smartplayer id="vid-${esc(P.vturbId)}" style="display:block;width:100%"></vturb-smartplayer></div>` : ''}
        <div style="text-align:left;margin-top:18px">
          <div class="card"><span class="ic">${ic.zap}</span><span><b>Tire dúvidas no WhatsApp</b><small>Acompanhamento próximo durante o protocolo</small></span></div>
          <div class="card"><span class="ic">${ic.mapa}</span><span><b>Protocolos para imprevistos</b><small>Festa, viagem, fim de semana, ansiedade</small></span></div>
          <div class="card"><span class="ic">${ic.grafico}</span><span><b>Revisão da sua evolução</b><small>Peso e medidas, semana a semana</small></span></div>
        </div>
        ${P.link ? `<div class="preco"><small>ACESSO COMPLETO</small><strong>${esc(P.preco)}</strong><span>pagamento único</span></div>
        <a class="btn btn-dourado" href="${esc(P.link)}" target="_blank" rel="noopener">${ic.zap} Quero o acompanhamento</a>` : `<div class="preco"><small>EM BREVE</small><strong style="font-size:26px">Novidade chegando</strong><span>Você será avisada aqui no app.</span></div>`}
      </div>`, { ativo: 'jornada' });
    if (P.vturbId && P.vturbScript && !document.querySelector('script[data-vturb]')) {
      const s = document.createElement('script'); s.src = P.vturbScript; s.async = true; s.dataset.vturb = '1'; document.head.appendChild(s);
    }
  }

  // ---------- conta ----------
  function conta() {
    montar(`
      ${topo('Minha conta', 'jornada')}
      <div class="pagina">
        <div class="bloco" style="text-align:center">
          <div class="selo" style="width:64px;height:64px">${ic.usuario}</div>
          <p style="font-weight:600;color:var(--verde-900)">${esc(email())}</p>
          <p class="texto" style="font-size:13px">Começou em ${new Date(estado.inicio()).toLocaleDateString('pt-BR')}</p>
        </div>
        ${C.whatsappSuporte ? `<a class="card" href="https://wa.me/${C.whatsappSuporte}?text=${encodeURIComponent('Olá! Preciso de ajuda com o Protocolo da Gordura no Fígado.')}" target="_blank" rel="noopener"><span class="ic">${ic.zap}</span><span><b>Suporte no WhatsApp</b><small>Fale com a nossa equipe</small></span><span class="seta">${ic.seta}</span></a>` : ''}
        <button class="card" id="sair"><span class="ic" style="background:#e7e5dc;color:var(--verde-900)">${ic.voltar}</span><span><b>Sair</b><small>Seu progresso continua salvo neste aparelho</small></span></button>
        <p class="vazio" style="font-size:12px">${esc(C.nomeApp)} · versão 1.0</p>
      </div>`, { ativo: 'conta' });
    document.getElementById('sair').addEventListener('click', () => { ls.del('pgf_email'); location.hash = ''; render(); });
  }

  // ---------- inicialização ----------
  render();
  // Ao abrir já logada, reconfere a compra no servidor (reembolso remove o acesso)
  if (email()) verificarAcesso(email()).then((r) => { if (r === 'sem_acesso') { ls.del('pgf_email'); telaLogin('Seu acesso não está ativo. Se acha que é um erro, fale com o suporte.'); } });
})();
