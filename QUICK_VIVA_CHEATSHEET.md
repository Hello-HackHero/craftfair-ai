# ⚡ CraftFair AI — Quick Viva Cheatsheet (1-Page Pocket Guide)
> **Final Defense & External Examiner Rapid Q&A**  
> *Department of Information Technology | Guru Ghasidas Vishwavidyalaya, Bilaspur*  
> ⏱️ **Read Time:** 3 Minutes | **Formula:** `Direct Answer → Exact Numbers → Confident Delivery`

---

## 🔢 5 Numbers Jo Sabko Yaad Hone Chahiye (Rat Lo!)
| Parameter | Value | Explaination |
| :--- | :--- | :--- |
| **Dataset Size** | **2,500 samples** | Chhattisgarh GI craft clusters (Bastar, Kondagaon, Champa) |
| **Model Accuracy ($R^2$)** | **0.964 (96.4%)** | Physical cost equation tightly bounded on wage + materials |
| **Error Rate (MAPE / MAE)** | **6.02% / ±₹82** | Unseen test set error (very low variance) |
| **Daily Wage Base** | **₹400 / day** | Ministry of Labour Skilled Artisan benchmark |
| **Fair Margin & GI Boost** | **+25% Margin, +15% GI** | Fair Trade Forum standard & GI of Goods Act 1999 |

---

## 🎯 12 Hard Questions & To-The-Point Punchy Answers

### 1. "Dataset kahan se aaya? Kya ye fake/synthetic hai?"
> **Answer:** *"Sir, baseline wage rates (₹380–₹450/day) aur material costs real field surveys aur TRIFED/State Handicraft benchmarks se calibrate kiye gaye hain. Un realistic constraints par domain-specific simulation use karke 2,500 samples ka dataset banaya gaya hai."*

### 2. "Why Ridge Regression + Random Forest? Why not Deep Learning (ANN)?"
> **Answer:** *"Sir, Deep Learning ek unexplainable black-box hai, jabki humein artisan ko price ka exact breakdown samjhana hai. Ridge Regression wage aur material ka linear foundation banata hai, aur Random Forest craftsmanship complexity ka non-linear factor capture karta hai. Best of both worlds."*

### 3. "R² score 96.4% itna high kyun hai? Kya model Overfit ho gaya hai?"
> **Answer:** *"Nahi Sir. 5-Fold Cross Validation test kiya hai jisme variance < 1.2% tha. Handicraft cost stock market jaisi speculative nahi hoti; ye labor hours aur raw material ke physical formulas par strictly dependent hoti hai, isiliye correlation naturally high hai."*

### 4. "Photo se material aur price kaise pehchante ho?"
> **Answer:** *"Image upload hote hi Canvas par **60% center-weighted bounding box** crop hota hai taaki background discard ho jaye. Multimodal vision pipeline craft ke material textures (bronze, bell metal, terracotta, silk) aur visual complexity ko 0.1–1.0 index mein quantify karta hai."*

### 5. "Agar photo blurry ho ya background kharab ho toh?"
> **Answer:** *"Center pixel sampling background walls ya floor ko filter out kar deti hai. Agar image bilkul unreadable ho, toh system fallback default craft category select karta hai aur artisan manual selector se craft change kar sakta hai."*

### 6. "Dehati ya tooti-phooti boli (Chhattisgarhi/Gondi) mein bolega toh voice model kaise samjhega?"
> **Answer:** *"2-step pipeline hai: Pehle Whisper phonetic speech-to-text karta hai, fir LLM context-aware entity extraction karta hai. Agar karigar bolta hai 'teen din lagis aur paanch sau rupiya', model domain range (Days: 1–90, Cost: ₹50–₹50,000) match karke values extract kar leta hai."*

### 7. "Daily wage ₹400 aur 25% margin decide karne ki authority kiski hai?"
> **Answer:** *"Ministry of Labour & Employment ka Scheduled Employment rate for skilled craftspersons ₹400/day benchmark hai, aur Fair Trade Forum India (FTFI) ka standard artisan surplus margin 20–25% hai. Humne standard government aur fair-trade norms follow kiye hain."*

### 8. "GI Tag kya hota hai aur 15% extra premium kyun diya?"
> **Answer:** *"GI (Geographical Indication) Tag legal Intellectual Property hai (GI Act, 1999). Jaise Bastar Dhokra (GI #83) aur Champa Silk. Ye fake copies se protect karta hai aur market mein export-grade authenticity prove karta hai, isiliye 15% premium justified hai."*

### 9. "Middleman (bicholiya) bhi toh ye website dekh kar rate kam kar sakta hai?"
> **Answer:** *"Middleman ka fayda information asymmetry (karigar ki majboori aur anjaani) par tika tha. Ab artisan ke hath mein WhatsApp verified digital quotation hai jisme breakdown aur showroom MRP printed hai. Isse artisan under-selling se mana kar sakta hai aur negotiate kar sakta hai."*

### 10. "React ya Next.js ke bajaye Astro 5 kyun chuna?"
> **Answer:** *"Rural artisans ke paas ₹6,000–₹8,000 ke entry-level smartphones aur slow 3G/4G network hota hai. Next.js heavy client bundles bhejta hai. Astro 5 zero-JS islands architecture deta hai, jisse site 1 second ke andar load ho jati hai."*

### 11. "Agar gaon mein internet band ho jaye toh app chalegi?"
> **Answer:** *"Haan Sir, fully offline-ready hai. Humne client-side pure mathematical regression engine browser mein embed kiya hai jo 0 millisecond mein local calculate karta hai, aur data local phone storage (localStorage) mein safe rehta hai."*

### 12. "Aapke project ki sabse badi limitations kya hain?"
> **Answer:** *(Teachers love honest answers!)*  
> 1. *"Abhi buyer checkout/UPI escrow direct integrate nahi hai (future scope mein ONDC se connect karenge)."*  
> 2. *"Loud background noise (workshop hammers) mein audio cleaning improve karni hai."*  
> 3. *"Counterfeit detection physical lab tests ke bina 100% digital guarantee nahi kar sakta (future mein physical NFC smart tags add karenge)."*

---

## 💡 Team Speaking Rule (1 Golden Line)
> Jab bhi answer do: **Smile karo, 2 line ka clear answer do, aur exact metrics bolo.**  
> *"Sir, humara primary goal artisan ko unke mehnat ka hak dilana hai using Explainable AI, zero-JS performance, aur verified GI economics."*
