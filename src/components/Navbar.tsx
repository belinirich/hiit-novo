import React from 'react';
import { useApp, AppPage } from '../context/AppContext';
import {
  Home,
  Dumbbell,
  CalendarCheck,
  Award,
  BookOpen,
  Settings,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo
  } = useApp();

  const navLinks: { page: AppPage; label: string; icon: React.ElementType }[] = [
    { page: 'dashboard', label: 'Início', icon: Home },
    { page: 'library', label: 'Biblioteca', icon: Dumbbell },
    { page: 'challenge', label: 'Desafio 21 Dias', icon: CalendarCheck },
    { page: 'progress', label: 'Meu Progresso', icon: Award },
    { page: 'bonuses', label: 'Meus Bônus', icon: BookOpen }
  ];

  return (
    <>
      {/* ================= DESKTOP & TABLET TOPBAR ================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E4EDE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand wordmark */}
          <div 
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2DA23B] text-white flex items-center justify-center shadow-xs">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#17241B] leading-none">
                HIIT <span className="text-[#2DA23B]">21</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#647067] leading-tight">
                Membros
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'library' && currentPage === 'workout-detail') ||
                (item.page === 'bonuses' && currentPage === 'bonus-detail');

              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigateTo(item.page)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-[#2DA23B] bg-[#F2FAF3] font-semibold'
                      : 'text-[#647067] hover:text-[#17241B] hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Settings button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 ${
                currentPage === 'profile'
                  ? 'bg-[#F2FAF3] border-[#2DA23B]/30 text-[#2DA23B]'
                  : 'bg-white border-[#E4EDE5] text-[#647067] hover:text-[#17241B] hover:bg-slate-50'
              }`}
              title="Ajustes e Preferências"
            >
              <Settings className="w-4 h-4" />
              <span className="text-xs font-semibold hidden lg:inline">Ajustes</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAVIGATION BAR ================= */}
      <nav 
        aria-label="Navegação Principal Mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4EDE5] shadow-lg"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1">
          {[
            { page: 'dashboard' as AppPage, label: 'Início', icon: Home },
            { page: 'library' as AppPage, label: 'Treinos', icon: Dumbbell },
            { page: 'challenge' as AppPage, label: 'Desafio', icon: CalendarCheck },
            { page: 'bonuses' as AppPage, label: 'Bônus', icon: BookOpen },
            { page: 'profile' as AppPage, label: 'Ajustes', icon: Settings }
          ].map((tab) => {
            const isActive =
              currentPage === tab.page ||
              (tab.page === 'library' && currentPage === 'workout-detail') ||
              (tab.page === 'bonuses' && currentPage === 'bonus-detail');

            return (
              <button
                key={tab.page}
                type="button"
                onClick={() => navigateTo(tab.page)}
                className={`relative flex flex-col items-center justify-center h-full min-h-[48px] py-1 transition-colors ${
                  isActive ? 'text-[#2DA23B]' : 'text-[#647067] hover:text-[#17241B]'
                }`}
              >
                <div className="relative">
                  <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                </div>
                <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-6 h-0.5 rounded-full bg-[#2DA23B]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
