import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Activity, Droplet } from 'lucide-react';
export const heartStructures = [
    {
        id: 'aorta',
        name: 'Aorta (Arkus Aorta)',
        latin: 'Arcus Aortae',
        type: 'artery',
        oxygenated: true,
        x: 55,
        y: 20,
        description: 'Arteri terbesar tubuh yang menerima darah kaya oksigen dari ventrikel kiri dan mendistribusikannya ke sirkulasi sistemik.',
        clinicalNote: 'Tekanan puncak sistolik normal berkisar 100-120 mmHg.',
    },
    {
        id: 'superior_vena_cava',
        name: 'Vena Kava Superior',
        latin: 'Vena Cava Superior',
        type: 'vein',
        oxygenated: false,
        x: 33,
        y: 28,
        description: 'Pembuluh vena besar yang membawa darah deoksigenasi dari kepala, leher, dada, dan ekstremitas atas ke atrium kanan.',
        clinicalNote: 'Aliran darah pasif menuju atrium kanan dengan tekanan rendah (0-5 mmHg).',
    },
    {
        id: 'pulmonary_trunk',
        name: 'Batang Pulmonalis',
        latin: 'Truncus Pulmonalis',
        type: 'artery',
        oxygenated: false,
        x: 62,
        y: 33,
        description: 'Menerima darah deoksigenasi dari ventrikel kanan dan bercabang menjadi arteri pulmonalis kanan dan kiri menuju paru-paru.',
        clinicalNote: 'Satu-satunya arteri dalam tubuh yang membawa darah deoksigenasi (miskin O2).',
    },
    {
        id: 'right_atrium',
        name: 'Atrium Kanan',
        latin: 'Atrium Dextrum',
        type: 'chamber',
        oxygenated: false,
        x: 32,
        y: 50,
        description: 'Ruang penerima darah kaya CO₂ dari vena kava superior, vena kava inferior, dan sinus koronarius.',
        clinicalNote: 'Terdapat nodus sinoatrial (SA node) sebagai pacu jantung alami tubuh.',
    },
    {
        id: 'left_atrium',
        name: 'Atrium Kiri',
        latin: 'Atrium Sinistrum',
        type: 'chamber',
        oxygenated: true,
        x: 68,
        y: 45,
        description: 'Menerima darah yang baru saja dioksigenasi dari paru-paru melalui empat vena pulmonalis.',
        clinicalNote: 'Dinding lebih tebal dibanding atrium kanan karena beban pengisian ventrikel kiri.',
    },
    {
        id: 'right_ventricle',
        name: 'Ventrikel Kanan',
        latin: 'Ventriculus Dexter',
        type: 'chamber',
        oxygenated: false,
        x: 43,
        y: 68,
        description: 'Memompa darah bertekanan rendah ke sirkulasi paru (pulmonal) melalui katup pulmonalis.',
        clinicalNote: 'Dinding ototnya sekitar 4-5 mm, cukup untuk mengatasi resistensi vaskular paru yang rendah.',
    },
    {
        id: 'left_ventricle',
        name: 'Ventrikel Kiri',
        latin: 'Ventriculus Sinister',
        type: 'chamber',
        oxygenated: true,
        x: 62,
        y: 72,
        description: 'Ruang pompa utama bertekanan tinggi yang memompa darah beroksigen ke seluruh jaringan organ tubuh.',
        clinicalNote: 'Miokardium ventrikel kiri paling tebal (10-15 mm) untuk menghasilkan tekanan sistemik.',
    },
    {
        id: 'coronary_arteries',
        name: 'Pembuluh Koroner',
        latin: 'Arteriae Coronariae',
        type: 'artery',
        oxygenated: true,
        x: 52,
        y: 57,
        description: 'Jaringan pembuluh darah halus yang menyuplai oksigen dan nutrisi langsung ke otot jantung (miokardium).',
        clinicalNote: 'Penyumbatan di cabang ini (LAD/RCA) menyebabkan infark miokard (serangan jantung).',
    },
];
export default function AnatomicalHeart({ interactive = true, showLabels = true, activeStructureId, onStructureSelect, size = 'lg', }) {
    const [selected, setSelected] = useState(null);
    const [viewMode, setViewMode] = useState('surface');
    const [imageError, setImageError] = useState(false);
    const active = heartStructures.find((s) => s.id === activeStructureId) || selected;
    const handlePinClick = (structure) => {
        const next = active?.id === structure.id ? null : structure;
        setSelected(next);
        onStructureSelect?.(next);
    };
    const containerSizes = {
        sm: 'max-w-[280px] h-[300px]',
        md: 'max-w-[400px] h-[420px]',
        lg: 'max-w-[520px] h-[540px]',
    };
    return (_jsxs("div", { className: "relative flex flex-col items-center w-full", children: [_jsxs("div", { className: "mb-4 inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1 text-xs font-semibold shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90", children: [_jsx("button", { onClick: () => setViewMode('surface'), className: `rounded-full px-3.5 py-1.5 transition-all ${viewMode === 'surface'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`, children: "Anatomi Luar (Anterior)" }), _jsx("button", { onClick: () => setViewMode('cutaway'), className: `rounded-full px-3.5 py-1.5 transition-all ${viewMode === 'cutaway'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`, children: "Potongan Ruang (Internal)" })] }), _jsx("div", { className: `relative w-full ${containerSizes[size]} flex items-center justify-center select-none`, children: _jsxs(motion.div, { className: "relative w-full h-full flex items-center justify-center", animate: {
                        scale: [1, 1.025, 0.995, 1.015, 1],
                    }, transition: {
                        duration: 1.0,
                        repeat: Infinity,
                        times: [0, 0.15, 0.3, 0.45, 1],
                        ease: 'easeInOut',
                    }, children: [viewMode === 'surface' ? (_jsx("div", { className: "relative w-full h-full flex items-center justify-center", children: !imageError ? (_jsx("img", { src: "/assets/heart_anatomical.jpg", alt: "Realistic Anatomical Human Heart - Cor Humanum", onError: () => setImageError(true), className: "w-auto h-[92%] max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(190,18,60,0.18)] rounded-3xl" })) : (_jsx(RealisticHeartSVG, { activeId: active?.id })) })) : (_jsx(CutawayHeartSVG, { activeId: active?.id })), interactive &&
                            viewMode === 'surface' &&
                            heartStructures.map((structure) => {
                                const isSelected = active?.id === structure.id;
                                return (_jsxs("div", { style: {
                                        left: `${structure.x}%`,
                                        top: `${structure.y}%`,
                                    }, className: "absolute -translate-x-1/2 -translate-y-1/2 z-20 group", children: [_jsxs("button", { onClick: () => handlePinClick(structure), className: "relative flex items-center justify-center p-2 focus:outline-none", "aria-label": structure.name, children: [_jsx("span", { className: `absolute inline-flex h-7 w-7 rounded-full opacity-60 animate-ping ${structure.oxygenated ? 'bg-rose-500' : 'bg-sky-500'}` }), _jsx("span", { className: `relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-300 ${isSelected
                                                        ? 'scale-125 ring-4 ring-rose-500/30'
                                                        : 'group-hover:scale-115'} ${structure.oxygenated
                                                        ? 'bg-gradient-to-br from-rose-500 to-red-700'
                                                        : 'bg-gradient-to-br from-sky-500 to-blue-700'}`, children: _jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white" }) })] }), showLabels && (_jsx("div", { className: `pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`, children: _jsx("div", { className: "whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm", children: structure.name }) }))] }, structure.id));
                            })] }) }), _jsx(AnimatePresence, { children: active && (_jsxs(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 12 }, transition: { duration: 0.25 }, className: "mt-4 w-full max-w-xl rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 text-left", children: [_jsxs("div", { className: "flex items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${active.oxygenated
                                                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                                                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'}`, children: [_jsx(Droplet, { size: 10, className: "fill-current" }), active.oxygenated ? 'Darah Beroksigen (O₂)' : 'Darah Deoksigenasi (CO₂)'] }), _jsx("span", { className: "text-[11px] italic text-slate-400 font-serif", children: active.latin })] }), _jsx("h4", { className: "mt-1 text-lg font-bold text-slate-900 dark:text-white", children: active.name })] }), _jsx("button", { onClick: () => {
                                        setSelected(null);
                                        onStructureSelect?.(null);
                                    }, className: "text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200", children: "\u2715 Tutup" })] }), _jsx("p", { className: "mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300", children: active.description }), _jsxs("div", { className: "mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300", children: [_jsx(Activity, { size: 14, className: "mt-0.5 flex-shrink-0 text-rose-500" }), _jsxs("span", { children: [_jsx("strong", { className: "text-slate-800 dark:text-slate-200", children: "Relevansi Klinis: " }), active.clinicalNote] })] })] })) }), !active && interactive && (_jsxs("p", { className: "mt-3 text-xs text-slate-400 flex items-center gap-1.5", children: [_jsx(Info, { size: 13, className: "text-rose-500" }), "Klik pada pin anatomi untuk membaca struktur & fungsi sirkulasi darah"] }))] }));
}
// Highly realistic anatomical heart SVG representation (anterior) for fallback / custom rendering
function RealisticHeartSVG({ activeId }) {
    return (_jsxs("svg", { viewBox: "0 0 500 550", className: "w-full h-full max-h-[480px] object-contain", "aria-label": "Anatomical Heart Vector", children: [_jsxs("defs", { children: [_jsxs("radialGradient", { id: "aorta-grad", cx: "40%", cy: "35%", r: "60%", children: [_jsx("stop", { offset: "0%", stopColor: "#E11D48" }), _jsx("stop", { offset: "65%", stopColor: "#BE123C" }), _jsx("stop", { offset: "100%", stopColor: "#881337" })] }), _jsxs("radialGradient", { id: "vena-grad", cx: "35%", cy: "30%", r: "65%", children: [_jsx("stop", { offset: "0%", stopColor: "#38BDF8" }), _jsx("stop", { offset: "65%", stopColor: "#0284C7" }), _jsx("stop", { offset: "100%", stopColor: "#0369A1" })] }), _jsxs("radialGradient", { id: "myo-grad", cx: "45%", cy: "40%", r: "65%", children: [_jsx("stop", { offset: "0%", stopColor: "#D9244A" }), _jsx("stop", { offset: "50%", stopColor: "#B91C1C" }), _jsx("stop", { offset: "85%", stopColor: "#7F1D1D" }), _jsx("stop", { offset: "100%", stopColor: "#450A0A" })] }), _jsx("filter", { id: "fleshy-shadow", x: "-10%", y: "-10%", width: "120%", height: "120%", children: _jsx("feDropShadow", { dx: "0", dy: "12", stdDeviation: "14", floodColor: "#881337", floodOpacity: "0.25" }) })] }), _jsx("path", { d: "M 175 90 L 175 190 Q 185 220 205 230 L 225 210 L 225 90 Q 200 80 175 90 Z", fill: "url(#vena-grad)", stroke: "#0369A1", strokeWidth: "2", opacity: activeId === 'superior_vena_cava' ? 1 : 0.92 }), _jsx("ellipse", { cx: "200", cy: "90", rx: "25", ry: "8", fill: "#38BDF8", opacity: "0.8" }), _jsx("path", { d: "M 235 220 C 230 140 250 85 300 80 C 350 75 375 120 375 180 L 350 200 C 345 155 335 110 300 115 C 270 120 265 160 265 220 Z", fill: "url(#aorta-grad)", stroke: "#881337", strokeWidth: "2.5", filter: "url(#fleshy-shadow)" }), _jsx("path", { d: "M 270 105 L 260 45 L 280 40 L 290 98 Z", fill: "url(#aorta-grad)" }), _jsx("path", { d: "M 305 92 L 305 40 L 322 38 L 322 93 Z", fill: "url(#aorta-grad)" }), _jsx("path", { d: "M 335 96 L 345 45 L 362 48 L 350 105 Z", fill: "url(#aorta-grad)" }), _jsx("path", { d: "M 260 230 C 265 170 295 150 350 160 L 360 190 C 315 180 295 200 290 250 Z", fill: "url(#vena-grad)", stroke: "#0284C7", strokeWidth: "2" }), _jsx("path", { d: "M 170 220 \n           C 140 250 135 320 165 370 \n           C 195 420 250 490 320 520 \n           C 355 500 410 430 430 360 \n           C 445 300 425 230 380 210 \n           C 340 195 300 210 270 220 \n           C 240 210 190 200 170 220 Z", fill: "url(#myo-grad)", stroke: "#7F1D1D", strokeWidth: "3", filter: "url(#fleshy-shadow)" }), _jsx("path", { d: "M 290 240 Q 305 340 320 515", stroke: "#450A0A", strokeWidth: "3.5", fill: "none", opacity: "0.65" }), _jsxs("g", { stroke: "#F43F5E", strokeWidth: "2.5", fill: "none", strokeLinecap: "round", children: [_jsx("path", { d: "M 292 245 Q 300 310 305 370 Q 312 430 318 505" }), _jsx("path", { d: "M 298 290 Q 275 320 260 345", strokeWidth: "1.8" }), _jsx("path", { d: "M 302 335 Q 285 365 275 400", strokeWidth: "1.8" }), _jsx("path", { d: "M 308 385 Q 330 410 345 435", strokeWidth: "1.8" }), _jsx("path", { d: "M 314 440 Q 330 460 338 480", strokeWidth: "1.5" })] }), _jsxs("g", { stroke: "#38BDF8", strokeWidth: "2", fill: "none", strokeLinecap: "round", opacity: "0.85", children: [_jsx("path", { d: "M 297 250 Q 308 320 312 380 Q 318 440 322 510" }), _jsx("path", { d: "M 304 315 Q 325 335 340 360", strokeWidth: "1.5" }), _jsx("path", { d: "M 310 370 Q 295 400 288 425", strokeWidth: "1.5" })] }), _jsx("path", { d: "M 180 300 Q 230 330 280 340", stroke: "#FFE4E6", strokeWidth: "0.8", opacity: "0.25", fill: "none" }), _jsx("path", { d: "M 195 340 Q 240 370 290 380", stroke: "#FFE4E6", strokeWidth: "0.8", opacity: "0.25", fill: "none" }), _jsx("path", { d: "M 330 320 Q 380 340 415 360", stroke: "#FFE4E6", strokeWidth: "0.8", opacity: "0.25", fill: "none" }), _jsx("path", { d: "M 325 380 Q 365 400 395 420", stroke: "#FFE4E6", strokeWidth: "0.8", opacity: "0.25", fill: "none" })] }));
}
// Cutaway View showing internal chambers, septum, and valves
function CutawayHeartSVG({ activeId: _activeId }) {
    return (_jsxs("svg", { viewBox: "0 0 500 550", className: "w-full h-full max-h-[480px] object-contain", "aria-label": "Cutaway Anatomical Heart", children: [_jsx("defs", { children: _jsxs("radialGradient", { id: "internal-myo", cx: "45%", cy: "40%", r: "65%", children: [_jsx("stop", { offset: "0%", stopColor: "#991B1B" }), _jsx("stop", { offset: "70%", stopColor: "#7F1D1D" }), _jsx("stop", { offset: "100%", stopColor: "#450A0A" })] }) }), _jsx("path", { d: "M 160 220 \n           C 130 260 130 330 160 380 \n           C 190 430 250 500 320 530 \n           C 360 510 420 440 440 370 \n           C 450 310 430 240 385 220 \n           Z", fill: "url(#internal-myo)", stroke: "#450A0A", strokeWidth: "3" }), _jsx("path", { d: "M 170 230 C 160 270 170 300 210 310 C 230 310 240 280 240 240 C 230 230 190 220 170 230 Z", fill: "#0284C7", opacity: "0.35", stroke: "#38BDF8", strokeWidth: "1.5" }), _jsx("text", { x: "195", y: "270", fill: "#E0F2FE", fontSize: "12", fontWeight: "bold", textAnchor: "middle", children: "Atrium Kanan" }), _jsx("path", { d: "M 330 230 C 370 230 380 270 370 305 C 340 310 320 280 320 240 Z", fill: "#E11D48", opacity: "0.35", stroke: "#FB7185", strokeWidth: "1.5" }), _jsx("text", { x: "350", y: "270", fill: "#FFE4E6", fontSize: "12", fontWeight: "bold", textAnchor: "middle", children: "Atrium Kiri" }), _jsx("path", { d: "M 205 310 L 235 310", stroke: "#FFFFFF", strokeWidth: "3", strokeDasharray: "4,2" }), _jsx("text", { x: "210", y: "325", fill: "#CBD5E1", fontSize: "10", children: "Katup Trikuspid" }), _jsx("path", { d: "M 330 310 L 360 310", stroke: "#FFFFFF", strokeWidth: "3", strokeDasharray: "4,2" }), _jsx("text", { x: "330", y: "325", fill: "#CBD5E1", fontSize: "10", children: "Katup Mitral" }), _jsx("path", { d: "M 190 330 C 180 380 210 430 270 460 L 270 330 Z", fill: "#0284C7", opacity: "0.45", stroke: "#38BDF8", strokeWidth: "2" }), _jsx("text", { x: "225", y: "400", fill: "#E0F2FE", fontSize: "13", fontWeight: "bold", textAnchor: "middle", children: "Ventrikel Kanan" }), _jsx("rect", { x: "270", y: "320", width: "22", height: "175", rx: "8", fill: "#7F1D1D", stroke: "#450A0A", strokeWidth: "1.5" }), _jsx("text", { x: "281", y: "415", fill: "#FECDD3", fontSize: "9", fontWeight: "bold", transform: "rotate(-90 281 415)", textAnchor: "middle", children: "Septum Interventrikular" }), _jsx("path", { d: "M 292 330 L 292 480 C 340 460 390 410 380 340 Z", fill: "#BE123C", opacity: "0.5", stroke: "#F43F5E", strokeWidth: "2" }), _jsx("text", { x: "335", y: "400", fill: "#FFF1F2", fontSize: "13", fontWeight: "bold", textAnchor: "middle", children: "Ventrikel Kiri" }), _jsx("text", { x: "335", y: "418", fill: "#FDA4AF", fontSize: "10", textAnchor: "middle", children: "(Dinding Otot 3x Lebih Tebal)" }), _jsx("g", { stroke: "#38BDF8", strokeWidth: "2.5", fill: "none", markerEnd: "url(#arrow-blue)", children: _jsx("path", { d: "M 205 285 L 215 355" }) }), _jsx("g", { stroke: "#FDA4AF", strokeWidth: "2.5", fill: "none", markerEnd: "url(#arrow-red)", children: _jsx("path", { d: "M 350 285 L 340 355" }) }), _jsxs("defs", { children: [_jsx("marker", { id: "arrow-blue", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse", children: _jsx("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#38BDF8" }) }), _jsx("marker", { id: "arrow-red", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse", children: _jsx("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#FDA4AF" }) })] })] }));
}
