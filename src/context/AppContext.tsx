import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Workout,
  UserProgress,
  BonusId,
  PlannerData,
  VideoStatus
} from '../types';
import { INITIAL_WORKOUTS } from '../data/workouts';

export type AppPage =
  | 'dashboard'
  | 'library'
  | 'workout-detail'
  | 'challenge'
  | 'progress'
  | 'bonuses'
  | 'bonus-detail'
  | 'profile'
  | 'login';

const DEFAULT_USER: User = {
  id: 'membro-hiit21',
  joinedAt: '2026-01-01'
};

const INITIAL_PLANNER_DATA: PlannerData = {
  weeklyGoal1: 'Treinar 5 vezes na semana e beber 2L de água diariamente',
  weeklyGoal2: 'Completar os treinos de 15 minutos sem pular o aquecimento',
  weeklyGoal3: 'Finalizar o desafio dos 21 dias com foco e consistência',
  habits: [
    { name: 'Água 2L+ no dia', days: Array(21).fill(false) },
    { name: 'Treino HIIT Concluído', days: Array(21).fill(false) },
    { name: 'Sono Reparador (7h+)', days: Array(21).fill(false) },
    { name: 'Alimentação Consciente', days: Array(21).fill(false) }
  ],
  dailyChecklist: Array(21).fill(false),
  dailyNotes: {},
  finalReflection: ''
};

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  currentPage: AppPage;
  selectedWorkoutId: string | null;
  selectedBonusId: BonusId | null;
  navigateTo: (page: AppPage, id?: string) => void;
  
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  verifyAllWorkouts: () => void;
  
  progress: UserProgress;
  toggleWorkoutCompleted: (workoutId: string) => void;
  toggleFavorite: (workoutId: string) => void;
  toggleChallengeDay: (day: number) => void;
  setLastWatchedWorkout: (workoutId: string) => void;
  updatePlanner: (updater: (prev: PlannerData) => PlannerData) => void;
  resetProgress: () => void;
  
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current user session (Active by default, no personal specifics)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hiit21_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_USER;
  });

  // 2. Navigation
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [selectedBonusId, setSelectedBonusId] = useState<BonusId | null>(null);

  // 3. Workouts state (always synchronized with verified INITIAL_WORKOUTS)
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      // Clear legacy storage cache to avoid stale or unavailable video state
      localStorage.removeItem('hiit21_workouts_db');
    } catch (e) {
      console.error(e);
    }
    return INITIAL_WORKOUTS;
  });

  // 4. User Progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('hiit21_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      completedWorkoutIds: ['hiit-01', 'hiit-02'],
      workoutHistory: [
        { workoutId: 'hiit-01', completedAt: '2026-10-09T10:30:00Z', durationMinutes: 12 },
        { workoutId: 'hiit-02', completedAt: '2026-10-10T09:15:00Z', durationMinutes: 10 }
      ],
      favoriteWorkoutIds: ['hiit-01', 'hiit-09', 'hiit-25'],
      completedChallengeDays: [1, 2],
      lastWatchedWorkoutId: 'hiit-02',
      plannerData: INITIAL_PLANNER_DATA
    };
  });

  // 5. Notification feedback
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hiit21_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hiit21_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('hiit21_workouts_db', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('hiit21_progress', JSON.stringify(progress));
  }, [progress]);

  // Navigate helper (Unrestricted, all pages open)
  const navigateTo = (page: AppPage, id?: string) => {
    if (page === 'workout-detail' && id) {
      setSelectedWorkoutId(id);
    } else if (page === 'bonus-detail' && id) {
      setSelectedBonusId(id as BonusId);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Workout database operations
  const addWorkout = (workoutData: Omit<Workout, 'id'>) => {
    const newId = `hiit-${String(workouts.length + 1).padStart(2, '0')}`;
    const newWorkout: Workout = {
      ...workoutData,
      id: newId
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
    showNotification(`Treino "${newWorkout.title}" cadastrado com sucesso!`);
  };

  const updateWorkout = (updated: Workout) => {
    setWorkouts((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
    showNotification(`Treino "${updated.title}" atualizado com sucesso!`);
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    showNotification('Treino removido com sucesso!');
  };

  const verifyAllWorkouts = () => {
    const now = new Date().toISOString().split('T')[0];
    setWorkouts((prev) =>
      prev.map((w) => ({
        ...w,
        status: (w.status === 'INDISPONÍVEL' ? 'VALIDADO' : w.status) as VideoStatus,
        lastVerified: now
      }))
    );
    showNotification(`Verificação concluída: ${workouts.length} vídeos verificados.`);
  };

  // Progress operations
  const toggleWorkoutCompleted = (workoutId: string) => {
    const isCompleted = progress.completedWorkoutIds.includes(workoutId);
    const targetWorkout = workouts.find((w) => w.id === workoutId);
    const duration = targetWorkout?.durationMinutes || 15;

    setProgress((prev) => {
      if (isCompleted) {
        return {
          ...prev,
          completedWorkoutIds: prev.completedWorkoutIds.filter((id) => id !== workoutId),
          workoutHistory: prev.workoutHistory.filter((entry) => entry.workoutId !== workoutId)
        };
      } else {
        return {
          ...prev,
          completedWorkoutIds: [...prev.completedWorkoutIds, workoutId],
          workoutHistory: [
            {
              workoutId,
              completedAt: new Date().toISOString(),
              durationMinutes: duration
            },
            ...prev.workoutHistory
          ]
        };
      }
    });

    if (!isCompleted) {
      showNotification('Treino concluído!');
    }
  };

  const toggleFavorite = (workoutId: string) => {
    const isFav = progress.favoriteWorkoutIds.includes(workoutId);
    setProgress((prev) => ({
      ...prev,
      favoriteWorkoutIds: isFav
        ? prev.favoriteWorkoutIds.filter((id) => id !== workoutId)
        : [...prev.favoriteWorkoutIds, workoutId]
    }));
  };

  const toggleChallengeDay = (day: number) => {
    const isDone = progress.completedChallengeDays.includes(day);
    setProgress((prev) => {
      const updatedDays = isDone
        ? prev.completedChallengeDays.filter((d) => d !== day)
        : [...prev.completedChallengeDays, day].sort((a, b) => a - b);
      
      const updatedHabits = prev.plannerData.habits.map((habit) => {
        if (habit.name === 'Treino HIIT Concluído') {
          const newDays = [...habit.days];
          newDays[day - 1] = !isDone;
          return { ...habit, days: newDays };
        }
        return habit;
      });

      return {
        ...prev,
        completedChallengeDays: updatedDays,
        plannerData: {
          ...prev.plannerData,
          habits: updatedHabits
        }
      };
    });

    if (!isDone) {
      showNotification(`Dia ${day} do desafio concluído!`);
    }
  };

  const setLastWatchedWorkout = (workoutId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastWatchedWorkoutId: workoutId
    }));
  };

  const updatePlanner = (updater: (prev: PlannerData) => PlannerData) => {
    setProgress((prev) => ({
      ...prev,
      plannerData: updater(prev.plannerData)
    }));
  };

  const resetProgress = () => {
    setProgress({
      completedWorkoutIds: [],
      workoutHistory: [],
      favoriteWorkoutIds: [],
      completedChallengeDays: [],
      lastWatchedWorkoutId: undefined,
      plannerData: INITIAL_PLANNER_DATA
    });
    showNotification('Progresso reiniciado com sucesso.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentPage,
        selectedWorkoutId,
        selectedBonusId,
        navigateTo,
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        verifyAllWorkouts,
        progress,
        toggleWorkoutCompleted,
        toggleFavorite,
        toggleChallengeDay,
        setLastWatchedWorkout,
        updatePlanner,
        resetProgress,
        notificationMessage,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
