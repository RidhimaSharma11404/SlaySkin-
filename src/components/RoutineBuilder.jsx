import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  Share2, 
  Info,
  Droplets
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoutineBuilder({ amRoutine = [], pmRoutine = [], skinType = 'combination' }) {
  const [activeTime, setActiveTime] = useState('AM');
  const [completedSteps, setCompletedSteps] = useState({});

  const currentRoutine = activeTime === 'AM' ? amRoutine : pmRoutine;

  const toggleStepCompleted = (stepNumber) => {
    const key = `${activeTime}_${stepNumber}`;
    const nextState = !completedSteps[key];
    setCompletedSteps(prev => ({ ...prev, [key]: nextState }));

    if (nextState) {
      const allDone = currentRoutine.every(s => 
        s.stepNumber === stepNumber || completedSteps[`${activeTime}_${s.stepNumber}`]
      );
      if (allDone) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#F472B6', '#EC4899', '#FDE047']
          });
        } catch(e) {}
      }
    }
  };

  const completedCount = currentRoutine.filter(s => completedSteps[`${activeTime}_${s.stepNumber}`]).length;
  const progressPercent = currentRoutine.length > 0 
    ? Math.round((completedCount / currentRoutine.length) * 100) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5 text-pink-500" />
          <span>Daily Skincare Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Personalized <span className="text-gradient-slay">AM & PM Routine</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-lg mx-auto">
          Tailored daily application order designed for {skinType} skin. Follow these steps sequentially for best results.
        </p>
      </div>

      {/* AM / PM Toggle Card */}
      <div className="flex justify-center">
        <div className="glass-pill p-1.5 rounded-2xl flex items-center gap-2 shadow-xs">
          <button
            onClick={() => setActiveTime('AM')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTime === 'AM'
                ? 'bg-amber-400 text-amber-950 shadow-sm scale-102'
                : 'text-gray-600 hover:text-amber-600'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-600" />
            <span>Morning Ritual (AM)</span>
          </button>

          <button
            onClick={() => setActiveTime('PM')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              activeTime === 'PM'
                ? 'bg-indigo-900 text-white shadow-sm scale-102'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Night Ritual (PM)</span>
          </button>
        </div>
      </div>

      {/* Progress & Checklist Tracker */}
      <div className="glass-card rounded-2xl p-4 border border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 font-black text-sm">
            {completedCount}/{currentRoutine.length}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">
              {activeTime === 'AM' ? 'Morning Checklist' : 'Evening Checklist'}
            </p>
            <p className="text-[11px] text-gray-500">
              {progressPercent === 100 ? 'All steps completed! Skin is slaying ✨' : 'Check off each step after application'}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-48 bg-pink-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-400 to-rose-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps Timeline Container */}
      <div className="space-y-4">
        {currentRoutine.map((step, idx) => {
          const isDone = !!completedSteps[`${activeTime}_${step.stepNumber}`];
          const prod = step.product;

          return (
            <div
              key={idx}
              className={`glass-card rounded-3xl p-5 border transition-all ${
                isDone
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-pink-200/90 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Left: Step Number + Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  
                  {/* Step Number Circle */}
                  <div
                    onClick={() => toggleStepCompleted(step.stepNumber)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 cursor-pointer transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : 'bg-pink-500 text-white shadow-md shadow-pink-500/20 hover:scale-105'
                    }`}
                    title="Click to check off"
                  >
                    {isDone ? <Check className="w-6 h-6 stroke-[3]" /> : `Step ${step.stepNumber}`}
                  </div>

                  {/* Product thumbnail */}
                  {prod && (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-pink-200 shrink-0"
                    />
                  )}

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-pink-100 text-pink-700">
                        {step.stepName}
                      </span>
                      {prod && (
                        <span className="text-[10px] text-gray-500 font-bold">
                          • {prod.brand}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-black text-gray-900 truncate mt-0.5">
                      {prod ? prod.name : step.stepName}
                    </h4>

                    {step.tip && (
                      <p className="text-xs text-pink-800/80 font-medium flex items-center gap-1.5 mt-1">
                        <Info className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span>{step.tip}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Right: Store Link & Checkbox Button */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {prod && prod.links.amazon && (
                    <a
                      href={prod.links.amazon}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>Amazon</span>
                      <ExternalLink className="w-3 h-3 text-amber-700" />
                    </a>
                  )}

                  <button
                    onClick={() => toggleStepCompleted(step.stepNumber)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'btn-slay-primary'
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
