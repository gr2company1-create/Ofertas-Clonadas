// =====================================================================
//  CONTEÚDO DO PROTOCOLO — RASCUNHO para revisar e adaptar
//  Cada dia: titulo, foco, tarefas (checklist), receita e dica.
// =====================================================================
window.CONTEUDO = {
  aviso:
    "Este protocolo traz orientações de alimentação e hábitos. Ele não substitui consulta, exames ou tratamento. " +
    "Não pare nem mude nenhum remédio por conta própria: fale antes com seu médico.",

  vitamina: {
    nome: "Vitamina de Abacate do Protocolo",
    ingredientes: [
      "2 colheres (sopa) cheias de abacate maduro",
      "200 ml de leite desnatado, bebida vegetal sem açúcar ou água gelada",
      "1 colher (sopa) de aveia em flocos",
      "1 pitada de canela",
      "Gelo a gosto (sem açúcar)"
    ],
    preparo: "Bata tudo no liquidificador por 1 minuto e tome logo em seguida, de preferência no café da manhã."
  },

  dias: [
    {
      titulo: "O primeiro passo",
      foco: "Hoje você começa a tirar do fígado o que mais pesa: açúcar e bebida doce.",
      tarefas: [
        "Tomar a Vitamina de Abacate no café da manhã",
        "Trocar refrigerante e suco de caixinha por água",
        "Beber pelo menos 6 copos de água ao longo do dia",
        "Caminhar 10 minutos depois do almoço ou do jantar"
      ],
      receita: {
        nome: "Prato base do almoço",
        ingredientes: ["Metade do prato com salada e legumes", "1 concha de feijão", "1 pedaço de frango, peixe ou ovos", "3 colheres de arroz (de preferência integral)"],
        preparo: "Monte sempre nessa ordem: primeiro os vegetais, depois a proteína e por último o arroz. Tempere com azeite, limão e ervas."
      },
      dica: "Não precisa ser perfeito. O que conta é repetir os passos todos os dias."
    },
    {
      titulo: "Água e fibras",
      foco: "Fibras ajudam a controlar o açúcar no sangue e a gordura que chega ao fígado.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Comer 1 fruta inteira (com casca, quando der) em vez de suco",
        "Incluir feijão, lentilha ou grão-de-bico em uma refeição",
        "Caminhar 10 minutos"
      ],
      receita: {
        nome: "Salada de grão-de-bico",
        ingredientes: ["1 xícara de grão-de-bico cozido", "Tomate e pepino picados", "Cebola roxa e salsinha", "Azeite e limão"],
        preparo: "Misture tudo e tempere na hora. Dura 2 dias na geladeira."
      },
      dica: "Deixe uma garrafa de água sempre à vista. Você vai beber mais sem perceber."
    },
    {
      titulo: "Gordura boa no lugar da ruim",
      foco: "Azeite, abacate, castanhas e peixe no lugar de fritura e embutidos.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Nada de fritura hoje: asse, grelhe ou cozinhe",
        "Trocar presunto, salsicha e mortadela por ovo ou frango desfiado",
        "Caminhar 15 minutos"
      ],
      receita: {
        nome: "Peixe assado com legumes",
        ingredientes: ["1 filé de tilápia ou sardinha", "Abobrinha, cenoura e cebola em rodelas", "Azeite, alho, limão e sal"],
        preparo: "Tempere o peixe, coloque sobre os legumes numa assadeira e leve ao forno a 200 °C por cerca de 25 minutos."
      },
      dica: "Um punhado pequeno de castanhas é um ótimo lanche, mas é calórico: um punhado por dia basta."
    },
    {
      titulo: "Menos farinha branca",
      foco: "Pão branco, bolacha e massa viram açúcar rápido. Hoje a gente diminui.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Trocar o pão branco por ovos, tapioca pequena ou pão integral",
        "Lanche da tarde: fruta + iogurte natural",
        "Caminhar 15 minutos"
      ],
      receita: {
        nome: "Omelete de forno",
        ingredientes: ["3 ovos", "Espinafre ou couve picada", "Tomate", "Sal, pimenta e orégano"],
        preparo: "Bata os ovos, misture os vegetais e asse em forma untada com azeite por 15 minutos."
      },
      dica: "Leia o rótulo: se açúcar ou farinha de trigo aparecem entre os primeiros ingredientes, deixe na prateleira."
    },
    {
      titulo: "O jantar que descansa o fígado",
      foco: "Jantar leve e mais cedo ajuda a noite a ser de recuperação.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Jantar até 2 horas antes de dormir",
        "Jantar com sopa ou prato de legumes + proteína",
        "Caminhar 15 minutos"
      ],
      receita: {
        nome: "Sopa verde",
        ingredientes: ["1 abobrinha", "1 chuchu", "1 punhado de couve ou espinafre", "1 cebola e 1 dente de alho", "Frango desfiado (opcional)"],
        preparo: "Refogue cebola e alho no azeite, junte os legumes e água até cobrir. Cozinhe 20 minutos e bata no liquidificador."
      },
      dica: "Dormir bem também conta: tente dormir sempre no mesmo horário."
    },
    {
      titulo: "Movimento todo dia",
      foco: "Movimentar o corpo ajuda a reduzir a gordura do fígado, mesmo sem perder muito peso.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Caminhar 20 minutos (pode dividir em 2 de 10)",
        "Subir escada ou estacionar mais longe uma vez hoje",
        "Registrar como você está se sentindo em Minha evolução"
      ],
      receita: {
        nome: "Frango com legumes na panela",
        ingredientes: ["Peito de frango em cubos", "Brócolis, cenoura e vagem", "Alho, cebola, cúrcuma e azeite"],
        preparo: "Doure o frango no azeite com alho e cebola, junte os legumes e um pouco de água e cozinhe com tampa por 10 minutos."
      },
      dica: "Se tiver alguma limitação, pergunte ao seu médico qual atividade é melhor para você."
    },
    {
      titulo: "Fim da primeira semana",
      foco: "Hora de olhar o que já mudou e se pesar.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Se pesar e medir a cintura (anote em Minha evolução)",
        "Planejar as compras da semana com a Lista de compras",
        "Caminhar 20 minutos"
      ],
      receita: {
        nome: "Marmitas da semana",
        ingredientes: ["Feijão cozido", "Frango desfiado ou carne moída magra", "Legumes assados", "Arroz integral"],
        preparo: "Cozinhe tudo no domingo e monte 4 a 5 marmitas. Congele as que não forem usadas em 3 dias."
      },
      dica: "Perder de 5% a 10% do peso, aos poucos, já faz diferença grande para o fígado. Sem pressa e sem dieta radical."
    },
    {
      titulo: "Bebida alcoólica e fígado",
      foco: "Álcool é uma das coisas que mais sobrecarregam o fígado.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Zero bebida alcoólica durante o protocolo",
        "Ter à mão uma alternativa: água com gás, limão e hortelã",
        "Caminhar 20 minutos"
      ],
      receita: {
        nome: "Água saborizada",
        ingredientes: ["1 litro de água (com ou sem gás)", "Rodelas de limão ou laranja", "Folhas de hortelã", "Gengibre em fatias (opcional)"],
        preparo: "Misture tudo numa jarra e deixe na geladeira por 1 hora."
      },
      dica: "Em festas, segure um copo de água com gás e limão. Ninguém pergunta nada."
    },
    {
      titulo: "Café e chás",
      foco: "O café sem açúcar pode fazer parte da rotina. Chá também.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Tomar o café sem açúcar (ou com pouquíssimo)",
        "Trocar um lanche doce por chá + castanhas",
        "Caminhar 20 minutos"
      ],
      receita: {
        nome: "Chá de gengibre com canela",
        ingredientes: ["500 ml de água", "3 fatias de gengibre", "1 pau de canela", "Rodela de limão"],
        preparo: "Ferva a água com o gengibre e a canela por 5 minutos, desligue e junte o limão."
      },
      dica: "Quem tem pressão alta, gastrite ou usa remédio contínuo deve confirmar com o médico a quantidade de café e chás."
    },
    {
      titulo: "Ultraprocessados fora",
      foco: "Salgadinho, biscoito recheado, macarrão instantâneo e refeição pronta ficam de fora.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Tirar da despensa 1 ultraprocessado e trocar por uma opção natural",
        "Fazer pelo menos 2 refeições em casa",
        "Caminhar 25 minutos"
      ],
      receita: {
        nome: "Pipoca de panela",
        ingredientes: ["3 colheres (sopa) de milho de pipoca", "1 colher (chá) de azeite", "Sal e cúrcuma a gosto"],
        preparo: "Estoure na panela com o azeite, tampada. Tempere com uma pitada de sal e cúrcuma."
      },
      dica: "Regra simples: quanto menos ingredientes no rótulo, melhor."
    },
    {
      titulo: "Fome emocional",
      foco: "Às vezes a fome é de descanso, de carinho ou de pausa. Vamos reconhecer.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Antes de beliscar, beber um copo de água e esperar 10 minutos",
        "Fazer 3 respirações profundas quando bater a vontade",
        "Caminhar 25 minutos"
      ],
      receita: {
        nome: "Iogurte com fruta e aveia",
        ingredientes: ["1 pote de iogurte natural", "1/2 banana ou morangos", "1 colher de aveia", "Canela"],
        preparo: "Misture tudo numa tigela. Serve como sobremesa ou lanche."
      },
      dica: "Um deslize não estraga o protocolo. Só volte no próximo passo."
    },
    {
      titulo: "Fim de semana sem sair do trilho",
      foco: "Dá para aproveitar sem desfazer o que você conquistou.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Em churrasco ou almoço fora: salada primeiro, depois a proteína",
        "Sobremesa: escolher uma, porção pequena, sem repetir",
        "Caminhar 25 minutos"
      ],
      receita: {
        nome: "Espetinho de frango e legumes",
        ingredientes: ["Cubos de frango", "Pimentão, cebola e tomate-cereja", "Limão, alho e páprica"],
        preparo: "Tempere, monte nos espetos e leve à grelha ou ao forno até dourar."
      },
      dica: "Coma devagar e largue o garfo entre as garfadas. A saciedade chega em uns 20 minutos."
    },
    {
      titulo: "Seu novo jeito de comer",
      foco: "O que você fez nesses dias pode virar rotina para sempre.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Escrever os 3 hábitos que você quer manter",
        "Preparar as compras da próxima semana",
        "Caminhar 30 minutos"
      ],
      receita: {
        nome: "Escondidinho de abóbora",
        ingredientes: ["Purê de abóbora cabotiá", "Frango desfiado com tomate e cebola", "Um pouco de queijo branco"],
        preparo: "Faça camadas de frango e purê numa travessa, cubra com queijo e leve ao forno por 15 minutos."
      },
      dica: "Repetir as receitas que você mais gostou é ótimo. Facilita a semana."
    },
    {
      titulo: "Você concluiu o protocolo",
      foco: "Parabéns! Hora de registrar seus resultados e seguir.",
      tarefas: [
        "Vitamina de Abacate no café da manhã",
        "Se pesar, medir a cintura e tirar a foto final em Minha evolução",
        "Comparar com o Dia 1",
        "Marcar consulta para repetir seus exames com o médico"
      ],
      receita: {
        nome: "Salada completa de comemoração",
        ingredientes: ["Folhas variadas", "Abacate em cubos", "Grão-de-bico ou frango", "Tomate, pepino e sementes", "Azeite e limão"],
        preparo: "Monte num prato grande e capriche nas cores."
      },
      dica: "Os exames com o médico são a melhor forma de ver como seu fígado está respondendo."
    }
  ],

  listaCompras: [
    { grupo: "Hortifrúti", itens: ["Abacate", "Limão", "Banana", "Frutas da estação", "Folhas (alface, rúcula, couve, espinafre)", "Tomate", "Pepino", "Abobrinha", "Chuchu", "Cenoura", "Brócolis", "Abóbora cabotiá", "Cebola e alho", "Gengibre", "Hortelã e salsinha"] },
    { grupo: "Proteínas", itens: ["Ovos", "Peito de frango", "Peixe (tilápia ou sardinha)", "Carne moída magra", "Iogurte natural", "Queijo branco"] },
    { grupo: "Grãos e cereais", itens: ["Feijão", "Grão-de-bico", "Lentilha", "Aveia em flocos", "Arroz integral", "Milho de pipoca"] },
    { grupo: "Despensa", itens: ["Azeite de oliva", "Castanhas", "Canela em pó e em pau", "Cúrcuma", "Orégano e páprica", "Chás (camomila, hortelã)", "Café"] },
    { grupo: "Bebidas", itens: ["Água com gás (para trocar o refrigerante)", "Leite desnatado ou bebida vegetal sem açúcar"] }
  ],

  // Bônus. Quando tiver o arquivo, coloque o PDF na pasta /presentes e preencha "arquivo".
  presentes: [
    { titulo: "Chás para o Fígado", sub: "Receitas para o dia a dia", arquivo: "" },
    { titulo: "20 Sucos Verdes", sub: "Práticos e sem açúcar", arquivo: "" },
    { titulo: "Cardápio de 7 dias", sub: "Pra copiar e seguir", arquivo: "" },
    { titulo: "Sobremesas sem açúcar", sub: "Doce sem culpa", arquivo: "" },
    { titulo: "Guia do Rótulo", sub: "Como escolher no mercado", arquivo: "" }
  ]
};
