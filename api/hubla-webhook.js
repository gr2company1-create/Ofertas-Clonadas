// Recebe os webhooks da Hubla (v2) e libera/revoga o acesso ao app.
// URL: /api/hubla-webhook
// Autenticação: cabeçalho x-hubla-token igual a HUBLA_WEBHOOK_TOKEN.
// Eventos usados: customer.member_added (liberar) e customer.member_removed (revogar).
// Código igual ao da área de membros da Cigana, que já está em produção.
const A = require('./_lib/acessos');

const EVENTOS = {
  'customer.member_added': 'liberar',
  'customer.member_removed': 'revogar',
};

function lerCorpo(req) {
  let b = req.body;
  if (Buffer.isBuffer(b)) b = b.toString('utf8');
  if (typeof b === 'string') {
    try { return JSON.parse(b); } catch (_) { return null; }
  }
  return b && typeof b === 'object' ? b : null;
}

function cabecalho(req, nome) {
  const h = req.headers || {};
  const v = h[nome] !== undefined ? h[nome] : h[nome.toLowerCase()];
  return Array.isArray(v) ? v[0] : v;
}

function dataMs(iso) {
  const ms = Date.parse(String(iso || ''));
  return Number.isFinite(ms) ? ms : 0;
}

// Aplica o evento ao registro do cliente (função pura, testável).
function aplicarEventoHubla(registro, payload, acao, agora = Date.now()) {
  const ev = payload.event || {};
  const sub = ev.subscription || {};
  const prod = ev.product || {};
  const email = A.normalizarEmail(ev.user && ev.user.email);
  const reg = registro || { email, compras: {} };
  if (!reg.compras) reg.compras = {};

  const id = `hubla:${sub.id || prod.id}:${prod.id || ''}`;
  const novoStatus = acao === 'liberar' ? 'ativo' : 'revogado';
  const versao = Number.isFinite(Number(sub.version)) ? Number(sub.version) : 0;
  const quando = acao === 'liberar'
    ? (dataMs(sub.activatedAt) || dataMs(sub.modifiedAt))
    : (dataMs(sub.inactivatedAt) || dataMs(sub.modifiedAt));
  const atual = reg.compras[id];

  if (atual) {
    if (atual.status === novoStatus && (atual.versao || 0) >= versao) {
      return { registro: reg, mudou: false, motivo: 'duplicado' };
    }
    // Evento atrasado: uma versão mais antiga da assinatura não desfaz uma mais nova.
    if (versao && atual.versao && versao < atual.versao) {
      return { registro: reg, mudou: false, motivo: 'fora_de_ordem' };
    }
    if (!versao && quando && atual.evento_em && quando < atual.evento_em) {
      return { registro: reg, mudou: false, motivo: 'fora_de_ordem' };
    }
  }

  const historico = (atual && atual.historico) || [];
  historico.push({
    evento: payload.type,
    versao,
    em: new Date(quando || agora).toISOString(),
    recebido: new Date(agora).toISOString(),
  });

  reg.compras[id] = {
    origem: 'hubla',
    produto: prod.id || null,
    nome_produto: prod.name || null,
    assinatura: sub.id || null,
    tipo: sub.type || null,
    status: novoStatus,
    ultimo_evento: payload.type,
    versao,
    evento_em: quando || agora,
    historico: historico.slice(-20),
  };
  return { registro: reg, mudou: true, motivo: acao };
}

async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, erro: 'metodo' });

  const tokenEsperado = process.env.HUBLA_WEBHOOK_TOKEN;
  const tokenRecebido = cabecalho(req, 'x-hubla-token');
  if (tokenEsperado && !A.iguaisSeguro(tokenRecebido, tokenEsperado)) {
    console.warn('[hubla] token invalido');
    return res.status(401).json({ ok: false, erro: 'nao_autorizado' });
  }

  const payload = lerCorpo(req);
  if (!payload || !payload.type) return res.status(400).json({ ok: false, erro: 'corpo_invalido' });

  const ev = payload.event || {};
  const email = A.normalizarEmail(ev.user && ev.user.email);
  const acao = EVENTOS[payload.type] || 'ignorar';
  const idem = cabecalho(req, 'x-hubla-idempotency') || '-';
  const prod = (ev.product && ev.product.id) || '-';
  console.log(`[hubla] tipo=${payload.type} produto=${prod} acao=${acao} idem=${idem}`);

  if (!tokenEsperado) {
    // Modo de configuração: só confirma o recebimento até o token ser cadastrado na Vercel.
    return res.status(200).json({ ok: true, modo: 'configuracao', acao });
  }
  if (acao === 'ignorar') return res.status(200).json({ ok: true, acao });
  if (!email || !email.includes('@') || !(ev.subscription || ev.product)) {
    return res.status(200).json({ ok: true, acao: 'ignorar', motivo: 'dados_incompletos' });
  }

  for (let tentativa = 0; tentativa < 3; tentativa++) {
    try {
      const { registro, etag } = await A.lerRegistro(email);
      const r = aplicarEventoHubla(registro, payload, acao);
      if (r.mudou) await A.gravarRegistro(email, r.registro, etag);
      console.log(`[hubla] produto=${prod} resultado=${r.motivo} acesso=${A.temAcesso(r.registro)}`);
      return res.status(200).json({ ok: true, acao, resultado: r.motivo });
    } catch (e) {
      const conflito = /precondition|etag|412/i.test(String(e && (e.name + e.message)));
      if (conflito && tentativa < 2) continue;
      console.error('[hubla] erro ao gravar', e && e.name, e && e.message);
      return res.status(500).json({ ok: false, erro: 'falha_temporaria' }); // a Hubla reenvia
    }
  }
}

module.exports = handler;
module.exports.aplicarEventoHubla = aplicarEventoHubla;
