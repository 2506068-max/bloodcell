import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useState } from 'react';
const vessels = {
    artery: {
        name: 'Arteri (Pembuluh Arteri)',
        cross: 'Lingkaran tebal',
        color: '#FF4D6D',
        thickness: 'Dinding tebal & elastis',
        wallStructure: [
            'Tunika Intima: Lapisan dalam halus',
            'Tunika Media: Otot polos dan serat elastin',
            'Tunika Adventitia: Jaringan ikat fibrosa',
        ],
        function: 'Membawa darah kaya oksigen dari jantung dengan tekanan tinggi',
        comparison: 'Dinding tebal, lumen kecil, tekanan tinggi, denyutan kuat',
    },
    vein: {
        name: 'Vena (Pembuluh Vena)',
        cross: 'Lingkaran tipis',
        color: '#4ECDC4',
        thickness: 'Dinding tipis & lentur',
        wallStructure: [
            'Tunika Intima: Lapisan dalam dengan katup',
            'Tunika Media: Otot polos lebih sedikit',
            'Tunika Adventitia: Lapisan tebal',
        ],
        function: 'Membawa darah miskin oksigen kembali ke jantung dengan tekanan rendah',
        comparison: 'Dinding tipis, lumen besar, tekanan rendah, aliran lambat',
    },
    capillary: {
        name: 'Kapiler (Pembuluh Kapiler)',
        cross: 'Garis sangat tipis',
        color: '#A0E7E5',
        thickness: 'Dinding sangat tipis (1 sel)',
        wallStructure: [
            'Endotelium: Sel endotel tunggal',
            'Membran basal: Lapisan pendukung tipis',
            'Tidak ada otot polos atau jaringan ikat',
        ],
        function: 'Tempat pertukaran oksigen, nutrisi, dan limbah antara darah dan jaringan',
        comparison: 'Dinding sangat tipis, diameter 5-10 mikron, tempat pertukaran zat',
    },
};
export default function VesselAnatomy() {
    const [selectedVessel, setSelectedVessel] = useState('artery');
    const [expandedLayer, setExpandedLayer] = useState(null);
    const currentVessel = vessels[selectedVessel];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };
    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
            transition: { duration: 2, repeat: Infinity },
        },
    };
    const flowVariants = {
        animate: {
            x: [0, 20, 0],
            transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        },
    };
    return (_jsxs(motion.div, { className: "relative w-full max-w-6xl mx-auto", variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-10", variants: itemVariants, children: Object.entries(vessels).map(([key, vessel]) => (_jsxs(motion.button, { onClick: () => setSelectedVessel(key), className: `p-6 rounded-2xl transition-all ${selectedVessel === key
                        ? 'bg-gradient-to-br from-white to-slate-50 border-2 shadow-lg'
                        : 'bg-white/50 border border-white/30 hover:bg-white/70'}`, style: selectedVessel === key
                        ? {
                            borderColor: vessel.color,
                            boxShadow: `0 0 30px ${vessel.color}40`,
                        }
                        : {}, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { className: "text-4xl mb-2", children: [key === 'artery' && '🔴', key === 'vein' && '🔵', key === 'capillary' && '🔶'] }), _jsx("h3", { className: "font-bold text-slate-900 text-lg", children: vessel.name.split('(')[0].trim() }), _jsx("p", { className: "text-xs text-slate-600 mt-2", children: vessel.thickness })] }, key))) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "bg-gradient-to-br from-white/80 via-white/60 to-slate-50/30 backdrop-blur-xl rounded-3xl border border-white/50 p-8 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)]", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(motion.div, { className: "flex flex-col justify-center items-center", variants: itemVariants, children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-slate-900", children: currentVessel.name }), _jsxs("svg", { viewBox: "0 0 300 450", className: "w-full max-w-xs mb-8", children: [selectedVessel === 'artery' && (_jsxs("g", { children: [_jsx("circle", { cx: "150", cy: "80", r: "90", fill: currentVessel.color, opacity: "0.15", stroke: currentVessel.color, strokeWidth: "2" }), _jsx("circle", { cx: "150", cy: "80", r: "70", fill: currentVessel.color, opacity: "0.25", stroke: currentVessel.color, strokeWidth: "1.5" }), _jsx(motion.circle, { cx: "150", cy: "80", r: "50", fill: currentVessel.color, opacity: "0.5", stroke: currentVessel.color, strokeWidth: "2", animate: "animate", variants: pulseVariants }), _jsx(motion.path, { d: "M 150 30 L 150 130", stroke: currentVessel.color, strokeWidth: "3", fill: "none", markerEnd: `url(#arrowhead-${selectedVessel})`, animate: "animate", variants: flowVariants }), _jsx("text", { x: "240", y: "80", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Intima" }), _jsx("text", { x: "240", y: "110", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Media" }), _jsx("text", { x: "240", y: "140", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Adventitia" })] })), selectedVessel === 'vein' && (_jsxs("g", { children: [_jsx("circle", { cx: "150", cy: "80", r: "85", fill: currentVessel.color, opacity: "0.15", stroke: currentVessel.color, strokeWidth: "2" }), _jsx("circle", { cx: "150", cy: "80", r: "60", fill: currentVessel.color, opacity: "0.25", stroke: currentVessel.color, strokeWidth: "1" }), _jsx("circle", { cx: "150", cy: "80", r: "40", fill: currentVessel.color, opacity: "0.5", stroke: currentVessel.color, strokeWidth: "2" }), _jsx(motion.path, { d: "M 120 80 Q 150 70 180 80", stroke: "white", strokeWidth: "3", fill: "none", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity } }), _jsx(motion.path, { d: "M 150 30 L 150 130", stroke: currentVessel.color, strokeWidth: "2.5", fill: "none", markerEnd: `url(#arrowhead-${selectedVessel})`, animate: { x: [0, 10, 0] }, transition: { duration: 4, repeat: Infinity } }), _jsx("text", { x: "240", y: "80", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Intima" }), _jsx("text", { x: "240", y: "115", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Media" }), _jsx("text", { x: "240", y: "150", fontSize: "12", fill: currentVessel.color, fontWeight: "bold", children: "Adventitia" }), _jsx("text", { x: "100", y: "65", fontSize: "10", fill: "white", fontWeight: "bold", children: "Valve" })] })), selectedVessel === 'capillary' && (_jsxs("g", { children: [_jsx(motion.line, { x1: "150", y1: "20", x2: "150", y2: "140", stroke: currentVessel.color, strokeWidth: "8", animate: "animate", variants: pulseVariants }), [30, 50, 70, 90, 110, 130].map((y, idx) => (_jsxs("g", { children: [_jsx("circle", { cx: "150", cy: y, r: "12", fill: currentVessel.color, opacity: "0.3", stroke: currentVessel.color, strokeWidth: "1" }), _jsx("text", { x: "150", y: y + 4, textAnchor: "middle", fontSize: "8", fill: currentVessel.color, fontWeight: "bold", children: "E" })] }, idx))), _jsx("circle", { cx: "100", cy: "75", r: "8", fill: "#FF4D6D", opacity: "0.6" }), _jsx("text", { x: "100", y: "95", textAnchor: "middle", fontSize: "10", fill: "#FF4D6D", fontWeight: "bold", children: "O\u2082 masuk" }), _jsx("circle", { cx: "200", cy: "75", r: "8", fill: "#4ECDC4", opacity: "0.6" }), _jsx("text", { x: "200", y: "95", textAnchor: "middle", fontSize: "10", fill: "#4ECDC4", fontWeight: "bold", children: "CO\u2082 keluar" }), _jsx(motion.path, { d: "M 150 10 L 150 140", stroke: currentVessel.color, strokeWidth: "2", fill: "none", markerEnd: `url(#arrowhead-${selectedVessel})`, opacity: "0.5" }), _jsx("text", { x: "175", y: "60", fontSize: "11", fill: currentVessel.color, fontWeight: "bold", children: "Endotel" })] })), _jsx("defs", { children: _jsx("marker", { id: `arrowhead-${selectedVessel}`, markerWidth: "10", markerHeight: "10", refX: "5", refY: "5", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 5, 0 10", fill: currentVessel.color }) }) })] }), _jsxs(motion.div, { className: "w-full bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 border border-slate-200/50", variants: itemVariants, children: [_jsx("p", { className: "text-sm font-semibold text-slate-800 mb-2", children: "\u26A1 Karakteristik Utama" }), _jsx("p", { className: "text-xs text-slate-700 leading-relaxed", children: currentVessel.comparison })] })] }), _jsxs(motion.div, { className: "space-y-4", variants: itemVariants, children: [_jsxs(motion.div, { className: "p-6 rounded-2xl bg-gradient-to-br from-slate-50/50 to-slate-100/30 border border-slate-200/50", children: [_jsxs("h3", { className: "font-bold text-slate-900 mb-2 flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83C\uDFAF" }), " Fungsi Utama"] }), _jsx("p", { className: "text-slate-700 text-sm leading-relaxed", children: currentVessel.function })] }), _jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-slate-900 mb-3 flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83C\uDFD7\uFE0F" }), " Lapisan Dinding Pembuluh"] }), _jsx("div", { className: "space-y-2", children: currentVessel.wallStructure.map((layer, idx) => (_jsxs(motion.button, { onClick: () => setExpandedLayer(expandedLayer === idx ? null : idx), className: "w-full text-left p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/50 hover:border-slate-300 transition-all", whileHover: { x: 4 }, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "font-semibold text-slate-900 text-sm", children: layer }), _jsx(motion.span, { animate: { rotate: expandedLayer === idx ? 180 : 0 }, transition: { duration: 0.3 }, children: "\u25BC" })] }), expandedLayer === idx && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-2 pt-2 border-t border-slate-200/50 text-xs text-slate-600", children: _jsxs("p", { children: [idx === 0 &&
                                                                    'Lapisan paling dalam yang langsung bersentuhan dengan darah. Permukaan halus memudahkan aliran darah.', idx === 1 &&
                                                                    'Mengandung otot polos dan serat elastin. Memungkinkan pembuluh untuk berkontrasi dan mengatur aliran darah.', idx === 2 &&
                                                                    'Lapisan luar dari jaringan ikat fibrosa. Memberikan kekuatan dan dukungan struktural pada pembuluh.'] }) }))] }, idx))) })] }), _jsxs(motion.div, { className: "p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/20 border border-blue-200/30", children: [_jsx("h4", { className: "font-semibold text-slate-900 mb-3 text-sm", children: "\uD83D\uDCCA Perbandingan Cepat" }), _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-600", children: "Tebal Dinding:" }), _jsx("span", { className: "font-semibold text-slate-900", children: selectedVessel === 'artery'
                                                                ? 'Tebal'
                                                                : selectedVessel === 'vein'
                                                                    ? 'Sedang'
                                                                    : 'Sangat Tipis' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-600", children: "Tekanan Darah:" }), _jsx("span", { className: "font-semibold text-slate-900", children: selectedVessel === 'artery'
                                                                ? 'Tinggi (80-120 mmHg)'
                                                                : selectedVessel === 'vein'
                                                                    ? 'Rendah (0-15 mmHg)'
                                                                    : 'Transisi (30-70 mmHg)' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-600", children: "Lumen Diameter:" }), _jsx("span", { className: "font-semibold text-slate-900", children: selectedVessel === 'artery'
                                                                ? 'Kecil (0.3-1cm)'
                                                                : selectedVessel === 'vein'
                                                                    ? 'Besar (0.5-3cm)'
                                                                    : '5-10 μm' })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-600", children: "Fungsi Utama:" }), _jsx("span", { className: "font-semibold text-slate-900", children: selectedVessel === 'artery'
                                                                ? 'Distribusi'
                                                                : selectedVessel === 'vein'
                                                                    ? 'Koleksi'
                                                                    : 'Pertukaran' })] })] })] })] })] }) }, selectedVessel), _jsx(motion.p, { className: "text-center text-sm text-slate-500 mt-8", variants: itemVariants, children: "\uD83D\uDCA1 Lapisan-lapisan pembuluh darah bekerja bersama untuk mengatur tekanan, aliran, dan pertukaran zat antar jaringan." })] }));
}
