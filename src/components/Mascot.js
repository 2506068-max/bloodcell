import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
const facts = {
    hero: '💡 Halo! Ayo jelajahi sistem peredaran darah dengan cara yang seru dan mudah dipahami.',
    organ: '❤️ Jantung, darah, dan pembuluh darah bekerja sama agar kamu tetap aktif setiap hari.',
    anatomy: '🧠 Sentuh bagian organ untuk melihat fakta menarik tentang jantung dan paru-paru.',
    diagram: '🔴 Vena dan arteri membawa darah dengan warna yang berbeda untuk fungsi khusus.',
    penyakit: '⚠️ Menjaga pola makan dan olahraga membantu mencegah hipertensi dan penyakit jantung.',
    badges: '🏅 Kumpulkan lencana dan lihat seberapa jauh kamu sudah belajar.',
    kuis: '🎉 Yuk coba kuis! Semakin banyak benar, semakin beruntung kamu dapat badge baru.',
};
export default function Mascot({ section = 'hero' }) {
    const [showFact, setShowFact] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        setShowFact(true);
        const timer = window.setTimeout(() => setShowFact(false), 5500);
        return () => clearTimeout(timer);
    }, [section]);
    return (_jsxs(motion.div, { className: "fixed bottom-8 right-8 z-40 hidden sm:block", drag: true, dragConstraints: { left: -120, right: 0, top: 0, bottom: 120 }, initial: { x: 0, y: 0 }, animate: { x: position.x, y: position.y }, onDragEnd: (_event, info) => {
            setPosition({
                x: position.x + info.offset.x,
                y: position.y + info.offset.y,
            });
        }, children: [_jsx(motion.div, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: () => setShowFact((prev) => !prev), className: "cursor-grab active:cursor-grabbing", children: _jsxs(motion.div, { animate: { y: [0, -8, 0] }, transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }, className: "relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow", children: [_jsx("div", { className: "absolute top-4 left-6 w-4 h-4 rounded-full bg-white/70 blur-sm" }), _jsx("div", { className: "absolute top-7 left-8 w-3 h-3 rounded-full bg-white/90" }), _jsx("div", { className: "absolute right-6 top-6 w-3 h-3 rounded-full bg-white/70" }), _jsx("div", { className: "text-4xl", children: "\u2764\uFE0F" })] }) }), _jsx(AnimatePresence, { children: showFact && (_jsx(motion.div, { initial: { opacity: 0, y: 20, scale: 0.8 }, animate: { opacity: 1, y: -90, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.8 }, className: "absolute bottom-full right-0 mb-4 w-72 sm:w-80", children: _jsxs("div", { className: "relative rounded-3xl border border-primary/20 bg-white/95 p-4 shadow-glow dark:bg-slate-950/90 dark:border-slate-700/50", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed", children: facts[section] || facts.hero }), _jsx("div", { className: "absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white border-l border-t border-primary/20 dark:bg-slate-950/90 dark:border-slate-700/50" })] }) })) })] }));
}
