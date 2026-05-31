import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function AnimatedCard({ children, className = '', onClick, tiltEnabled = true }) {
    return (_jsxs(motion.div, { onClick: onClick, initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px' }, whileHover: tiltEnabled ? {
            scale: 1.04,
            y: -8,
            rotateX: 5,
            rotateY: -5,
        } : { scale: 1.02 }, transition: { type: 'spring', stiffness: 300, damping: 30 }, className: `relative cursor-pointer group overflow-hidden ${className}`, children: [_jsx("div", { className: "absolute inset-0 rounded-[2rem] bg-gradient-to-r from-primary via-secondary to-lavender opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" }), _jsx(motion.div, { className: "absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl -z-20", style: {
                    background: 'radial-gradient(circle, rgba(78, 205, 196, 0.3), transparent 70%)',
                }, transition: { duration: 0.5 } }), children, _jsx("div", { className: "absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none", children: _jsx("div", { className: "absolute inset-0 group-hover:animate-pulse bg-white/10" }) })] }));
}
