import React from 'react';
import { Workout } from '../types';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle2, Heart, Clock, Signal } from 'lucide-react';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { navigateTo, progress, toggleFavorite, toggleWorkoutCompleted } = useApp();

  const isCompleted = progress.completedWorkoutIds.includes(workout.id);
  const isFavorite = progress.favoriteWorkoutIds.includes(workout.id);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'text-[#2DA23B] bg-[#2DA23B]/10';
      case 'Intermediário':
        return 'text-amber-700 bg-amber-50';
      case 'Avançado':
        return 'text-rose-700 bg-rose-50';
      default:
        return 'text-[#647067] bg-slate-100';
    }
  };

  return (
    <div 
      onClick={() => navigateTo('workout-detail', workout.id)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E4EDE5] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Video Thumbnail (16:9) */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          onError={(e) => {
            // Fallback to standard high quality thumbnail if hqdefault fails
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${workout.youtubeVideoId}/0.jpg`;
          }}
        />

        {/* Gradient scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(workout.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite 
              ? 'bg-rose-500 text-white shadow-md' 
              : 'bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs'
          }`}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#2DA23B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-white" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-white text-xs font-semibold tabular-nums">
          <Clock className="w-3.5 h-3.5 text-[#2DA23B]" />
          {workout.durationLabel}
        </div>

        {/* Completed status indicator */}
        {isCompleted && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2DA23B] text-white text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Concluído
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: Category & Level */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-[#647067] truncate">
              {workout.category}
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold shrink-0 ${getLevelColor(workout.level)}`}>
              {workout.level}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-semibold text-[#17241B] group-hover:text-[#2DA23B] transition-colors line-clamp-2 leading-snug">
            {workout.title}
          </h4>

          {/* Channel / Instructor name */}
          <p className="mt-1.5 text-xs text-[#647067] flex items-center gap-1.5">
            <span>Instrutor(a):</span>
            <span className="font-medium text-[#17241B]">{workout.channelName}</span>
          </p>
        </div>

        {/* Footer actions inside card */}
        <div className="mt-4 pt-3 border-t border-[#E4EDE5] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWorkoutCompleted(workout.id);
            }}
            className={`text-xs font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors ${
              isCompleted
                ? 'text-[#2DA23B] bg-[#2DA23B]/10 hover:bg-[#2DA23B]/20'
                : 'text-[#647067] hover:text-[#17241B] hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-[#2DA23B]' : 'text-slate-400'}`} />
            {isCompleted ? 'Feito' : 'Marcar concluído'}
          </button>

          <span className="text-xs font-semibold text-[#2DA23B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Ver aula
            <Play className="w-3 h-3 fill-current" />
          </span>
        </div>
      </div>
    </div>
  );
};
