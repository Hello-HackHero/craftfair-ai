import weightsData from '../../data/trained_weights.json' with { type: 'json' };

export interface PricePredictionInput {
  craft_category: string;
  region: string;
  labour_days: number;
  raw_material_cost: number;
  complexity_score: number; // 1 to 10
  season_multiplier?: number;
}

export interface PricePredictionResult {
  fair_price: number;
  price_min_bound: number;
  price_max_bound: number;
  raw_material_with_wastage: number;
  labour_compensation: number;
  gi_heritage_premium: number;
  artisan_profit_margin: number;
  middleman_exploitation_price: number;
  urban_showroom_mrp: number;
  online_median_comp: number;
  metrics: {
    model_type: string;
    mape_percent: number;
    r2_score: number;
    gi_tag_eligible: boolean;
  };
  explanation: {
    en: string;
    hi: string;
  };
}

export function predictFairPrice(input: PricePredictionInput): PricePredictionResult {
  const {
    craft_category,
    region,
    labour_days,
    raw_material_cost,
    complexity_score,
    season_multiplier = 1.0,
  } = input;

  const categories = weightsData.categories as Record<string, any>;
  const stateWages = weightsData.state_wages as Record<string, any>;
  const meta = weightsData.model_metadata;
  const hyper = weightsData.hyperparameters;

  // Zero-value default state
  if (labour_days <= 0 && raw_material_cost <= 0) {
    return {
      fair_price: 0,
      price_min_bound: 0,
      price_max_bound: 0,
      raw_material_with_wastage: 0,
      labour_compensation: 0,
      gi_heritage_premium: 0,
      artisan_profit_margin: 0,
      middleman_exploitation_price: 0,
      urban_showroom_mrp: 0,
      online_median_comp: 0,
      metrics: {
        model_type: meta.model_type,
        mape_percent: meta.mape_percent,
        r2_score: meta.r2_score,
        gi_tag_eligible: false,
      },
      explanation: {
        en: 'Enter working days and material cost or speak to calculate fair valuation.',
        hi: 'मूल्यांकन की गणना के लिए कार्य दिवस और सामग्री लागत दर्ज करें या बोलें।'
      }
    };
  }

  // Selected Category fallback
  const catConfig = categories[craft_category] || categories['Dhokra Metal Craft'] || {
    base_intercept: 500,
    wastage_multiplier: 1.15,
    gi_region_multiplier: 1.15,
    online_market_median: 2500,
    hi_name: craft_category,
  };

  // Selected Region fallback
  const regionConfig = stateWages[region] || stateWages['Bastar_CG'] || {
    daily_wage: 400,
    gi_eligible: true,
  };

  const dailyWage = regionConfig.daily_wage || 400;
  const isGiEligible = !!regionConfig.gi_eligible;

  // 1. Raw Material with Artisanal Wastage
  const wastageMult = catConfig.wastage_multiplier || hyper.default_wastage_multiplier;
  const rawWithWastage = Math.round(raw_material_cost * wastageMult);

  // 2. Skilled Labor Cost with Complexity Scaling
  // Complexity score (1-10) adds an exponential craftsmanship skill bonus
  const skillFactor = 1 + (complexity_score - 1) * hyper.complexity_skill_beta;
  const labourCost = Math.round(labour_days * dailyWage * skillFactor);

  // 3. Base Production Cost
  const baseCost = rawWithWastage + labourCost + (catConfig.base_intercept || 0);

  // 4. Geographical Indication (GI) / Regional Heritage Premium
  const giMultiplier = isGiEligible ? (catConfig.gi_region_multiplier || 1.15) : 1.0;
  const giPremiumAmount = isGiEligible ? Math.round(baseCost * (giMultiplier - 1.0)) : 0;

  // 5. Artisan Fair Profit Margin (25% fair trade standard)
  const artisanMargin = Math.round((baseCost + giPremiumAmount) * 0.25);

  // 6. Cost-driven Fair Price
  const costDrivenPrice = (baseCost + giPremiumAmount + artisanMargin) * season_multiplier;

  // 7. Market-grounded Blend (Hybrid regression)
  // Blends cost-driven fair value with scraped online market comps (65% cost + 35% market comp)
  const onlineCompMedian = catConfig.online_market_median || 2500;
  const blendedPrice = Math.round(
    hyper.cost_blend_alpha * costDrivenPrice +
    hyper.market_blend_one_minus_alpha * (onlineCompMedian * (complexity_score / 6.0))
  );

  const fairPrice = Math.max(blendedPrice, Math.round(costDrivenPrice * 0.95));

  // 8. Confidence Interval based on validation MAPE (6.02%)
  const mapeDecimal = meta.mape_percent / 100.0;
  const minBound = Math.round(fairPrice * (1 - mapeDecimal));
  const maxBound = Math.round(fairPrice * (1 + mapeDecimal));

  // 9. Middleman vs Showroom Comparison Metrics
  const middlemanPrice = Math.round(fairPrice * hyper.middleman_discount_factor);
  const showroomMrp = Math.round(fairPrice * hyper.showroom_mrp_markup_factor);

  return {
    fair_price: fairPrice,
    price_min_bound: minBound,
    price_max_bound: maxBound,
    raw_material_with_wastage: rawWithWastage,
    labour_compensation: labourCost,
    gi_heritage_premium: giPremiumAmount,
    artisan_profit_margin: artisanMargin,
    middleman_exploitation_price: middlemanPrice,
    urban_showroom_mrp: showroomMrp,
    online_median_comp: onlineCompMedian,
    metrics: {
      model_type: meta.model_type,
      mape_percent: meta.mape_percent,
      r2_score: meta.r2_score,
      gi_tag_eligible: isGiEligible,
    },
    explanation: {
      en: `Based on ${labour_days} days of skilled labor at ₹${dailyWage}/day (complexity level ${complexity_score}/10) plus ₹${raw_material_cost} raw material with ${Math.round((wastageMult - 1) * 100)}% casting wastage. Includes GI tag craft heritage boost of ${Math.round((giMultiplier - 1) * 100)}%. Middlemen typically offer only ₹${middlemanPrice}, while urban galleries sell this for ₹${showroomMrp}.`,
      hi: `${labour_days} दिन के कुशल श्रम (दर ₹${dailyWage}/दिन, शिल्प जटिलता ${complexity_score}/10) और ₹${raw_material_cost} कच्चा माल पर आधारित। भौगोलिक उपदर्शन (GI Tag) संरक्षण के तहत कारीगर का उचित मूल्य ₹${fairPrice} है। बिचौलिए इसे केवल ₹${middlemanPrice} में खरीदते हैं जबकि शहरी शोरूम इसे ₹${showroomMrp} में बेचते हैं।`
    }
  };
}
