/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Download,
  Archive,
  Film,
  Grid,
  RotateCcw,
  Check,
  Smartphone,
  Layers,
  Sparkles,
} from 'lucide-react';

interface FrameItem {
  id: number;
  filename: string;
  nameArabic: string;
  transliteration: string;
  generation: number;
}

const FRAMES: FrameItem[] = [
  { id: 1, filename: '1.png', nameArabic: 'مُحَمَّدٌ ﷺ', transliteration: 'Muhammad (ﷺ)', generation: 1 },
  { id: 2, filename: '2.png', nameArabic: 'بْنُ عَبْدِ الله', transliteration: 'ibn Abd Allah', generation: 2 },
  { id: 3, filename: '3.png', nameArabic: 'بْنُ عَبْدِ الْمُطَّلِب', transliteration: 'ibn Abd al-Muttalib', generation: 3 },
  { id: 4, filename: '4.png', nameArabic: 'بْنُ هَاشِم', transliteration: 'ibn Hashim', generation: 4 },
  { id: 5, filename: '5.png', nameArabic: 'بْنُ عَبْدِ مَنَاف', transliteration: 'ibn Abd Manaf', generation: 5 },
  { id: 6, filename: '6.png', nameArabic: 'بْنُ قُصَيّ', transliteration: 'ibn Qusayy', generation: 6 },
  { id: 7, filename: '7.png', nameArabic: 'بْنُ كِلَاب', transliteration: 'ibn Kilab', generation: 7 },
  { id: 8, filename: '8.png', nameArabic: 'بْنُ مُرَّة', transliteration: 'ibn Murrah', generation: 8 },
  { id: 9, filename: '9.png', nameArabic: 'بْنُ كَعْب', transliteration: 'ibn Ka\'b', generation: 9 },
  { id: 10, filename: '10.png', nameArabic: 'بْنُ لُؤَيّ', transliteration: 'ibn Lu\'ayy', generation: 10 },
  { id: 11, filename: '11.png', nameArabic: 'بْنُ غَالِب', transliteration: 'ibn Ghalib', generation: 11 },
  { id: 12, filename: '12.png', nameArabic: 'بْنُ فِهْر', transliteration: 'ibn Fihr', generation: 12 },
  { id: 13, filename: '13.png', nameArabic: 'بْنُ النَّضْر', transliteration: 'ibn an-Nadr', generation: 13 },
  { id: 14, filename: '14.png', nameArabic: 'بْنُ قَيْس', transliteration: 'ibn Qays', generation: 14 },
  { id: 15, filename: '15.png', nameArabic: 'بْنُ كِنَانَة', transliteration: 'ibn Kinana', generation: 15 },
  { id: 16, filename: '16.png', nameArabic: 'بْنُ خُزَيْمَة', transliteration: 'ibn Khuzaymah', generation: 16 },
  { id: 17, filename: '17.png', nameArabic: 'بْنُ مُدْرِكَة', transliteration: 'ibn Mudrikah', generation: 17 },
  { id: 18, filename: '18.png', nameArabic: 'بْنُ إِلْيَاس', transliteration: 'ibn Ilyas', generation: 18 },
  { id: 19, filename: '19.png', nameArabic: 'بْنُ مُضَر', transliteration: 'ibn Mudar', generation: 19 },
  { id: 20, filename: '20.png', nameArabic: 'بْنُ نِزَار', transliteration: 'ibn Nizar', generation: 20 },
  { id: 21, filename: '21.png', nameArabic: 'بْنُ مَعَدّ', transliteration: 'ibn Ma\'add', generation: 21 },
  { id: 22, filename: '22.png', nameArabic: 'بْنُ عَدْنَان', transliteration: 'ibn Adnan', generation: 22 },
  { id: 23, filename: '23.png', nameArabic: 'بْنُ عَدْنَان (خِتَام)', transliteration: 'ibn Adnan (Conclusion)', generation: 23 },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000);
  const [viewMode, setViewMode] = useState<'preview' | 'grid'>('preview');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [showApkGuide, setShowApkGuide] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentFrame = FRAMES.find((f) => f.id === selectedId) || FRAMES[0];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setSelectedId((prev) => (prev >= FRAMES.length ? 1 : prev + 1));
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleCopyPath = (path: string) => {
    navigator.clipboard?.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handlePrev = () => {
    setSelectedId((prev) => (prev <= 1 ? FRAMES.length : prev - 1));
  };

  const handleNext = () => {
    setSelectedId((prev) => (prev >= FRAMES.length ? 1 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur px-4 lg:px-8 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-900/20">
            <Film className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <span>Prophet Lineage Frame Extractor</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-normal">
                23 Frames Extracted
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Extracted lossless PNG images from <code className="text-amber-300 font-mono">Prophit.mp4</code> (1.png – 23.png)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="toggle-apk-guide-btn"
            onClick={() => setShowApkGuide(!showApkGuide)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-750 text-slate-200 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">APK & Vue Export</span>
          </button>
          <a
            id="download-all-zip-btn"
            href="/extracted_images.zip"
            download="extracted_images.zip"
            className="flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium transition shadow-sm"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Download All ZIP</span>
          </a>
        </div>
      </header>

      {/* APK Guide Drawer / Banner */}
      {showApkGuide && (
        <aside className="border-b border-sky-900/40 bg-sky-950/40 px-4 lg:px-8 py-3 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-medium text-sky-300">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Convert to Android APK with Ionic / Vue & Capacitor</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To convert this lineage viewer into an Android APK, run <code className="text-sky-300 bg-slate-900/60 px-1 py-0.5 rounded font-mono">npx cap add android</code> followed by <code className="text-sky-300 bg-slate-900/60 px-1 py-0.5 rounded font-mono">npx cap open android</code> in Android Studio. All frames are saved in both <code className="text-amber-300">/extracted_images/</code> and <code className="text-amber-300">/public/extracted_images/</code>.
            </p>
          </div>
          <button
            onClick={() => setShowApkGuide(false)}
            className="self-end md:self-center text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Dismiss
          </button>
        </aside>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
            <button
              id="view-preview-mode"
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition ${
                viewMode === 'preview'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Sequence Player
            </button>
            <button
              id="view-grid-mode"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              All 23 Images Grid
            </button>
          </div>

          {viewMode === 'preview' && (
            <div className="flex items-center gap-2">
              <button
                id="playback-prev-btn"
                onClick={handlePrev}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                title="Previous frame"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="playback-toggle-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isPlaying
                    ? 'bg-rose-500 hover:bg-rose-400 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Play Sequence
                  </>
                )}
              </button>

              <button
                id="playback-next-btn"
                onClick={handleNext}
                className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                title="Next frame"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>Speed:</span>
                <select
                  aria-label="Playback speed"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs outline-none"
                >
                  <option value={1500}>0.7s (Slow)</option>
                  <option value={1000}>1.0s (Normal)</option>
                  <option value={500}>0.5s (Fast)</option>
                </select>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-400 font-mono">
            Frame <span className="text-amber-400 font-bold">{selectedId}</span> of 23
          </div>
        </div>

        {viewMode === 'preview' ? (
          /* Sequence Preview View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Stage Container */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-[4/3] flex items-center justify-center shadow-2xl">
                <img
                  src={`/extracted_images/${currentFrame.filename}`}
                  alt={`Frame ${currentFrame.id}: ${currentFrame.nameArabic}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-2.5 py-1 rounded-md text-xs font-mono text-slate-300">
                  {currentFrame.filename}
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur border border-slate-700/60 px-3 py-1 rounded-md text-xs text-amber-300 font-semibold">
                  Generation {currentFrame.generation}
                </div>

                <div className="absolute bottom-3 inset-x-3 bg-slate-950/85 backdrop-blur border border-slate-800 px-4 py-2.5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-amber-200 text-right font-serif tracking-wide">
                      {currentFrame.nameArabic}
                    </div>
                    <div className="text-xs text-slate-400">
                      {currentFrame.transliteration}
                    </div>
                  </div>

                  <a
                    id="download-single-frame-btn"
                    href={`/extracted_images/${currentFrame.filename}`}
                    download={currentFrame.filename}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    Download PNG
                  </a>
                </div>
              </div>

              {/* Filmstrip of Thumbnails */}
              <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
                  <span>Timeline Filmstrip (1 – 23)</span>
                  <span className="text-[11px] text-slate-500">Click any frame to jump</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setSelectedId(f.id);
                        setIsPlaying(false);
                      }}
                      className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border transition ${
                        selectedId === f.id
                          ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                          : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={`/extracted_images/${f.filename}`}
                        alt={f.nameArabic}
                        className="w-full h-full object-cover bg-black"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0.5 right-1 text-[10px] font-mono px-1 rounded bg-black/80 text-white">
                        {f.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Frame Specs Card */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Frame File Details
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">File Name</span>
                    <span className="font-mono text-amber-300 font-semibold">{currentFrame.filename}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Resolution</span>
                    <span className="font-mono text-slate-200">448 × 336 px</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Format</span>
                    <span className="font-mono text-emerald-400">PNG (Lossless 24-bit RGB)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Source Video</span>
                    <span className="font-mono text-slate-300">Prophit.mp4 (22.05s)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Workspace Path</span>
                    <span className="font-mono text-slate-300">/extracted_images/{currentFrame.filename}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleCopyPath(`/extracted_images/${currentFrame.filename}`)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 font-medium transition"
                  >
                    {copiedPath === `/extracted_images/${currentFrame.filename}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Path Copied!
                      </>
                    ) : (
                      <>
                        <span>Copy File Path</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`/extracted_images/${currentFrame.filename}`}
                    download={currentFrame.filename}
                    className="w-full flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download {currentFrame.filename}
                  </a>
                </div>
              </div>

              {/* Lineage Summary */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Lineage Summary (نسب النبي ﷺ)
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-serif text-right line-clamp-6">
                  مُحَمَّدُ بْنُ عَبْدِ اللهِ بْنِ عَبْدِ الْمُطَّلِبِ بْنِ هَاشِمِ بْنِ عَبْدِ مَنَافِ بْنِ قُصَيِّ بْنِ كِلَابِ بْنِ مُرَّةَ بْنِ كَعْبِ بْنِ لُؤَيِّ بْنِ غَالِبِ بْنِ فِهْرِ بْنِ النَّضْرِ بْنِ قَيْسِ بْنِ كِنَانَةَ بْنِ خُزَيْمَةَ بْنِ مُدْرِكَةَ بْنِ إِلْيَاسَ بْنِ مُضَرَ بْنِ نِزَارِ بْنِ مَعَدِّ بْنِ عَدْنَان
                </div>
                <p className="text-[11px] text-slate-500">
                  All 23 frames extracted from the animated calligraphic video.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View of all 23 Images */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-300">
                All Extracted Images (1.png – 23.png)
              </h2>
              <span className="text-xs text-slate-500">
                Click any image to view details or download
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {FRAMES.map((f) => (
                <div
                  key={f.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition group flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-black">
                    <img
                      src={`/extracted_images/${f.filename}`}
                      alt={f.nameArabic}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-black/80 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-300">
                      #{f.id}
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200 text-right font-serif truncate">
                        {f.nameArabic}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {f.filename}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedId(f.id);
                          setViewMode('preview');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                      >
                        Inspect
                      </button>
                      <a
                        href={`/extracted_images/${f.filename}`}
                        download={f.filename}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title="Download this image"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        Extracted 23 frames into <code className="text-slate-400 font-mono">/extracted_images/</code> &amp; <code className="text-slate-400 font-mono">/public/extracted_images/</code>. Ready for Android / APK / Ionic packaging.
      </footer>
    </div>
  );
}

