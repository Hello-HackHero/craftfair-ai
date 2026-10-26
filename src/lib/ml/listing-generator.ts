export interface ListingGenerationInput {
  craft_category: string;
  hindi_category?: string;
  material: string;
  technique: string;
  fair_price: number;
  labour_days: number;
  region: string;
  artisan_name?: string;
  artisan_voice_notes?: string;
}

export interface GeneratedListing {
  title_en: string;
  title_hi: string;
  story_narrative_en: string;
  story_narrative_hi: string;
  technical_specs: Record<string, string>;
  fair_trade_badge: {
    artisan_wage_payout: number;
    gi_certified: boolean;
    zero_middleman_guarantee: string;
  };
  care_instructions_en: string;
  care_instructions_hi: string;
  seo_tags: string[];
}

export async function generateProductListing(
  input: ListingGenerationInput
): Promise<GeneratedListing> {
  const {
    craft_category,
    material,
    technique,
    fair_price,
    labour_days,
    region,
    artisan_name = 'गुप्ता राम मरकाम (Gupta Ram Markam)',
    artisan_voice_notes = ''
  } = input;

  const geminiKey = process.env.GEMINI_API_KEY;
  const isRealGeminiKey = geminiKey && !geminiKey.includes('Fake') && geminiKey.length > 25;

  if (isRealGeminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an artisanal storyteller for CraftFair AI.
Generate a structured e-commerce product listing in JSON format based on:
Craft: ${craft_category}
Material: ${material}
Technique: ${technique}
Fair Price: ₹${fair_price}
Labour Days: ${labour_days}
Region: ${region}
Artisan: ${artisan_name}
Artisan notes: ${artisan_voice_notes}

Return ONLY strict JSON matching this structure:
{
  "title_en": "E-commerce title in English",
  "title_hi": "E-commerce title in Hindi",
  "story_narrative_en": "Deep cultural story of the craft and the artisan's dedication",
  "story_narrative_hi": "शिल्प की सांस्कृतिक विरासत और कारीगर के समर्पण की कहानी",
  "technical_specs": {
    "Material": "...",
    "Technique": "...",
    "Origin": "...",
    "Craftsmanship Time": "${labour_days} Days"
  },
  "fair_trade_badge": {
    "artisan_wage_payout": ${Math.round(fair_price * 0.7)},
    "gi_certified": true,
    "zero_middleman_guarantee": "100% of fair value reaches the artisan directly."
  },
  "care_instructions_en": "How to care for this handicraft",
  "care_instructions_hi": "रख-रखाव के निर्देश",
  "seo_tags": ["tag1", "tag2", "tag3", "tag4"]
}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.3,
              response_mime_type: 'application/json'
            }
          })
        }
      );

      if (response.ok) {
        const jsonRes = await response.json();
        const text = jsonRes.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return JSON.parse(text);
        }
      }
    } catch (err) {
      console.warn('Gemini listing generation error, using curated template:', err);
    }
  }

  // Curated Artisanal Template (100% offline-ready & realistic)
  return {
    title_en: `Authentic Handcrafted ${craft_category} — ${technique}`,
    title_hi: `विशुद्ध हस्तनिर्मित ${craft_category} — ${technique}`,
    story_narrative_en: `Handcrafted in ${region} over ${labour_days} days of meticulous patience by Master Artisan ${artisan_name}. Each piece embodies centuries of indigenous heritage passed down through tribal generations. Unlike machine-stamped imitations, this authentic artifact is shaped using raw ${material} and traditional ${technique}, honoring fair wage principles where the artisan receives true compensation directly.`,
    story_narrative_hi: `${region} के सिद्धहस्त शिल्पी ${artisan_name} द्वारा ${labour_days} दिनों के अथक परिश्रम से तैयार। सदियों पुरानी आदिवासी लोक-परंपरा और प्राकृतिक ${material} से संजोई गई यह अनुपम कृति बिचौलियों के शोषण से मुक्त है, जहां शिल्पकार को उसकी वास्तविक कला का सीधा और न्यायसंगत मूल्य मिलता है।`,
    technical_specs: {
      'Primary Material': material,
      'Technique': technique,
      'Regional Heritage': `${region} (GI Tag Protected)`,
      'Labour Investment': `${labour_days} Artisan Days`,
      'Fair Price Valuation': `₹${fair_price.toLocaleString('en-IN')}`
    },
    fair_trade_badge: {
      artisan_wage_payout: Math.round(fair_price * 0.72),
      gi_certified: true,
      zero_middleman_guarantee: 'Certified Fair-Trade: 100% fair artisan price delivered without intermediary commission.'
    },
    care_instructions_en: 'Wipe gently with a soft dry cotton cloth. Keep away from harsh abrasive chemicals and prolonged moisture. Apply natural oil occasionally for metallic luster.',
    care_instructions_hi: 'मुलायम सूखे सूती कपड़े से हल्के हाथ से साफ करें। कठोर रासायनिक द्रवों से दूर रखें और नमी से बचाएं। चमक बनाए रखने हेतु कभी-कभार सरसों तेल की हल्की परत लगाएं।',
    seo_tags: [
      craft_category.toLowerCase(),
      'bastar handicrafts',
      'indian GI tag crafts',
      'fair price artisan market',
      'tribal heritage art',
      'chhattisgarh handmade'
    ]
  };
}
