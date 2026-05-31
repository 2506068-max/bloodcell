import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import AnimatedCard from './AnimatedCard';
import Tooltip from './Tooltip';
import { X } from 'lucide-react';
const items = [
    {
        id: 'heart',
        title: 'Jantung',
        emoji: '❤️',
        color: '#FF4D6D',
        desc: 'Memompa darah ke seluruh tubuh.',
        detail: 'Jantung berdetak sekitar 100.000 kali sehari dan bekerja seperti pompa kecil yang kuat untuk memastikan darah terus bergerak.',
        stats: '72 bpm',
        trivia: 'Jantung anak berdetak lebih cepat daripada orang dewasa.'
    },
    {
        id: 'blood',
        title: 'Darah',
        emoji: '🩸',
        color: '#FF8FA3',
        desc: 'Membawa oksigen dan nutrisi.',
        detail: 'Darah terdiri dari sel darah merah, putih, dan plasma. Sel darah merah membawa oksigen dari paru ke seluruh tubuh.',
        stats: '5L',
        trivia: 'Tubuh manusia dewasa mengandung sekitar 5 liter darah.'
    },
    {
        id: 'vessel',
        title: 'Pembuluh Darah',
        emoji: '🔴',
        color: '#4ECDC4',
        desc: 'Jalur peredaran darah.',
        detail: 'Pembuluh darah seperti jalan raya untuk darah. Ada arteri, vena, dan kapiler yang membantu mengantarkan darah ke organ-organ.',
        stats: '100K km',
        trivia: 'Jika semua pembuluh darah manusia disambung, panjangnya mencapai 100.000 km!'
    }
];
export default function OrganCards() {
    const [open, setOpen] = useState(null);
    return (_jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [items.map((it, idx) => (_jsx(AnimatedCard, { className: "bg-white/90 dark:bg-slate-900/90 rounded-[2rem] p-6 shadow-soft hover:shadow-glow transition-all duration-300 border border-white/50 dark:border-slate-800/50", onClick: () => setOpen(it.id), children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: idx * 0.08 }, className: "space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx(Tooltip, { content: it.desc, children: _jsx(motion.div, { className: "w-16 h-16 rounded-3xl flex items-center justify-center text-3xl flex-shrink-0", style: {
                                                    background: `linear-gradient(135deg, ${it.color}, ${it.color}cc)`,
                                                    boxShadow: `0 8px 24px ${it.color}40`,
                                                }, animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 3, repeat: Infinity }, children: it.emoji }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-bold text-lg", children: it.title }), _jsx("p", { className: "text-sm text-[color:var(--muted)]", children: it.desc })] })] }), _jsx(motion.div, { className: "px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-xs font-semibold", animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity }, children: it.stats })] }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "w-full py-2 px-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-sm font-semibold text-primary dark:text-secondary transition-all", children: "Pelajari Lebih Lanjut \u2192" })] }) }, it.id))), _jsx(AnimatePresence, { children: open && (_jsx(motion.div, { className: "fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-md", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setOpen(null), children: _jsxs(motion.div, { onClick: (e) => e.stopPropagation(), initial: { opacity: 0, scale: 0.9, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.9, y: 20 }, transition: { type: 'spring', stiffness: 300 }, className: "bg-white dark:bg-slate-900 rounded-[2rem] p-8 w-full max-w-2xl shadow-glow border border-white/50 dark:border-slate-800/50 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", {}), _jsx(motion.button, { whileHover: { rotate: 90, scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: () => setOpen(null), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors", children: _jsx(X, { size: 24 }) })] }), items.find(i => i.id === open) && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(motion.div, { className: "w-20 h-20 rounded-3xl flex items-center justify-center text-4xl", style: {
                                                    background: `linear-gradient(135deg, ${items.find(i => i.id === open)?.color}, ${items.find(i => i.id === open)?.color}cc)`,
                                                }, animate: { scale: [1, 1.1, 1] }, transition: { duration: 1.5, repeat: Infinity }, children: items.find(i => i.id === open)?.emoji }), _jsxs("div", { children: [_jsx("h3", { className: "text-3xl font-bold", children: items.find(i => i.id === open)?.title }), _jsx("p", { className: "text-[color:var(--muted)] mt-2", children: items.find(i => i.id === open)?.desc })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(motion.div, { whileHover: { scale: 1.05 }, className: "p-4 rounded-2xl bg-primary/10 border border-primary/20", children: [_jsx("p", { className: "text-xs text-[color:var(--muted)]", children: "STATISTIK" }), _jsx("p", { className: "text-2xl font-bold text-primary mt-2", children: items.find(i => i.id === open)?.stats })] }), _jsxs(motion.div, { whileHover: { scale: 1.05 }, className: "p-4 rounded-2xl bg-secondary/10 border border-secondary/20", children: [_jsx("p", { className: "text-xs text-[color:var(--muted)]", children: "FUNGSI" }), _jsx("p", { className: "text-sm font-semibold mt-2 text-secondary", children: items.find(i => i.id === open)?.title })] })] }), _jsxs("div", { className: "space-y-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl", children: [_jsx("h4", { className: "font-bold text-lg", children: "Penjelasan Lengkap" }), _jsx("p", { className: "text-base leading-relaxed text-[color:var(--muted)]", children: items.find(i => i.id === open)?.detail })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "p-4 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-lavender/20 border border-primary/30", children: [_jsx("p", { className: "text-sm font-semibold mb-2 flex items-center gap-2", children: "\uD83D\uDCA1 Fakta Menarik" }), _jsx("p", { className: "text-sm text-[color:var(--muted)]", children: items.find(i => i.id === open)?.trivia })] })] }))] }) })) })] }));
}
