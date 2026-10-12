import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { WorkoutsLibrary } from './pages/WorkoutsLibrary';
import { WorkoutDetail } from './pages/WorkoutDetail';
import { Challenge21 } from './pages/Challenge21';
import { Progress } from './pages/Progress';
import { Bonuses } from './pages/Bonuses';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Zap, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, currentUser, notificationMessage } = useApp();

  // Render current active page
  const renderPage = () => {
    if (!currentUser && currentPage !== 'login') {
      return <Login />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <WorkoutsLibrary />;
      case 'workout-detail':
        return <WorkoutDetail />;
      case 'challenge':
        return <Challenge21 />;
      case 'progress':
        return <Progress />;
      case 'bonuses':
      case 'bonus-detail':
        return <Bonuses />;
      case 'profile':
        return <Profile />;
      case 'login':
        return <Login />;
      default:
        return <Dashboard />;
    }
  };

  const isLoginPage = currentPage === 'login' || !currentUser;

  return (
    <div className="min-h-screen bg-[#F2FAF3] text-[#17241B] flex flex-col font-sans selection:bg-[#2DA23B]/20 selection:text-[#17241B]">
      {/* Top and Bottom Navigation Bars */}
      {!isLoginPage && <Navbar />}

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isLoginPage ? 'py-6' : 'py-6 sm:py-8 pb-28 md:pb-12'}`}>
        {renderPage()}
      </main>

      {/* Subtle Toast Notification */}
      {notificationMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#17241B] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#2DA23B]" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      {/* Clean Footer */}
      {!isLoginPage && (
        <footer className="w-full bg-white border-t border-[#E4EDE5] py-6 sm:py-8 text-xs text-[#647067] no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#2DA23B] text-white flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="font-bold text-[#17241B]">HIIT 21</span>
              <span>— Área de Membros Oficial do Programa Digital</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>Plataforma Segura</span>
              <span>·</span>
              <span>Suporte ao Aluno</span>
              <span>·</span>
              <span>© {new Date().getFullYear()} HIIT 21. Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
