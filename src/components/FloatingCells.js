import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function FloatingCells() {
    const [cells, setCells] = useState([]);
    useEffect(() => {
        // Generate gentle realistic microscopic cells in background
        setCells(Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 92,
            y: Math.random() * 92,
            delay: Math.random() * 6,
            size: i % 2 === 0 ? 18 + Math.random() * 16 : 8 + Math.random() * 8,
            opacity: 0.12 + Math.random() * 0.16,
            type: i % 3 === 0 ? 'platelet' : 'rbc',
            duration: 12 + Math.random() * 8,
        })));
    }, []);
    return (_jsx("div", { className: "fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none", children: cells.map((cell) => (_jsx(motion.div, { initial: { x: `${cell.x}vw`, y: `${cell.y}vh`, opacity: 0 }, animate: {
                x: [`${cell.x}vw`, `${(cell.x + 3) % 95}vw`, `${cell.x}vw`],
                y: [`${cell.y}vh`, `${(cell.y - 6) % 95}vh`, `${cell.y}vh`],
                opacity: [0, cell.opacity, cell.opacity * 0.7, 0],
                rotate: [0, 45, -30, 0],
            }, transition: {
                delay: cell.delay,
                duration: cell.duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }, className: "absolute", children: cell.type === 'rbc' ? (
            // Realistic biconcave erythrocyte silhouette
            _jsxs("svg", { width: cell.size, height: cell.size, viewBox: "0 0 40 40", className: "filter blur-[0.6px]", children: [_jsx("defs", { children: _jsxs("radialGradient", { id: `rbc-ambient-${cell.id}`, cx: "40%", cy: "40%", r: "60%", children: [_jsx("stop", { offset: "0%", stopColor: "#BE123C", stopOpacity: "0.8" }), _jsx("stop", { offset: "60%", stopColor: "#9F1239", stopOpacity: "0.9" }), _jsx("stop", { offset: "100%", stopColor: "#881337", stopOpacity: "0.6" })] }) }), _jsx("circle", { cx: "20", cy: "20", r: "18", fill: `url(#rbc-ambient-${cell.id})` }), _jsx("ellipse", { cx: "20", cy: "20", rx: "9", ry: "8", fill: "#4C0519", opacity: "0.75" })] })) : (
            // Tiny irregular platelet fragment
            _jsx("svg", { width: cell.size, height: cell.size, viewBox: "0 0 20 20", className: "filter blur-[0.4px]", children: _jsx("path", { d: "M 10 3 Q 15 2 17 8 Q 18 14 13 17 Q 6 18 3 13 Q 2 6 10 3 Z", fill: "#D97706", opacity: "0.65" }) })) }, cell.id))) }));
}
