import React, { useRef } from 'react';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Download, 
  Share2, 
  Calendar, 
  ShoppingBag, 
  Droplets, 
  Flame, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function AnalysisResults({ report, onNavigateToProducts, onNavigateToRoutine, onRetakeScan }) {
  const reportRef = useRef(null);

  if (!report) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 mx-auto flex items-center justify-center">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">No Analysis Found Yet</h3>
        <p className="text-sm text-gray-600">Please complete the Face Scan or Skincare Quiz first to unlock your personalized report.</p>
        <button onClick={onRetakeScan} className="btn-slay-primary px-6 py-2.5 rounded-xl text-xs font-bold">
          Start Skin Scan
        </button>
      </div>
    );
  }

  const {
    overallScore = 88,
    detectedSkinType = 'combination',
    estimatedSkinAge = 21,
    radarScores = { hydration: 80, texture: 75, oilBalance: 70, poreClarity: 78, barrierHealth: 85, radiance: 82 },
    rawConcerns = ['dullness', 'large_pores'],
    heroActives = [],
    avoids = [],
    tips = [],
    matchedProducts = []
  } = report;

  const downloadReportPDF = async () => {
    if (!reportRef.current) return;
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#FFF5F8' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`SlaySkin-Glow-Report-${detectedSkinType}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Could not export PDF automatically. You can take a screenshot of your Glow Report!');
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { label: 'Glass Skin Glow', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (score >= 80) return { label: 'Radiant & Healthy', color: 'bg-pink-100 text-pink-800 border-pink-300' };
    if (score >= 70) return { label: 'Balanced Moisture', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: 'Needs Barrier Boost', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  const badge = getScoreBadge(overallScore);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-pink-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold uppercase tracking-wide">
              ML Diagnostic Report
            </span>
            <span className={`px-3 py-1 rounded-full border text-xs font-bold ${badge.color}`}>
              {badge.label}
            </span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mt-1">
            Your Personalized <span className="text-gradient-slay">SlaySkin Report</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadReportPDF}
            className="btn-slay-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Card</span>
          </button>
          <button
            onClick={onRetakeScan}
            className="px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Scan</span>
          </button>
        </div>
      </div>

      {/* Printable / Viewable Report Container */}
      <div ref={reportRef} className="space-y-8 p-1 sm:p-2">
        
        {/* Row 1: Slay Score Card + Profile Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Slay Score Hero Box */}
          <div className="md:col-span-5 glass-card rounded-3xl p-6 sm:p-8 text-center border-2 border-pink-300 relative overflow-hidden flex flex-col justify-center items-center shadow-xl">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-400/20 rounded-full blur-2xl pointer-events-none" />
            
            <p className="text-xs font-extrabold text-pink-600 uppercase tracking-wider mb-2">
              Overall Skin Health Index
            </p>
            
            <div className="relative my-3">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 flex items-center justify-center text-white shadow-2xl shadow-pink-500/40 animate-pulse-glow">
                <div className="text-center">
                  <span className="text-5xl font-black leading-none">{overallScore}</span>
                  <span className="text-xs font-bold block text-pink-100">/ 100 Slay</span>
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
            </div>

            <h3 className="text-lg font-black text-gray-900 capitalize mt-2">
              {detectedSkinType} Skin Type
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Estimated Biological Skin Age: <b className="text-pink-600">{estimatedSkinAge} Years</b>
            </p>
          </div>

          {/* Dimension Metric Breakdown */}
          <div className="md:col-span-7 glass-card rounded-3xl p-6 sm:p-7 border border-pink-200 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-pink-500" />
              <span>Skin Dimension Metrics</span>
            </h3>

            <div className="space-y-3.5">
              {[
                { label: 'Hydration & Barrier Water Retention', value: radarScores.hydration, color: 'from-blue-400 to-cyan-500' },
                { label: 'Texture Smoothness & Pore Elasticity', value: radarScores.texture, color: 'from-pink-400 to-rose-500' },
                { label: 'Sebum & Oil Equilibrium', value: radarScores.oilBalance, color: 'from-amber-400 to-orange-500' },
                { label: 'Pore Congestion & Clarity', value: radarScores.poreClarity, color: 'from-purple-400 to-pink-500' },
                { label: 'Barrier Defense & Resilience', value: radarScores.barrierHealth, color: 'from-emerald-400 to-teal-500' },
                { label: 'Natural Radiance & Glow Index', value: radarScores.radiance, color: 'from-rose-400 to-pink-600' },
              ].map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>{dim.label}</span>
                    <span className="text-pink-600">{dim.value}%</span>
                  </div>
                  <div className="w-full bg-pink-100/80 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                      style={{ width: `${dim.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Row 2: Hero Actives & Ingredients to Avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hero Actives for You */}
          <div className="glass-card rounded-3xl p-6 border border-emerald-200/90 shadow-md space-y-4 bg-gradient-to-br from-emerald-50/40 to-white">
            <div className="flex items-center gap-2 text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-extrabold">Hero Active Ingredients for You</h3>
            </div>
            <div className="space-y-2.5">
              {heroActives.map((act, i) => (
                <div key={i} className="bg-white/80 p-3 rounded-2xl border border-emerald-100 text-xs">
                  <p className="font-extrabold text-emerald-900">{act.name}</p>
                  <p className="text-gray-600 mt-0.5">{act.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients to Avoid / Limit */}
          <div className="glass-card rounded-3xl p-6 border border-rose-200/90 shadow-md space-y-4 bg-gradient-to-br from-rose-50/40 to-white">
            <div className="flex items-center gap-2 text-rose-800">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-extrabold">Formulations to Limit or Avoid</h3>
            </div>
            <div className="space-y-2.5">
              {avoids.length > 0 ? (
                avoids.map((av, i) => (
                  <div key={i} className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span className="font-bold text-gray-800">{av}</span>
                  </div>
                ))
              ) : (
                <div className="bg-white/80 p-3 rounded-2xl border border-rose-100 text-xs text-gray-600">
                  No extreme ingredient restrictions flagged. Stick to gentle fragrance-free bases.
                </div>
              )}

              {/* Dermatologist tips */}
              <div className="pt-2">
                <p className="text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                  Daily Pro-Tips:
                </p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {tips.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-pink-500 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Row 3: Quick Matched Products Preview */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-pink-200 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-gray-900">
                Top Matched Everyday Skincare ({matchedProducts.length} Items)
              </h3>
              <p className="text-xs text-gray-500">
                Over-the-counter facewashes, serums, and barrier creams matched to your exact score.
              </p>
            </div>
            <button
              onClick={onNavigateToProducts}
              className="btn-slay-primary px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {matchedProducts.slice(0, 3).map((prod) => (
              <div key={prod.id} className="bg-white/90 rounded-2xl p-3.5 border border-pink-100 flex items-center gap-3 shadow-xs">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-14 h-14 rounded-xl object-cover border border-pink-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-pink-600 uppercase">{prod.brand}</span>
                    <span className="text-[11px] font-extrabold text-emerald-600">{prod.matchScore}% Match</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 truncate">{prod.name}</p>
                  <p className="text-[11px] font-bold text-gray-700">${prod.price} / ₹{prod.priceINR}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={onNavigateToProducts}
            className="w-full sm:w-auto btn-slay-primary px-8 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-3 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Shop & Compare Matched Products</span>
          </button>

          <button
            onClick={onNavigateToRoutine}
            className="w-full sm:w-auto btn-slay-secondary px-8 py-4 rounded-2xl text-base font-extrabold flex items-center justify-center gap-3 shadow-xs"
          >
            <Calendar className="w-5 h-5 text-pink-600" />
            <span>View AM / PM Routine Schedule</span>
          </button>
        </div>

      </div>

    </div>
  );
}
