// Regras e armazenamento dos acessos do app do Protocolo da Gordura no Fígado.
// Os dados ficam num Vercel Blob PRIVADO (nunca acessível por URL pública).
// Baseado no código que já roda na área de membros da Cigana (area-de-membros-100).
const crypto = require('crypto');

function normalizarEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function chaveCliente(email) {
  const hash = crypto.createHash('sha256').update(normalizarEmail(email)).digest('hex');
  return `clientes/${hash}.json`;
}

function iguaisSeguro(a, b) {
  const x = Buffer.from(String(a || ''));
  const y = Buffer.from(String(b || ''));
  if (x.length === 0 || x.length !== y.length) return false;
  return crypto.timingSafeEqual(x, y);
}

function temAcesso(registro) {
  if (!registro || !registro.compras) return false;
  return Object.values(registro.compras).some((c) => c.status === 'ativo');
}

// E-mails da equipe liberados sem compra (variável EMAILS_EQUIPE na Vercel, separados por vírgula).
function ehEquipe(email) {
  const lista = String(process.env.EMAILS_EQUIPE || '')
    .split(',').map(normalizarEmail).filter(Boolean);
  return lista.includes(normalizarEmail(email));
}

// ---- Armazenamento (Vercel Blob privado) ----
async function lerRegistro(email) {
  const { get } = require('@vercel/blob');
  const r = await get(chaveCliente(email), { access: 'private', useCache: false });
  if (!r) return { registro: null, etag: null };
  const texto = await new Response(r.stream).text();
  return { registro: JSON.parse(texto), etag: r.blob && r.blob.etag };
}

async function gravarRegistro(email, registro, etag) {
  const { put } = require('@vercel/blob');
  const opts = {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  };
  if (etag) opts.ifMatch = etag;
  return put(chaveCliente(email), JSON.stringify(registro), opts);
}

module.exports = {
  normalizarEmail,
  chaveCliente,
  iguaisSeguro,
  temAcesso,
  ehEquipe,
  lerRegistro,
  gravarRegistro,
};
