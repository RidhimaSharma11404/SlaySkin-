import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  ShieldAlert, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { SAMPLE_FACIAL_SCANS } from '../data/products';
import { analyzeSkinImage } from '../utils/skinAnalyzer';

export default function SkinScanner({ onAnalysisComplete, onProceedToQuiz }) {
  const [mode, setMode] = useState('camera'); // 'camera' | 'upload' | 'samples'
  const [streamActive, setStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [metricsPreview, setMetricsPreview] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize camera when mode is 'camera'
  useEffect(() => {
    if (mode === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [mode, capturedImage]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } else {
        setCameraError('Camera access not supported in this browser. Please use photo upload or sample photos.');
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera permission was not granted. You can upload a photo or choose a sample selfie below!');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 480;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(dataUrl);
    stopCamera();
    runScanAnalysis(dataUrl);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCapturedImage(dataUrl);
      runScanAnalysis(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleSelect = (sample) => {
    setCapturedImage(sample.imageUrl);
    runScanAnalysis(sample.imageUrl);
  };

  const runScanAnalysis = async (imgSource) => {
    setAnalyzing(true);
    setMetricsPreview(null);
    try {
      // Simulate 1.5s ML inference delay for laser animation feel
      const [metrics] = await Promise.all([
        analyzeSkinImage(imgSource),
        new Promise(res => setTimeout(res, 1600))
      ]);
      setMetricsPreview(metrics);
      if (onAnalysisComplete) {
        onAnalysisComplete(metrics, imgSource);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setMetricsPreview(null);
    if (mode === 'camera') {
      startCamera();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-bold">
          <Camera className="w-3.5 h-3.5 text-pink-500" />
          <span>Step 1 of 2: Computer-Vision Face Scan</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Smart AI <span className="text-gradient-slay">Skin Diagnostic Scanner</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Position your face in good lighting. Our ML model evaluates skin hydration proxy, erythema redness, shine, and pore texture.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-6">
        <div className="glass-pill p-1.5 rounded-2xl flex items-center gap-1.5 shadow-xs">
          <button
            onClick={() => { setMode('camera'); setCapturedImage(null); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              mode === 'camera' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => { setMode('upload'); setCapturedImage(null); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              mode === 'upload' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Selfie</span>
          </button>

          <button
            onClick={() => { setMode('samples'); setCapturedImage(null); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              mode === 'samples' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Sample Faces</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-xl relative overflow-hidden">
        
        {/* State 1: Live Camera View */}
        {mode === 'camera' && !capturedImage && (
          <div className="space-y-6">
            {cameraError ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Camera Unavailable</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">{cameraError}</p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setMode('upload')}
                    className="btn-slay-primary px-5 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Upload a Photo Instead
                  </button>
                  <button
                    onClick={() => setMode('samples')}
                    className="btn-slay-secondary px-5 py-2.5 rounded-xl text-xs font-bold"
                  >
                    Use Sample Profile
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative max-w-md mx-auto rounded-3xl overflow-hidden bg-black/90 shadow-2xl aspect-square flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />

                {/* Face Alignment Oval Frame */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-56 h-72 rounded-[50%] border-2 border-dashed border-pink-400/90 shadow-[0_0_30px_rgba(244,114,182,0.5)] animate-pulse flex items-center justify-center">
                    <div className="w-full text-center text-white/90 text-xs font-medium bg-black/40 backdrop-blur-xs py-1 rounded-full px-3">
                      Align Face in Oval
                    </div>
                  </div>
                </div>

                {/* Camera Top Status */}
                <div className="absolute top-4 inset-x-0 flex justify-center">
                  <span className="bg-pink-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md">
                    Lighting: Optimal ☀️
                  </span>
                </div>
              </div>
            )}

            {/* Capture Button */}
            {!cameraError && (
              <div className="flex justify-center">
                <button
                  onClick={capturePhoto}
                  disabled={!streamActive}
                  className="btn-slay-primary px-8 py-4 rounded-2xl text-base font-extrabold flex items-center gap-3 shadow-lg disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture & Analyze Face</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* State 2: Upload Photo View */}
        {mode === 'upload' && !capturedImage && (
          <div className="py-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="max-w-lg mx-auto border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-3xl p-10 text-center cursor-pointer transition-all bg-pink-50/40 hover:bg-pink-50/80 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-600 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Upload your selfie or skin close-up
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Supports JPG, PNG, WEBP. For best results, use natural daylight with clean skin.
              </p>
              <button
                type="button"
                className="btn-slay-primary px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Select File from Device</span>
              </button>
            </div>
          </div>
        )}

        {/* State 3: Sample Faces View */}
        {mode === 'samples' && !capturedImage && (
          <div className="py-4 space-y-4">
            <p className="text-center text-xs font-semibold text-gray-600">
              Select a pre-calibrated sample profile for instant ML testing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {SAMPLE_FACIAL_SCANS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample)}
                  className="glass-card rounded-2xl p-3 text-center cursor-pointer hover:border-pink-400 hover:scale-103 transition-all group"
                >
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-36 object-cover rounded-xl mb-2.5 group-hover:brightness-105"
                  />
                  <p className="text-xs font-bold text-gray-900">{sample.name}</p>
                  <span className="text-[10px] text-pink-600 font-semibold uppercase tracking-wide">
                    {sample.previewType} profile
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* State 4: Captured / Selected Photo Analysis State */}
        {capturedImage && (
          <div className="space-y-6">
            <div className="relative max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl aspect-square border-2 border-pink-300">
              <img
                src={capturedImage}
                alt="Analyzed Selfie"
                className="w-full h-full object-cover"
              />

              {/* Laser scan animation when analyzing */}
              {analyzing && (
                <div className="absolute inset-0 bg-pink-900/30 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                  <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-scan-laser shadow-[0_0_15px_#EC4899]" />
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-spin mb-3">
                    <Sparkles className="w-6 h-6 text-pink-300" />
                  </div>
                  <p className="text-sm font-extrabold tracking-wide">Running Computer-Vision ML...</p>
                  <p className="text-xs text-pink-200">Evaluating erythema, sebum gloss, & texture</p>
                </div>
              )}

              {/* Scan Successful Overlay */}
              {!analyzing && metricsPreview && (
                <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Face Scan Processed</span>
                </div>
              )}
            </div>

            {/* Metrics Quick Strip */}
            {!analyzing && metricsPreview && (
              <div className="max-w-md mx-auto grid grid-cols-3 gap-2 bg-pink-50/90 p-3 rounded-2xl border border-pink-200 text-center">
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Radiance Index</p>
                  <p className="text-sm font-extrabold text-pink-600">{metricsPreview.radianceScore}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Smoothness</p>
                  <p className="text-sm font-extrabold text-pink-600">{metricsPreview.textureSmoothness}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Redness Index</p>
                  <p className="text-sm font-extrabold text-rose-600">{metricsPreview.rednessIndex}%</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <button
                onClick={retakePhoto}
                disabled={analyzing}
                className="btn-slay-secondary px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake / Choose Another</span>
              </button>

              <button
                onClick={onProceedToQuiz}
                disabled={analyzing}
                className="btn-slay-primary px-7 py-3 rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-md"
              >
                <span>Continue to Skincare Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
