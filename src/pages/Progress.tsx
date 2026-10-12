import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  CheckCircle2,
  Clock,
  Flame,
  Calendar,
  Sparkles,
  TrendingUp,
  History,
  RotateCcw,
  Zap
} from 'lucide-react';

export const Progress: React.FC = () => {
  const { progress, workouts, resetProgress, navigateTo } = useApp();

  const totalCompletedWorkouts = progress.completedWorkoutIds.length;
  
  // Calculate total minutes trained
  const totalMinutes = progress.workoutHistory.reduce((acc, curr) => acc + (curr.durationMinutes || 15), 0);
  
  // Estimate calories burned (~10 kcal/min for HIIT)
  const estimatedCalories = Math.round(totalMinutes * 10.5);

  const completedChallengeDays = progress.completedChallengeDays.length;

  // Badges list
  const badges = [
    {
      id: 'first_workout',
      title: 'Primeiro Passo',
      desc: 'Concluiu a 1ª aula na plataforma',
      icon: Zap,
      unlocked: totalCompletedWorkouts >= 1
    },
    {
      id: 'streak_3',
      title: 'Hábito Ativado',
      desc: 'Completou 3 dias do Desafio de 21 Dias',
      icon: Flame,
      unlocked: completedChallengeDays >= 3
    },
    {
      id: 'week_1',
      title: 'Semana 1 Concluída',
      desc: 'Completou todos os 7 dias da Fase 1',
      icon: Calendar,
      unlocked: completedChallengeDays >= 7
    },
    {
      id: 'minutes_100',
      title: 'Centenária do HIIT',
      desc: 'Acumulou mais de 100 minutos de treinos',
      icon: Clock,
      unlocked: totalMinutes >= 100
    },
    {
      id: 'challenge_master',
      title: 'Mestre HIIT 21',
      desc: 'Conquistou todos os 21 dias do desafio',
      icon: Award,
      unlocked: completedChallengeDays >= 21
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Acompanhamento Pessoal
            </span>
            <span className="text-[#647067]">·</span>
            <span className="text-xs text-[#647067]">
              Métricas Reais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17241B] tracking-tight">
            Meu Progresso
          </h1>
          <p className="mt-1 text-sm text-[#647067]">
            Acompanhe cada minuto investido na sua saúde e comemore sua evolução contínua.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Deseja realmente resetar seu histórico de progresso?')) {
              resetProgress();
            }
          }}
          className="text-xs text-[#647067] hover:text-rose-600 flex items-center gap-1.5 self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Zerar progresso de teste
        </button>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#647067]">Aulas Feitas</span>
            <div className="w-8 h-8 rounded-lg bg-[#2DA23B]/10 text-[#2DA23B] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-[#17241B] tabular-nums">
            {totalCompletedWorkouts}
          </div>
          <p className="mt-1 text-xs text-[#647067]">
            no catálogo geral
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#647067]">Tempo Ativo</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-[#17241B] tabular-nums">
            {totalMinutes} <span className="text-sm font-semibold text-[#647067]">min</span>
          </div>
          <p className="mt-1 text-xs text-[#647067]">
            acumulados em treinos
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#647067]">Dias do Desafio</span>
            <div className="w-8 h-8 rounded-lg bg-[#2DA23B]/10 text-[#2DA23B] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-[#17241B] tabular-nums">
            {completedChallengeDays} <span className="text-sm font-semibold text-[#647067]">/ 21</span>
          </div>
          <p className="mt-1 text-xs text-[#647067]">
            {Math.round((completedChallengeDays / 21) * 100)}% concluído
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#647067]">Calorias Est.</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl sm:text-3xl font-bold text-[#17241B] tabular-nums">
            {estimatedCalories} <span className="text-sm font-semibold text-[#647067]">kcal</span>
          </div>
          <p className="mt-1 text-xs text-[#647067]">
            energia gasta estimada
          </p>
        </div>
      </div>

      {/* 3. Badges / Conquistas */}
      <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
            Marcos de Consistência
          </span>
          <h3 className="text-lg font-bold text-[#17241B]">
            Suas Conquistas
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                b.unlocked
                  ? 'bg-[#F2FAF3] border-[#2DA23B]/30 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 opacity-60'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  b.unlocked
                    ? 'bg-[#2DA23B] text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  <b.icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#17241B]">
                  {b.title}
                </h4>
                <p className="mt-1 text-xs text-[#647067] leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-black/5">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  b.unlocked ? 'text-[#2DA23B]' : 'text-slate-400'
                }`}>
                  {b.unlocked ? 'Desbloqueado ✓' : 'Em andamento'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Workout History Log */}
      <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Registro Detalhado
            </span>
            <h3 className="text-lg font-bold text-[#17241B]">
              Histórico de Treinos Concluídos
            </h3>
          </div>
          <span className="text-xs text-[#647067]">
            {progress.workoutHistory.length} registros
          </span>
        </div>

        {progress.workoutHistory.length > 0 ? (
          <div className="divide-y divide-[#E4EDE5]">
            {progress.workoutHistory.map((item, idx) => {
              const workout = workouts.find((w) => w.id === item.workoutId);
              const dateStr = new Date(item.completedAt).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={idx}
                  className="py-3 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors px-2 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2DA23B]/10 text-[#2DA23B] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#17241B] line-clamp-1">
                        {workout?.title || 'Treino HIIT'}
                      </h4>
                      <p className="text-xs text-[#647067]">
                        {workout?.category} · {item.durationMinutes} minutos · Instrutor(a): {workout?.channelName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-medium text-[#647067]">
                      {dateStr}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-[#647067]">
            Nenhum treino concluído ainda. Inicie sua primeira aula na biblioteca!
          </div>
        )}
      </div>
    </div>
  );
};
