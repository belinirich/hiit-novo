import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BONUSES_LIST, RECIPES_DATA, STRETCH_MOVEMENTS, Recipe, StretchMovement } from '../data/bonuses';
import { BonusId } from '../types';
import {
  BookOpen,
  ArrowRight,
  Printer,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  Droplets,
  ShoppingCart,
  Utensils,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const Bonuses: React.FC = () => {
  const {
    selectedBonusId,
    navigateTo,
    progress,
    updatePlanner,
    showNotification
  } = useApp();

  const [activeBonusTab, setActiveBonusTab] = useState<BonusId>(selectedBonusId || 'alimentacao');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>('Todas');
  const [userWeightKg, setUserWeightKg] = useState<number>(65);

  // Water hydration calculator (35ml per kg)
  const waterTargetMl = Math.round(userWeightKg * 35);
  const waterGlasses = Math.round(waterTargetMl / 250);

  // Filter recipes
  const filteredRecipes = recipeCategoryFilter === 'Todas'
    ? RECIPES_DATA
    : RECIPES_DATA.filter((r) => r.category === recipeCategoryFilter);

  // Planner handlers
  const handleToggleHabitDay = (habitIndex: number, dayIndex: number) => {
    updatePlanner((prev) => {
      const updatedHabits = [...prev.habits];
      const targetHabit = { ...updatedHabits[habitIndex] };
      const newDays = [...targetHabit.days];
      newDays[dayIndex] = !newDays[dayIndex];
      targetHabit.days = newDays;
      updatedHabits[habitIndex] = targetHabit;
      return { ...prev, habits: updatedHabits };
    });
  };

  const handleToggleChecklist = (dayIndex: number) => {
    updatePlanner((prev) => {
      const updated = [...prev.dailyChecklist];
      updated[dayIndex] = !updated[dayIndex];
      return { ...prev, dailyChecklist: updated };
    });
  };

  const handleGoalChange = (weekKey: 'weeklyGoal1' | 'weeklyGoal2' | 'weeklyGoal3', value: string) => {
    updatePlanner((prev) => ({
      ...prev,
      [weekKey]: value
    }));
  };

  const handlePrintPlanner = () => {
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2DA23B]">
              Materiais Exclusivos
            </span>
            <span className="text-[#647067]">·</span>
            <span className="text-xs text-[#647067]">
              4 Bônus Digitais Completos
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#17241B] tracking-tight">
            Meus Bônus
          </h1>
          <p className="mt-1 text-sm text-[#647067]">
            Guias de alimentação, planejamento diário, alongamentos ilustrados e psicologia de hábitos.
          </p>
        </div>
      </div>

      {/* 2. Top Bonus Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 no-print">
        {BONUSES_LIST.map((b) => {
          const isActive = activeBonusTab === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBonusTab(b.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-white border-[#2DA23B] shadow-sm ring-2 ring-[#2DA23B]/30'
                  : 'bg-white/80 border-[#E4EDE5] hover:bg-white text-[#647067]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-[#2DA23B]' : 'text-[#647067]'}`}>
                  {b.numberLabel}
                </span>
                <span className="text-[10px] text-[#647067] font-medium">{b.category}</span>
              </div>
              <h4 className="mt-1.5 text-sm font-bold text-[#17241B] line-clamp-1">
                {b.title}
              </h4>
              <p className="mt-1 text-xs text-[#647067] line-clamp-2 leading-relaxed">
                {b.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* ================= BÔNUS 01: GUIA DE ALIMENTAÇÃO ================= */}
      {activeBonusTab === 'alimentacao' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Hero Banner */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#2DA23B] bg-[#2DA23B]/10">
              BÔNUS 01 · NUTRIÇÃO SUSTENTÁVEL
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17241B]">
              Guia Prático de Alimentação Equilibrada
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed max-w-3xl">
              Alimente-se com comida de verdade para potencializar a queima de gordura e ganhar energia durante seus treinos HIIT, sem passar fome e sem dietas restritivas malucas.
            </p>

            <div className="pt-3 border-t border-[#E4EDE5] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
                <strong className="text-[#17241B] block mb-1">Regra dos 3 Grupos</strong>
                <p className="text-[#647067]">Metade do prato com vegetais coloridos, 1/4 proteína magra e 1/4 carboidratos complexos.</p>
              </div>
              <div className="p-3 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
                <strong className="text-[#17241B] block mb-1">Constância sobre Perfeição</strong>
                <p className="text-[#647067]">Se cometer um deslize numa refeição, retome imediatamente na seguinte sem culpa.</p>
              </div>
              <div className="p-3 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20">
                <strong className="text-[#17241B] block mb-1">Foco na Saciedade</strong>
                <p className="text-[#647067]">Proteínas e fibras geram saciedade real e previnem beliscos noturnos.</p>
              </div>
            </div>
          </div>

          {/* Interactive Hydration Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-[#17241B]">
              <Droplets className="w-5 h-5 text-[#2DA23B]" />
              Calculadora de Hidratação Inteligente
            </div>
            <p className="text-xs sm:text-sm text-[#647067]">
              O HIIT eleva a taxa de suor. A fórmula recomendada pela medicina do esporte é de <strong>35ml de água por quilo</strong> de peso corporal por dia.
            </p>

            <div className="p-4 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-[#17241B]">Seu peso atual:</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="40"
                    max="180"
                    value={userWeightKg}
                    onChange={(e) => setUserWeightKg(Number(e.target.value) || 60)}
                    className="w-20 px-3 py-1.5 bg-white border border-[#E4EDE5] rounded-lg text-sm font-bold text-[#17241B] text-center"
                  />
                  <span className="text-xs text-[#647067]">kg</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#647067] font-semibold">Meta Diária:</span>
                  <div className="text-xl font-bold text-[#2DA23B] tabular-nums">
                    {(waterTargetMl / 1000).toFixed(2)} Litros
                  </div>
                </div>
                <div className="pl-4 border-l border-[#2DA23B]/20">
                  <span className="text-[11px] uppercase tracking-wider text-[#647067] font-semibold">Equivalente a:</span>
                  <div className="text-xl font-bold text-[#17241B] tabular-nums">
                    {waterGlasses} copos (250ml)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Grocery List */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-[#17241B]">
              <ShoppingCart className="w-5 h-5 text-[#2DA23B]" />
              Lista de Compras Inteligente Semanal
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-[#E4EDE5]">
                <strong className="text-[#17241B] block mb-2 font-bold">1. Proteínas Magras</strong>
                <ul className="space-y-1.5 text-[#647067]">
                  <li>• Ovos caipiras / brancos</li>
                  <li>• Peito de frango em filé</li>
                  <li>• Peixe branco (tilápia)</li>
                  <li>• Carne moída magra (patinho)</li>
                  <li>• Atum em pedaços / água</li>
                  <li>• Iogurte natural desnatado</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-[#E4EDE5]">
                <strong className="text-[#17241B] block mb-2 font-bold">2. Carboidratos do Bem</strong>
                <ul className="space-y-1.5 text-[#647067]">
                  <li>• Farelo de aveia / aveia em flocos</li>
                  <li>• Batata-doce ou mandioquinha</li>
                  <li>• Arroz integral ou quinoa</li>
                  <li>• Goma de tapioca fresca</li>
                  <li>• Frutas: bananas, maçãs, morangos</li>
                  <li>• Pão 100% integral de sementes</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-[#E4EDE5]">
                <strong className="text-[#17241B] block mb-2 font-bold">3. Vegetais & Folhas</strong>
                <ul className="space-y-1.5 text-[#647067]">
                  <li>• Brócolis e abobrinha</li>
                  <li>• Abóbora cabotiá</li>
                  <li>• Rúcula, alface e espinafre</li>
                  <li>• Cenoura e pepino japonês</li>
                  <li>• Tomate-cereja e cebola</li>
                  <li>• Alho e limão fresco</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-[#E4EDE5]">
                <strong className="text-[#17241B] block mb-2 font-bold">4. Gorduras Saudáveis</strong>
                <ul className="space-y-1.5 text-[#647067]">
                  <li>• Azeite de oliva extravirgem</li>
                  <li>• Abacate maduro</li>
                  <li>• Castanhas-do-pará e caju</li>
                  <li>• Sementes de chia e linhaça</li>
                  <li>• Pasta de amendoim 100% pura</li>
                  <li>• Canela e cúrcuma em pó</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 20 Complete Recipes */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-base font-bold text-[#17241B]">
                  <Utensils className="w-5 h-5 text-[#2DA23B]" />
                  20 Sugestões de Refeições Completas
                </div>
                <p className="text-xs text-[#647067] mt-0.5">
                  Todas com ingredientes reais e passo a passo rápido de preparo.
                </p>
              </div>

              {/* Recipe filter tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['Todas', 'Café da Manhã', 'Almoço', 'Lanche Prático', 'Jantar Leve'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRecipeCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      recipeCategoryFilter === cat
                        ? 'bg-[#2DA23B] text-white font-semibold'
                        : 'bg-slate-100 text-[#647067] hover:text-[#17241B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipes Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-5 rounded-2xl border border-[#E4EDE5] hover:border-[#2DA23B]/30 bg-[#F2FAF3]/40 flex flex-col justify-between space-y-3 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-[#2DA23B] uppercase tracking-wider">
                        {recipe.category}
                      </span>
                      <span className="text-xs text-[#647067] tabular-nums flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#2DA23B]" />
                        {recipe.prepTime}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#17241B]">
                      {recipe.name}
                    </h4>

                    {/* Ingredients */}
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-[#17241B] block mb-1">Ingredientes:</span>
                      <ul className="text-xs text-[#647067] space-y-0.5">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>• {ing}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions */}
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-[#17241B] block mb-1">Como Preparar:</span>
                      <ol className="text-xs text-[#647067] space-y-1 list-decimal list-inside">
                        {recipe.instructions.map((step, s) => (
                          <li key={s} className="leading-relaxed">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E4EDE5] text-[11px] text-[#2DA23B] italic">
                    💡 <strong>Dica da nutricionista:</strong> {recipe.tip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= BÔNUS 02: PLANNER DE 21 DIAS ================= */}
      {activeBonusTab === 'planner' && (
        <div className="space-y-6 animate-in fade-in duration-150 print-page">
          {/* Header & Print CTA */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EDE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#2DA23B] bg-[#2DA23B]/10">
                BÔNUS 02 · PLANNER DIGITAL & IMPRIMÍVEL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17241B] mt-2">
                Planner de 21 Dias HIIT 21
              </h2>
              <p className="text-sm text-[#647067] mt-1 max-w-xl">
                Preencha seus objetivos direto no navegador ou clique no botão ao lado para imprimir a folha em formato A4 limpo.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrintPlanner}
              className="px-5 py-3 bg-[#2DA23B] hover:bg-[#268932] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 no-print"
            >
              <Printer className="w-4 h-4" />
              Imprimir Versão A4
            </button>
          </div>

          {/* Weekly Goals Section */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17241B] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2DA23B]" />
              Metas de Foco por Semana
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2DA23B]">
                  Semana 1: Adaptação
                </span>
                <textarea
                  rows={2}
                  value={progress.plannerData.weeklyGoal1}
                  onChange={(e) => handleGoalChange('weeklyGoal1', e.target.value)}
                  className="w-full p-2 bg-white border border-[#E4EDE5] rounded-lg text-xs text-[#17241B] outline-hidden focus:border-[#2DA23B]"
                  placeholder="Escreva sua meta da semana 1..."
                />
              </div>

              <div className="p-4 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2DA23B]">
                  Semana 2: Aceleração
                </span>
                <textarea
                  rows={2}
                  value={progress.plannerData.weeklyGoal2}
                  onChange={(e) => handleGoalChange('weeklyGoal2', e.target.value)}
                  className="w-full p-2 bg-white border border-[#E4EDE5] rounded-lg text-xs text-[#17241B] outline-hidden focus:border-[#2DA23B]"
                  placeholder="Escreva sua meta da semana 2..."
                />
              </div>

              <div className="p-4 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2DA23B]">
                  Semana 3: Consolidação
                </span>
                <textarea
                  rows={2}
                  value={progress.plannerData.weeklyGoal3}
                  onChange={(e) => handleGoalChange('weeklyGoal3', e.target.value)}
                  className="w-full p-2 bg-white border border-[#E4EDE5] rounded-lg text-xs text-[#17241B] outline-hidden focus:border-[#2DA23B]"
                  placeholder="Escreva sua meta da semana 3..."
                />
              </div>
            </div>
          </div>

          {/* Interactive 21-Day Habit Tracker Grid */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4 overflow-x-auto">
            <div>
              <h3 className="text-base font-bold text-[#17241B]">
                Rastreador de 4 Hábitos Essenciais (21 Dias)
              </h3>
              <p className="text-xs text-[#647067] mt-0.5">
                Marque cada caixinha ao completar o hábito no dia. Seus dados são salvos automaticamente.
              </p>
            </div>

            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E4EDE5]">
                  <th className="py-2.5 text-left font-bold text-[#17241B] min-w-[150px]">
                    Hábito Diário
                  </th>
                  {Array.from({ length: 21 }, (_, i) => (
                    <th key={i} className="py-2.5 px-1 text-center font-semibold text-[#647067] min-w-[26px]">
                      D{i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EDE5]">
                {progress.plannerData.habits.map((habit, habitIdx) => (
                  <tr key={habit.name} className="hover:bg-slate-50/50">
                    <td className="py-3 font-semibold text-[#17241B]">
                      {habit.name}
                    </td>
                    {habit.days.map((checked, dayIdx) => (
                      <td key={dayIdx} className="py-2 px-1 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleHabitDay(habitIdx, dayIdx)}
                          className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-[#2DA23B] text-white'
                              : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 21 Days Simple Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#17241B]">
              Checklist Diário dos 21 Dias
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
              {Array.from({ length: 21 }, (_, i) => {
                const isChecked = progress.plannerData.dailyChecklist[i];
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleToggleChecklist(i)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                      isChecked
                        ? 'bg-[#2DA23B] text-white border-[#2DA23B]'
                        : 'bg-slate-50 text-[#17241B] border-[#E4EDE5] hover:bg-white'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase">Dia {i + 1}</span>
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Final Reflection */}
          <div className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-3">
            <h3 className="text-base font-bold text-[#17241B]">
              Reflexão e Conquistas dos 21 Dias
            </h3>
            <textarea
              rows={3}
              value={progress.plannerData.finalReflection}
              onChange={(e) => {
                const val = e.target.value;
                updatePlanner((prev) => ({ ...prev, finalReflection: val }));
              }}
              placeholder="O que você mais sentiu mudar no seu corpo e na sua mente após essas 3 semanas de disciplina?"
              className="w-full p-3 bg-slate-50 border border-[#E4EDE5] rounded-xl text-xs sm:text-sm text-[#17241B] outline-hidden focus:bg-white focus:border-[#2DA23B]"
            />
          </div>
        </div>
      )}

      {/* ================= BÔNUS 03: GUIA VISUAL DE ALONGAMENTOS ================= */}
      {activeBonusTab === 'alongamentos' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#2DA23B] bg-[#2DA23B]/10">
              BÔNUS 03 · RECUPERAÇÃO ARTICULAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17241B]">
              Guia Visual de Alongamentos & Mobilidade
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed max-w-3xl">
              8 posturas essenciais fundamentadas na fisioterapia esportiva para soltar tensões, melhorar a amplitude dos agachamentos e evitar qualquer desconforto lombar.
            </p>
          </div>

          {/* Stretch Movements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STRETCH_MOVEMENTS.map((mov, idx) => (
              <div
                key={mov.id}
                className="bg-white p-6 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#2DA23B]">
                      Postura 0{idx + 1}
                    </span>
                    <span className="text-xs text-[#647067] font-semibold tabular-nums">
                      {mov.suggestedDuration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#17241B]">
                    {mov.name}
                  </h3>
                  <p className="text-xs text-[#2DA23B] font-semibold mt-0.5">
                    Região trabalhada: {mov.targetArea}
                  </p>

                  {/* Step by Step */}
                  <div className="mt-3.5 space-y-1.5">
                    <span className="text-xs font-bold text-[#17241B] block">Passo a Passo:</span>
                    <ol className="text-xs text-[#647067] space-y-1 list-decimal list-inside leading-relaxed">
                      {mov.stepByStep.map((step, s) => (
                        <li key={s}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Posture Attention */}
                  <div className="mt-3 p-3 bg-[#F2FAF3] rounded-xl border border-[#2DA23B]/20 text-xs text-[#17241B]">
                    <strong>Atenção Postural:</strong> {mov.postureAttention}
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="pt-3 border-t border-[#E4EDE5]">
                  <span className="text-xs font-bold text-rose-700 block mb-1">
                    Erros Comuns a Evitar:
                  </span>
                  <ul className="text-xs text-[#647067] space-y-0.5">
                    {mov.commonMistakes.map((err, e) => (
                      <li key={e}>❌ {err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= BÔNUS 04: GUIA DE CONSISTÊNCIA ================= */}
      {activeBonusTab === 'consistencia' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4EDE5] shadow-xs space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#2DA23B] bg-[#2DA23B]/10">
              BÔNUS 04 · CIÊNCIA COMPORTAMENTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17241B]">
              Guia Definitivo de Consistência & Hábitos
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed max-w-3xl">
              Por que a força de vontade falha e como construir sistemas automáticos para treinar em casa mesmo quando o dia for cansativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                cap: 'Capítulo 01',
                title: 'A Regra dos 2 Minutos para Treinar Sem Pensar',
                content:
                  'A maior barreira para o exercício em casa não é o esforço físico da aula, mas a transição mental de começar. Reduza o hábito à sua menor fração: prometa a si mesma apenas colocar o tênis e apertar o play por 2 minutos. Se quiser parar depois, você tem permissão. Mais de 90% das vezes, você continuará a aula até o final.'
              },
              {
                cap: 'Capítulo 02',
                title: 'O Ambiente Vencedor: Deixe o Caminho Livre',
                content:
                  'A preguiça surge do atrito. Se para treinar você precisa afastar o sofá, procurar o colchonete em outro cômodo e recarregar o fone de ouvido, seu cérebro escolherá o repouso. Deixe suas roupas de treino separadas na noite anterior e o espaço da sala já organizado.'
              },
              {
                cap: 'Capítulo 03',
                title: 'Metas de Processo vs Frustração de Balança',
                content:
                  'O peso na balança oscila por água, hormônios e digestão, gerando desmotivação injustificada. No HIIT 21, sua meta principal deve ser de processo: "Vou concluir 4 treinos esta semana". Quando você foca no processo diário, a transformação física torna-se uma consequência natural.'
              },
              {
                cap: 'Capítulo 04',
                title: 'Protocolo Retomada: A Regra de Nunca Falhar Duas Vezes',
                content:
                  'Perder um dia por imprevisto, cansaço extremo ou trabalho faz parte da vida de qualquer ser humano. O erro fatal é permitir que uma falha vire um padrão. A regra de ouro é: nunca falhe dois dias seguidos. Se não deu para treinar hoje, amanhã faça mesmo que seja a aula mais rápida de 10 minutos.'
              }
            ].map((card, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-[#E4EDE5] shadow-xs space-y-3">
                <span className="text-xs font-bold text-[#2DA23B] uppercase tracking-wider">
                  {card.cap}
                </span>
                <h3 className="text-lg font-bold text-[#17241B]">
                  {card.title}
                </h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  {card.content}
                </p>
              </div>
            ))}
          </div>

          {/* Daily Winning Checklist */}
          <div className="p-6 bg-[#F2FAF3] rounded-2xl border border-[#2DA23B]/20 space-y-3">
            <h3 className="text-base font-bold text-[#17241B] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2DA23B]" />
              Checklist Diário da Mulher Consistente
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#17241B]">
              <div className="p-3 bg-white rounded-xl border border-[#E4EDE5]">
                ✓ Tomar 1 copo grande de água logo ao levantar da cama.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E4EDE5]">
                ✓ Deixar o horário do treino bloqueado na agenda como um compromisso inadiável.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E4EDE5]">
                ✓ Não se comparar com o ritmo ou estética de outras pessoas nas redes sociais.
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E4EDE5]">
                ✓ Comemorar cada gota de suor como um voto de amor próprio.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
