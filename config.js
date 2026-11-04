// =====================================================================
//  CONFIGURAÇÕES DO APP — edite aqui sem mexer no resto do código
// =====================================================================
window.CONFIG = {
  nomeApp: "Protocolo da Gordura no Fígado",
  nomeCurto: "Protocolo",
  logo: "https://storage.funilix.com/users/78801bfc-f053-49e2-aac2-f72bd3de3e65/files/692e013c-aa69-46d9-a2dd-9c86a5b348dc.png",

  // Duração do protocolo (o funil promete 14 dias)
  totalDias: 14,

  // WhatsApp de suporte (só números, com DDI 55). Deixe "" para esconder.
  whatsappSuporte: "5517981925360",

  // Oferta que aparece no meio da Jornada (card dourado). Deixe link "" para esconder.
  ofertaJornada: {
    titulo: "Cardápio Turbo — 30 receitas",
    subtitulo: "Pra variar sem sair do protocolo",
    preco: "R$ 19,90",
    link: "" // ex.: https://pay.hub.la/XXXX
  },

  // Página "Acompanhamento no WhatsApp" (upsell premium). Deixe link "" para mostrar "em breve".
  premium: {
    titulo: "Acompanhamento no WhatsApp",
    chamada: "O protocolo te mostra o caminho. No acompanhamento, a gente trilha esse caminho com você.",
    preco: "R$ 67",
    link: "",
    // Vídeo vTurb opcional: cole aqui só o ID do player e o caminho do script
    vturbId: "",
    vturbScript: ""
  }
};
// E-mails da equipe liberados sem compra ficam na Vercel, na variável EMAILS_EQUIPE
// (separados por vírgula). Assim ninguém vê a lista pelo navegador.
