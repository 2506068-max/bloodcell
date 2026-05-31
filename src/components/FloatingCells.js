import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
export default function FloatingCells() {
    const [cells, setCells] = useState([]);
    useEffect(() => {
        const colors = ['bg-primary/30', 'bg-secondary/30', 'bg-accent/20'];
        const sizes = [8, 12, 16, 10];
        const newCells = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 15 + Math.random() * 10,
            delay: Math.random() * 2,
            size: sizes[Math.floor(Math.random() * sizes.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setCells(newCells);
    }, []);
    return (_jsx("div", { className: "fixed inset-0 pointer-events-none z-0", children: cells.map((cell) => (_jsx(motion.div, { initial: {
                x: `${cell.x}%`,
                y: `${cell.y}%`,
            }, animate: {
                x: [`${cell.x}%`, `${cell.x + 20}%`, `${cell.x}%`],
                y: [`${cell.y}%`, `${cell.y - 30}%`, `${cell.y}%`],
            }, transition: {
                duration: cell.duration,
                delay: cell.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }, className: `absolute rounded-full ${cell.color}`, style: {
                width: `${cell.size}px`,
                height: `${cell.size}px`,
                filter: 'blur(1px)',
            } }, cell.id))) }));
}
