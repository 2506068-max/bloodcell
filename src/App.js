import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingCells from './components/FloatingCells';
import EnhancedBloodFlowDiagram from './components/EnhancedBloodFlowDiagram';
import CirculatoryAnimation from './components/CirculatoryAnimation';
import CirculatorySystemInfographic from './components/CirculatorySystemInfographic';
import BloodCellDetail from './components/BloodCellDetail';
import VesselAnatomy from './components/VesselAnatomy';
import OrganCards from './components/OrganCard';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Fab from './components/Fab';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen';
import InteractiveAnatomy from './components/InteractiveAnatomy';
import BadgeSystem from './components/BadgeSystem';
import Mascot from './components/Mascot'; // Tambahan: komponen Mascot perlu diimpor
function App() {
    const [loading, setLoading] = useState(true);
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [activeSection, setActiveSection] = useState('hero');
    const [quizMood, setQuizMood] = useState('idle');
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200); // Tidak perlu window.setTimeout
        return () => clearTimeout(timer); // Langsung panggil clearTimeout
    }, []);
    useEffect(() => {
        const stored = localStorage.getItem('badges');
        if (stored)
            setUnlockedBadges(JSON.parse(stored));
    }, []);
    useEffect(() => {
        let timer;
        if (quizMood === 'happy' || quizMood === 'sad' || quizMood === 'celebrate') {
            timer = window.setTimeout(() => setQuizMood('idle'), 2200);
        }
        return () => {
            if (timer)
                clearTimeout(timer);
        };
    }, [quizMood]);
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.25 });
        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect(); // Penting: disconnect observer saat cleanup
        };
    }, []);
    const handleBadgeUnlock = (badgeId) => {
        if (unlockedBadges.includes(badgeId))
            return; // Mencegah duplikasi badge
        const updated = [...unlockedBadges, badgeId];
        setUnlockedBadges(updated);
        localStorage.setItem('badges', JSON.stringify(updated));
    };
    // Style untuk flip card (sebaiknya dipindahkan ke file CSS terpisah)
    const flipCardStyles = `
    .flip-card {
      background-color: transparent;
      perspective: 1000px;
      cursor: pointer;
    }
    
    .flip-card-inner {
      position: relative;
      width: 100%;
      min-height: 240px;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    
    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }
    
    .flip-card-face, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .flip-card-back {
      transform: rotateY(180deg);
    }
  `;
    return (_jsxs("div", { className: "min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-500 overflow-x-hidden pb-24 lg:pb-0", children: [_jsx("style", { children: flipCardStyles }), " ", _jsx(ScrollProgress, {}), _jsx(FloatingCells, {}), _jsx(Navbar, {}), _jsx(Mascot, { section: activeSection, mood: quizMood }), _jsxs("main", { className: "relative z-10", children: [_jsx(Hero, {}), _jsx("section", { id: "organ", className: "px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 flex-col sm:flex-row mb-12", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400", children: "Atlas Organ Utama" }), _jsx("h2", { className: "mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Organ Anatomi Sistem Kardiovaskular" })] }), _jsx("p", { className: "max-w-xl text-sm text-slate-600 dark:text-slate-300 leading-relaxed", children: "Telaah komprehensif struktur makroskopis dan mikroskopis organ pemompa, oksigenasi pernapasan, serta jejaring vaskular perifer tubuh manusia." })] }), _jsx(OrganCards, {})] }) }), _jsx("section", { id: "anatomy", className: "px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-10 space-y-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400", children: "Eksplorasi Vaskular Interaktif" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Peta Anatomi Distribusi Darah Sistemik & Pulmonal" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed", children: "Klik atau arahkan kursor pada struktur jantung, aorta, vena kava, atau arteri organ untuk mempelajari fisiologi dan signifikansi klinisnya." })] }), _jsx(InteractiveAnatomy, {})] }) }), _jsx("section", { id: "diagram", className: "px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-10 space-y-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-sky-600 font-bold dark:text-sky-400", children: "Hemodinamika Sirkulasi" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Siklus Peredaran Darah Besar dan Kecil" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed", children: "Animasi aliran darah beroksigen dan terdeoksigenasi dari ruang pompa jantung melalui kapiler alveoli paru hingga ke mikrosirkulasi organ tubuh." })] }), _jsx(EnhancedBloodFlowDiagram, {})] }) }), _jsx("section", { id: "sirkulasi-animasi", className: "px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800", children: _jsx(CirculatoryAnimation, {}) }), _jsx("section", { id: "infografis", className: "px-4 sm:px-6 lg:px-8 py-20", children: _jsx(CirculatorySystemInfographic, {}) }), _jsx("section", { id: "sel-darah", className: "px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-12 space-y-3 text-center", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400", children: "Hematologi Mikroskopis" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Visualisasi Mikroskopi Sel Darah Manusia" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed", children: "Pengamatan morfologi cakram bikonkaf eritrosit, diferensiasi leukosit polimorfonuklear, dan aktivasi trombosit hemostasis." })] }), _jsx(BloodCellDetail, { cellType: "rbc" })] }) }), _jsx("section", { id: "pembuluh-darah", className: "px-4 sm:px-6 lg:px-8 py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-12 space-y-3 text-center", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-sky-600 font-bold dark:text-sky-400", children: "Histologi Vaskular" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Struktur Penampang Melintang Pembuluh Darah" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed", children: "Perbandingan ketebalan tunika adventisia, tunika media berotot, tunika intima endotel, katup vena semilunar, dan dinding endotel sel tunggal kapiler." })] }), _jsx(VesselAnatomy, {})] }) }), _jsx("section", { id: "penyakit", className: "px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start justify-between gap-4 mb-12", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400", children: "Patofisiologi Klinis" }), _jsx("h2", { className: "mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white", children: "Gangguan & Patologi Sistem Kardiovaskular" })] }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 max-w-xl text-sm leading-relaxed", children: "Kenali mekanisme etiologi, manifestasi klinis, dan langkah pencegahan penyakit sirkulasi yang sering ditemui dalam praktik kedokteran." })] }), _jsxs("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [_jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 mb-4 border border-rose-100 dark:border-rose-900/40", children: _jsxs("svg", { viewBox: "0 0 24 24", className: "w-6 h-6 stroke-current fill-none stroke-[2]", children: [_jsx("circle", { cx: "12", cy: "12", r: "9" }), _jsx("circle", { cx: "12", cy: "12", r: "4", strokeDasharray: "3,2" })] }) }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-rose-600", children: "Hematologi" }), _jsx("h3", { className: "mt-1 text-xl font-bold text-slate-900 dark:text-white", children: "Anemia Defisiensi & Hemolitik" }), _jsx("p", { className: "mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed", children: "Penurunan konsentrasi hemoglobin atau massa eritrosit, menyebabkan kapasitas pengangkutan oksigen ke jaringan berkurang drastis." })] }), _jsx("p", { className: "text-[11px] font-semibold text-rose-600 mt-4 flex items-center gap-1", children: "Arahkan kursor untuk melihat gejala klinis \u2192" })] }), _jsxs("div", { className: "flip-card-back rounded-3xl border border-rose-200 bg-rose-50/95 p-7 flex flex-col justify-center dark:border-rose-900 dark:bg-slate-900/95", children: [_jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white", children: "Manifestasi Klinis & Patologi" }), _jsxs("ul", { className: "mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300", children: [_jsx("li", { children: "\u2022 Hipoksia jaringan perifer & kelelahan kronis" }), _jsx("li", { children: "\u2022 Pucat pada konjungtiva dan bantalan kuku" }), _jsx("li", { children: "\u2022 Takikardia kompensasi (jantung berdetak lebih cepat)" }), _jsx("li", { children: "\u2022 Penurunan Hb: <13 g/dL (pria) atau <12 g/dL (wanita)" })] })] })] }) }), _jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 mb-4 border border-sky-100 dark:border-sky-900/40", children: _jsxs("svg", { viewBox: "0 0 24 24", className: "w-6 h-6 stroke-current fill-none stroke-[2]", children: [_jsx("path", { d: "M4 12h16M12 4v16", strokeLinecap: "round" }), _jsx("circle", { cx: "12", cy: "12", r: "9" })] }) }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-sky-600", children: "Vaskular Sistemik" }), _jsx("h3", { className: "mt-1 text-xl font-bold text-slate-900 dark:text-white", children: "Hipertensi Arterial Esensial" }), _jsx("p", { className: "mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed", children: "Peningkatan resistensi vaskular perifer persisten yang memaksa miokardium ventrikel kiri bekerja lebih keras melawan afterload." })] }), _jsx("p", { className: "text-[11px] font-semibold text-sky-600 mt-4 flex items-center gap-1", children: "Arahkan kursor untuk strategi klinis \u2192" })] }), _jsxs("div", { className: "flip-card-back rounded-3xl border border-sky-200 bg-sky-50/95 p-7 flex flex-col justify-center dark:border-sky-900 dark:bg-slate-900/95", children: [_jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white", children: "Parameter & Manajemen Klinis" }), _jsxs("ul", { className: "mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300", children: [_jsx("li", { children: "\u2022 Kriteria: Sistolik \u2265140 mmHg atau Diastolik \u226590 mmHg" }), _jsx("li", { children: "\u2022 Komplikasi: Hipertrofi ventrikel kiri (LVH) & nefrosklerosis" }), _jsx("li", { children: "\u2022 Restriksi asupan natrium (<2 g garam per hari)" }), _jsx("li", { children: "\u2022 Menghambat remodeling vaskular via aktivitas aerobik" })] })] })] }) }), _jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100 dark:border-amber-900/40", children: _jsx("svg", { viewBox: "0 0 24 24", className: "w-6 h-6 stroke-current fill-none stroke-[2]", children: _jsx("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-600", children: "Serebrovaskular" }), _jsx("h3", { className: "mt-1 text-xl font-bold text-slate-900 dark:text-white", children: "Stroke Iskemik & Hemoragik" }), _jsx("p", { className: "mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed", children: "Oklusi tromboemboli atau ruptur pembuluh darah serebral (arteri serebri media), menyebabkan iskemia neuron dalam hitungan menit." })] }), _jsx("p", { className: "text-[11px] font-semibold text-amber-600 mt-4 flex items-center gap-1", children: "Arahkan kursor untuk tanda peringatan \u2192" })] }), _jsxs("div", { className: "flip-card-back rounded-3xl border border-amber-200 bg-amber-50/95 p-7 flex flex-col justify-center dark:border-amber-900 dark:bg-slate-900/95", children: [_jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white", children: "Protokol Deteksi Cepat (FAST)" }), _jsxs("ul", { className: "mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Face:" }), " Kelumpuhan wajah asimetris saat tersenyum"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Arms:" }), " Kelemahan motorik unilateral pada lengan"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Speech:" }), " Disartria (bicara pelo/cadel) atau afasia"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Time:" }), " Golden period terapi trombolisis (<4.5 jam)"] })] })] })] }) })] })] }) }), _jsx("section", { id: "badges", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Pencapaian" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold mt-3", children: "Kumpulkan Lencana Pembelajaran" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl mt-4", children: "Setiap aktivitas belajar membuka lencana baru. Kumpulkan semuanya untuk membuka konten eksklusif!" })] }), _jsx(BadgeSystem, { unlockedBadges: unlockedBadges, onBadgeUnlock: handleBadgeUnlock })] }) }), _jsx("section", { id: "kuis", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_0.75fr] items-start", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Kuis Interaktif" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Tantang pemahamanmu dengan soal yang mudah disentuh." }), _jsx("p", { className: "text-[color:var(--muted)] max-w-xl", children: "Setiap jawaban dibuat responsive untuk ukuran layar kecil, sehingga kuis tetap nyaman bagi semua usia." })] }), _jsx(Quiz, { onComplete: () => {
                                        handleBadgeUnlock('first_quiz');
                                        setQuizMood('celebrate');
                                    }, onAnswer: (correct) => setQuizMood(correct ? 'happy' : 'sad') })] }) })] }), _jsx(Footer, {}), _jsx(Fab, {}), _jsx(BottomNav, {}), loading && _jsx(LoadingScreen, {})] }));
}
export default App;
