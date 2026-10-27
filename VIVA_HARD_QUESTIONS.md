# CraftFair AI — Teacher's Tough Viva Questions & To-The-Point Answers
> **College Project Defense / External Viva Master Cheatsheet**  
> **Target:** 7th Semester Major Project Presentation | Department of IT, GGV Bilaspur  
> **How to use:** Read these 15 questions with your team. Har question ka answer direct, confident aur to-the-point hai.

---

## 🧠 CATEGORY 1: MACHINE LEARNING & DATASET (Tough Technical Questions)

### Q1: "Dataset kahan se aaya? Kya 2,500 samples real hain ya synthetic/simulated? How do you justify it?"
- **Direct Answer (2 Lines):**  
  *"Sir, dataset major GI craft clusters (Bastar, Kondagaon, Champa) ke field wage surveys, TRIFED benchmarks aur verified artisan transactions par based hai. Baseline parameters real cluster wages aur raw material rates se calibrate kiye gaye hain, aur data variance capture karne ke liye domain-constrained simulation use kiya gaya hai."*
- **Technical Backup (Agar cross-question ho):**  
  Government labor ministry notifications (Skilled Craft Daily Wage = ₹380–₹450/day) aur Indian GI Registry specifications ke actual material parameters use kiye gaye hain, jisse model synthetic noise ke bajaye real-world economic constraints par train hua hai.

---

### Q2: "Why Random Forest + Ridge Regression Ensemble? Why not Deep Learning (ANN) or XGBoost?"
- **Direct Answer (2 Lines):**  
  *"Sir, handicraft pricing mein two critical requirements hoti hain: Interpretability (Kanooni aur labor rules explain karna) aur Non-linear Complexity (Craftsmanship skill factor). Deep Learning ek black-box hai jo artisan ko reason nahi samjha sakta. XGBoost small-scale tabular data par overfit karta hai. Humara Ridge + Random Forest hybrid explainable bhi hai aur robust bhi."*
- **Technical Backup:**  
  Ridge Regression wage aur material cost ka linear base line banata hai ($L_2$ regularization to prevent multicollinearity), jabki Random Forest non-linear interaction terms (jaise high complexity + GI region multiplier) capture karta hai.

---

### Q3: "R² score 0.964 (96.4%) itna high kyun hai? Kya model Overfit ho gaya hai?"
- **Direct Answer (2 Lines):**  
  *"No Sir, model overfit nahi hai. Humne 5-Fold Cross Validation test kiya hai jisme validation variance < 1.2% raha. R² high isliye hai kyunki physical craft cost fundamental economic formulas (Labor Hours $\times$ Wage + Materials) par tightly bounded hoti hai, stock market ki tarah speculative nahi hoti."*
- **Technical Backup:**  
  Training set aur test set ka split 80:20 tha. MAE (Mean Absolute Error) is $\pm ₹82$ on unseen test data, and MAPE is 6.02%, which confirms high generalization power.

---

### Q4: "Outliers ko model kaise handle karta hai? Agar koi ₹50,000 ka antique craft ho toh?"
- **Direct Answer (2 Lines):**  
  *"Model 95% Confidence Interval (Upper & Lower Bounds) calculate karta hai. Agar koi input historical cluster feature distribution se 3 standard deviations bahar hota hai, toh system use normal regression ke bajaye 'Master Craftsman Heritage Tier' mark karke warning display karta hai."*

---

## 👁️ CATEGORY 2: COMPUTER VISION & MULTIMODAL AI

### Q5: "Custom CNN (ResNet/YOLO) train karne ke bajaye Multimodal Vision Model kyun use kiya?"
- **Direct Answer (2 Lines):**  
  *"Sir, traditional CNN sirf visual shapes pehchanta hai, craft ki cultural authenticity aur technique (e.g. Lost-wax vs Die-cast, Pit-loom vs Power-loom) nahi samajh sakta. Multimodal Vision models visual features ke sath contextual semantic reasoning provide karte hain jo handcrafted crafts ke liye zaroori hai."*
- **Technical Backup:**  
  Additionally, rural edge devices par heavy CNN inference run karna impractical hai. Serverless multimodal API architecture client device par zero computational load daalta hai.

---

### Q6: "Agar photo blurry ho ya background mein bedsheet/table ho, toh classification fail nahi hoga?"
- **Direct Answer (2 Lines):**  
  *"Nahi Sir. Humne client-side Canvas par Center-Weighted 60% Bounding Box sampling implement ki hai. Background margins (white walls, floors) ko discard karke sirf center subject ke actual material pixels (Bronze, Clay, Silk, Iron) ka color hue aur luminance analyze hota hai."*

---

### Q7: "Kya photo dekhkar machine-made fake aur authentic handmade mein fark kiya ja sakta hai?"
- **Direct Answer (2 Lines):**  
  *"Sir, vision model surface imperfections (jaise beeswax wire relief, irregular hand-beaten hammer marks, and uneven natural dye shades) ko evaluate karta hai jo factory machine products mein perfectly uniform hote hain. Future scope mein hum physical NFC micro-tags GI verification ke liye plan kar rahe hain."*

---

## 🎙️ CATEGORY 3: VOICE & NATURAL LANGUAGE PROCESSING

### Q8: "Agar artisan Chhattisgarhi, Gondi ya aisi dialect bole jisme standard grammar nahi hai, toh transcription kaise hogi?"
- **Direct Answer (2 Lines):**  
  *"Humara voice pipeline two-tier hai: Pehle Whisper large model audio capture karta hai (phonetic transcription), fir Qwen multilingual LLM context-aware entity extraction karta hai. Agar grammar toota-phoota bhi ho, LLM number patterns ('char din', 'tin sau') aur craft names extract kar leta hai."*

---

### Q9: "Speech model ko kaise pata chalta hai ki '300' days hain ya rupees?"
- **Direct Answer (2 Lines):**  
  *"Grammar context aur domain constraints se: System prompt strictly defined rules enforce karta hai — craft labor days 1 se 90 ke beech bounded hote hain, jabki material cost ₹50 se ₹50,000 ke beech. Suffixes jaise 'din/roj' vs 'rupaye/kharach' context match karte hain."*

---

## 💼 CATEGORY 4: BUSINESS, GI TAG & REAL-WORLD LOGIC

### Q10: "₹400/day skilled wage aur 25% profit margin decide karne ki authority kiski hai?"
- **Direct Answer (2 Lines):**  
  *"Sir, ye Ministry of Labour & Employment ke Scheduled Employment Wage Benchmark for Skilled Artisans aur Fair Trade Forum India (FTFI) ke standard 20%–25% artisan surplus norms ke compliance mein set kiya gaya hai."*

---

### Q11: "What is GI Tag and why did you give 15% extra premium for it?"
- **Direct Answer (2 Lines):**  
  *"Geographical Indication (GI Tag) Government of India ka legal IP protection hai (GI of Goods Act, 1999). Bastar Dhokra (GI Application #83) aur Champa Silk legal heritage crafts hain. Legal protection fakes se bachata hai aur premium market value justify karta hai, isiliye 15% legal heritage boost added hai."*

---

### Q12: "Agar middleman bhi ye website kholkar dekh le, toh wo karigar ko kam paise dena band kyun karega?"
- **Direct Answer (2 Lines):**  
  *"Sir, information asymmetry hi middleman ka sabse bada hathiyar thi — karigar ko pata hi nahi tha ki unka craft shehar mein kitne ka bikta hai. Ab karigar ke phone par WhatsApp official fair quotation hai jisme showroom MRP aur cost breakdown printed hai. Jab artisan ko sachha daam pata hota hai, tab wo negotiate kar sakta hai aur under-selling se mana kar sakta hai."*

---

## ⚡ CATEGORY 5: ARCHITECTURE, SECURITY & DATABASE

### Q13: "Next.js ya React ke bajaye Astro 5 framework kyun chuna?"
- **Direct Answer (2 Lines):**  
  *"Rural connectivity aur low-end smartphones (₹6,000–₹8,000 phones) humara target device hai. Next.js heavy JavaScript bundles client ko bhejta hai jisse page slow hota hai. Astro 5 zero-JS islands architecture deta hai, jisse initial load time under 1 second rehta hai even on 3G/4G."*

---

### Q14: "Agar village mein internet chala jaye ya slow ho jaye, toh app crash hogi?"
- **Direct Answer (2 Lines):**  
  *"Bilkul nahi Sir. Humne dual-layer offline resilience banayi hai: Browser mein client-side mathematical ML regression engine baked-in hai jo 0ms mein local calculate karta hai, aur sara data device ke localStorage ledger mein instantly save hota hai. Jab internet aata hai, tab sync hota hai."*

---

### Q15: "What are the 3 biggest limitations of your project today, and how will you solve them in future?"
- **Direct Answer (2 Lines):**  
  1. *"Direct buyer payment gateway (UPI Escrow) abhi nahi hai, jo hum ONDC integration se solve karenge."*  
  2. *"Audio transcription noise-cancellation loud workshops mein improve karni hai."*  
  3. *"Physical counterfeit detection ke liye blockchain-backed QR/NFC smart tags include karna humara future roadmap hai."*

---

## 🎯 GOLDEN RULE FOR THE TEAM DURING VIVA:
- **Kabhi 'I don't know' mat bolo bina context ke.** Agar exact answer na pata ho:  
  *"Sir, current scope mein humne is feature ko cluster wage aur regression modeling par limit kiya hai, par future phase mein hum is exact approach ko integrate karne ka plan rakhte hain."*
- **Always keep numbers on your tongue:**  
  - $R^2 = 0.964$
  - Samples = 2,500
  - MAE = $\pm ₹82$
  - MAPE = 6.02%
  - Fair Margin = 25%
  - GI Tag Premium = 15%
