# News Potli — CMS Guide
## न्यूज़ पोटली — CMS गाइड

### 1. आर्टिकल कैसे लिखें (How to Write an Article)

**Step 1:** Sanity Studio खोलें → Article → + (New Article)

**Step 2:** ये fields भरें:
- **Title (शीर्षक):** आर्टिकल का हिंदी शीर्षक
- **Slug:** Title से auto-generate होगा। इसे बदलें मत — URL इससे बनता है
- **Category:** सही category चुनें (सिर्फ एक)
- **Author:** अपना नाम select करें
- **Hero Image:** Main photo upload करें (1200px wide recommended)
  - **Alt Text:** Photo में क्या दिख रहा है, वो लिखें (SEO के लिए ज़रूरी)
  - Example: "किसान खेत में गेहूं काट रहा है"
- **Excerpt:** 1-2 line summary (Google search में दिखता है)
- **Body:** पूरा आर्टिकल लिखें

**Step 3:** Publish करें → Date/Time पहले से भरा हुआ मिलेगा

### 2. Image Guidelines

- Hero image: **1200px wide** recommended, max 500KB
- Body images: **800px wide** max
- Format: JPG preferred (PNG बहुत heavy होता है)
- Compress करें: https://tinypng.com पर upload करके compress करें
- **Alt Text:** हर image में Alt Text ज़रूर लिखें — अंधे users और Google के लिए

### 3. SEO Fields

- **SEO Title (English):** Article का English title (Google search में दिखता है)
  - Example: "Wheat Production in India Reaches Record High in 2025-26"
- **SEO Description (English):** 150 characters में article summary English में
  - Example: "India's wheat production reaches record 120.66 million tonnes in 2025-26 crop year"

### 4. Categories — कब कौन सी चुनें

| Category | कब use करें |
|---|---|
| खेती किसानी | फसल, खेती techniques, agriculture news |
| एग्री बुलेटिन | Government policies, APEDA, market reports |
| मौसम-बेमौसम | मौसम updates, बारिश, सूखा, climate change |
| पशुपालन | पशु, dairy, poultry, fisheries |
| बाजार | Mandi prices, commodity markets, trade |
| ग्राउन्ड रिपोर्ट्स | Field reporting, on-ground stories |
| साक्षात्कार | Interviews with experts, officials |
| तकनीक से तरक्की | Agri-tech, innovation, startups |
| कमाई की बात | Income stories, success stories |
| सरकारी योजना | Government schemes, subsidies |
| गांव की कहानियां | Village stories, rural life |

**Important:** सिर्फ एक category चुनें। Article उसी section में दिखेगा।

### 5. Article Edit करना (बिना link तोड़े)

- Published article खोलें → directly edit करें → Publish दबाएं
- **KABHI Unpublish मत करें** — link टूट जाएगा
- Edit करने पर URL नहीं बदलता

### 6. Embeds — YouTube, Twitter, Facebook, Instagram

Body में + button दबाएं:
- **YouTube:** YouTube Video चुनें → URL paste करें
- **Twitter/X:** Twitter/X Post चुनें → Tweet URL paste करें
  - URL में `/status/` होना ज़रूरी है
  - Example: `https://x.com/PotliNews/status/1234567890`
- **Facebook:** Facebook Post चुनें → Post URL paste करें
- **Instagram:** Instagram Post चुनें → Post URL paste करें
  - सिर्फ post/reel URL चलेगा — profile URL नहीं
  - Example: `https://www.instagram.com/p/ABC123/`

**Note:** अगर URL गलत format में है तो embed website पर नहीं दिखेगा (article बाकी normal रहेगा)।

### 7. Preview (प्रीव्यू)

Article लिखने के बाद, Publish से पहले: top-right में "Open Preview" button दबाएं →
Website पर कैसा दिखेगा वो देख सकते हैं।

- Preview में ऊपर पीली पट्टी दिखेगी: **PREVIEW MODE**
- वापस normal website पर जाने के लिए **Exit Preview** दबाएं
- Preview सिर्फ आपको दिखता है — public को नहीं

### 8. Author Profile Update

Sanity Studio → Author → अपना नाम → Photo, Bio, Social links update करें

### 9. Homepage पर article कब दिखेगा?

- Homepage अपने आप latest articles दिखाता है — कुछ extra करने की ज़रूरत नहीं
- **मुख्य खबरें** (बड़ा carousel): सबसे नए 4 articles **जिनमें Hero Image है**
  - इसलिए Hero Image ज़रूर लगाएं, वरना article carousel में नहीं आएगा
- **ताज़ा खबरें** (side list): सबसे नए articles
- **ताज़ा खबर** (ऊपर चलती पट्टी): सबसे नए 10 articles
- Category sections: उसी category के सबसे नए articles

Publish करने के बाद website पर आने में **60 seconds** तक लग सकते हैं।
