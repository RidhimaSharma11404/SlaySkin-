// SlaySkin Hybrid ML Skin Diagnostic & Product Matching Engine
// Combines Computer-Vision Canvas Image Processing + Diagnostic Quiz Decision Trees

import { PRODUCTS } from '../data/products';

/**
 * Performs real-time pixel-level computer vision analysis on uploaded or captured skin photo.
 * @param {HTMLImageElement | HTMLCanvasElement | ImageData} imageSource 
 */
export async function analyzeSkinImage(imageSource) {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = 300;
      let height = 300;
      canvas.width = width;
      canvas.height = height;

      if (imageSource instanceof HTMLImageElement || imageSource instanceof HTMLVideoElement) {
        ctx.drawImage(imageSource, 0, 0, width, height);
      } else if (typeof imageSource === 'string') {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          const imgData = ctx.getImageData(0, 0, width, height);
          resolve(processPixelMetrics(imgData));
        };
        img.onerror = () => {
          resolve(getFallbackPixelMetrics());
        };
        img.src = imageSource;
        return;
      }

      const imgData = ctx.getImageData(0, 0, width, height);
      resolve(processPixelMetrics(imgData));
    } catch (err) {
      console.warn('Image CV processing error, using fallback heuristics:', err);
      resolve(getFallbackPixelMetrics());
    }
  });
}

function processPixelMetrics(imgData) {
  const data = imgData.data;
  const totalPixels = data.length / 4;

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let totalLuminance = 0;
  let rednessCount = 0;
  let highShineCount = 0;
  let varianceAccumulator = 0;

  // 1st pass: Averages
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    totalR += r;
    totalG += g;
    totalB += b;

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    totalLuminance += lum;

    // Redness index (Erythema proxy)
    const rednessRatio = (2 * r - g - b) / Math.max(1, (2 * r + g + b));
    if (rednessRatio > 0.18 && r > 120) {
      rednessCount++;
    }

    // Specular shine (oiliness proxy on bright spots)
    if (lum > 210 && (r > 190 && g > 180 && b > 170)) {
      highShineCount++;
    }
  }

  const avgR = totalR / totalPixels;
  const avgG = totalG / totalPixels;
  const avgB = totalB / totalPixels;
  const avgLum = totalLuminance / totalPixels;

  // 2nd pass: Texture variance (roughness & pores)
  for (let i = 0; i < data.length; i += 16) { // Sampled for speed
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    varianceAccumulator += Math.pow(lum - avgLum, 2);
  }

  const sampleCount = totalPixels / 4;
  const textureStdDev = Math.sqrt(varianceAccumulator / sampleCount);

  // Normalized scores (0 - 100)
  const rednessScore = Math.min(100, Math.round((rednessCount / totalPixels) * 350));
  const shineScore = Math.min(100, Math.round((highShineCount / totalPixels) * 450));
  const textureSmoothness = Math.max(25, Math.min(95, Math.round(100 - (textureStdDev * 1.2))));
  const radianceScore = Math.max(30, Math.min(98, Math.round((avgLum / 255) * 110)));

  return {
    avgR: Math.round(avgR),
    avgG: Math.round(avgG),
    avgB: Math.round(avgB),
    rednessIndex: rednessScore,
    shineIndex: shineScore,
    textureSmoothness: textureSmoothness,
    radianceScore: radianceScore,
    isProcessed: true
  };
}

function getFallbackPixelMetrics() {
  return {
    avgR: 215,
    avgG: 185,
    avgB: 175,
    rednessIndex: 28,
    shineIndex: 35,
    textureSmoothness: 78,
    radianceScore: 82,
    isProcessed: false
  };
}

/**
 * Comprehensive Skin Classifier fusing CV metrics + Quiz responses
 */
export function generateSkinReport(quizAnswers = {}, cvMetrics = getFallbackPixelMetrics()) {
  const skinTypeAnswer = quizAnswers.skin_type_feel || 'combination';
  const rawConcerns = quizAnswers.primary_concerns || ['dullness', 'large_pores'];
  const sunExposure = quizAnswers.lifestyle_sun || 'moderate';
  const routineLength = quizAnswers.routine_experience || 'balanced';
  const budgetTier = quizAnswers.budget_store || 'mid';

  // Determine Primary Skin Type
  let detectedSkinType = skinTypeAnswer;
  if (cvMetrics.shineIndex > 55 && (detectedSkinType === 'combination' || detectedSkinType === 'normal')) {
    detectedSkinType = 'oily';
  } else if (cvMetrics.rednessIndex > 45 && detectedSkinType !== 'oily') {
    detectedSkinType = 'sensitive';
  }

  // Calculate Dimension Metrics
  let hydration = 75;
  let texture = cvMetrics.textureSmoothness || 76;
  let oilBalance = 70;
  let poreClarity = 78;
  let barrierHealth = 82;
  let radiance = cvMetrics.radianceScore || 80;

  if (detectedSkinType === 'oily') {
    oilBalance = Math.max(35, 75 - (cvMetrics.shineIndex * 0.5));
    poreClarity = Math.max(40, 70 - (cvMetrics.shineIndex * 0.4));
    hydration = 78;
  } else if (detectedSkinType === 'dry') {
    hydration = Math.max(30, 60 - (cvMetrics.rednessIndex * 0.3));
    barrierHealth = 65;
    oilBalance = 55;
    texture = Math.max(45, texture - 10);
  } else if (detectedSkinType === 'sensitive') {
    barrierHealth = Math.max(35, 60 - (cvMetrics.rednessIndex * 0.6));
    hydration = 68;
    oilBalance = 65;
  } else if (detectedSkinType === 'combination') {
    oilBalance = 60;
    poreClarity = 68;
    hydration = 74;
  }

  // Adjust for user concerns
  if (rawConcerns.includes('acne')) {
    poreClarity = Math.max(35, poreClarity - 15);
    oilBalance = Math.max(40, oilBalance - 10);
  }
  if (rawConcerns.includes('dark_spots')) {
    radiance = Math.max(40, radiance - 12);
  }
  if (rawConcerns.includes('dehydration')) {
    hydration = Math.max(35, hydration - 20);
    barrierHealth = Math.max(45, barrierHealth - 12);
  }
  if (rawConcerns.includes('redness')) {
    barrierHealth = Math.max(40, barrierHealth - 18);
  }

  // Overall SlaySkin Glow Score (0-100)
  const overallScore = Math.round(
    (hydration * 0.22) +
    (texture * 0.18) +
    (oilBalance * 0.15) +
    (poreClarity * 0.15) +
    (barrierHealth * 0.15) +
    (radiance * 0.15)
  );

  // Estimated Skin Age
  const baseAge = 22;
  const ageDelta = Math.round((75 - overallScore) * 0.12);
  const estimatedSkinAge = Math.max(18, baseAge + ageDelta);

  // Hero Actives & Avoids
  const { heroActives, avoids, tips } = getIngredientGuidelines(detectedSkinType, rawConcerns);

  // Match Products from Database
  const matchedProducts = matchProductsForUser({
    skinType: detectedSkinType,
    concerns: rawConcerns,
    budgetTier: budgetTier
  });

  // Build AM & PM Routines
  const amRoutine = buildRoutine(matchedProducts, 'AM', routineLength);
  const pmRoutine = buildRoutine(matchedProducts, 'PM', routineLength);

  return {
    overallScore,
    detectedSkinType,
    estimatedSkinAge,
    radarScores: {
      hydration: Math.round(hydration),
      texture: Math.round(texture),
      oilBalance: Math.round(oilBalance),
      poreClarity: Math.round(poreClarity),
      barrierHealth: Math.round(barrierHealth),
      radiance: Math.round(radiance),
    },
    rawConcerns,
    heroActives,
    avoids,
    tips,
    matchedProducts,
    amRoutine,
    pmRoutine,
    cvMetrics,
    sunExposure,
    routineLength,
    timestamp: new Date().toISOString()
  };
}

function getIngredientGuidelines(skinType, concerns) {
  const heroActives = [];
  const avoids = [];
  const tips = [];

  if (skinType === 'oily' || concerns.includes('large_pores') || concerns.includes('acne')) {
    heroActives.push({
      name: 'Niacinamide (5-10%)',
      reason: 'Clinically balances excess oil and shrinks pore diameter.'
    });
    heroActives.push({
      name: 'Salicylic Acid (BHA 2%)',
      reason: 'Oil-soluble exfoliant that cleans out blackheads and debris.'
    });
    avoids.push('Heavy Coconut Oil / Isopropyl Myristate (comedogenic)');
    tips.push('Use lightweight water-gel moisturizers instead of thick balms.');
  }

  if (skinType === 'dry' || concerns.includes('dehydration')) {
    heroActives.push({
      name: 'Multi-Weight Hyaluronic Acid',
      reason: 'Draws moisture 1000x its weight into thirsty skin cells.'
    });
    heroActives.push({
      name: 'Ceramides 1, 3, 6-II',
      reason: 'Restores the intercellular lipid barrier to prevent water evaporation.'
    });
    avoids.push('High % Alcohol Denat / Drying Foaming Surfactants');
    tips.push('Apply hydrating serum on slightly damp skin to maximize water retention.');
  }

  if (concerns.includes('dark_spots') || concerns.includes('dullness')) {
    heroActives.push({
      name: 'Vitamin C (Ethyl Ascorbic 10-16%)',
      reason: 'Neutralizes free radicals and fades dark melanin pigmentation.'
    });
    heroActives.push({
      name: 'Alpha Arbutin 2%',
      reason: 'Blocks tyrosinase activity for even, porcelain skin tone.'
    });
    tips.push('Always pair Vitamin C in the AM with SPF 50 for max photodamage defense.');
  }

  if (skinType === 'sensitive' || concerns.includes('redness')) {
    heroActives.push({
      name: 'Centella Asiatica (Cica / Madecassoside)',
      reason: 'Instantly cools skin temperature, calming redness and irritation.'
    });
    heroActives.push({
      name: 'Pro-Vitamin B5 (Panthenol)',
      reason: 'Deeply accelerates cellular repair and barrier defense.'
    });
    avoids.push('Synthetic Fragrance / Essential Oils / Strong AHA Peels');
    tips.push('Stick to fragrance-free, hypoallergenic minimalist formulas.');
  }

  // Ensure default hero ingredients if list is small
  if (heroActives.length < 3) {
    heroActives.push({
      name: 'Centella & Rice Probiotics',
      reason: 'Cultivates a strong skin microbiome for all-day radiance.'
    });
  }

  return {
    heroActives: heroActives.slice(0, 4),
    avoids: avoids.slice(0, 3),
    tips: tips.slice(0, 4)
  };
}

function matchProductsForUser({ skinType, concerns, budgetTier }) {
  return PRODUCTS.map(product => {
    let score = 70;

    // Skin type match
    if (product.bestForSkinTypes.includes(skinType)) {
      score += 15;
    }

    // Concern match
    const matchingConcerns = product.targetsConcerns.filter(c => concerns.includes(c));
    score += (matchingConcerns.length * 6);

    // Budget match
    if (budgetTier === 'budget' && product.price <= 15) score += 5;
    if (budgetTier === 'mid' && product.price >= 10 && product.price <= 30) score += 5;
    if (budgetTier === 'luxe' && product.price >= 30) score += 5;

    score = Math.min(99, Math.max(75, score));

    return {
      ...product,
      matchScore: score,
      matchingConcerns
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

function buildRoutine(matchedProducts, timeOfDay = 'AM', routineLength = 'balanced') {
  const steps = [];

  // Step 1: Cleanser
  const cleanser = matchedProducts.find(p => p.category === 'facewash' && (p.usageTime === timeOfDay || p.usageTime === 'Both'));
  if (cleanser) {
    steps.push({
      stepNumber: 1,
      stepName: timeOfDay === 'AM' ? 'Gentle Morning Cleanse' : 'Evening Deep Cleanse',
      category: 'facewash',
      product: cleanser,
      tip: timeOfDay === 'AM' ? 'Use lukewarm water and massage gently for 45-60 seconds.' : 'Washes off pollutants and sunscreen accumulated throughout the day.'
    });
  }

  // Step 2: Toner (if balanced or advanced)
  if (routineLength !== 'minimalist') {
    const toner = matchedProducts.find(p => p.category === 'toner' && (p.usageTime === timeOfDay || p.usageTime === 'Both'));
    if (toner) {
      steps.push({
        stepNumber: steps.length + 1,
        stepName: 'Hydrating / Prep Toner',
        category: 'toner',
        product: toner,
        tip: 'Pat gently onto face with hands rather than dragging cotton pads.'
      });
    }
  }

  // Step 3: Targeted Serum
  const serum = matchedProducts.find(p => p.category === 'serum' && (p.usageTime === timeOfDay || p.usageTime === 'Both'));
  if (serum) {
    steps.push({
      stepNumber: steps.length + 1,
      stepName: timeOfDay === 'AM' ? 'Antioxidant / Glow Treatment' : 'Overnight Cellular Repair Serum',
      category: 'serum',
      product: serum,
      tip: 'Apply 2-3 drops directly to face and press in with palms.'
    });
  }

  // Step 4: Moisturizer
  const moisturizer = matchedProducts.find(p => p.category === 'moisturizer' && (p.usageTime === timeOfDay || p.usageTime === 'Both'));
  if (moisturizer) {
    steps.push({
      stepNumber: steps.length + 1,
      stepName: 'Barrier Moisture Lock',
      category: 'moisturizer',
      product: moisturizer,
      tip: 'Seals in all previous active serums and nourishes lipid layer.'
    });
  }

  // Step 5: Sunscreen (AM Only)
  if (timeOfDay === 'AM') {
    const sunscreen = matchedProducts.find(p => p.category === 'sunscreen');
    if (sunscreen) {
      steps.push({
        stepNumber: steps.length + 1,
        stepName: 'Broad-Spectrum SPF 50 Protection',
        category: 'sunscreen',
        product: sunscreen,
        tip: 'Apply two-finger lengths as the final morning step 15 mins before sun exposure.'
      });
    }
  }

  return steps;
}
