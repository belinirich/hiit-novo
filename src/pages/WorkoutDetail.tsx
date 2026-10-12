import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Share2,
  ExternalLink,
  Play,
  ShieldCheck,
  Flame,
  Clock,
  Sparkles,
  RefreshCw,
  ChevronRight
} from 'lucide-react';

export const WorkoutDetail: React.FC = () => {
  const {
    selectedWorkoutId,
    workouts,
    navigateTo,
    progress,
    toggleWorkoutCompleted,
    toggleFavorite,
    setLastWatchedWorkout,
    showNotification
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [reportedError, setReportedError] = useState(false);

  const workout = workouts.find((w) => w.id === selectedWorkoutId) || workouts[0];
  const isCompleted = progress.completedWorkoutIds.includes(workout.id);
  const isFavorite = progress.favoriteWorkoutIds.includes(workout.id);

  // Track as last watched on view
  useEffect(() => {
    if (workout?.id) {
      setLastWatchedWorkout(workout.id);
    }
  }, [workout?.id]);

  // Find next workout in library
  const currentIndex = workouts.findIndex((w) => w.id === workout.id);
  const nextWorkout = workouts[(currentIndex + 1) % workouts.length];

  // Alternative workout in the same category
  const alternativeWorkout = workouts.find(
    (w) => w.category === workout.category && w.id !== workout.id
  ) || nextWorkout;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showNotification('Link copiado para a área de transferência!');
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleReportProblem = () => {
    setReportedError(true);
    showNotification('Obrigado! O problema foi registrado para a equipe técnica.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* 1. Top bar with Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigateTo('library')}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#17241B] bg-white hover:bg-slate-50 border border-[#E4EDE5] rounded-xl transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#2DA23B]" />
          Voltar à Biblioteca
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(workout.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white border-[#E4EDE5] text-[#647067] hover:text-[#17241B]'
            }`}
            title="Favoritar treino"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white border border-[#E4EDE5] text-[#647067] hover:text-[#17241B] transition-colors"
            title="Compartilhar aula"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Title & Metadata Header */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4EDE5] shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-[#2DA23B]">
            {workout.category}
          </span>
          <span className="text-[#647067]">·</span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-[#17241B] bg-[#F2FAF3] border border-[#2DA23B]/20">
            Nível {workout.level}
          </span>
          <span className="text-[#647067]">·</span>
          <span className="text-xs text-[#647067] tabular-nums flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#2DA23B]" />
            Duração: {workout.durationLabel}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#17241B] tracking-tight">
          {workout.title}
        </h1>

        <div className="mt-3 pt-3 border-t border-[#E4EDE5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#647067]">
          <div className="flex items-center gap-1.5">
            <span>Instrutor(a) Original:</span>
            <span className="font-semibold text-[#17241B]">{workout.channelName}</span>
          </div>

          <a
            href={workout.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#2DA23B] hover:underline font-medium"
          >
            Abrir vídeo no YouTube
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3. Official YouTube Player 16:9 */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-[#E4EDE5]">
        <iframe
          src={`https://www.youtube.com/embed/${workout.youtubeVideoId}?rel=0&playsinline=1`}
          title={workout.title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Video Controls & Alternatives Bar */}
      <div className="p-3.5 sm:p-4 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#17241B] w-full sm:w-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2DA23B] shrink-0" />
          <span className="font-semibold text-[#17241B]">Vídeo Verificado</span>
          <span className="text-[#647067] hidden md:inline">· Transmissão em alta resolução</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href={workout.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Assistir no YouTube Oficial</span>
          </a>

          {alternativeWorkout && (
            <button
              type="button"
              onClick={() => {
                navigateTo('workout-detail', alternativeWorkout.id);
              }}
              className="px-3.5 py-2 bg-[#F2FAF3] hover:bg-[#E4EDE5] text-[#2DA23B] font-semibold rounded-xl border border-[#2DA23B]/20 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Outra Aula Desta Categoria</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReportProblem}
            disabled={reportedError}
            className="px-3 py-2 text-[#647067] hover:text-[#17241B] hover:bg-slate-100 rounded-xl transition-colors"
          >
            {reportedError ? 'Aviso Enviado ✓' : 'Reportar Problema'}
          </button>
        </div>
      </div>

      {/* 4. Action Bar (Marcar Concluído & Próximo Treino) */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Toggle Complete */}
        <button
          type="button"
          onClick={() => toggleWorkoutCompleted(workout.id)}
          className={`min-h-[48px] px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            isCompleted
              ? 'bg-[#2DA23B]/10 hover:bg-[#2DA23B]/20 text-[#2DA23B] border border-[#2DA23B]/30'
              : 'bg-[#2DA23B] hover:bg-[#268932] text-white shadow-xs active:scale-[0.98]'
          }`}
        >
          <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#2DA23B]' : 'text-white'}`} />
          {isCompleted ? 'AULA CONCLUÍDA ✓' : 'MARCAR COMO CONCLUÍDO'}
        </button>

        {/* Next Workout */}
        {nextWorkout && (
          <button
            type="button"
            onClick={() => navigateTo('workout-detail', nextWorkout.id)}
            className="min-h-[48px] px-5 py-3 rounded-xl text-xs font-semibold text-[#17241B] bg-slate-50 hover:bg-slate-100 border border-[#E4EDE5] flex items-center justify-center gap-1.5 transition-colors group"
          >
            <span>Próximo Treino:</span>
            <span className="text-[#2DA23B] max-w-[180px] truncate">{nextWorkout.title}</span>
            <ChevronRight className="w-4 h-4 text-[#647067] group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* 5. Workout Description, Muscles & Equipment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 p-5 sm:p-6 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#17241B]">
            Sobre este Treino
          </h3>
          <p className="text-sm text-[#647067] leading-relaxed">
            {workout.description}
          </p>

          <div className="pt-3 border-t border-[#E4EDE5] flex flex-wrap gap-4 text-xs">
            <div>
              <span className="text-[#647067]">Equipamentos:</span>
              <p className="font-semibold text-[#17241B] mt-0.5">{workout.equipment}</p>
            </div>
            <div>
              <span className="text-[#647067]">Gasto Calórico Estimado:</span>
              <p className="font-semibold text-[#2DA23B] mt-0.5">{workout.caloriesBurnEstimate}</p>
            </div>
            <div>
              <span className="text-[#647067]">Grupos Musculares:</span>
              <p className="font-semibold text-[#17241B] mt-0.5">
                {workout.focusMuscles.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Safety Guidelines Card */}
        <div className="p-5 sm:p-6 bg-[#F2FAF3] rounded-2xl border border-[#2DA23B]/20 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#17241B]">
            <ShieldCheck className="w-5 h-5 text-[#2DA23B]" />
            Orientações de Segurança
          </div>

          <ul className="space-y-2.5 text-xs text-[#647067] leading-relaxed">
            {workout.safetyGuidelines.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#2DA23B] font-bold mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 text-[11px] text-[#647067] italic">
            *Respeite sempre seus limites fisiológicos individuais e interrompa a prática se sentir tontura ou dor aguda.
          </div>
        </div>
      </div>
    </div>
  );
};
