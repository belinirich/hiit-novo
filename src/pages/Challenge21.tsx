import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CHALLENGE_DAYS } from '../data/challenge';
import { ChallengeDay } from '../types';
import {
  CalendarCheck,
  CheckCircle2,
  Play,
  Moon,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Info
} from 'lucide-react';

export const Challenge21: React.FC = () => {
  const {
    workouts,
    progress,
    toggleChallengeDay,
    navigateTo
  } = useApp();

  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const [selectedDayModal, setSelectedDayModal] = useState<ChallengeDay | null>(null);

  const completedDays = progress.completedChallengeDays;
  const completedCount = completedDays.length;
  const currentDay = completedCount < 21 ? completedCount + 1 : 21;
  const progressPercent = Math.round((completedCount / 21) * 100);

  // Group by week
  const week1Days = CHALLENGE_DAYS.filter((d) => d.week === 1);
  const week2Days = CHALLENGE_DAYS.filter((d) => d.week === 2);
  const week3Days = CHALLENGE_DAYS.filter((d) => d.week === 3);

  const getWeekDays = (week: number) => {
    switch (week) {
      case 1:
        return week1Days;
      case 2:
        return week2Days;
      case 3:
        return week3Days;
      default:
        return CHALLENGE_DAYS;
    }
  };

  const getWeekName = (week: number) => {
    switch (week) {
      case 1:
        return 'Fase 1: Adaptação & Despertar (Dias 1 a 7)';
      case 2:
        return 'Fase 2: Aceleração & Ritmo (Dias 8 a 14)';
      case 3:
        return 'Fase 3: Consolidação & Queima (Dias 15 a 21)';
      default:
        return `Semana ${week}`;
    }
  };

  const getIntensityBadge = (day: ChallengeDay) => {
    if (day.type === 'descanso') {
      return (
        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
          <Moon className="w-3 h-3 text-slate-500" />
          Descanso
        </span>
      );
    }
    if (day.type === 'recuperacao_ativa') {
      return (
        <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded flex items-center gap-1">
          <HeartPulse className="w-3 h-3 text-teal-600" />
          Recuperação
        </span>
      );
    }
    switch (day.intensity) {
      case 'Leve':
        return <span className="text-[11px] font-semibold text-[#2DA23B] bg-[#2DA23B]/10 px-2 py-0.5 rounded">Leve</span>;
      case 'Moderada':
        return <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Moderada</span>;
      case 'Intensa':
        return <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Intensa</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header with Progress Bar */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
                Programa Guiado Exclusivo
              </span>
              <span className="text-[#647067]">·</span>
              <span className="text-xs text-[#647067]">
                3 Semanas Estruturadas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17241B] tracking-tight">
              Desafio de 21 Dias
            </h1>
            <p className="mt-1 text-sm text-[#647067]">
              Um roteiro equilibrado para construir o hábito diário de se exercitar, respeitando seus limites e os dias de descanso.
            </p>
          </div>

          <div className="p-4 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 flex items-center gap-4 shrink-0">
            <div>
              <div className="text-2xl font-bold text-[#17241B] tabular-nums">
                {completedCount} <span className="text-sm font-normal text-[#647067]">/ 21 dias</span>
              </div>
              <div className="text-xs text-[#647067]">
                {progressPercent}% concluído
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#2DA23B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {progressPercent}%
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div>
          <div className="w-full bg-[#E4EDE5] h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#2DA23B] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-[#647067]">
            <span>Semana 1: Adaptação</span>
            <span>Semana 2: Aceleração</span>
            <span>Semana 3: Consolidação</span>
          </div>
        </div>
      </div>

      {/* 2. Week Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[1, 2, 3].map((week) => {
          const isSelected = activeWeekTab === week;
          const weekDaysList = getWeekDays(week);
          const weekCompletedCount = weekDaysList.filter((d) => completedDays.includes(d.day)).length;

          return (
            <button
              key={week}
              type="button"
              onClick={() => setActiveWeekTab(week)}
              className={`flex-1 min-w-[200px] p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white border-[#2DA23B] shadow-sm ring-1 ring-[#2DA23B]'
                  : 'bg-white/80 border-[#E4EDE5] hover:bg-white text-[#647067]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-[#2DA23B]' : 'text-[#647067]'}`}>
                  Semana 0{week}
                </span>
                <span className="text-[11px] font-semibold tabular-nums text-[#647067]">
                  {weekCompletedCount}/7 dias
                </span>
              </div>
              <p className="mt-1 text-sm font-bold text-[#17241B] truncate">
                {getWeekName(week).split(':')[1] || `Semana ${week}`}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. 7-Day Interactive Calendar Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#17241B]">
            {getWeekName(activeWeekTab)}
          </h2>
          <span className="text-xs text-[#647067]">
            Clique em qualquer dia para ver os detalhes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-3.5">
          {getWeekDays(activeWeekTab).map((day) => {
            const isCompleted = completedDays.includes(day.day);
            const isCurrent = day.day === currentDay;
            const workout = day.workoutId ? workouts.find((w) => w.id === day.workoutId) : null;

            return (
              <div
                key={day.day}
                onClick={() => {
                  if (workout) {
                    navigateTo('workout-detail', workout.id);
                  } else {
                    setSelectedDayModal(day);
                  }
                }}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
                  isCurrent
                    ? 'bg-white border-[#2DA23B] ring-2 ring-[#2DA23B]/30 shadow-md'
                    : isCompleted
                    ? 'bg-white border-[#2DA23B]/30 shadow-xs'
                    : 'bg-white border-[#E4EDE5] hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Day Header */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-xs font-bold text-[#647067]">
                      {day.dayOfWeek}
                    </span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? 'bg-[#2DA23B] text-white'
                        : isCurrent
                        ? 'bg-[#2DA23B]/10 text-[#2DA23B]'
                        : 'bg-slate-100 text-[#17241B]'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : day.day}
                    </span>
                  </div>

                  {/* Day Type Badge */}
                  <div className="mb-2">
                    {getIntensityBadge(day)}
                  </div>

                  {/* Title & Focus */}
                  <h4 className="text-sm font-bold text-[#17241B] line-clamp-2 leading-snug">
                    {day.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#647067] line-clamp-2">
                    {day.focus}
                  </p>
                </div>

                {/* Card Action / Status */}
                <div className="mt-4 pt-3 border-t border-[#E4EDE5] flex items-center justify-between">
                  {day.type === 'descanso' ? (
                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <Moon className="w-3 h-3" />
                      Descanso
                    </span>
                  ) : workout ? (
                    <span className="text-[11px] font-semibold text-[#2DA23B] flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      {workout.durationLabel}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-teal-700">
                      Recuperação
                    </span>
                  )}

                  {/* Toggle complete button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChallengeDay(day.day);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isCompleted
                        ? 'text-[#2DA23B] hover:bg-[#2DA23B]/10'
                        : 'text-slate-400 hover:text-[#17241B] hover:bg-slate-100'
                    }`}
                    title={isCompleted ? 'Desmarcar' : 'Marcar como feito'}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#2DA23B]' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Rest Day Modal Info */}
      {selectedDayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-xl border border-[#E4EDE5] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17241B]">
                  Dia {selectedDayModal.day}: {selectedDayModal.title}
                </h3>
                <span className="text-xs text-[#647067]">
                  {selectedDayModal.dayOfWeek} · {selectedDayModal.focus}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#647067] leading-relaxed">
              {selectedDayModal.instruction}
            </p>

            <div className="p-3.5 bg-[#F2FAF3] rounded-xl text-xs text-[#17241B] space-y-1">
              <strong>Dica do Dia:</strong>
              <p className="text-[#647067]">{selectedDayModal.tips}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  toggleChallengeDay(selectedDayModal.day);
                  setSelectedDayModal(null);
                }}
                className="px-4 py-2.5 bg-[#2DA23B] text-white text-xs font-semibold rounded-xl"
              >
                {completedDays.includes(selectedDayModal.day) ? 'Desmarcar Dia' : 'Marcar como Concluído'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedDayModal(null)}
                className="px-4 py-2.5 text-xs text-[#647067] hover:text-[#17241B]"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Health & Philosophy Notice */}
      <div className="p-4 bg-white rounded-2xl border border-[#E4EDE5] text-xs text-[#647067] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#2DA23B] shrink-0 mt-0.5" />
        <p leading-relaxed>
          <strong>Importante sobre sua evolução:</strong> O desafio de 21 dias visa a construção de um hábito saudável e sustentável de atividade física. Os resultados dependem de consistência, descanso e alimentação. Nunca treine com dores articulares ou desconforto excessivo.
        </p>
      </div>
    </div>
  );
};
