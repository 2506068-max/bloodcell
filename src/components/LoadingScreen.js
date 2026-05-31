import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function LoadingScreen() {
    return (_jsx("div", { className: "loading-screen", children: _jsxs("div", { className: "flex flex-col items-center gap-8", children: [_jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-8xl", children: "\u2764\uFE0F" }), _jsx(motion.div, { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-2xl font-bold text-gradient", children: "Memuat Sistem Peredaran Darah..." }), _jsx(motion.div, { className: "flex gap-2", children: [0, 1, 2].map((i) => (_jsx(motion.div, { animate: { scale: [1, 1.5, 1] }, transition: { duration: 0.8, delay: i * 0.2, repeat: Infinity }, className: "w-4 h-4 rounded-full gradient-primary" }, i))) })] }) }));
}
