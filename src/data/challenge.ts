import { ChallengeDay } from '../types';

export const CHALLENGE_DAYS: ChallengeDay[] = [
  // SEMANA 1: FASE DE ADAPTAÇÃO & DESPERTAR METABÓLICO
  {
    day: 1,
    week: 1,
    dayOfWeek: 'Segunda',
    title: 'Despertar Metabólico',
    type: 'treino',
    workoutId: 'hiit-01',
    focus: 'Adaptação Cardiovascular & Ativação',
    intensity: 'Leve',
    instruction: 'Bem-vinda ao seu primeiro dia! O objetivo hoje não é se esgotar, mas ensinar seu corpo a entrar no ritmo do HIIT. Foque na postura e na respiração.',
    tips: 'Beba 1 copo de água antes da aula e ajuste um espaço livre na sua sala.'
  },
  {
    day: 2,
    week: 1,
    dayOfWeek: 'Terça',
    title: 'Tonificação de Membros Inferiores',
    type: 'treino',
    workoutId: 'hiit-02',
    focus: 'Pernas, Glúteos e Estabilidade',
    intensity: 'Leve',
    instruction: 'Hoje ativaremos os grandes grupos musculares das pernas, que são os maiores consumidores de energia do corpo.',
    tips: 'Mantenha os calcanhares apoiados ao agachar.'
  },
  {
    day: 3,
    week: 1,
    dayOfWeek: 'Quarta',
    title: 'Cardio Suave & Coordenação',
    type: 'treino',
    workoutId: 'hiit-03',
    focus: 'Ritmo Constante & Oxigenação',
    intensity: 'Leve',
    instruction: 'Treino dinâmico para melhorar sua agilidade e manter o metabolismo acelerado sem impacto articular.',
    tips: 'Expire pela boca no momento de maior esforço.'
  },
  {
    day: 4,
    week: 1,
    dayOfWeek: 'Quinta',
    title: 'Ativação do Core e Postura',
    type: 'treino',
    workoutId: 'hiit-06',
    focus: 'Abdômen, Lombar e Equilíbrio',
    intensity: 'Moderada',
    instruction: 'Um centro de força firme protege sua coluna em todos os exercícios do programa. Faça com atenção aos alinhamentos.',
    tips: 'Imagine que você está puxando o umbigo suavemente em direção às costas.'
  },
  {
    day: 5,
    week: 1,
    dayOfWeek: 'Sexta',
    title: 'Circuito Queima de Fim de Semana',
    type: 'treino',
    workoutId: 'hiit-05',
    focus: 'Cardio Dinâmico & Celebração da Semana 1',
    intensity: 'Moderada',
    instruction: 'Parabéns por chegar até a sexta-feira! Vamos fechar a primeira semana com uma sessão alegre e estimulante.',
    tips: 'Comemore: você completou todos os treinos de abertura!'
  },
  {
    day: 6,
    week: 1,
    dayOfWeek: 'Sábado',
    title: 'Recuperação Ativa & Mobilidade',
    type: 'recuperacao_ativa',
    workoutId: 'hiit-14',
    focus: 'Circulação Suave & Soltura Articular',
    intensity: 'Leve',
    instruction: 'Sessão leve para retirar a rigidez muscular, melhorar o fluxo sanguíneo e preparar seu corpo para a próxima fase.',
    tips: 'Aproveite para descansar, fazer respirações calmas e manter uma boa hidratação.'
  },
  {
    day: 7,
    week: 1,
    dayOfWeek: 'Domingo',
    title: 'Descanso e Restauração',
    type: 'descanso',
    focus: 'Descanso Fisiológico Completo',
    intensity: 'Descanso',
    instruction: 'O descanso faz parte indispensável da sua evolução! As adaptações musculares e a queima de gordura ocorrem durante a recuperação.',
    tips: 'Hidrate-se bem, durma pelo menos 7 a 8 horas e organize suas metas da Semana 2 no Planner digital.'
  },

  // SEMANA 2: FASE DE ACELERAÇÃO & RESISTÊNCIA
  {
    day: 8,
    week: 2,
    dayOfWeek: 'Segunda',
    title: 'Aceleração Metabólica 15 Minutos',
    type: 'treino',
    workoutId: 'hiit-25',
    focus: 'Subindo o Nível com Mais Resistência',
    intensity: 'Moderada',
    instruction: 'Iniciamos a Semana 2 com blocos de 15 minutos. Você já tem mais fôlego e consciência corporal.',
    tips: 'Mantenha uma toalha e garrafa d\'água ao alcance das mãos.'
  },
  {
    day: 9,
    week: 2,
    dayOfWeek: 'Terça',
    title: 'Pernas Firmes & Bumbum Ativo',
    type: 'treino',
    workoutId: 'hiit-28',
    focus: 'Agachamentos Turbinados e Glúteos',
    intensity: 'Moderada',
    instruction: 'Foco nos músculos posteriores e glúteos com intervalos bem dosados de estímulo e recuperação.',
    tips: 'Aperte os glúteos no ponto máximo da contração.'
  },
  {
    day: 10,
    week: 2,
    dayOfWeek: 'Quarta',
    title: 'HIIT Sem Impacto de Alta Eficiência',
    type: 'treino',
    workoutId: 'hiit-09',
    focus: 'Zero Impacto, Máximo Suor',
    intensity: 'Moderada',
    instruction: 'Mesmo sem saltos, a cadência contínua mantém os batimentos na faixa ideal de queima metabólica.',
    tips: 'Concentre-se em passos firmes e amplitude total.'
  },
  {
    day: 11,
    week: 2,
    dayOfWeek: 'Quinta',
    title: 'Esculpir Abdômen e Cintura',
    type: 'treino',
    workoutId: 'hiit-30',
    focus: 'Oblíquos e Transverso Abdominal',
    intensity: 'Moderada',
    instruction: 'Exercícios combinados de solo e em pé para tonificar a região central do abdômen e estabilizar a pelve.',
    tips: 'Expire sempre no momento da flexão ou torção do tronco.'
  },
  {
    day: 12,
    week: 2,
    dayOfWeek: 'Sexta',
    title: 'Circuito Força & Ritmo Total',
    type: 'treino',
    workoutId: 'hiit-26',
    focus: 'Full Body & Resistência Geral',
    intensity: 'Intensa',
    instruction: 'Treino vigoroso para concluir a Semana 2 com sensação de superação e força renovada.',
    tips: 'Você já passou da metade de todo o programa! Mantenha a consistência.'
  },
  {
    day: 13,
    week: 2,
    dayOfWeek: 'Sábado',
    title: 'Recuperação Ativa & Caminhada Suave',
    type: 'recuperacao_ativa',
    workoutId: 'hiit-11',
    focus: 'Alongamento Dinâmico e Descompressão',
    intensity: 'Leve',
    instruction: 'Movimentos fluidos e relaxantes para aliviar qualquer tensão acumulada e oxigenar a musculatura.',
    tips: 'Respire profundamente pelo nariz e solte os ombros.'
  },
  {
    day: 14,
    week: 2,
    dayOfWeek: 'Domingo',
    title: 'Descanso e Preparação Final',
    type: 'descanso',
    focus: 'Recuperação Neural e Muscular',
    intensity: 'Descanso',
    instruction: 'Dia reservado para repor as energias e comemorar duas semanas completas de disciplina e amor próprio.',
    tips: 'Revise suas pequenas vitórias: sono melhor, mais disposição ao acordar e mais ânimo!'
  },

  // SEMANA 3: FASE DE CONSOLIDAÇÃO & QUEIMA MÁXIMA
  {
    day: 15,
    week: 3,
    dayOfWeek: 'Segunda',
    title: 'Entrando na Reta Final: Corpo Inteiro 18 Min',
    type: 'treino',
    workoutId: 'hiit-49',
    focus: 'Potência e Fluidez Total',
    intensity: 'Intensa',
    instruction: 'Semana decisiva! Seu corpo agora responde muito mais rápido aos estímulos e recupera o fôlego com facilidade.',
    tips: 'Dê o seu ritmo mais constante nos 18 minutos de aula.'
  },
  {
    day: 16,
    week: 3,
    dayOfWeek: 'Terça',
    title: 'Pernas de Aço & Definição',
    type: 'treino',
    workoutId: 'hiit-64',
    focus: 'Resistência Muscular Localizada',
    intensity: 'Intensa',
    instruction: 'Sessão desafiadora para membros inferiores com foco em tonificação e densidade muscular saudável.',
    tips: 'Não desista antes do sinal sonoro da instrutora.'
  },
  {
    day: 17,
    week: 3,
    dayOfWeek: 'Quarta',
    title: 'Tabata Potência Máxima 10 Min',
    type: 'treino',
    workoutId: 'hiit-18',
    focus: 'Protocolo Tabata 20s/10s',
    intensity: 'Intensa',
    instruction: 'Treino curto e explosivo. Vinte segundos de dedicação total seguidos de 10 segundos de recuperação rápida.',
    tips: 'Foco total no cronômetro e respiração ágil.'
  },
  {
    day: 18,
    week: 3,
    dayOfWeek: 'Quinta',
    title: 'Core & Cintura Avançado',
    type: 'treino',
    workoutId: 'hiit-71',
    focus: 'Pranchas Dinâmicas e Estabilidade Máxima',
    intensity: 'Intensa',
    instruction: 'Fortalecimento profundo de todos os músculos estabilizadores da coluna e do abdômen.',
    tips: 'Mantenha a firmeza nas palmas das mãos apoiadas no solo.'
  },
  {
    day: 19,
    week: 3,
    dayOfWeek: 'Sexta',
    title: 'O Grande Desafio HIIT 20 Minutos',
    type: 'treino',
    workoutId: 'hiit-33',
    focus: 'Resistência Plena e Celebração',
    intensity: 'Intensa',
    instruction: 'O treino mais completo e gratificante do programa. Olhe para trás e sinta o quanto seu condicionamento evoluiu!',
    tips: 'Comemore cada gota de suor: você está no penúltimo treino ativo do desafio.'
  },
  {
    day: 20,
    week: 3,
    dayOfWeek: 'Sábado',
    title: 'Recuperação, Mobilidade e Alinhamento',
    type: 'recuperacao_ativa',
    workoutId: 'hiit-16',
    focus: 'Soltura Geral e Preservação Articular',
    intensity: 'Leve',
    instruction: 'Movimentos restauradores para alinhar a postura e relaxar o sistema nervoso.',
    tips: 'Aproveite o tempo para preencher a reflexão final no Bônus 2 (Planner de 21 Dias).'
  },
  {
    day: 21,
    week: 3,
    dayOfWeek: 'Domingo',
    title: 'A Grande Celebração HIIT 21',
    type: 'treino',
    workoutId: 'hiit-75',
    focus: 'Finalizador de Sucesso & Consolidação do Hábito',
    intensity: 'Moderada',
    instruction: 'DIA 21! Você conseguiu! Complete esta aula simbólica de consagração e marque o último selo do seu desafio.',
    tips: 'Parabéns pela consistência inabalável! Agora o exercício físico faz parte permanente da sua vida.'
  }
];
