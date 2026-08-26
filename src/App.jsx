import React, { useState, useEffect } from 'react';
import InteractivePinkBg from './components/InteractivePinkBg';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkinScanner from './components/SkinScanner';
import SkinQuiz from './components/SkinQuiz';
import AnalysisResults from './components/AnalysisResults';
import ProductMatcher from './components/ProductMatcher';
import RoutineBuilder from './components/RoutineBuilder';
import IngredientChecker from './components/IngredientChecker';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { generateSkinReport } from './utils/skinAnalyzer';
import { PRODUCTS } from './data/products';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Stored analysis state
  const [cvMetrics, setCvMetrics] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({
    skin_type_feel: 'combination',
    primary_concerns: ['dark_spots', 'large_pores'],
    lifestyle_sun: 'moderate',
    routine_experience: 'balanced',
    budget_store: 'mid',
  });
  const [report, setReport] = useState(null);
  const [savedProductIds, setSavedProductIds] = useState([]);
  const [toast, setToast] = useState(null);

  // Initialize from LocalStorage or default sample
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('slayskin_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedFavs = localStorage.getItem('slayskin_favorites');
      if (storedFavs) {
        setSavedProductIds(JSON.parse(storedFavs));
      }

      // Generate default initial report
      const initialReport = generateSkinReport(quizAnswers);
      setReport(initialReport);
    } catch (err) {
      console.warn('Storage load error:', err);
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAnalysisComplete = (metrics, imgSource) => {
    setCvMetrics(metrics);
    showToast('Face scan processed successfully! ✨');
  };

  const handleQuizSubmit = (answers) => {
    setQuizAnswers(answers);
    const newReport = generateSkinReport(answers, cvMetrics || undefined);
    setReport(newReport);
    setActiveTab('results');
    showToast('Your SlaySkin Glow Report is ready! 💖');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProduct = (product) => {
    let updated;
    if (savedProductIds.includes(product.id)) {
      updated = savedProductIds.filter(id => id !== product.id);
      showToast(`Removed ${product.brand} from saved`);
    } else {
      updated = [...savedProductIds, product.id];
      showToast(`Saved ${product.name} to routine ✨`);
    }
    setSavedProductIds(updated);
    localStorage.setItem('slayskin_favorites', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('slayskin_user');
    setUser(null);
    showToast('Logged out of SlaySkin');
  };

  return (
    <div className="min-h-screen relative text-gray-900 selection:bg-pink-300 selection:text-pink-900 flex flex-col justify-between">
      
      {/* Dynamic Pink Interactive Canvas & Glowing Background */}
      <InteractivePinkBg />

      {/* Main App Content */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          user={user}
          onOpenAuth={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
          savedProductsCount={savedProductIds.length}
        />

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-gray-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl text-xs font-extrabold flex items-center gap-2 border border-pink-400/40 animate-in slide-in-from-bottom-5">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>{toast}</span>
          </div>
        )}

        {/* View Switcher */}
        <main className="flex-1">
          {activeTab === 'hero' && (
            <HeroSection
              onStartScan={() => {
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartQuiz={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreProducts={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'scanner' && (
            <SkinScanner
              onAnalysisComplete={handleAnalysisComplete}
              onProceedToQuiz={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'quiz' && (
            <SkinQuiz
              initialAnswers={quizAnswers}
              onQuizSubmit={handleQuizSubmit}
              onBackToScan={() => {
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'results' && (
            <AnalysisResults
              report={report}
              onNavigateToProducts={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToRoutine={() => {
                setActiveTab('routine');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onRetakeScan={() => {
                setActiveTab('scanner');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'products' && (
            <ProductMatcher
              matchedProducts={report?.matchedProducts || PRODUCTS}
              onSaveProduct={handleSaveProduct}
              savedProductIds={savedProductIds}
            />
          )}

          {activeTab === 'routine' && (
            <RoutineBuilder
              amRoutine={report?.amRoutine || []}
              pmRoutine={report?.pmRoutine || []}
              skinType={report?.detectedSkinType || 'combination'}
            />
          )}

          {activeTab === 'ingredients' && (
            <IngredientChecker />
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          showToast(`Welcome ${userData.name}! 💖`);
        }}
      />

    </div>
  );
}
