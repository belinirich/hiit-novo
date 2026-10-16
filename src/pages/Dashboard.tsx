import React from 'react';
import { useApp } from '../context/AppContext';
import { CHALLENGE_DAYS } from '../data/challenge';
import {
  Play,
  CalendarCheck,
  Dumbbell,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  Flame,
  RotateCcw
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    workouts,
    progress,
    navigateTo
  } = useApp();

  // 1. Calculate challenge progress
  const completedDaysCount = progress.completedChallengeDays.length;
  const currentDayNumber = completedDaysCount < 21 ? completedDaysCount + 1 : 21;
  const currentChallengeDay = CHALLENGE_DAYS.find((d) => d.day === currentDayNumber) || CHALLENGE_DAYS[0];
  const challengeProgressPercent = Math.round((completedDaysCount / 21) * 100);

  // 2. Workout of the day
  const todayWorkoutId = currentChallengeDay?.workoutId || 'hiit-01';
  const todayWorkout = workouts.find((w) => w.id === todayWorkoutId) || workouts[0];

  // 3. Last watched workout for "Continuar de onde parou"
  const lastWatchedWorkout = progress.lastWatchedWorkoutId
    ? workouts.find((w) => w.id === progress.lastWatchedWorkoutId)
    : null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* ================= 1. CABEÇALHO ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EDE5] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Área de Membros HIIT 21
            </span>
            <span className="text-[#647067]">·</span>
            <span className="text-xs text-[#647067]">
              Acesso Completo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17241B] tracking-tight">
            Olá!
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#647067]">
            Pronta para continuar sua jornada de movimento e saúde?
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('progress')}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#F2FAF3] hover:bg-[#E4EDE5] text-[#2DA23B] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#2DA23B]/20"
        >
          <Award className="w-4 h-4" />
          Ver Meu Progresso
        </button>
      </div>

      {/* ================= 2. CARD DE PROGRESSO DO DESAFIO (UNIFICADO) ================= */}
      <div className="p-6 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Desafio Guiado
            </span>
            <h3 className="text-lg font-bold text-[#17241B]">
              Seu Desafio de 21 Dias
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#17241B]">
              Dia {currentDayNumber} de 21
            </span>
            <span className="text-xs font-medium text-[#647067]">
              ({completedDaysCount} concluídos · {challengeProgressPercent}%)
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E4EDE5] h-3 rounded-full overflow-hidden">
          <div
            className="bg-[#2DA23B] h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.max(challengeProgressPercent, 5)}%` }}
          />
        </div>

        {/* Next activity description */}
        <div className="mt-4 pt-4 border-t border-[#E4EDE5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-[#17241B]">
            <span className="font-semibold text-[#2DA23B]">Próxima Atividade:</span>
            <span>
              Dia {currentDayNumber} — {currentChallengeDay.title} ({currentChallengeDay.focus})
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigateTo('challenge')}
            className="text-xs font-semibold text-[#2DA23B] hover:text-[#268932] flex items-center gap-1 group whitespace-nowrap"
          >
            Abrir calendário completo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ================= 3. TREINO DE HOJE (CARD PRINCIPAL) ================= */}
      <div className="bg-white rounded-2xl border border-[#E4EDE5] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E4EDE5] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2DA23B]">
              Treino Recomendado
            </span>
            <h3 className="text-xl font-bold text-[#17241B]">
              Treino de Hoje
            </h3>
          </div>
          <span className="text-xs text-[#647067] hidden sm:inline">
            Aula do cronograma diário
          </span>
        </div>

        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Real video thumbnail 16:9 */}
          <div 
            onClick={() => navigateTo('workout-detail', todayWorkout.id)}
            className="lg:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-slate-900 group cursor-pointer shadow-xs"
          >
            <img
              src={todayWorkout.thumbnail}
              alt={todayWorkout.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#2DA23B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-white" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 text-white text-xs font-semibold tabular-nums flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#2DA23B]" />
              {todayWorkout.durationLabel}
            </div>
          </div>

          {/* Details & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[#647067]">
                  {todayWorkout.category}
                </span>
                <span className="text-[#647067]">·</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-[#2DA23B] bg-[#2DA23B]/10">
                  {todayWorkout.level}
                </span>
                <span className="text-[#647067]">·</span>
                <span className="text-xs text-[#647067]">
                  Instrutor(a): {todayWorkout.channelName}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-[#17241B] leading-snug">
                {todayWorkout.title}
              </h4>

              <p className="mt-2 text-sm text-[#647067] line-clamp-2">
                {todayWorkout.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#647067]">
                <div>
                  <strong className="text-[#17241B]">Equipamento:</strong> {todayWorkout.equipment}
                </div>
                <div>
                  <strong className="text-[#17241B]">Estimativa:</strong> {todayWorkout.caloriesBurnEstimate}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('workout-detail', todayWorkout.id)}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 bg-[#2DA23B] hover:bg-[#268932] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white" />
                INICIAR TREINO DE HOJE
              </button>

              <button
                type="button"
                onClick={() => navigateTo('library')}
                className="w-full sm:w-auto min-h-[48px] px-5 py-3 text-xs font-semibold text-[#647067] hover:text-[#17241B] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-center"
              >
                Escolher outro treino
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. ACESSOS RÁPIDOS ================= */}
      <div>
        <h3 className="text-lg font-bold text-[#17241B] mb-3">
          Acessos Rápidos
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              title: 'Explorar Treinos',
              desc: '75 aulas divididas em 10 categorias',
              icon: Dumbbell,
              page: 'library' as const,
              count: `${workouts.length} aulas`
            },
            {
              title: 'Desafio 21 Dias',
              desc: 'Cronograma progressivo de 3 semanas',
              icon: CalendarCheck,
              page: 'challenge' as const,
              count: '21 dias'
            },
            {
              title: 'Meu Progresso',
              desc: 'Histórico, sequência e estatísticas',
              icon: Award,
              page: 'progress' as const,
              count: `${progress.completedWorkoutIds.length} feitos`
            },
            {
              title: 'Meus Bônus',
              desc: 'Alimentação, Planner e Consistência',
              icon: BookOpen,
              page: 'bonuses' as const,
              count: '3 materiais'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo(item.page)}
              className="p-4 sm:p-5 bg-white hover:bg-[#F2FAF3] rounded-2xl border border-[#E4EDE5] shadow-xs cursor-pointer transition-all duration-150 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#2DA23B]/10 text-[#2DA23B] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#17241B]">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-[#647067] line-clamp-2">
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#E4EDE5]/60 flex items-center justify-between text-xs font-semibold text-[#2DA23B]">
                <span>{item.count}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 5. CONTINUAÇÃO (ÚLTIMO TREINO INICIADO) ================= */}
      {lastWatchedWorkout && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4EDE5] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="w-4 h-4 text-[#2DA23B]" />
            <h3 className="text-base font-bold text-[#17241B]">
              Continuar de Onde Parou
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-[#F2FAF3] rounded-xl border border-[#E4EDE5]">
            <div className="flex items-center gap-3">
              <img
                src={lastWatchedWorkout.thumbnail}
                alt={lastWatchedWorkout.title}
                className="w-16 h-12 object-cover rounded-lg shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-[#17241B] line-clamp-1">
                  {lastWatchedWorkout.title}
                </h4>
                <p className="text-xs text-[#647067]">
                  {lastWatchedWorkout.durationLabel} · {lastWatchedWorkout.channelName} · {lastWatchedWorkout.category}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateTo('workout-detail', lastWatchedWorkout.id)}
              className="px-4 py-2 bg-[#2DA23B] hover:bg-[#268932] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Retomar Aula
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
