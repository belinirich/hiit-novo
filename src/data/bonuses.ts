import { BonusMeta } from '../types';

export const BONUSES_LIST: BonusMeta[] = [
  {
    id: 'alimentacao',
    numberLabel: 'BÔNUS 01',
    title: 'Guia de Alimentação Equilibrada',
    subtitle: 'Alimentação real, prática e sem dietas restritivas para acompanhar seus treinos',
    description: 'Aprenda como nutrir o seu corpo para ter energia nos treinos HIIT e acelerar a recuperação muscular com princípios descomplicados, lista de compras inteligente e 20 sugestões completas de refeições.',
    readTime: '15 min de leitura · 20 receitas práticas',
    category: 'Nutrição & Energia',
    features: [
      'Princípios da alimentação sustentável',
      'Cálculo e estratégia de hidratação diária',
      'Lista de compras semanal organizada',
      '20 receitas com ingredientes e modo de preparo',
      'Dicas para evitar a fome emocional'
    ]
  },
  {
    id: 'planner',
    numberLabel: 'BÔNUS 02',
    title: 'Planner Digital de 21 Dias',
    subtitle: 'Rastreador preenchível no navegador com versão para impressão em folha A4',
    description: 'Transforme sua intenção em rotina sólida. Defina suas metas para cada uma das 3 semanas, registre seus hábitos essenciais dia após dia e anote suas percepções até a conquista final.',
    readTime: 'Interativo · Salvamento automático · Pronto para imprimir em A4',
    category: 'Organização & Foco',
    features: [
      'Metas semanais personalizáveis',
      'Rastreador de hábitos: água, sono, treino e comida',
      'Checklist diário dos 21 dias',
      'Diário de notas e percepções',
      'Layout de impressão em folha A4 limpa'
    ]
  },
  {
    id: 'alongamentos',
    numberLabel: 'BÔNUS 03',
    title: 'Guia de Alongamentos & Mobilidade',
    subtitle: 'Manual postural com 8 sequências essenciais para aliviar tensões e prevenir dores',
    description: 'A flexibilidade e a mobilidade articular são os alicerces para agachar melhor, evitar lesões nos joelhos e aliviar o cansaço na lombar após dias longos de trabalho.',
    readTime: '10 min de leitura · 8 posturas guiadas',
    category: 'Recuperação & Postura',
    features: [
      '8 posturas com passo a passo claro',
      'Tempo recomendado para cada movimento',
      'Cuidados posturais indispensáveis',
      'Erros comuns e como corrigi-los',
      'Rotina ideal para dias de recuperação ativa'
    ]
  },
  {
    id: 'consistencia',
    numberLabel: 'BÔNUS 04',
    title: 'Guia de Consistência & Hábitos Duradouros',
    subtitle: 'Como manter o foco e treinar mesmo naqueles dias em que a motivação desaparecer',
    description: 'A motivação é passageira; os sistemas de hábitos são duradouros. Descubra a ciência comportamental aplicada ao treino em casa com o protocolo de retomada rápida após faltar um dia.',
    readTime: '12 min de leitura · Checklists práticos',
    category: 'Mentalidade & Disciplina',
    features: [
      'A regra dos 2 minutos aplicada ao HIIT',
      'O segredo do ambiente preparado',
      'Metas de processo vs frustração de balança',
      'Protocolo Retomada: o que fazer se falhar',
      'Checklist diário de atitudes vencedoras'
    ]
  }
];

// Dados completos do Guia de Alimentação
export interface Recipe {
  id: string;
  name: string;
  category: 'Café da Manhã' | 'Almoço' | 'Lanche Prático' | 'Jantar Leve';
  prepTime: string;
  ingredients: string[];
  instructions: string[];
  tip: string;
}

export const RECIPES_DATA: Recipe[] = [
  // Cafés da manhã
  {
    id: 'rec-01',
    name: 'Omelete Cremosa com Tomate e Ervas',
    category: 'Café da Manhã',
    prepTime: '7 min',
    ingredients: [
      '2 ovos inteiros',
      '1 colher (sopa) de água gelada (dá maciez)',
      '1/2 tomate picado sem sementes',
      'Orégano, manjericão e pitada de sal',
      'Fio de azeite de oliva para untar a frigideira'
    ],
    instructions: [
      'Bata os ovos com a água, sal e ervas usando um garfo por 30 segundos.',
      'Aqueça a frigideira antiaderente em fogo médio com o fio de azeite.',
      'Despeje os ovos, adicione os cubos de tomate por cima e abaixe o fogo.',
      'Dobre a omelete ao meio quando a borda estiver firme e o centro ainda cremoso.'
    ],
    tip: 'A água gelada vaporiza na frigideira deixando a omelete muito mais leve e fofinha.'
  },
  {
    id: 'rec-02',
    name: 'Panqueca de Banana com Canela de 3 Ingredientes',
    category: 'Café da Manhã',
    prepTime: '8 min',
    ingredients: [
      '1 banana madura média',
      '2 ovos',
      '2 colheres (sopa) de farelo de aveia',
      'Canela em pó a gosto'
    ],
    instructions: [
      'Amasse bem a banana com o garfo em um prato fundo.',
      'Misture os ovos e o farelo de aveia até virar uma massa homogênea.',
      'Coloque pequenas porções na frigideira morna e vire quando dourar (cerca de 2 min de cada lado).',
      'Finalize polvilhando canela em pó.'
    ],
    tip: 'Excelente opção pré ou pós-treino pela combinação de carboidrato de média absorção e proteína.'
  },
  {
    id: 'rec-03',
    name: 'Vitamina Energética com Cacau e Aveia',
    category: 'Café da Manhã',
    prepTime: '5 min',
    ingredients: [
      '200ml de leite desnatado ou bebida vegetal de amêndoas',
      '1 banana congelada fatiada',
      '1 colher (sopa) rasa de cacau em pó 100%',
      '1 colher (sopa) de sementes de chia ou linhaça dourada'
    ],
    instructions: [
      'Coloque todos os ingredientes no liquidificador.',
      'Bata em velocidade alta por cerca de 1 minuto até ficar cremosa.',
      'Consuma imediatamente para aproveitar as fibras.'
    ],
    tip: 'O cacau é rico em flavonoides antioxidantes que auxiliam na oxigenação muscular.'
  },
  {
    id: 'rec-04',
    name: 'Creme de Iogurte com Frutas Vermelhas e Sementes',
    category: 'Café da Manhã',
    prepTime: '4 min',
    ingredients: [
      '1 pote (170g) de iogurte natural desnatado ou grego tradicional',
      '1 xícara pequena de morangos picados',
      '1 colher (sobremesa) de sementes de abóbora ou girassol tostadas',
      '1 colher (chá) de mel puro (opcional)'
    ],
    instructions: [
      'Disponha o iogurte em uma tigela funda.',
      'Distribua as frutas vermelhas fatiadas por cima.',
      'Polvilhe as sementes tostadas para adicionar crocância e gorduras benéficas.'
    ],
    tip: 'As sementes fornecem magnésio e zinco, minerais essenciais para quem faz treinos de alta intensidade.'
  },
  {
    id: 'rec-05',
    name: 'Tostada de Pão Integral com Abacate e Ovo Pochê',
    category: 'Café da Manhã',
    prepTime: '9 min',
    ingredients: [
      '1 fatia de pão 100% integral tostada',
      '1/4 de abacate maduro amassado com gotas de limão e sal',
      '1 ovo cozido ou frito na água com gema mole',
      'Pimenta-do-reino e gergelim tostado'
    ],
    instructions: [
      'Toste o pão até ficar dourado e crocante.',
      'Espalhe o creme de abacate temperado sobre a fatia.',
      'Acomode o ovo por cima e quebre a gema levemente.',
      'Tempere com pimenta-do-reino e sementes de gergelim.'
    ],
    tip: 'Gorduras monoinsaturadas do abacate fornecem saciedade prolongada por 4 a 5 horas.'
  },

  // Almoços
  {
    id: 'rec-06',
    name: 'Frango Dourado com Cúrcuma, Arroz Integral e Brócolis',
    category: 'Almoço',
    prepTime: '20 min',
    ingredients: [
      '1 filé médio (150g) de peito de frango em tiras',
      '1 colher (café) de cúrcuma (açafrão-da-terra) e alho amassado',
      '3 colheres (sopa) cheias de arroz integral cozido',
      '1 xícara de floretes de brócolis cozidos no vapor com azeite'
    ],
    instructions: [
      'Tempere as tiras de frango com limão, alho, cúrcuma e pitada de sal marinho.',
      'Doure o frango em frigideira quente com algumas gotas de azeite.',
      'Monte o prato dividindo visualmente: 1/4 proteína, 1/4 carboidrato e 1/2 vegetais verdes.'
    ],
    tip: 'A cúrcuma tem ação anti-inflamatória que auxilia no alívio de dores musculares tardias.'
  },
  {
    id: 'rec-07',
    name: 'Bowl Mediterrâneo de Quinoa com Atum e Folhas',
    category: 'Almoço',
    prepTime: '12 min',
    ingredients: [
      '1 lata de atum sólido em água ou azeite escorrido',
      '4 colheres (sopa) de quinoa cozida',
      'Mix de rúcula, alface e tomates-cereja',
      '1/2 pepino japonês em rodelas finas',
      'Molho: suco de 1/2 limão, 1 colher (chá) de azeite e orégano'
    ],
    instructions: [
      'Forre uma tigela larga com as folhas verdes higienizadas.',
      'Adicione a quinoa em um dos lados e o atum desfiado no outro.',
      'Complete com pepino e tomates.',
      'Regue com o molho de limão e azeite logo antes de comer.'
    ],
    tip: 'Refeição super rápida, perfeita para dias corridos sem tempo de cozinhar no fogão.'
  },
  {
    id: 'rec-08',
    name: 'Patinho Moído Refogado com Abobrinha e Purê de Mandioquinha',
    category: 'Almoço',
    prepTime: '22 min',
    ingredients: [
      '140g de carne moída magra (patinho)',
      '1/2 abobrinha cortada em cubos pequenos',
      '1 cebola pequena ralada e 1 dente de alho',
      '1 xícara de purê de mandioquinha (batata-baroa) feito com água e azeite'
    ],
    instructions: [
      'Refogue a cebola e o alho até dourar levemente.',
      'Acrescente a carne moída e desfaça os pedaços com a colher.',
      'Quando a carne perder a cor vermelha, junte a abobrinha e tampe a panela por 5 min.',
      'Sirva ao lado do purê quente de mandioquinha.'
    ],
    tip: 'O patinho é fonte de ferro heme e creatina natural, auxiliando na força e fôlego muscular.'
  },
  {
    id: 'rec-09',
    name: 'Salmão ou Tilápia Grelhada com Batata-Doce Rústica',
    category: 'Almoço',
    prepTime: '20 min',
    ingredients: [
      '1 filé de peixe branco ou salmão (150g)',
      '1 batata-doce média cortada em rodelas com casca',
      'Alecrim fresco, sal e azeite de oliva',
      'Salada de folhas verdes à vontade'
    ],
    instructions: [
      'Cozinhe as rodelas de batata-doce em água fervente por 5 minutos e doure na frigideira com alecrim.',
      'Grelhe o filé de peixe com gotas de limão por 3 minutos de cada lado.',
      'Acompanhe com salada de folhas frescas temperadas.'
    ],
    tip: 'O peixe fornece proteínas de digestão leve que não provocam sensação de estômago pesado.'
  },
  {
    id: 'rec-10',
    name: 'Lentilha Aconchegante com Cenoura e Ovos Cozidos',
    category: 'Almoço',
    prepTime: '25 min',
    ingredients: [
      '1 concha cheia de lentilha cozida temperada com louro e cominho',
      '1 cenoura média em cubos cozida com a lentilha',
      '2 ovos cozidos com gema no ponto médio',
      'Prato de salada de rúcula fresca'
    ],
    instructions: [
      'Aqueça a lentilha já cozida com os cubos de cenoura.',
      'Corte os ovos cozidos ao meio e acomode sobre o prato.',
      'Finalize com salsinha picada fresca.'
    ],
    tip: 'Opção excelente, nutritiva e rica em fibras prébioticas para o trânsito intestinal.'
  },

  // Lanches práticos
  {
    id: 'rec-11',
    name: 'Muffin de Caneca de Maçã e Aveia',
    category: 'Lanche Prático',
    prepTime: '4 min',
    ingredients: [
      '1 ovo',
      '1/2 maçã ralada',
      '2 colheres (sopa) de aveia em flocos finos',
      '1 colher (café) de fermento em pó e canela a gosto'
    ],
    instructions: [
      'Misture todos os ingredientes dentro de uma caneca cerâmica com um garfo.',
      'Leve ao micro-ondas por 2 minutos e 15 segundos.',
      'Desenforme no prato ou consuma direto na caneca ainda morno.'
    ],
    tip: 'Mata a vontade de doce no meio da tarde sem adicionar açúcar refinado.'
  },
  {
    id: 'rec-12',
    name: 'Mix Inteligente de Castanhas e Uvas-Passas',
    category: 'Lanche Prático',
    prepTime: '1 min',
    ingredients: [
      '3 castanhas-do-pará (selênio diário garantido)',
      '6 castanhas-de-caju sem sal',
      '1 colher (sopa) de uvas-passas escuras ou damasco picado'
    ],
    instructions: [
      'Misture as castanhas em um potinho portátil.',
      'Consuma acompanhado de um copo d\'água fresca.'
    ],
    tip: 'Duas castanhas-do-pará por dia cobrem 100% da necessidade de selênio da tireoide.'
  },
  {
    id: 'rec-13',
    name: 'Rolinho de Peito de Peru com Cenoura e Ricota',
    category: 'Lanche Prático',
    prepTime: '5 min',
    ingredients: [
      '2 fatias de peito de peru ou frango desfiado',
      '2 colheres (sopa) de creme de ricota leve',
      'Tiras finas de cenoura crua e pepino'
    ],
    instructions: [
      'Espalhe o creme de ricota sobre cada fatia.',
      'Coloque os palitos crocantes de cenoura e pepino no centro.',
      'Enrole firmemente como se fosse um sushi e sirva.'
    ],
    tip: 'Lanche com teor quase nulo de carboidrato e muita crocância natural.'
  },
  {
    id: 'rec-14',
    name: 'Banana Amassada com Pasta de Amendoim Integral',
    category: 'Lanche Prático',
    prepTime: '3 min',
    ingredients: [
      '1 banana nanica ou prata madura',
      '1 colher (sobremesa) cheia de pasta de amendoim 100% integral',
      'Canela ou cacau salpicado'
    ],
    instructions: [
      'Corte a banana em rodelas ou amasse.',
      'Aqueça por 20 segundos no micro-ondas para soltar o aroma doce natural.',
      'Coloque a pasta de amendoim por cima e misture.'
    ],
    tip: 'Ótimo pré-treino 40 minutos antes da sua aula HIIT favorita.'
  },
  {
    id: 'rec-15',
    name: 'Pão de Queijo de Frigideira com Tapioca e Ovo',
    category: 'Lanche Prático',
    prepTime: '6 min',
    ingredients: [
      '1 ovo',
      '2 colheres (sopa) de goma de tapioca hidratada',
      '1 colher (sopa) de queijo parmesão ou muçarela ralada',
      'Pitada de orégano e sal'
    ],
    instructions: [
      'Bata tudo com um garfo até formar uma massa líquida uniforme.',
      'Despeje na frigideira antiaderente morna.',
      'Vire quando desgrudar do fundo e doure o outro lado por 1 minuto.'
    ],
    tip: 'Textura elástica deliciosa e rica em sabor de queijo verdadeiro.'
  },

  // Jantares leves
  {
    id: 'rec-16',
    name: 'Sopa Creme Termogênica de Abóbora com Gengibre',
    category: 'Jantar Leve',
    prepTime: '20 min',
    ingredients: [
      '2 xícaras de abóbora cabotiá cozida sem casca',
      '1 pedaço pequeno (1cm) de gengibre fresco ralado',
      '1/2 cebola e 1 dente de alho refogados em azeite',
      'Frango desfiado (100g) para adicionar proteína'
    ],
    instructions: [
      'Bata a abóbora cozida com a água do cozimento, cebola, alho e o gengibre no liquidificador.',
      'Volte à panela para aquecer até borbulhar suavemente.',
      'Acrescente o frango desfiado por cima na hora de servir.'
    ],
    tip: 'O gengibre aquece o corpo e acelera levemente o gasto calórico sem atrapalhar o sono.'
  },
  {
    id: 'rec-17',
    name: 'Crepioca Recheada com Queijo Branco e Tomate Seco',
    category: 'Jantar Leve',
    prepTime: '8 min',
    ingredients: [
      '1 ovo',
      '1 colher (sopa) cheia de tapioca',
      '2 fatias de queijo minas frescal ou ricota temperada',
      'Folhas de manjericão fresco'
    ],
    instructions: [
      'Misture o ovo e a tapioca e doure na frigideira dos dois lados.',
      'Coloque o queijo branco e o manjericão em uma das metades.',
      'Dobre e deixe o queijo amolecer levemente em fogo baixo.'
    ],
    tip: 'Jantar leve com digestão completa em menos de 1 hora e meia.'
  },
  {
    id: 'rec-18',
    name: 'Salada Morna de Grão-de-Bico com Legumes Tostados',
    category: 'Jantar Leve',
    prepTime: '15 min',
    ingredients: [
      '1 xícara de grão-de-bico já cozido',
      '1/2 abobrinha e 1/2 pimentão amarelo em tiras',
      'Azeite, páprica doce e orégano'
    ],
    instructions: [
      'Salteie os legumes e o grão-de-bico em uma frigideira funda com azeite e páprica por 8 min.',
      'Sirva morno sobre uma cama de folhas verdes.',
      'Tempere com gotas de limão fresco.'
    ],
    tip: 'O grão-de-bico contém triptofano, aminoácido precursor da serotonina e da melatonina.'
  },
  {
    id: 'rec-19',
    name: 'Ovos Mexidos Cremosos com Espinafre e Torrada',
    category: 'Jantar Leve',
    prepTime: '6 min',
    ingredients: [
      '2 ovos caipiras',
      '1 xícara de folhas de espinafre cruas',
      '1 colher (chá) de manteiga ou azeite',
      '1 fatia fina de pão artesanal ou integral'
    ],
    instructions: [
      'Murchar o espinafre na frigideira com o azeite por 1 minuto.',
      'Adicionar os ovos batidos e mexer suavemente em fogo bem baixo.',
      'Desligue o fogo antes que os ovos sequem totalmente para manter a cremosidade.'
    ],
    tip: 'O espinafre é rico em nitratos naturais que facilitam a circulação sanguínea muscular.'
  },
  {
    id: 'rec-20',
    name: 'Wrap de Folha de Alface com Frango Desfiado e Molho Iogurte',
    category: 'Jantar Leve',
    prepTime: '8 min',
    ingredients: [
      '3 folhas grandes de alface americana ou romana crocante',
      '120g de peito de frango cozido e desfiado',
      '2 colheres (sopa) de iogurte natural misturado com limão e hortelã',
      'Cenoura ralada'
    ],
    instructions: [
      'Lave e seque bem as folhas de alface.',
      'Acomode o frango desfiado e a cenoura ralada no centro de cada folha.',
      'Regue com o molho leve de iogurte e hortelã e enrole como um taco.'
    ],
    tip: 'Zero sensação de peso abdominal para garantir uma noite de sono revigorante.'
  }
];

// Dados completos do Guia de Alongamentos & Mobilidade
export interface StretchMovement {
  id: string;
  name: string;
  targetArea: string;
  suggestedDuration: string;
  stepByStep: string[];
  postureAttention: string;
  commonMistakes: string[];
}

export const STRETCH_MOVEMENTS: StretchMovement[] = [
  {
    id: 'stretch-01',
    name: 'Alongamento de Isquiotibiais (Posterior de Coxa)',
    targetArea: 'Posterior da coxa e parte de trás do joelho',
    suggestedDuration: '30 a 45 segundos por perna',
    stepByStep: [
      'Fique em pé com os pés na largura do quadril.',
      'Dê um passo curto à frente com a perna direita e apoie apenas o calcanhar no chão, mantendo a ponta do pé voltada para o teto.',
      'Flexione levemente o joelho da perna esquerda e projete o quadril para trás, inclinando o tronco reto à frente.',
      'Apoie as mãos sobre a coxa esquerda (nunca sobre o joelho direito).',
      'Sinta o alongamento confortável na parte de trás da coxa direita e respire fundo.'
    ],
    postureAttention: 'Mantenha a coluna lombar reta e peito aberto. Não curve as costas para tentar encostar na ponta do pé.',
    commonMistakes: [
      'Curvar as costas em excesso para alcançar o pé, perdendo a tensão na perna.',
      'Pressionar as mãos diretamente sobre a patela do joelho estendido.',
      'Prender o ar durante o tempo de sustentação.'
    ]
  },
  {
    id: 'stretch-02',
    name: 'Alongamento de Quadríceps em Pé',
    targetArea: 'Parte anterior da coxa e flexores do quadril',
    suggestedDuration: '30 a 40 segundos por lado',
    stepByStep: [
      'Fique em pé próximo a uma parede ou cadeira para apoio de equilíbrio.',
      'Dobre o joelho direito levando o calcanhar em direção ao glúteo.',
      'Segure o tornozelo ou o peito do pé direito com a mão do mesmo lado.',
      'Mantenha os dois joelhos alinhados lado a lado e empurre a pelve levemente para a frente.',
      'Sinta a parte da frente da coxa se alongar sem arquear a coluna.'
    ],
    postureAttention: 'Evite afastar o joelho para o lado. Os dois joelhos devem permanecer próximos e paralelos.',
    commonMistakes: [
      'Projetar a lombar para frente criando hiperlordose.',
      'Puxar o pé com força excessiva comprimindo a articulação do joelho.',
      'Inclinar o tronco para a frente perdendo o foco no quadríceps.'
    ]
  },
  {
    id: 'stretch-03',
    name: 'Postura da Criança com Soltura de Ombros',
    targetArea: 'Lombar, grande dorsal, ombros e glúteos',
    suggestedDuration: '45 a 60 segundos com respiração profunda',
    stepByStep: [
      'Ajoelhe-se no colchonete ou tapete com os joelhos afastados na largura do quadril e os dedões dos pés se tocando atrás.',
      'Sente-se sobre os calcanhares e caminhe com as mãos para a frente no chão.',
      'Abaixe o peito em direção ao solo e apoie a testa suavemente no colchonete.',
      'Estenda os braços à frente sentindo as costas e as costelas se expandirem a cada respiração.'
    ],
    postureAttention: 'Relaxe o pescoço e a mandíbula por completo. Deixe o peso da gravidade afundar o peito suavemente.',
    commonMistakes: [
      'Tensionar os ombros em direção às orelhas em vez de relaxá-los.',
      'Levantar o quadril dos calcanhares de forma abrupta.',
      'Fazer respiração curta e superficial.'
    ]
  },
  {
    id: 'stretch-04',
    name: 'Abertura de Peitoral e Ombros no Batente ou Parede',
    targetArea: 'Peitoral maior, deltoide anterior e peitoral menor',
    suggestedDuration: '30 segundos por lado',
    stepByStep: [
      'Fique de pé ao lado de um batente de porta ou quina de parede.',
      'Apoie o antebraço direito e a palma da mão na parede, com o cotovelo dobrado em 90 graus na altura do ombro.',
      'Dê um passo suave à frente com a perna direita e gire o tronco lentamente para o lado esquerdo.',
      'Sinta a abertura confortável e o alívio na musculatura do peito.'
    ],
    postureAttention: 'Mantenha o ombro abaixado, sem encolher o pescoço. O peitoral deve se abrir sem puxar o ombro para frente.',
    commonMistakes: [
      'Posicionar o cotovelo muito acima da linha dos ombros.',
      'Girar o tronco bruscamente dando trancos articulares.',
      'Perder a firmeza do core e arquear as costas.'
    ]
  },
  {
    id: 'stretch-05',
    name: 'Mobilidade de Quadril em Posição de Afundo Baixo (Lunge)',
    targetArea: 'Psoas, flexores profundos do quadril e virilha',
    suggestedDuration: '35 a 45 segundos por perna',
    stepByStep: [
      'Dê um passo largo à frente com a perna direita e apoie o joelho esquerdo no colchonete.',
      'Mantenha o joelho direito a 90 graus, alinhado exatamente sobre o tornozelo.',
      'Apoie as mãos sobre a coxa direita e projete o quadril suavemente para baixo e para a frente.',
      'Sinta a virilha e a parte superior da coxa esquerda se abrirem com suavidade.'
    ],
    postureAttention: 'Mantenha o tronco alto e ereto. Contraia suavemente o glúteo da perna de trás para aprofundar o alongamento.',
    commonMistakes: [
      'Deixar o joelho da frente ultrapassar excessivamente a linha da ponta do pé.',
      'Colapsar o peso sobre a patela traseira sem amortecimento no chão.',
      'Desalinhar os quadris girando a bacia para fora.'
    ]
  },
  {
    id: 'stretch-06',
    name: 'Alongamento Glúteo Figura 4 (Deitado no Solo)',
    targetArea: 'Glúteo médio, glúteo máximo e músculo piriforme',
    suggestedDuration: '40 segundos por lado',
    stepByStep: [
      'Deite-se de costas no colchonete com os joelhos dobrados e pés no chão.',
      'Cruze o tornozelo direito sobre o joelho esquerdo, formando o desenho do número 4.',
      'Passe as mãos por trás da coxa esquerda e puxe a perna em direção ao peito.',
      'Mantenha a cabeça e os ombros apoiados e relaxados no solo.',
      'Sinta o alívio profundo no centro do glúteo direito.'
    ],
    postureAttention: 'Mantenha a cabeça repousada no chão. Se o pescoço tensionar, coloque uma almofada baixa sob a nuca.',
    commonMistakes: [
      'Tirar a cabeça e os ombros do chão forçando a cervical.',
      'Torcer o pé dobrado para os lados em vez de manter o tornozelo firme.',
      'Puxar com força excessiva gerando desconforto na articulação coxofemoral.'
    ]
  },
  {
    id: 'stretch-07',
    name: 'Torção Suave de Coluna no Solo',
    targetArea: 'Mobilidade torácica, oblíquos e lombar',
    suggestedDuration: '30 a 45 segundos por lado',
    stepByStep: [
      'Deite-se de costas com os braços abertos em cruz na linha dos ombros.',
      'Dobre os joelhos a 90 graus e traga-os suavemente até o abdômen.',
      'Deixe os dois joelhos caírem juntos para o lado direito até tocarem o chão.',
      'Vire a cabeça suavemente para o lado esquerdo e feche os olhos respirando pelo abdômen.',
      'Sinta a rotação agradável e descompressiva ao longo de toda a coluna.'
    ],
    postureAttention: 'Procure manter os dois ombros em contato com o chão enquanto os joelhos descansam no lado oposto.',
    commonMistakes: [
      'Descolar o ombro oposto completamente do chão.',
      'Forçar a queda das pernas com movimento rápido.',
      'Respirar de forma tensa e curta.'
    ]
  },
  {
    id: 'stretch-08',
    name: 'Alongamento de Panturrilhas na Parede',
    targetArea: 'Gastrocnêmio, sóleo e tendão calcâneo (de Aquiles)',
    suggestedDuration: '30 segundos por perna',
    stepByStep: [
      'Fique de pé de frente para a parede a cerca de dois passos de distância.',
      'Apoie as palmas das mãos na parede na altura do peito.',
      'Dê um passo à frente com a perna direita (flexionada) e estenda a perna esquerda totalmente para trás.',
      'Pressione o calcanhar esquerdo firmemente contra o chão e incline o corpo ligeiramente para a frente.',
      'Sinta o alongamento preciso na panturrilha da perna traseira.'
    ],
    postureAttention: 'O calcanhar de trás precisa estar totalmente colado ao solo com a ponta do pé apontando para a frente.',
    commonMistakes: [
      'Virar a ponta do pé de trás para fora, perdendo a linha de tensão da panturrilha.',
      'Tirar o calcanhar do chão durante o movimento.',
      'Curvar as costas para a frente.'
    ]
  }
];
