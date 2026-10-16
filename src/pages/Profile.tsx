import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Clock,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';

export const Profile: React.FC = () => {
  const {
    resetProgress,
    showNotification
  } = useApp();

  const [trainingPreference, setTrainingPreference] = useState<'manha' | 'tarde' | 'noite'>('manha');
  const [conditioningLevel, setConditioningLevel] = useState<'iniciante' | 'intermediario' | 'avancado'>('iniciante');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback(true);
    showNotification('Preferências salvas com sucesso!');
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2DA23B]/10 text-[#2DA23B] flex items-center justify-center font-bold text-xl border border-[#2DA23B]/20 shrink-0">
            <Settings className="w-7 h-7 text-[#2DA23B]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#17241B]">
              Configurações & Preferências
            </h1>
            <p className="text-xs text-[#647067] mt-0.5">
              Área de Membros HIIT 21 · Acesso Vitalício Completo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#F2FAF3] text-[#2DA23B] border border-[#2DA23B]/20 text-xs font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-[#2DA23B]" />
            Acesso Total Liberado
          </span>
        </div>
      </div>

      {/* 2. Platform Access Overview */}
      <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#17241B]">
          <ShieldCheck className="w-5 h-5 text-[#2DA23B]" />
          Conteúdos Liberados na Sua Plataforma:
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#17241B]">
          <li className="flex items-center gap-2 p-2.5 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
            <CheckCircle2 className="w-4 h-4 text-[#2DA23B] shrink-0" />
            75 videoaulas de treino em 10 categorias
          </li>
          <li className="flex items-center gap-2 p-2.5 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
            <CheckCircle2 className="w-4 h-4 text-[#2DA23B] shrink-0" />
            Desafio guiado de 21 dias com calendário
          </li>
          <li className="flex items-center gap-2 p-2.5 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
            <CheckCircle2 className="w-4 h-4 text-[#2DA23B] shrink-0" />
            Acompanhamento de progresso e histórico
          </li>
          <li className="flex items-center gap-2 p-2.5 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
            <CheckCircle2 className="w-4 h-4 text-[#2DA23B] shrink-0" />
            Os 3 Bônus digitais completos (Receitas, Planner e Hábitos)
          </li>
        </ul>
      </div>

      {/* 3. Training Preferences Form */}
      <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-[#17241B]">
            Preferências de Treino
          </h3>
          <p className="text-xs text-[#647067] mt-0.5">
            Personalize seu horário ideal e nível sugerido para as aulas.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#17241B] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#2DA23B]" />
            Turno Preferido para Praticar
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'manha', label: 'Manhã (6h às 12h)' },
              { id: 'tarde', label: 'Tarde (12h às 18h)' },
              { id: 'noite', label: 'Noite (18h às 22h)' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTrainingPreference(t.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  trainingPreference === t.id
                    ? 'bg-[#2DA23B] text-white border-[#2DA23B] font-semibold shadow-xs'
                    : 'bg-slate-50 text-[#647067] border-[#E4EDE5] hover:bg-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-[#17241B]">
            Nível de Condicionamento Inicial
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'iniciante', label: 'Iniciante' },
              { id: 'intermediario', label: 'Intermediário' },
              { id: 'avancado', label: 'Avançado' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setConditioningLevel(lvl.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  conditioningLevel === lvl.id
                    ? 'bg-[#2DA23B] text-white border-[#2DA23B] font-semibold shadow-xs'
                    : 'bg-slate-50 text-[#647067] border-[#E4EDE5] hover:bg-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#2DA23B] hover:bg-[#268932] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Salvar Preferências
          </button>

          {savedFeedback && (
            <span className="text-xs font-semibold text-[#2DA23B] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Salvo com sucesso!
            </span>
          )}
        </div>
      </form>

      {/* 4. Reset Progress Option */}
      <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-[#17241B]">
            Recomeçar o Desafio de 21 Dias
          </h4>
          <p className="text-xs text-[#647067] mt-0.5">
            Deseja reiniciar a contagem dos 21 dias e o histórico de treinos para um novo ciclo?
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('Tem certeza de que deseja zerar o progresso dos treinos e recomeçar do Dia 1?')) {
              resetProgress();
            }
          }}
          className="px-4 py-2.5 text-xs font-semibold text-[#647067] hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-[#E4EDE5] hover:border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar Progresso
        </button>
      </div>

      {/* 5. Medical Safety & Disclaimer */}
      <div className="p-5 bg-white rounded-2xl border border-[#E4EDE5] text-xs text-[#647067] space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-[#17241B]">
          <Info className="w-4 h-4 text-[#2DA23B]" />
          Orientações de Saúde e Isenção de Responsabilidade
        </div>
        <p className="leading-relaxed">
          A plataforma HIIT 21 é voltada para a promoção de saúde, movimento e bem-estar. Recomendamos sempre respeitar os limites do seu próprio corpo, fazer aquecimentos adequados e consultar um profissional de saúde antes de iniciar atividades intensas.
        </p>
      </div>
    </div>
  );
};
