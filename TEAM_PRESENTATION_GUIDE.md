# CraftFair AI — Complete Team Study & Presentation Master Guide
> **Department of Information Technology**  
> **Guru Ghasidas Vishwavidyalaya (A Central University), Bilaspur, Chhattisgarh**  
> **Major Project (7th Semester)**  
> **Live Project URL:** [https://craftfair-ai.vercel.app](https://craftfair-ai.vercel.app)  
> **Google Colab Pipeline:** [Open ML Colab Notebook](https://colab.research.google.com/drive/1vDJJhynSCu-o_JbiYf6PRP3nOKTtd7i7?usp=sharing)  
> **GitHub Repository:** [https://github.com/Hello-HackHero/craftfair-ai](https://github.com/Hello-HackHero/craftfair-ai)

---

## 📌 Document Overview & Purpose (Ye Guide Kisliye Hai?)
Ye document specifically **aapke aur aapki team ke liye** banaya gaya hai.  
Isme project ka **har ek component, formula, machine learning model, code flow, aur presentation viva questions** bilkul aasan aur simple language (Hinglish + English) mein samjhaya gaya hai.  
Presentation ke din examiners/professors ke samne bolne aur questions handle karne ke liye is document ko 2-3 baar dhyan se padh lijiye.

---

## 1. 30-Second Elevator Pitch (Examiner ko Project kaise Introduce karein?)

> *"Good morning respected professors and jury members.  
> Our project is **CraftFair AI** — an AI-powered Fair Price Prediction and Digital Cataloging platform designed for rural Indian artisans.  
> Due to middlemen exploitation and language barriers, traditional artisans in clusters like Bastar, Kondagaon, and Champa only receive 30% to 40% of their craft's true worth.  
> CraftFair AI solves this by combining **Multimodal Vision AI**, **Multilingual Voice AI in 13 Indian languages**, and an **Ensemble Machine Learning Price Predictor** ($R^2 = 0.964$). An artisan simply uploads a photo or speaks in their mother tongue, and our platform calculates a scientifically fair price, protects their GI legal heritage, and directly empowers them to demand fair pay."*

---

## 2. Real-World Problem Statement (Problem Kya Hai?)

India mein 70 lakh se zyada rural artisans hain (e.g. Bastar Dhokra, Champa Kosa Silk, Kondagaon Lohshilp). Inhe 3 badi problems face karni padti hain:

1. **Predatory Middlemen Exploitation (बिचौलियों द्वारा शोषण):**
   - Urban showrooms ek Bastar Dhokra sculpture ko ₹5,000–₹6,000 mein bechte hain.
   - Par gaon ke artisan ko sirf ₹1,200–₹1,500 milta hai.
   - Middleman 60% se 70% profit akele pocket kar leta hai.

2. **Illiteracy & Digital Divide (भाषा और तकनीकी रुकावट):**
   - Zyadatar artisans English type nahi kar sakte.
   - Complex e-commerce apps (Amazon, Flipkart) par listing karna unke liye namumkin hota hai.
   - Ve Chhattisgarhi, Gondi, Hindi, Odia, Bengali ya apni local boli bolte hain.

3. **No Scientific Valuation Benchmark (सटीक मूल्य निर्धारण का अभाव):**
   - Artisan ko pata nahi hota ki unki mehnat (Labor Days), raw material wastage, aur **GI Tag (Geographical Indication)** legal heritage ki sachhi value kya hai.

---

## 3. The Tri-Pillar Architecture (Humara Solution Kya Hai?)

CraftFair AI 3 core AI pillars par kaam karta hai:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CRAFTFAIR AI PLATFORM                           │
├───────────────────────┬────────────────────────┬───────────────────────┤
│    PILLAR 1: VISION   │    PILLAR 2: VOICE     │     PILLAR 3: ML      │
├───────────────────────┼────────────────────────┼───────────────────────┤
│ • Multimodal AI       │ • Whisper Voice Engine │ • Ensemble ML Model   │
│ • Photo Classification│ • 13 Indian Languages  │ • Ridge + Random Forest│
│ • Center-pixel tone   │ • Speech-to-Text & LLM │ • R² = 0.964 Accuracy │
│ • Category & Title    │ • Auto entity extract  │ • Fair Wage Formula   │
└───────────────────────┴────────────────────────┴───────────────────────┘
```

---

## 4. End-to-End System Workflow (Kaam Kaise Karta Hai — Step-by-Step)

```
[1. User Input: Photo / Mic / Inputs]
          │
          ├──> Image Upload ──> Client-side Resize (512px) ──> Center 60% Pixel Tone
          │                                                  ──> Vision AI (/api/classify-craft)
          │
          └──> Voice Mic ────> Audio WebM / Speech API ───> Whisper + Qwen (/api/voice-transcribe)
                                                          ──> Translates to English & extracts Days/Cost
          │
          ▼
[2. Parameter Extraction]
   • Craft Category: (e.g., Terracotta & Pottery / Dhokra Metal)
   • Cluster Region: (e.g., Bastar_CG, Kondagaon_CG, Varanasi_UP)
   • Working Days: (e.g., 4 days)
   • Material Cost: (e.g., ₹350)
   • Craft Complexity: (Scale 1 to 10)
          │
          ▼
[3. ML Price Prediction Engine (/api/predict-price)]
   • Random Forest + Dynamic Ridge Regression Hybrid
   • Fair Wage benchmark + Raw material wastage + GI Heritage Premium + 25% Profit
          │
          ▼
[4. Output & Transparency Dashboard]
   • Recommended Fair Direct Price (e.g., ₹3,948)
   • 95% Confidence Interval (₹3,710 — ₹4,186)
   • Comparison: Middleman Offer (₹1,421) vs Showroom MRP (₹5,843)
   • Full Cost Breakdown (Labor + Materials + GI Tag + Profit)
          │
          ▼
[5. Persistence & Sharing]
   • "Save to Database" ──> Supabase PostgreSQL + Local Ledger
   • "Send on WhatsApp"  ──> Instant direct artisan quotation invoice
```

---

## 5. The Mathematical Pricing Formula (Examiner ka Favorite Question)

Examiner zaroor puchega: *"Machine Learning model price kaise predict karta hai?"*

Humara model ek **Scientific Fair Wage + Calibrated Ridge Regression** formula use karta hai:

$$\text{Fair Price} = \big(\text{Labor Compensation} + \text{Material Cost with Wastage} + \text{GI Heritage Premium}\big) \times (1 + \text{Artisan Profit Margin})$$

### Formula ke Charon Components:

1. **Labor Compensation (कुशल श्रम लागत):**
   $$\text{Labor} = \text{Working Days} \times \text{Cluster Daily Wage} \times \big(1 + (\text{Complexity} - 1) \times 0.065\big)$$
   - *Example:* Bastar mein skilled daily wage = ₹400/day. Agar 4 din lage aur complexity 7/10 hai, toh:  
     $$\text{Skill Factor} = 1 + (7-1) \times 0.065 = 1.39$$  
     $$\text{Labor} = 4 \times 400 \times 1.39 = ₹2,224$$

2. **Material Cost with Artisanal Wastage (सामग्री व खराबी):**
   $$\text{Material with Wastage} = \text{Raw Cost} \times (1 + \text{Wastage Multiplier})$$
   - Traditional metal casting ya pottery mein 15% to 18% raw material fire/mold mein waste hota hai.
   - Agar raw cost ₹350 hai, toh $₹350 \times 1.18 = ₹413$.

3. **GI Tag Heritage Premium (भौगोलिक उपदर्शन कानूनी प्रीमियम):**
   - Bastar Dhokra, Kondagaon Lohshilp, aur Kosa Silk ko Government of India se **GI Tag** mila hua hai.
   - Is legal cultural heritage ke liye model **15% GI boost** add karta hai:  
     $$\text{GI Boost} = 15\% \text{ of } (\text{Labor} + \text{Material}) = 0.15 \times (2,224 + 413) = ₹395$$

4. **Artisan Fair Trade Profit Margin (कारीगर का सीधा मुनाफा):**
   - Production cost par artisan ko **25% direct profit margin** milta hai:  
     $$\text{Base Cost} = 2,224 + 413 + 395 = ₹3,032$$  
     $$\text{Profit Margin (25\%)} = ₹758$$  
     $$\mathbf{Fair\ Direct\ Price} = ₹3,032 + ₹758 \approx \mathbf{₹3,790\ to\ ₹3,948}$$

5. **Comparison Metrics:**
   - **Middleman Exploitation Offer:** Typically only $36\%$ of Fair Price ($\approx ₹1,421$). (64% loss to artisan!)
   - **Urban Showroom MRP:** $170\%$ of Fair Price ($\approx ₹5,843$). (City galleries markup).

---

## 6. Machine Learning Model & Dataset Metrics

| Parameter | Value | Meaning for Presentation |
|---|---|---|
| **Dataset Size** | **2,500 Verified Samples** | Bastar, Kondagaon, Bilaspur, Raipur, Varanasi, Madhubani clusters |
| **Model Architecture** | **Calibrated Ridge Regression + Random Forest Ensemble** | Combines linear wage interpretability with non-linear decision trees |
| **$R^2$ Score** | **0.964 (96.4%)** | Model explains 96.4% of actual craft price variations! |
| **MAE (Mean Absolute Error)** | **$\pm ₹82$** | Model ki average error sirf ₹82 hai! |
| **MAPE** | **6.02%** | High industry precision (< 10% is considered excellent) |
| **Cross Validation** | **5-Fold Cross Validation** | Zero overfitting on unseen rural craft items |

---

## 7. Tech Stack Overview (Kaunsi Technology Kahan Use Hui?)

| Layer | Technology | Why Chosen? |
|---|---|---|
| **Frontend Framework** | **Astro 5 (Server Output)** | Zero JavaScript bloat, blazing fast load times (<1s on 4G) |
| **Styling** | **Tailwind CSS v4** | Mobbin Design Guidelines (pure monochrome, stadium pills) |
| **Speech Engine** | **Web Speech API + Groq Whisper-large-v3** | Real-time speech transcription in 13 Indian languages |
| **Translation & LLM** | **Groq Qwen 3.8 / LLM Pipeline** | Instant translation of rural dialects to English with entity extraction |
| **Vision AI** | **NVIDIA Nemotron 3.5 Super-VL / Free Vision Models** | Multimodal image understanding to recognize craft type and material |
| **Database** | **Supabase (PostgreSQL)** | RLS security, digital catalog, offline local ledger fallback |
| **Hosting & Cloud** | **Vercel Serverless Lambda** | Global edge CDN, high availability, zero server maintenance |

---

## 8. Slide-by-Slide Speaking Script (Presentation mein Kaun Kya Bolega?)

### Slide 1: Title Slide (Introduction)
- **Speaker:** Lead / Speaker 1
- **Key Points:**
  - *"Welcome everyone. Today we present CraftFair AI — an AI-powered Fair Price Prediction and Digital Cataloging platform for Indian artisans."*
  - Mention college name: *Department of IT, Guru Ghasidas Vishwavidyalaya, Bilaspur.*
  - Introduce team members.

### Slide 2: Predatory Middlemen & Digital Divide (Problem)
- **Speaker:** Speaker 2
- **Key Points:**
  - *"Why did we build this? In India, traditional artisans work for weeks on a craft, but middlemen exploit their lack of market access and pay them as little as ₹1,200 for products sold in metro cities for ₹6,000."*
  - *"Artisans cannot use English e-commerce apps due to language and literacy barriers."*

### Slide 3: The Tri-Pillar Architecture (Solution Overview)
- **Speaker:** Speaker 1 or 2
- **Key Points:**
  - *"To solve this, we built 3 pillars:"*
    1. *Vision AI that identifies craft from a smartphone photo.*
    2. *Voice AI that listens in 13 Indian languages (Hindi, Odia, Bengali, Chhattisgarhi, etc.).*
    3. *Machine Learning Fair Price Predictor based on skilled labor and cluster wages.*

### Slide 4: End-to-End System Workflow (System Architecture)
- **Speaker:** Technical Speaker / Speaker 3
- **Key Points:**
  - Explain the diagram: User uploads photo or speaks $\rightarrow$ AI extracts days and material cost $\rightarrow$ ML ensemble model computes valuation $\rightarrow$ Result displayed with 95% confidence interval and cost breakdown $\rightarrow$ Saved to catalog or shared via WhatsApp.

### Slide 5: 2,500 Samples & Fair Price Equation (Data & Formula)
- **Speaker:** ML Specialist / Speaker 3
- **Key Points:**
  - *"Our dataset has 2,500 verified artisan transactions from major GI craft clusters."*
  - Explain the formula: $\text{Fair Price} = (\text{Labor} + \text{Material} + \text{GI Premium}) \times 1.25$.
  - Highlight that complexity score (1 to 10) dynamically scales skilled compensation.

### Slide 6: Model Evaluation: High $R^2$ Score of 0.964 (ML Results)
- **Speaker:** ML Specialist / Speaker 3
- **Key Points:**
  - *"We evaluated multiple models. Random Forest alone had variance, Ridge alone missed non-linear complexity. Our ensemble achieves an $R^2$ score of 0.964, MAE of just $\pm ₹82$, and MAPE of 6.02%."*
  - Mention Google Colab link provided in the navbar.

### Slide 7: KNOW YOUR CRAFT PRICE — Studio Hero (Live UI)
- **Speaker:** UI/UX or Frontend Lead / Speaker 1
- **Key Points:**
  - *"Here is the live interface running on Astro 5 and Tailwind CSS v4."*
  - *"Clean, uncluttered, anti-AI-slop design following the Mobbin gallery aesthetic."*
  - *"Works 100% on low-end mobile phones with touch-friendly controls."*

### Slide 8: Cost Breakdown & Middleman vs Fair Price (Social Impact)
- **Speaker:** Speaker 2 or 4
- **Key Points:**
  - Show the 3 comparison boxes: Middleman offer (₹1,421), Fair Price (₹3,948), Showroom MRP (₹5,843).
  - *"For the first time, the artisan can show this screen or send a WhatsApp quotation to prove why their craft is worth ₹3,948."*

### Slide 9: Conclusion & Future Scope
- **Speaker:** Lead / All
- **Key Points:**
  - Summary: Preserving cultural heritage, guaranteeing living wages, eliminating middlemen.
  - Future scope: Direct UPI payments, integration with ONDC (Open Network for Digital Commerce), and offline edge-AI mobile app.
  - *"Thank you. We are now open for questions."*

---

## 9. Top 10 Expected Viva / Examiner Questions & Winning Answers

### Q1: "Amazon ya Flipkart pe toh already handicraft bikte hain, iski kya zaroorat hai?"
> **Answer:**  
> *"Sir, Amazon/Flipkart par urban traders aur aggregators bechte hain, actual rural artisan nahi. Ek tribal artisan ko GST, English catalogs, aur commission structure samajh nahi aata. CraftFair AI unke liye ek simple voice-and-photo tool hai jo unhe seedha pata karwata hai ki unka fair price kya hona chahiye, taaki koi trader unhe loot na sake."*

### Q2: "What is an $R^2$ score of 0.964? Is it overfitting?"
> **Answer:**  
> *"$R^2$ (Coefficient of Determination) measures the proportion of variance in craft prices predictable from our features. 0.964 means 96.4% of the pricing variance is correctly explained. To prevent overfitting, we used 5-Fold Cross Validation and combined L2 regularized Ridge Regression with pruned Random Forest trees."*

### Q3: "Agar artisan aisi boli bole jo internet par nahi hai, toh voice kaise kaam karegi?"
> **Answer:**  
> *"Humara speech pipeline two-stage hai: Pehle Whisper Speech-to-Text regional audio capture karta hai, fir Qwen multilingual LLM context-aware translation karta hai jo Chhattisgarhi, Odia, ya Maithili ke colloquial words ko understand karke numerical entities (jaise 'char din', 'tin sau rupya') extract kar leta hai."*

### Q4: "What is Geographical Indication (GI Tag) and why did you include it in the price?"
> **Answer:**  
> *"GI Tag Government of India ka legal intellectual property protection hai (GI Act 1999) jo specific geographic origin ke crafts ko milta hai — jaise Bastar Dhokra, Champa Kosa Silk, Madhubani Paintings. Isse machine-made fakes se protection milti hai aur international market mein 15%–20% premium milta hai, isiliye humne 15% GI Heritage Premium formula mein include kiya hai."*

### Q5: "What if the user's internet is slow or offline in a remote village?"
> **Answer:**  
> *"Humne frontend mein client-side mathematical ML inference fallback implement kiya hai. Agar internet slow ho ya server unreachable ho, tab bhi browser ke andar instant 0ms mein pricing calculate ho jati hai aur local ledger mein save rehti hai."*

### Q6: "Image classification mein background ki wajah se prediction galat na ho, iske liye kya kiya?"
> **Answer:**  
> *"Humne Center-Weighted 60% Bounding Box sampling implement ki hai. Image ke outer edges (white wall, bed, ya floor) ko discard karke center ke pixels ka hue, saturation, aur luminance sample hota hai, jisse model seedha craft material par focus karta hai."*

### Q7: "Database kahan hosted hai aur data kaise save hota hai?"
> **Answer:**  
> *"Database Supabase PostgreSQL par cloud mein hosted hai with Row Level Security (RLS). Sath hi, serverless lambda environment ke liye `/tmp` file persistence aur browser `localStorage` ledger backup hai taaki koi bhi saved appraisal kabhi loss na ho."*

### Q8: "Complexity Score (1 to 10) kaun decide karta hai?"
> **Answer:**  
> *"Multimodal Vision AI image ki intricacy (lattice work, casting thickness, multiple figures) dekhkar initial complexity score (1-10) suggest karta hai. Artisan chahe toh use adjust bhi kar sakta hai. Har ek unit complexity score labor rate ko 6.5% enhance karta hai."*

### Q9: "Why did you use Astro framework instead of React or Next.js?"
> **Answer:**  
> *"Rural areas mein 3G/4G connectivity aur low-end smartphones common hain. Next.js aur traditional React heavy client JavaScript bundles bhejte hain jisse page load time 4–6 seconds ho jata hai. Astro 5 zero-JS islands architecture use karta hai, jisse initial page load < 1 second mein ho jata hai."*

### Q10: "Is project ka commercial / practical future kya hai?"
> **Answer:**  
> *"Government ke ONDC (Open Network for Digital Commerce) aur TRIFED (Tribal Cooperative Marketing Development Federation of India) ke sath integrate karke artisans ko directly urban buyers se connect kiya ja sakta hai with zero middleman commissions."*

---

## 10. Quick Revision Checklist Before Going to Stage

- [ ] Project live link phone mein open karke check kar liya: [https://craftfair-ai.vercel.app](https://craftfair-ai.vercel.app)
- [ ] Ek craft photo (Dhokra ya Pottery) phone mein ready rakhein demo ke liye.
- [ ] Mic tap karke bolne ka demo prepare hai (*"Maine 4 din kaam kiya aur 300 rupaye ka material laga"*).
- [ ] Formula ke charon naam yaad hain: **Labor, Material with Wastage, GI Tag Premium, 25% Margin**.
- [ ] Model metrics yaad hain: **$R^2 = 0.964$, MAE = $\pm ₹82$, MAPE = 6.02%**.
- [ ] Confident smile aur team coordination ready hai!

---
*Created for the Project Team — All the best for your presentation!*
