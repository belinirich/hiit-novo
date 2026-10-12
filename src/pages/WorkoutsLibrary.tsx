import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { WorkoutCategory, WorkoutLevel } from '../types';
import { WORKOUT_CATEGORIES } from '../data/workouts';
import { WorkoutCard } from '../components/WorkoutCard';
import {
  Search,
  Filter,
  CheckCircle2,
  Heart,
  X,
  Dumbbell,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export const WorkoutsLibrary: React.FC = () => {
  const { workouts, progress } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered workouts
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((w) => {
      // 1. Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(query);
        const matchesDesc = w.description.toLowerCase().includes(query);
        const matchesChannel = w.channelName.toLowerCase().includes(query);
        const matchesMuscles = w.focusMuscles.some((m) => m.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesChannel && !matchesMuscles) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && w.category !== selectedCategory) {
        return false;
      }

      // 3. Level
      if (selectedLevel !== 'all' && w.level !== selectedLevel) {
        return false;
      }

      // 4. Duration
      if (selectedDuration !== 'all') {
        const min = w.durationMinutes;
        if (selectedDuration === '10' && min > 12) return false;
        if (selectedDuration === '15' && (min < 13 || min > 17)) return false;
        if (selectedDuration === '20' && (min < 18 || min > 22)) return false;
        if (selectedDuration === '25' && min < 23) return false;
      }

      // 5. Favorites
      if (onlyFavorites && !progress.favoriteWorkoutIds.includes(w.id)) {
        return false;
      }

      // 6. Completed
      if (onlyCompleted && !progress.completedWorkoutIds.includes(w.id)) {
        return false;
      }

      return true;
    });
  }, [
    workouts,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    onlyFavorites,
    onlyCompleted,
    progress.favoriteWorkoutIds,
    progress.completedWorkoutIds
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedDuration('all');
    setOnlyFavorites(false);
    setOnlyCompleted(false);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedDuration !== 'all' ||
    onlyFavorites ||
    onlyCompleted;

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Acervo Completo
            </span>
            <span className="text-[#647067]">·</span>
            <span className="text-xs text-[#647067]">
              {workouts.length} Videoaulas Verificadas
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17241B] tracking-tight">
            Biblioteca de Treinos
          </h1>
          <p className="mt-1 text-sm text-[#647067]">
            Treinos de 10 a 25 minutos para todos os níveis, organizados por objetivo e grupo muscular.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#647067]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, instrutor ou músculo..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-[#E4EDE5] focus:bg-white focus:border-[#2DA23B] focus:ring-2 focus:ring-[#2DA23B]/20 rounded-xl text-sm text-[#17241B] placeholder:text-[#647067] transition-all outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#647067] hover:text-[#17241B]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs / Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
        {/* Horizontal Category Pill Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#2DA23B] text-white shadow-xs'
                : 'bg-slate-100 text-[#647067] hover:bg-slate-200/80 hover:text-[#17241B]'
            }`}
          >
            Todas as Categorias ({workouts.length})
          </button>
          {WORKOUT_CATEGORIES.map((cat) => {
            const count = workouts.filter((w) => w.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#2DA23B] text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-[#647067] hover:bg-slate-200/80 hover:text-[#17241B]'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#647067]'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters (Level, Duration, Favorites, Completed) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E4EDE5]">
          <div className="flex flex-wrap items-center gap-2">
            {/* Level Selector */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-[#E4EDE5] rounded-xl text-xs font-medium text-[#17241B] outline-hidden focus:border-[#2DA23B]"
            >
              <option value="all">Todos os Níveis</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>

            {/* Duration Selector */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-[#E4EDE5] rounded-xl text-xs font-medium text-[#17241B] outline-hidden focus:border-[#2DA23B]"
            >
              <option value="all">Todas as Durações</option>
              <option value="10">Até 12 minutos</option>
              <option value="15">13 a 17 minutos</option>
              <option value="20">18 a 22 minutos</option>
              <option value="25">23 a 25 minutos</option>
            </select>

            {/* Favorites Toggle */}
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                onlyFavorites
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold'
                  : 'bg-slate-50 text-[#647067] border border-[#E4EDE5] hover:text-[#17241B]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-rose-600' : ''}`} />
              <span>Favoritos ({progress.favoriteWorkoutIds.length})</span>
            </button>

            {/* Completed Toggle */}
            <button
              type="button"
              onClick={() => setOnlyCompleted(!onlyCompleted)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                onlyCompleted
                  ? 'bg-[#2DA23B]/10 text-[#2DA23B] border border-[#2DA23B]/30 font-semibold'
                  : 'bg-slate-50 text-[#647067] border border-[#E4EDE5] hover:text-[#17241B]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Concluídos ({progress.completedWorkoutIds.length})</span>
            </button>
          </div>

          {/* Results count & Clear */}
          <div className="flex items-center gap-3 text-xs text-[#647067]">
            <span>
              Exibindo <strong className="text-[#17241B]">{filteredWorkouts.length}</strong> de {workouts.length} aulas
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-[#2DA23B] hover:underline font-semibold"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Workout Cards */}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-[#E4EDE5] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-[#647067] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#17241B]">
              Nenhuma aula encontrada
            </h3>
            <p className="mt-1 text-sm text-[#647067] max-w-md mx-auto">
              Não encontramos aulas com os filtros selecionados. Tente ajustar os termos de busca ou remover alguns filtros.
            </p>
          </div>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-5 py-2.5 bg-[#2DA23B] text-white text-xs font-semibold rounded-xl hover:bg-[#268932] transition-colors"
          >
            Ver todas as {workouts.length} aulas
          </button>
        </div>
      )}
    </div>
  );
};
