import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Login: React.FC = () => {
  const { setCurrentUser, navigateTo, showNotification } = useApp();

  const handleEnter = () => {
    setCurrentUser({
      id: 'membro-hiit21',
      joinedAt: '2026-01-01'
    });
    showNotification('Acesso liberado à plataforma!');
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E4EDE5] shadow-xl p-6 sm:p-8 space-y-6 text-center">
        {/* Brand Header */}
        <div className="space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#2DA23B] text-white flex items-center justify-center mx-auto shadow-md">
            <Zap className="w-8 h-8 fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#17241B] tracking-tight">
            HIIT <span className="text-[#2DA23B]">21</span>
          </h1>
          <p className="text-xs text-[#647067]">
            Área de Membros Oficial · Acesso Exclusivo
          </p>
        </div>

        {/* Benefits list */}
        <div className="p-4 bg-[#F2FAF3] rounded-2xl border border-[#2DA23B]/20 text-xs text-left space-y-2">
          <span className="font-bold text-[#17241B] block">
            Conteúdo Completo Disponível:
          </span>
          <ul className="space-y-1.5 text-[#647067]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA23B]" />
              75 videoaulas em 10 categorias
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA23B]" />
              Desafio guiado de 21 dias com calendário
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA23B]" />
              Guia de alimentação (20 receitas) e Planner A4
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2DA23B]" />
              Guia definitivo de consistência e hábitos
            </li>
          </ul>
        </div>

        {/* Single Click Entry Button */}
        <button
          type="button"
          onClick={handleEnter}
          className="w-full min-h-[48px] py-3.5 bg-[#2DA23B] hover:bg-[#268932] text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>Entrar na Área de Membros</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1 text-[11px] text-[#647067]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2DA23B]" />
          <span>Acesso seguro e sem complicações</span>
        </div>
      </div>
    </div>
  );
};
