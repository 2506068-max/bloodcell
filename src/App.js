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
    return (_jsxs("div", { className: "min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-500 overflow-x-hidden pb-24 lg:pb-0", children: [_jsx("style", { children: flipCardStyles }), " ", _jsx(ScrollProgress, {}), _jsx(FloatingCells, {}), _jsx(Navbar, {}), _jsx(Mascot, { section: activeSection, mood: quizMood }), _jsxs("main", { className: "relative z-10", children: [_jsx(Hero, {}), _jsx("section", { id: "organ", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 flex-col sm:flex-row mb-8", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Organ Tubuh" }), _jsx("h2", { className: "mt-3 text-3xl sm:text-4xl font-extrabold", children: "Ikuti organ utama yang menjaga darahmu tetap sehat." })] }), _jsx("p", { className: "max-w-xl text-sm text-[color:var(--muted)]", children: "Desain kartu yang ramah untuk anak dan dewasa, dengan efek hover lembut dan modal detail yang mudah diakses." })] }), _jsx(OrganCards, {})] }) }), _jsx("section", { id: "anatomy", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8 space-y-4", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Anatomi Interaktif" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Jelajahi Sistem Peredaran Darah Secara Detail" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl", children: "Hover pada bagian organ untuk melihat informasi lengkap tentang fungsinya dalam sistem peredaran darah Anda." })] }), _jsx(InteractiveAnatomy, {})] }) }), _jsx("section", { id: "diagram", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8 space-y-4", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Diagram Aliran Darah" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Lihat perjalanan darah melalui jantung dan paru-paru" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl", children: "Animasi interaktif menunjukkan bagaimana darah bergerak dari paru-paru melalui jantung ke seluruh tubuh dan kembali lagi." })] }), _jsx(EnhancedBloodFlowDiagram, {})] }) }), _jsx("section", { id: "sirkulasi-animasi", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-50", children: _jsx(CirculatoryAnimation, {}) }), _jsx("section", { id: "infografis", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950", children: _jsx(CirculatorySystemInfographic, {}) }), _jsx("section", { id: "sel-darah", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-12 space-y-4 text-center", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Komponen Darah" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Sel-sel Kecil Penjaga Kesehatan" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl mx-auto", children: "Pelajari tentang sel darah merah, sel darah putih, trombosit, dan molekul penting yang mengalir dalam darah Anda" })] }), _jsx(BloodCellDetail, { cellType: "rbc" })] }) }), _jsx("section", { id: "pembuluh-darah", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-12 space-y-4 text-center", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Anatomis Pembuluh" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Struktur Pembuluh Darah" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl mx-auto", children: "Pahami perbedaan antara arteri, vena, dan kapiler serta bagaimana mereka bekerja dalam sistem sirkulasi" })] }), _jsx(VesselAnatomy, {})] }) }), _jsx("section", { id: "penyakit", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start justify-between gap-4 mb-8", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Penyakit & Gangguan" }), _jsx("h2", { className: "mt-3 text-3xl sm:text-4xl font-extrabold", children: "Kenali gangguan peredaran darah dengan cepat." })] }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl", children: "Flip card memberikan pengalaman belajar yang interaktif untuk memahami gejala dan pencegahan secara menyenangkan." })] }), _jsxs("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [_jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500", children: [_jsx("div", { className: "text-5xl", children: "\uD83E\uDD12" }), _jsx("h3", { className: "mt-5 text-xl font-bold", children: "Anemia" }), _jsx("p", { className: "mt-3 text-[color:var(--muted)]", children: "Darah kekurangan sel darah merah atau hemoglobin." })] }), _jsxs("div", { className: "flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center", children: [_jsx("h3", { className: "text-xl font-bold", children: "Gejala" }), _jsxs("ul", { className: "mt-4 space-y-2 text-sm text-[color:var(--muted)]", children: [_jsx("li", { children: "\u2022 Lelah cepat" }), _jsx("li", { children: "\u2022 Pucat" }), _jsx("li", { children: "\u2022 Detak jantung cepat" })] })] })] }) }), _jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500", children: [_jsx("div", { className: "text-5xl", children: "\uD83E\uDE78" }), _jsx("h3", { className: "mt-5 text-xl font-bold", children: "Hipertensi" }), _jsx("p", { className: "mt-3 text-[color:var(--muted)]", children: "Tekanan darah tinggi membuat pembuluh darah bekerja lebih keras." })] }), _jsxs("div", { className: "flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center", children: [_jsx("h3", { className: "text-xl font-bold", children: "Tips" }), _jsxs("ul", { className: "mt-4 space-y-2 text-sm text-[color:var(--muted)]", children: [_jsx("li", { children: "\u2022 Kurangi garam" }), _jsx("li", { children: "\u2022 Olahraga teratur" }), _jsx("li", { children: "\u2022 Minum air cukup" })] })] })] }) }), _jsx("div", { className: "flip-card", children: _jsxs("div", { className: "flip-card-inner", children: [_jsxs("div", { className: "flip-card-face glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500", children: [_jsx("div", { className: "text-5xl", children: "\u26A1" }), _jsx("h3", { className: "mt-5 text-xl font-bold", children: "Stroke" }), _jsx("p", { className: "mt-3 text-[color:var(--muted)]", children: "Aliran darah ke otak terganggu, butuh penanganan cepat." })] }), _jsxs("div", { className: "flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center", children: [_jsx("h3", { className: "text-xl font-bold", children: "Ciri" }), _jsxs("ul", { className: "mt-4 space-y-2 text-sm text-[color:var(--muted)]", children: [_jsx("li", { children: "\u2022 Bicara cadel" }), _jsx("li", { children: "\u2022 Wajah miring" }), _jsx("li", { children: "\u2022 Mati rasa" })] })] })] }) })] })] }) }), _jsx("section", { id: "badges", className: "px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Pencapaian" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold mt-3", children: "Kumpulkan Lencana Pembelajaran" }), _jsx("p", { className: "text-[color:var(--muted)] max-w-2xl mt-4", children: "Setiap aktivitas belajar membuka lencana baru. Kumpulkan semuanya untuk membuka konten eksklusif!" })] }), _jsx(BadgeSystem, { unlockedBadges: unlockedBadges, onBadgeUnlock: handleBadgeUnlock })] }) }), _jsx("section", { id: "kuis", className: "px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_0.75fr] items-start", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-secondary font-bold", children: "Kuis Interaktif" }), _jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold", children: "Tantang pemahamanmu dengan soal yang mudah disentuh." }), _jsx("p", { className: "text-[color:var(--muted)] max-w-xl", children: "Setiap jawaban dibuat responsive untuk ukuran layar kecil, sehingga kuis tetap nyaman bagi semua usia." })] }), _jsx(Quiz, { onComplete: () => {
                                        handleBadgeUnlock('first_quiz');
                                        setQuizMood('celebrate');
                                    }, onAnswer: (correct) => setQuizMood(correct ? 'happy' : 'sad') })] }) })] }), _jsx(Footer, {}), _jsx(Fab, {}), _jsx(BottomNav, {}), loading && _jsx(LoadingScreen, {})] }));
}
export default App;
