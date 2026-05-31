import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const steps = [
    {
        icon: '🫀',
        title: 'Jantung Memompa Darah',
        description: 'Jantung berkontraksi untuk memompa darah ke seluruh tubuh.',
    },
    {
        icon: '🩸',
        title: 'Darah Menuju Paru-paru',
        description: 'Darah yang kaya karbon dioksida mengalir ke paru-paru untuk mengambil oksigen.',
    },
    {
        icon: '💨',
        title: 'Pertukaran Gas',
        description: 'Di paru-paru, darah melepaskan karbon dioksida dan mengambil oksigen.',
    },
    {
        icon: '🔄',
        title: 'Darah Oksigen Kembali',
        description: 'Darah yang kaya oksigen kembali ke jantung.',
    },
    {
        icon: '🩸',
        title: 'Darah Didistribusikan',
        description: 'Jantung memompa darah beroksigen ke seluruh tubuh melalui pembuluh darah.',
    },
];
export default function TimelineComponent() {
    return (_jsx("div", { className: "flex flex-col md:flex-row items-center justify-center gap-8 w-full", children: steps.map((step, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.15, duration: 0.6 }, className: "relative flex flex-col items-center text-center max-w-xs", children: [_jsx("div", { className: "text-4xl mb-2 animate-pulse", children: step.icon }), _jsx("h4", { className: "font-bold text-lg mb-1 text-gradient", children: step.title }), _jsx("p", { className: "text-text-muted text-sm mb-2", children: step.description }), i < steps.length - 1 && (_jsx("div", { className: "hidden md:block absolute right-[-48px] top-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full" })), i < steps.length - 1 && (_jsx("div", { className: "md:hidden w-1 h-12 bg-gradient-to-b from-primary/40 to-secondary/40 rounded-full mx-auto mt-2" }))] }, i))) }));
}
