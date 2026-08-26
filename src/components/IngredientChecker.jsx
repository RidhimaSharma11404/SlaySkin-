import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Info,
  Droplets,
  HelpCircle
} from 'lucide-react';
import { analyzeIngredientList, INGREDIENT_DICTIONARY } from '../data/ingredientsData';

export default function IngredientChecker() {
  const [inputText, setInputText] = useState(
    'Aqua/Water, Niacinamide, Glycerin, Sodium Hyaluronate, Salicylic Acid, Centella Asiatica Extract, Ceramides, Parfum, Coconut Oil'
  );
  const [analyzedList, setAnalyzedList] = useState(() => 
    analyzeIngredientList('Aqua/Water, Niacinamide, Glycerin, Sodium Hyaluronate, Salicylic Acid, Centella Asiatica Extract, Ceramides, Parfum, Coconut Oil')
  );

  const handleAnalyze = () => {
    const results = analyzeIngredientList(inputText);
    setAnalyzedList(results);
  };

  const loadSample = (type) => {
    let sample = '';
    if (type === 'glass') {
      sample = 'Water, Niacinamide, Hyaluronic Acid, Centella Asiatica, Panthenol, Glycerin, Squalane';
    } else if (type === 'acne') {
      sample = 'Water, Salicylic Acid, Tea Tree Oil, Zinc PCA, Betaine, Allantoin, Glycerin';
    } else if (type === 'warning') {
      sample = 'Water, Mineral Oil, Isopropyl Palmitate, Coconut Oil, Synthetic Fragrance, Denatured Alcohol';
    }
    setInputText(sample);
    setAnalyzedList(analyzeIngredientList(sample));
  };

  const safeCount = analyzedList.filter(i => i.status === 'good').length;
  const warningCount = analyzedList.filter(i => i.status === 'warning').length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
          <FlaskConical className="w-3.5 h-3.5 text-pink-500" />
          <span>Ingredient Safety & Comedogenic Scanner</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Smart Skincare <span className="text-gradient-slay">Ingredient Checker</span>
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Paste the ingredient list on the back of any facewash, serum or moisturizer bottle to check pore-clogging comedogenic ratings and active benefits.
        </p>
      </div>

      {/* Input Form Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 border border-pink-200 shadow-xl space-y-4">
        
        {/* Sample presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Quick Samples:</span>
          <button
            onClick={() => loadSample('glass')}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-pink-100/70 text-pink-700 hover:bg-pink-200 transition-colors"
          >
            ✨ Glass Skin Serum
          </button>
          <button
            onClick={() => loadSample('acne')}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-100/70 text-purple-700 hover:bg-purple-200 transition-colors"
          >
            🌿 Acne Defense Cleanser
          </button>
          <button
            onClick={() => loadSample('warning')}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-100/70 text-rose-700 hover:bg-rose-200 transition-colors"
          >
            ⚠️ High Comedogenic Test
          </button>
        </div>

        {/* Text Area */}
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste comma-separated ingredients here, e.g. Water, Niacinamide, Glycerin..."
          className="w-full p-4 rounded-2xl bg-white/90 border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-hidden text-xs sm:text-sm text-gray-800 leading-relaxed font-mono"
        />

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            className="btn-slay-primary px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze {analyzedList.length} Ingredients</span>
          </button>
        </div>

      </div>

      {/* Summary Score Bar */}
      {analyzedList.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-4 text-center border border-pink-100 shadow-xs">
            <p className="text-[11px] font-bold text-gray-500 uppercase">Total Actives Found</p>
            <p className="text-2xl font-black text-gray-900">{analyzedList.length}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center border border-emerald-100 shadow-xs bg-emerald-50/30">
            <p className="text-[11px] font-bold text-emerald-700 uppercase">Beneficial / Safe</p>
            <p className="text-2xl font-black text-emerald-600">{safeCount}</p>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center border border-rose-100 shadow-xs bg-rose-50/30">
            <p className="text-[11px] font-bold text-rose-700 uppercase">High Caution Flags</p>
            <p className="text-2xl font-black text-rose-600">{warningCount}</p>
          </div>
        </div>
      )}

      {/* Detailed Ingredients Breakdown List */}
      <div className="space-y-3">
        {analyzedList.map((item, idx) => (
          <div
            key={idx}
            className={`glass-card rounded-2xl p-4 border transition-all ${
              item.status === 'warning'
                ? 'border-rose-300 bg-rose-50/30'
                : item.status === 'good'
                ? 'border-pink-200'
                : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-gray-900">{item.name}</span>
                  {item.status === 'warning' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      <span>Caution</span>
                    </span>
                  ) : item.status === 'good' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Beneficial</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">
                      Standard
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-3 text-xs font-bold self-start sm:self-auto">
                <div className="bg-white px-2.5 py-1 rounded-lg border border-pink-100 text-gray-700">
                  Comedogenic: <b className={item.comedogenicRating > 2 ? 'text-rose-600' : 'text-emerald-600'}>{item.comedogenicRating}/5</b>
                </div>
                <div className="bg-white px-2.5 py-1 rounded-lg border border-pink-100 text-gray-700">
                  Irritation: <b className={item.irritationRating > 1 ? 'text-rose-600' : 'text-emerald-600'}>{item.irritationRating}/3</b>
                </div>
              </div>

            </div>

            {/* Explanation & Benefits */}
            <div className="mt-3 pt-3 border-t border-pink-100/60 text-xs text-gray-600 space-y-1">
              {item.benefits && item.benefits.length > 0 && (
                <p>
                  <b className="text-pink-700">Key Role:</b> {item.benefits.join(' • ')}
                </p>
              )}
              {item.caution && (
                <p className="text-rose-700 font-medium flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.caution}</span>
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
