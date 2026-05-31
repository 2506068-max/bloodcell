import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export default function RippleButton({ children, onClick, variant = 'primary', size = 'md', className = '', }) {
    const variantClasses = {
        primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:shadow-xl',
        secondary: 'bg-gradient-to-r from-secondary to-lavender text-white shadow-soft hover:shadow-lg',
        outline: 'border-2 border-primary text-primary bg-white/50 hover:bg-white dark:bg-slate-950/50 dark:hover:bg-slate-950',
    };
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };
    return (_jsxs(motion.button, { onClick: onClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: `relative overflow-hidden rounded-full font-semibold transition-all duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`, children: [_jsx(motion.span, { className: "absolute inset-0 rounded-full", initial: { scale: 0, opacity: 1 }, whileHover: { scale: 3, opacity: 0 }, transition: { duration: 0.6 }, style: {
                    background: 'radial-gradient(circle, rgba(255,255,255,0.8), transparent 70%)',
                    pointerEvents: 'none',
                } }), _jsx("span", { className: "relative z-10 flex items-center gap-2 justify-center", children: children }), _jsx(motion.div, { className: "absolute inset-0 rounded-full", initial: { x: '-100%' }, whileHover: { x: '100%' }, transition: { duration: 0.6 }, style: {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                } })] }));
}
