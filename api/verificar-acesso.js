// Usada pelo login: responde apenas se o e-mail tem acesso ativo.
const A = require('./_lib/acessos');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ acesso: false });
  const email = A.normalizarEmail((req.query && req.query.email) || (req.body && req.body.email));
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ acesso: false });
  if (A.ehEquipe(email)) return res.status(200).json({ acesso: true });
  try {
    const { registro } = await A.lerRegistro(email);
    return res.status(200).json({ acesso: A.temAcesso(registro) });
  } catch (e) {
    console.error('[acesso] erro', e && e.name, e && e.message);
    return res.status(503).json({ acesso: false, erro: 'indisponivel' });
  }
};
