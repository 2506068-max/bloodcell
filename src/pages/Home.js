import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Hero from '../components/Hero';
import StatCard from '../components/StatCard';
import MenuCard from '../components/MenuCard';
import { motion } from 'framer-motion';
export default function Home() {
    const stats = [
        {
            icon: '❤️',
            title: 'Jantung',
            value: '100,000',
            description: 'Detak jantung per hari',
        },
        {
            icon: '🔴',
            title: 'Sel Darah Merah',
            value: '25 Juta',
            description: 'Diproduksi setiap detik',
        },
        {
            icon: '🩸',
            title: 'Pembuluh Darah',
            value: '100,000 km',
            description: 'Total panjang di tubuh',
        },
        {
            icon: '⚡',
            title: 'Siklus Darah',
            value: '60 Detik',
            description: 'Waktu darah mengedar 1 putaran',
        },
    ];
    const categories = [
        {
            icon: '📚',
            title: 'Pengertian',
            description: 'Pelajari konsep dasar sistem peredaran darah manusia',
            link: '/pengertian',
            color: 'primary',
        },
        {
            icon: '🫀',
            title: 'Organ & Fungsi',
            description: 'Kenali jantung, pembuluh darah, dan sel darah',
            link: '/organ',
            color: 'primary',
        },
        {
            icon: '🔄',
            title: 'Jenis Peredaran',
            description: 'Pahami peredaran kecil dan peredaran besar',
            link: '/jenis',
            color: 'secondary',
        },
        {
            icon: '🏥',
            title: 'Gangguan & Penyakit',
            description: 'Pelajari penyakit yang menyerang sistem peredaran',
            link: '/gangguan',
            color: 'secondary',
        },
        {
            icon: '🖼️',
            title: 'Galeri & Infografis',
            description: 'Lihat visualisasi menarik tentang peredaran darah',
            link: '/galeri',
            color: 'accent',
        },
        {
            icon: '🧪',
            title: 'Kuis & Evaluasi',
            description: 'Uji pengetahuanmu dengan kuis interaktif',
            link: '/kuis',
            color: 'accent',
        },
        {
            icon: 'ℹ️',
            title: 'Tentang',
            description: 'Pelajari lebih lanjut tentang website ini',
            link: '/tentang',
            color: 'primary',
        },
    ];
    return (_jsxs("main", { className: "min-h-screen", children: [_jsx(Hero, {}), _jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-background to-background", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl lg:text-5xl font-display font-bold mb-4", children: ["Fakta Menarik Tentang", _jsx("span", { className: "text-gradient ml-2", children: "Tubuh Kita" })] }), _jsx("p", { className: "text-lg text-text-muted max-w-2xl mx-auto", children: "Sistem peredaran darah adalah salah satu sistem terpenting dalam tubuh kita. Mari pelajari beberapa fakta mengagumkan!" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, i) => (_jsx(StatCard, { ...stat, delay: i * 0.1 }, i))) })] }) }), _jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl lg:text-5xl font-display font-bold mb-4", children: ["Mulai Belajar Sekarang", _jsx("span", { className: "text-gradient ml-2", children: "\uD83D\uDE80" })] }), _jsx("p", { className: "text-lg text-text-muted max-w-2xl mx-auto", children: "Pilih topik yang ingin kamu pelajari dan mulai petualangan edukasimu!" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.map((category, i) => (_jsx(MenuCard, { ...category, delay: i * 0.1 }, i))) })] }) }), _jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl mx-4 md:mx-8 mb-20", children: _jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [_jsx(motion.h3, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-3xl lg:text-4xl font-display font-bold mb-6 text-gradient", children: "Siap untuk Belajar? \uD83C\uDF93" }), _jsx(motion.p, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: 0.2 }, className: "text-lg text-text-muted mb-8", children: "Jangan khawatir! Website ini dirancang untuk semua usia dengan cara yang menyenangkan dan mudah dipahami. Mari kita jelajahi dunia luar biasa dari sistem peredaran darah bersama-sama!" })] }) })] }));
}
