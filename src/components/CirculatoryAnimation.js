import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
const bloodParticles = [
    // Deoxygenated (blue) - Vena kava ke jantung dan paru-paru
    {
        id: 'blue-1',
        type: 'deoxygenated',
        path: 'M 50 400 Q 150 350 200 250 Q 250 150 300 100',
        duration: 12,
        delay: 0,
    },
    {
        id: 'blue-2',
        type: 'deoxygenated',
        path: 'M 50 420 Q 150 370 200 270 Q 250 170 300 100',
        duration: 12,
        delay: 2,
    },
    {
        id: 'blue-3',
        type: 'deoxygenated',
        path: 'M 50 440 Q 150 390 200 290 Q 250 190 300 100',
        duration: 12,
        delay: 4,
    },
    // Oxygenated (red) - Paru-paru ke jantung dan tubuh
    {
        id: 'red-1',
        type: 'oxygenated',
        path: 'M 300 100 Q 250 150 200 250 Q 150 350 50 400',
        duration: 12,
        delay: 6,
    },
    {
        id: 'red-2',
        type: 'oxygenated',
        path: 'M 300 100 Q 250 170 200 270 Q 150 370 50 420',
        duration: 12,
        delay: 8,
    },
    {
        id: 'red-3',
        type: 'oxygenated',
        path: 'M 300 100 Q 250 190 200 290 Q 150 390 50 440',
        duration: 12,
        delay: 10,
    },
];
const heartbeatSteps = [
    {
        number: 1,
        title: 'Darah Miskin Oksigen Masuk',
        description: 'Darah dari tubuh yang kaya CO₂ masuk ke atrium kanan melalui vena kava',
        color: '#1E88E5',
    },
    {
        number: 2,
        title: 'Pompa ke Ventrikel Kanan',
        description: 'Atrium kanan berkontraksi, mendorong darah ke ventrikel kanan',
        color: '#0D47A1',
    },
    {
        number: 3,
        title: 'Menuju Paru-Paru',
        description: 'Ventrikel kanan berkontraksi, darah dipompa ke paru-paru via arteri pulmonari',
        color: '#1E88E5',
    },
    {
        number: 4,
        title: 'Pertukaran Gas',
        description: 'Di paru-paru, CO₂ dilepas dan O₂ diserap. Darah menjadi kaya oksigen',
        color: '#FF6B6B',
    },
    {
        number: 5,
        title: 'Kembali dari Paru-Paru',
        description: 'Darah kaya oksigen kembali ke atrium kiri melalui vena pulmonari',
        color: '#E53935',
    },
    {
        number: 6,
        title: 'Pompa ke Ventrikel Kiri',
        description: 'Atrium kiri berkontraksi, mendorong darah ke ventrikel kiri',
        color: '#E53935',
    },
    {
        number: 7,
        title: 'Distribusi ke Seluruh Tubuh',
        description: 'Ventrikel kiri berkontraksi dengan kuat, darah keluar via aorta ke seluruh tubuh',
        color: '#E53935',
    },
    {
        number: 8,
        title: 'Sirkulasi Selesai',
        description: 'Di jaringan tubuh, O₂ dilepas ke sel dan darah mengumpulkan CO₂ lagi',
        color: '#1E88E5',
    },
];
export default function CirculatoryAnimation() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [popup, setPopup] = useState(null);
    const [hoveredLabel, setHoveredLabel] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const svgRef = useRef(null);
    // Auto-cycle through steps when animation plays
    useEffect(() => {
        if (!isPlaying)
            return;
        const stepInterval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % heartbeatSteps.length);
        }, 1500);
        return () => clearInterval(stepInterval);
    }, [isPlaying]);
    const handleReset = () => {
        setActiveStep(0);
        setIsPlaying(true);
    };
    const showPopup = (title, description, x, y) => {
        setPopup({ title, description, position: { x, y } });
    };
    const tooltips = {
        heart: 'Jantung: Organ utama yang memompa darah ke seluruh tubuh',
        'right-atrium': 'Atrium Kanan: Menerima darah dari tubuh',
        'left-atrium': 'Atrium Kiri: Menerima darah dari paru-paru',
        'right-ventricle': 'Ventrikel Kanan: Memompa darah ke paru-paru',
        'left-ventricle': 'Ventrikel Kiri: Memompa darah ke seluruh tubuh',
        'lungs-left': 'Paru-paru Kiri: Tempat pertukaran gas (O₂ dan CO₂)',
        'lungs-right': 'Paru-paru Kanan: Tempat pertukaran gas (O₂ dan CO₂)',
        'vena-cava': 'Vena Kava: Membawa darah miskin oksigen dari tubuh',
        'aorta': 'Aorta: Membawa darah kaya oksigen ke seluruh tubuh',
        'pulmonary-artery': 'Arteri Pulmonari: Membawa darah miskin oksigen ke paru-paru',
        'pulmonary-vein': 'Vena Pulmonari: Membawa darah kaya oksigen dari paru-paru',
        'systemic-artery': 'Arteri Sistemik: Membawa oksigen ke jaringan tubuh',
        'systemic-vein': 'Vena Sistemik: Mengumpulkan karbon dioksida dari jaringan',
    };
    const animationControls = [
        {
            icon: isPlaying ? '⏸' : '▶',
            label: isPlaying ? 'Pause' : 'Play',
            onClick: () => setIsPlaying(!isPlaying),
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: '⟲',
            label: 'Reset',
            onClick: handleReset,
            color: 'from-slate-500 to-slate-600',
        },
    ];
    return (_jsxs(motion.div, { className: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6 }, children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-4xl sm:text-5xl font-bold text-slate-900 mb-4", children: "Sistem Peredaran Darah Manusia" }), _jsx("p", { className: "text-lg text-slate-600 max-w-3xl mx-auto", children: "Animasi interaktif yang menunjukkan perjalanan darah melalui jantung, paru-paru, dan seluruh tubuh Anda. Klik elemen untuk detail lebih lanjut." })] }), _jsxs(motion.div, { className: "relative bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] border border-slate-100 p-6 sm:p-8 mb-8 overflow-hidden", whileHover: { shadow: '0 30px 80px rgba(15,23,42,0.25)' }, children: [_jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10" }), _jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-red-100/20 rounded-full blur-3xl -z-10" }), _jsx("div", { className: "flex gap-3 mb-6 justify-center sm:justify-start", children: animationControls.map((control) => (_jsxs(motion.button, { onClick: control.onClick, className: `px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r ${control.color} hover:shadow-lg transition-all`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "text-lg", children: control.icon }), " ", control.label] }, control.label))) }), _jsx("div", { className: "flex justify-center mb-8 overflow-x-auto", children: _jsxs("svg", { ref: svgRef, viewBox: "0 0 600 500", className: "w-full max-w-2xl h-auto min-h-96", style: { minWidth: '300px' }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "red-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#FF6B6B', stopOpacity: 1 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#E53935', stopOpacity: 1 } })] }), _jsxs("linearGradient", { id: "blue-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#1E88E5', stopOpacity: 1 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#0D47A1', stopOpacity: 1 } })] }), _jsxs("filter", { id: "glow-red", children: [_jsx("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "coloredBlur" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] }), _jsxs("filter", { id: "glow-blue", children: [_jsx("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "coloredBlur" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] }), _jsxs("filter", { id: "glow-heart", children: [_jsx("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }), _jsxs("feMerge", { children: [_jsx("feMergeNode", { in: "coloredBlur" }), _jsx("feMergeNode", { in: "SourceGraphic" })] })] })] }), _jsxs("g", { id: "body", children: [_jsx("ellipse", { cx: "300", cy: "430", rx: "120", ry: "50", fill: "#F0F0F0", stroke: "#9E9E9E", strokeWidth: "2" }), _jsx("text", { x: "300", y: "435", textAnchor: "middle", className: "text-sm font-bold", fill: "#263238", children: "Jaringan Tubuh" })] }), _jsx("path", { d: "M 220 380 Q 240 340 260 280 Q 270 250 280 220", stroke: "#1E88E5", strokeWidth: "6", fill: "none", opacity: "0.6", strokeLinecap: "round" }), _jsx("path", { d: "M 320 220 Q 330 250 350 300 Q 370 360 380 390", stroke: "#E53935", strokeWidth: "6", fill: "none", opacity: "0.6", strokeLinecap: "round" }), _jsx("path", { d: "M 300 180 Q 250 130 200 80", stroke: "#1E88E5", strokeWidth: "5", fill: "none", opacity: "0.6", strokeLinecap: "round", markerEnd: "url(#arrowhead-blue)" }), _jsx("path", { d: "M 300 180 Q 350 130 400 80", stroke: "#1E88E5", strokeWidth: "5", fill: "none", opacity: "0.6", strokeLinecap: "round", markerEnd: "url(#arrowhead-blue)" }), _jsx("path", { d: "M 200 80 Q 250 120 310 160", stroke: "#E53935", strokeWidth: "5", fill: "none", opacity: "0.6", strokeLinecap: "round", markerEnd: "url(#arrowhead-red)" }), _jsx("path", { d: "M 400 80 Q 350 120 310 160", stroke: "#E53935", strokeWidth: "5", fill: "none", opacity: "0.6", strokeLinecap: "round", markerEnd: "url(#arrowhead-red)" }), _jsx("path", { d: "M 220 380 Q 240 340 260 280 Q 270 250 280 220", stroke: "#1E88E5", strokeWidth: "6", fill: "none", opacity: "1", filter: "url(#glow-blue)", strokeLinecap: "round", className: "active-vessel-blue", style: {
                                        opacity: activeStep <= 2 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsx("path", { d: "M 300 180 Q 250 130 200 80", stroke: "#1E88E5", strokeWidth: "5", fill: "none", opacity: "1", filter: "url(#glow-blue)", strokeLinecap: "round", style: {
                                        opacity: activeStep <= 3 && activeStep >= 2 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsx("path", { d: "M 300 180 Q 350 130 400 80", stroke: "#1E88E5", strokeWidth: "5", fill: "none", opacity: "1", filter: "url(#glow-blue)", strokeLinecap: "round", style: {
                                        opacity: activeStep <= 3 && activeStep >= 2 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsx("path", { d: "M 200 80 Q 250 120 310 160", stroke: "#E53935", strokeWidth: "5", fill: "none", opacity: "1", filter: "url(#glow-red)", strokeLinecap: "round", style: {
                                        opacity: activeStep >= 4 && activeStep <= 6 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsx("path", { d: "M 400 80 Q 350 120 310 160", stroke: "#E53935", strokeWidth: "5", fill: "none", opacity: "1", filter: "url(#glow-red)", strokeLinecap: "round", style: {
                                        opacity: activeStep >= 4 && activeStep <= 6 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsx("path", { d: "M 320 220 Q 330 250 350 300 Q 370 360 380 390", stroke: "#E53935", strokeWidth: "6", fill: "none", opacity: "1", filter: "url(#glow-red)", strokeLinecap: "round", style: {
                                        opacity: activeStep === 6 || activeStep === 7 ? 1 : 0.4,
                                        transition: 'opacity 0.5s ease',
                                    } }), _jsxs("defs", { children: [_jsx("marker", { id: "arrowhead-red", markerWidth: "10", markerHeight: "10", refX: "9", refY: "3", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 3, 0 6", fill: "#E53935" }) }), _jsx("marker", { id: "arrowhead-blue", markerWidth: "10", markerHeight: "10", refX: "9", refY: "3", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 3, 0 6", fill: "#1E88E5" }) })] }), _jsxs("g", { id: "heart", onClick: () => showPopup('Jantung', 'Organ utama yang memompa darah. Terdiri dari 4 ruang: 2 atrium dan 2 ventrikel.', 300, 200), onMouseEnter: () => setHoveredLabel('heart'), onMouseLeave: () => setHoveredLabel(null), style: { cursor: 'pointer' }, children: [_jsx(motion.path, { d: "M 300 200 C 300 180 320 160 340 160 C 360 160 370 180 300 230 C 230 180 240 160 260 160 C 280 160 300 180 300 200 Z", fill: "url(#red-gradient)", filter: "url(#glow-heart)", animate: isPlaying ? { scale: [1, 1.1, 1] } : {}, transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } }), _jsx("circle", { cx: "280", cy: "190", r: "12", fill: "none", stroke: "#FFFFFF", strokeWidth: "1", opacity: "0.7" }), _jsx("circle", { cx: "320", cy: "190", r: "12", fill: "none", stroke: "#FFFFFF", strokeWidth: "1", opacity: "0.7" }), _jsx("text", { x: "265", y: "220", fontSize: "10", fill: "white", fontWeight: "bold", textAnchor: "middle", children: "RA" }), _jsx("text", { x: "335", y: "220", fontSize: "10", fill: "white", fontWeight: "bold", textAnchor: "middle", children: "LA" }), _jsx("text", { x: "265", y: "245", fontSize: "10", fill: "white", fontWeight: "bold", textAnchor: "middle", children: "RV" }), _jsx("text", { x: "335", y: "245", fontSize: "10", fill: "white", fontWeight: "bold", textAnchor: "middle", children: "LV" })] }), _jsxs("g", { id: "lungs", children: [_jsxs("g", { id: "lungs-left", onClick: () => showPopup('Paru-paru Kiri', 'Tempat pertukaran gas. Karbon dioksida dilepas dan oksigen diserap.', 200, 80), onMouseEnter: () => setHoveredLabel('lungs-left'), onMouseLeave: () => setHoveredLabel(null), style: { cursor: 'pointer' }, children: [_jsx(motion.ellipse, { cx: "200", cy: "80", rx: "50", ry: "60", fill: "#E8F4F8", stroke: "#4FC3F7", strokeWidth: "2", animate: isPlaying ? { opacity: [0.8, 1, 0.8] } : {}, transition: { duration: 1, repeat: Infinity } }), _jsx("text", { x: "200", y: "85", textAnchor: "middle", className: "text-xs font-bold", fill: "#0277BD", children: "Paru-paru" }), _jsx("text", { x: "200", y: "100", textAnchor: "middle", className: "text-xs", fill: "#0277BD", children: "Kiri" })] }), _jsxs("g", { id: "lungs-right", onClick: () => showPopup('Paru-paru Kanan', 'Tempat pertukaran gas. Karbon dioksida dilepas dan oksigen diserap.', 400, 80), onMouseEnter: () => setHoveredLabel('lungs-right'), onMouseLeave: () => setHoveredLabel(null), style: { cursor: 'pointer' }, children: [_jsx(motion.ellipse, { cx: "400", cy: "80", rx: "50", ry: "60", fill: "#E8F4F8", stroke: "#4FC3F7", strokeWidth: "2", animate: isPlaying ? { opacity: [0.8, 1, 0.8] } : {}, transition: { duration: 1, repeat: Infinity } }), _jsx("text", { x: "400", y: "85", textAnchor: "middle", className: "text-xs font-bold", fill: "#0277BD", children: "Paru-paru" }), _jsx("text", { x: "400", y: "100", textAnchor: "middle", className: "text-xs", fill: "#0277BD", children: "Kanan" })] })] }), isPlaying &&
                                    bloodParticles.map((particle) => (_jsx(motion.circle, { r: "5", fill: particle.type === 'oxygenated' ? '#FF6B6B' : '#1E88E5', opacity: "0.8", initial: { offsetDistance: '0%' }, animate: { offsetDistance: '100%' }, transition: {
                                            duration: particle.duration,
                                            delay: particle.delay,
                                            repeat: Infinity,
                                            ease: 'linear',
                                        }, style: {
                                            offsetPath: `path('${particle.path}')`,
                                        }, filter: particle.type === 'oxygenated' ? 'url(#glow-red)' : 'url(#glow-blue)' }, particle.id)))] }) }), _jsxs("div", { className: "flex flex-wrap justify-center gap-6 mb-6", children: [_jsxs(motion.div, { className: "flex items-center gap-2", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg" }), _jsx("span", { className: "text-sm font-medium text-slate-700", children: "Darah Kaya Oksigen" })] }), _jsxs(motion.div, { className: "flex items-center gap-2", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg" }), _jsx("span", { className: "text-sm font-medium text-slate-700", children: "Darah Kaya CO\u2082" })] })] })] }), _jsx(AnimatePresence, { children: popup && (_jsxs(motion.div, { className: "fixed inset-0 flex items-center justify-center z-50 p-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setPopup(null), children: [_jsx("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm" }), _jsxs(motion.div, { className: "relative bg-white rounded-2xl shadow-2xl max-w-sm p-6 z-10", initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.8, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: () => setPopup(null), className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl", children: "\u2715" }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 mb-3", children: popup.title }), _jsx("p", { className: "text-slate-600 leading-relaxed", children: popup.description })] })] })) }), _jsxs(motion.div, { className: "mt-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [_jsx("h3", { className: "text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center", children: "Siklus Sirkulasi Darah" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: heartbeatSteps.map((step, idx) => (_jsxs(motion.div, { className: `p-5 rounded-2xl border-2 transition-all cursor-pointer ${activeStep === idx
                                ? 'border-slate-900 bg-slate-50 shadow-lg scale-105'
                                : 'border-slate-200 bg-white hover:border-slate-300'}`, onClick: () => {
                                setActiveStep(idx);
                                setIsPlaying(false);
                            }, whileHover: { y: -4 }, children: [_jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3", style: { backgroundColor: step.color }, children: step.number }), _jsx("h4", { className: "font-bold text-slate-900 text-sm mb-2", children: step.title }), _jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: step.description })] }, step.number))) })] }), hoveredLabel && tooltips[hoveredLabel] && (_jsx(motion.div, { className: "fixed bottom-4 left-4 bg-slate-900 text-white rounded-lg px-4 py-2 text-sm max-w-xs z-40", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 }, children: tooltips[hoveredLabel] }))] }));
}
