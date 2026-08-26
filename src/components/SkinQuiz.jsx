import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Sun, 
  ShoppingBag,
  Target,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export default function SkinQuiz({ onQuizSubmit, initialAnswers = {}, onBackToScan }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState({
    skin_type_feel: 'combination',
    primary_concerns: ['dark_spots', 'dullness'],
    lifestyle_sun: 'moderate',
    routine_experience: 'balanced',
    budget_store: 'mid',
    ...initialAnswers
  });

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const totalSteps = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleOptionSelect = (optionId) => {
    if (currentQuestion.multiSelect) {
      const existing = answers[currentQuestion.id] || [];
      let updated;
      if (existing.includes(optionId)) {
        updated = existing.filter(id => id !== optionId);
      } else {
        if (currentQuestion.maxSelect && existing.length >= currentQuestion.maxSelect) {
          // Replace first if max reached or ignore
          updated = [...existing.slice(1), optionId];
        } else {
          updated = [...existing, optionId];
        }
      }
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: updated }));
    } else {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    }
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      triggerCelebration();
      if (onQuizSubmit) {
        onQuizSubmit(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else if (onBackToScan) {
      onBackToScan();
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#F472B6', '#FDA4AF', '#BE185D', '#FDE047']
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const isCurrentStepValid = () => {
    const ans = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return Array.isArray(ans) && ans.length > 0;
    }
    return !!ans;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
          <span>Step 2 of 2: Skin Health Assessment</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Personalized <span className="text-gradient-slay">Skin Diagnostic Quiz</span>
        </h2>
        <p className="text-sm text-gray-600">
          Answer a few quick questions to match everyday non-medicated skincare products perfectly suited to your skin type.
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="glass-card rounded-2xl p-4 mb-6 border border-pink-200/90 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
          <span>Question {currentStepIndex + 1} of {totalSteps}</span>
          <span className="text-pink-600">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 h-full rounded-full transition-all duration-300 shadow-xs"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-xl space-y-6">
        
        {/* Question Title & Subtitle */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-pink-600 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>{currentQuestion.multiSelect ? `Multiple Choice (Max ${currentQuestion.maxSelect || 3})` : 'Single Choice'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
            {currentQuestion.title}
          </h3>
          {currentQuestion.subtitle && (
            <p className="text-xs sm:text-sm text-gray-500">
              {currentQuestion.subtitle}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="grid grid-cols-1 gap-3.5">
          {currentQuestion.options.map((opt) => {
            const isSelected = currentQuestion.multiSelect
              ? (answers[currentQuestion.id] || []).includes(opt.id)
              : answers[currentQuestion.id] === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => handleOptionSelect(opt.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-start gap-4 ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/5 border-pink-500 shadow-md shadow-pink-500/10 scale-101'
                    : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                {/* Checkbox / Radio Circle */}
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-pink-500 text-white shadow-xs'
                    : 'border-2 border-pink-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Option Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm sm:text-base font-extrabold text-gray-900">
                      {opt.label}
                    </p>
                    {opt.badge && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 whitespace-nowrap">
                        {opt.badge}
                      </span>
                    )}
                    {opt.tag && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 whitespace-nowrap">
                        {opt.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-pink-100">
          <button
            onClick={handlePrevious}
            className="btn-slay-secondary px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStepIndex === 0 ? 'Back to Face Scan' : 'Previous'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!isCurrentStepValid()}
            className="btn-slay-primary px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg disabled:opacity-50"
          >
            <span>{currentStepIndex === totalSteps - 1 ? 'Generate My Slay Report ✨' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
