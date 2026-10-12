export interface User {
  id: string;
  joinedAt: string;
}

export type WorkoutLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export type WorkoutAudioLanguage = 'pt-BR' | 'es' | 'en' | 'desconhecido';

export type WorkoutCategory =
  | 'Primeiros passos'
  | 'Sem saltos'
  | '10 minutos'
  | '15 minutos'
  | '20 minutos'
  | '25–30 minutos'
  | 'Corpo inteiro'
  | 'Pernas e glúteos'
  | 'Abdômen e core'
  | 'Condicionamento';

export type VideoStatus =
  | 'VALIDADO'
  | 'PENDENTE'
  | 'INDISPONÍVEL'
  | 'EMBED_BLOQUEADO'
  | 'REVISÃO_EDITORIAL'
  | 'DIREITOS_PENDENTES';

export interface Workout {
  id: string;
  candidateNumber: number; // 01 to 75 from Anexo A
  title: string;
  description: string;
  category: WorkoutCategory;
  level: WorkoutLevel;
  durationMinutes: number;
  durationLabel: string;
  equipment: string;
  channelName: string;
  channelUrl?: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  thumbnail: string;
  status: VideoStatus;
  lastVerified: string;
  idioma_audio: WorkoutAudioLanguage;
  legendas_disponiveis: boolean;
  safetyGuidelines: string[];
  caloriesBurnEstimate: string;
  focusMuscles: string[];
}

export interface ChallengeDay {
  day: number;
  week: number;
  dayOfWeek: string;
  title: string;
  type: 'treino' | 'descanso' | 'recuperacao_ativa';
  workoutId?: string;
  focus: string;
  intensity: 'Leve' | 'Moderada' | 'Intensa' | 'Descanso';
  instruction: string;
  tips: string;
}

export interface WorkoutHistoryEntry {
  workoutId: string;
  completedAt: string;
  durationMinutes: number;
}

export interface PlannerHabit {
  name: string;
  days: boolean[];
}

export interface PlannerData {
  weeklyGoal1: string;
  weeklyGoal2: string;
  weeklyGoal3: string;
  habits: PlannerHabit[];
  dailyChecklist: boolean[];
  dailyNotes: { [day: number]: string };
  finalReflection: string;
}

export interface UserProgress {
  completedWorkoutIds: string[];
  workoutHistory: WorkoutHistoryEntry[];
  favoriteWorkoutIds: string[];
  completedChallengeDays: number[];
  lastWatchedWorkoutId?: string;
  plannerData: PlannerData;
}

export type BonusId = 'alimentacao' | 'planner' | 'alongamentos' | 'consistencia';

export interface BonusMeta {
  id: BonusId;
  numberLabel: string;
  title: string;
  subtitle: string;
  description: string;
  readTime: string;
  category: string;
  features: string[];
}
