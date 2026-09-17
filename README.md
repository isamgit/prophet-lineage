# Prophet Lineage Frame Extractor & Interactive Viewer
### نسب النبي محمد ﷺ حتى عدنان

An interactive web application and asset toolkit presenting the noble lineage of Prophet Muhammad (ﷺ) down to Adnan. Features sequentially extracted high-resolution calligraphic animation frames (`1.png` to `23.png`), an interactive sequence player, grid inspector, direct ZIP export, and built-in readiness for Android APK packaging via Capacitor / Ionic.

---

## ✨ Features

- **23 Extracted Calligraphic Frames**: Extracted lossless PNG images (`1.png` through `23.png`, 448×336 px) capturing each generation.
- **Interactive Sequence Player**: Step forward or backward, jump to any generation, or play the sequence continuously with variable playback speeds (0.5s, 1.0s, 1.5s).
- **All-Images Grid & Gallery**: Inspect all 23 frames simultaneously with Arabic typography, transliteration, and single-image download buttons.
- **1-Click ZIP Archive**: Download all 23 frames bundled in `extracted_images.zip`.
- **Android APK & Ionic / Capacitor Ready**: Designed with a responsive viewport and standard web standards, ready to convert into a native Android APK using Capacitor.

---

## 📜 The Noble Lineage Sequence (1 – 23)

| Frame # | Filename | Arabic Name | English Transliteration | Generation |
| :---: | :---: | :--- | :--- | :---: |
| **1** | `1.png` | مُحَمَّدٌ ﷺ | Muhammad (ﷺ) | 1 |
| **2** | `2.png` | بْنُ عَبْدِ الله | ibn Abd Allah | 2 |
| **3** | `3.png` | بْنُ عَبْدِ الْمُطَّلِب | ibn Abd al-Muttalib | 3 |
| **4** | `4.png` | بْنُ هَاشِم | ibn Hashim | 4 |
| **5** | `5.png` | بْنُ عَبْدِ مَنَاف | ibn Abd Manaf | 5 |
| **6** | `6.png` | بْنُ قُصَيّ | ibn Qusayy | 6 |
| **7** | `7.png` | بْنُ كِلَاب | ibn Kilab | 7 |
| **8** | `8.png` | بْنُ مُرَّة | ibn Murrah | 8 |
| **9** | `9.png` | بْنُ كَعْب | ibn Ka'b | 9 |
| **10** | `10.png` | بْنُ لُؤَيّ | ibn Lu'ayy | 10 |
| **11** | `11.png` | بْنُ غَالِب | ibn Ghalib | 11 |
| **12** | `12.png` | بْنُ فِهْر | ibn Fihr | 12 |
| **13** | `13.png` | بْنُ النَّضْر | ibn an-Nadr | 13 |
| **14** | `14.png` | بْنُ قَيْس | ibn Qays | 14 |
| **15** | `15.png` | بْنُ كِنَانَة | ibn Kinana | 15 |
| **16** | `16.png` | بْنُ خُزَيْمَة | ibn Khuzaymah | 16 |
| **17** | `17.png` | بْنُ مُدْرِكَة | ibn Mudrikah | 17 |
| **18** | `18.png` | بْنُ إِلْيَاس | ibn Ilyas | 18 |
| **19** | `19.png` | بْنُ مُضَر | ibn Mudar | 19 |
| **20** | `20.png` | بْنُ نِزَار | ibn Nizar | 20 |
| **21** | `21.png` | بْنُ مَعَدّ | ibn Ma'add | 21 |
| **22** | `22.png` | بْنُ عَدْنَان | ibn Adnan | 22 |
| **23** | `23.png` | بْنُ عَدْنَان (خِتَام) | ibn Adnan (Conclusion) | 23 |

Full Arabic lineage string:
> **مُحَمَّدُ بْنُ عَبْدِ اللهِ بْنِ عَبْدِ الْمُطَّلِبِ بْنِ هَاشِمِ بْنِ عَبْدِ مَنَافِ بْنِ قُصَيِّ بْنِ كِلَابِ بْنِ مُرَّةَ بْنِ كَعْبِ بْنِ لُؤَيِّ بْنِ غَالِبِ بْنِ فِهْرِ بْنِ النَّضْرِ بْنِ قَيْسِ بْنِ كِنَانَةَ بْنِ خُزَيْمَةَ بْنِ مُدْرِكَةَ بْنِ إِلْيَاسَ بْنِ مُضَرَ بْنِ نِزَارِ بْنِ مَعَدِّ بْنِ عَدْنَان**

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/prophet-lineage.git
cd prophet-lineage
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
The application will be running locally at `http://localhost:3000`.

### 4. Build for production
```bash
npm run build
```
Compiled production-ready static assets will be output in `/dist`.

---

## 📱 Converting to Android APK (Capacitor / Ionic)

To package this application into a native Android APK:

### Step 1: Install Capacitor Core & Android Platform
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Initialize Capacitor Config
```bash
npx cap init "Prophet Lineage" "com.example.prophetlineage" --web-dir="dist"
```

### Step 3: Build Web Assets & Add Android Platform
```bash
npm run build
npx cap add android
```

### Step 4: Open in Android Studio & Generate APK
```bash
npx cap open android
```
Inside **Android Studio**:
1. Select **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Once generated, locate the `.apk` file (usually in `android/app/build/outputs/apk/debug/app-debug.apk`) and install it onto any Android device.

---

## 📁 Directory Structure

```
├── extracted_images/          # Extracted individual PNG frames (1.png to 23.png)
├── extracted_images.zip       # Bundled ZIP of all 23 frames
├── public/
│   ├── extracted_images/      # Web-accessible image frames
│   └── extracted_images.zip   # Publicly downloadable ZIP
├── src/
│   ├── App.tsx                # Main interactive player and grid viewer
│   ├── index.css              # Tailwind CSS styling
│   └── main.tsx               # React application entry point
├── Prophit.mp4                # Source animated video file
├── index.html                 # HTML template with metadata
├── package.json               # Node.js dependencies & scripts
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide React** (Icons)
- **FFmpeg & Python** (Asset Extraction & Packaging)

---

## 📄 License

This project is licensed under the Apache-2.0 License.
