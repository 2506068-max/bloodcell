import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function StatCard({ icon, title, value, description, delay = 0 }) {
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay, duration: 0.5 }, whileHover: { y: -8 }, className: "card-glass", children: [_jsx("div", { className: "text-5xl mb-4", children: icon }), _jsx("h3", { className: "text-xl font-bold text-gradient mb-2", children: title }), _jsx("p", { className: "text-2xl font-display font-bold text-text-dark mb-2", children: value }), _jsx("p", { className: "text-text-muted text-sm", children: description })] }));
}
