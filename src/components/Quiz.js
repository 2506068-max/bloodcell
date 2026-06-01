import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from 'framer-motion';
import Confetti from './Confetti';
const sample = [
    { q: 'Organ apa yang memompa darah?', opts: ['Paru-paru', 'Jantung', 'Hati'], a: 1 },
    { q: 'Sel yang membawa oksigen?', opts: ['Sel darah merah', 'Leukosit', 'Trombosit'], a: 0 },
    { q: 'Pembuluh darah yang membawa darah kembali ke jantung adalah?', opts: ['Arteri', 'Vena', 'Kapiler'], a: 1 },
];
export default function Quiz({ onComplete, onAnswer }) {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    function choose(i) {
        if (done)
            return;
        const correct = i === sample[index].a;
        onAnswer?.(correct);
        if (correct)
            setScore(s => s + 1);
        if (index + 1 < sample.length) {
            setIndex(index + 1);
        }
        else {
            setDone(true);
            setCelebrate(true);
            window.setTimeout(() => setCelebrate(false), 2200);
            onComplete?.();
        }
    }
    return (_jsxs("div", { className: "relative overflow-hidden bg-white rounded-3xl p-6 shadow-soft", children: [celebrate && _jsx(Confetti, {}), !done ? (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm uppercase tracking-[0.2em] text-secondary font-semibold", children: ["Soal ", index + 1, " dari ", sample.length] }), _jsx("h3", { className: "mt-3 text-xl font-bold", children: sample[index].q })] }), _jsx("div", { className: "rounded-3xl bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary", children: "Touch-friendly" })] }), _jsx("div", { className: "grid gap-3", children: sample[index].opts.map((o, i) => (_jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: () => choose(i), className: "text-left rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium shadow-sm transition hover:border-primary hover:bg-white", children: o }, i))) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm text-[color:var(--muted)]", children: [_jsx("span", { children: "Progress belajar" }), _jsxs("span", { children: [Math.round((index / sample.length) * 100), "%"] })] }), _jsx("div", { className: "mt-2 h-3 overflow-hidden rounded-full bg-slate-100", children: _jsx("div", { style: { width: `${(index / sample.length) * 100}%` }, className: "h-full rounded-full bg-gradient-to-r from-primary via-secondary to-lavender transition-all duration-500" }) })] })] })) : (_jsxs("div", { className: "text-center space-y-6", children: [_jsx(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, className: "mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl text-primary", children: "\uD83C\uDF89" }), _jsxs("div", { children: [_jsxs("h3", { className: "text-3xl font-bold", children: ["Skor: ", score, " / ", sample.length] }), _jsx("p", { className: "mt-2 text-[color:var(--muted)]", children: "Kerja bagus! Semakin sering latihan, semakin lancar pemahamanmu." })] }), _jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [_jsx("button", { onClick: () => { setIndex(0); setScore(0); setDone(false); }, className: "rounded-3xl bg-gradient-to-r from-primary via-secondary to-lavender px-6 py-3 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition", children: "Coba Lagi" }), _jsx("button", { onClick: () => { setIndex(0); setScore(0); setDone(false); }, className: "rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900", children: "Pelajari Lagi" })] })] }))] }));
}
