import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Eye, Activity } from 'lucide-react';
const anatomicalData = {
    heart: {
        id: 'heart',
        name: 'Jantung (Cor)',
        latin: 'Cor Humanum',
        system: 'both',
        oxygenated: true,
        description: 'Pompa sentral muskular berongga di mediastinum media yang menggerakkan seluruh sirkulasi pulmonalis dan sistemik.',
        clinicalNote: 'Denyut normal 60-100 kali per menit dengan curah jantung istirahat 5 liter per menit.',
    },
    aorta: {
        id: 'aorta',
        name: 'Aorta Sistemik',
        latin: 'Aorta Thoracica & Abdominalis',
        system: 'systemic',
        oxygenated: true,
        description: 'Batang arteri terbesar tubuh, berpangkal di ventrikel kiri, melengkung membentuk arkus aorta, dan turun menyuplai seluruh organ.',
        clinicalNote: 'Dinding tebal kaya elastin untuk meredam gelombang tekanan denyut (efek Windkessel).',
    },
    vena_cava: {
        id: 'vena_cava',
        name: 'Vena Kava (Superior & Inferior)',
        latin: 'Vena Cava Superior & Inferior',
        system: 'systemic',
        oxygenated: false,
        description: 'Dua pembuluh vena utama pengumpul darah deoksigenasi dari tubuh bagian atas dan bawah yang bermuara ke atrium kanan.',
        clinicalNote: 'Tekanan darah normal sangat rendah (0-5 mmHg) dan dipengaruhi oleh fase inspirasi rongga dada.',
    },
    pulmonary_artery: {
        id: 'pulmonary_artery',
        name: 'Arteri Pulmonalis',
        latin: 'Truncus & Arteria Pulmonalis',
        system: 'pulmonary',
        oxygenated: false,
        description: 'Menyalurkan darah kaya CO₂ dari ventrikel kanan menuju kapiler alveolus di paru-paru kanan dan kiri.',
        clinicalNote: 'Satu-satunya arteri dalam tubuh orang dewasa yang membawa darah deoksigenasi.',
    },
    pulmonary_veins: {
        id: 'pulmonary_veins',
        name: 'Vena Pulmonalis',
        latin: 'Venae Pulmonales',
        system: 'pulmonary',
        oxygenated: true,
        description: 'Empat pembuluh vena (dua dari tiap paru) yang membawa darah kaya O₂ kembali ke atrium kiri jantung.',
        clinicalNote: 'Membawa darah dengan tekanan parsial O₂ tertinggi dalam tubuh (sekitar 100 mmHg).',
    },
    lungs: {
        id: 'lungs',
        name: 'Paru-Paru (Pulmo)',
        latin: 'Pulmones',
        system: 'pulmonary',
        oxygenated: true,
        description: 'Organ respirasi tempat eritrosit mengikat molekul oksigen dan membuang karbon dioksida melalui membran kapiler alveolus.',
        clinicalNote: 'Luas permukaan pertukaran gas mencapai 70-100 meter persegi dengan 480 juta alveoli.',
    },
    carotid_vessels: {
        id: 'carotid_vessels',
        name: 'Pembuluh Karotis & Jugularis (Kepala/Otak)',
        latin: 'Arteria Carotis & Vena Jugularis',
        system: 'systemic',
        oxygenated: true,
        description: 'Arteri karotis komunis menghantarkan darah beroksigen ke otak, sedangkan vena jugularis internalis mengalirkan darah balik.',
        clinicalNote: 'Otak mengonsumsi 20% suplai oksigen tubuh meskipun hanya menyumbang 2% dari berat badan.',
    },
    iliac_vessels: {
        id: 'iliac_vessels',
        name: 'Pembuluh Iliaka & Femoralis (Ekstremitas Bawah)',
        latin: 'Vasa Iliaca & Femoralia',
        system: 'systemic',
        oxygenated: true,
        description: 'Percabangan aorta abdominalis dan vena kava inferior yang memperdarahi pelvis serta kedua tungkai kaki.',
        clinicalNote: 'Denyut arteri femoralis pada lipatan paha adalah titik palpasi klinis penting saat evaluasi sirkulasi perifer.',
    },
};
export default function InteractiveAnatomy() {
    const [activeId, setActiveId] = useState('heart');
    const [systemFilter, setSystemFilter] = useState('all');
    const currentNode = activeId ? anatomicalData[activeId] : null;
    return (_jsxs("div", { className: "w-full rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-8", children: [_jsxs("div", { children: [_jsx("span", { className: "text-xs font-mono uppercase tracking-wider text-slate-400", children: "Atlas Anatomi Vaskular" }), _jsx("h3", { className: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-white", children: "Peta Distribusi Vaskular Tubuh Manusia" })] }), _jsxs("div", { className: "flex rounded-full border border-slate-200 dark:border-slate-700 p-1 bg-slate-50 dark:bg-slate-800 text-xs font-semibold", children: [_jsx("button", { onClick: () => setSystemFilter('all'), className: `px-4 py-1.5 rounded-full transition-all ${systemFilter === 'all'
                                    ? 'bg-rose-700 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`, children: "Semua Sistem" }), _jsx("button", { onClick: () => setSystemFilter('pulmonary'), className: `px-4 py-1.5 rounded-full transition-all ${systemFilter === 'pulmonary'
                                    ? 'bg-rose-700 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`, children: "Sirkulasi Pulmonal" }), _jsx("button", { onClick: () => setSystemFilter('systemic'), className: `px-4 py-1.5 rounded-full transition-all ${systemFilter === 'systemic'
                                    ? 'bg-rose-700 text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'}`, children: "Sirkulasi Sistemik" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-center", children: [_jsx("div", { className: "lg:col-span-6 relative flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/70 dark:border-slate-800 shadow-inner min-h-[460px]", children: _jsxs("svg", { viewBox: "0 0 400 620", className: "w-full max-w-sm h-auto select-none", "aria-label": "Anatomi Sistem Peredaran Darah Tubuh", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "artery-stroke", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#FB7185" }), _jsx("stop", { offset: "50%", stopColor: "#BE123C" }), _jsx("stop", { offset: "100%", stopColor: "#881337" })] }), _jsxs("linearGradient", { id: "vein-stroke", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#38BDF8" }), _jsx("stop", { offset: "50%", stopColor: "#0284C7" }), _jsx("stop", { offset: "100%", stopColor: "#0369A1" })] })] }), _jsx("path", { d: "M 200 40 \n                 C 225 40 240 55 240 80 \n                 C 240 105 220 120 200 120 \n                 C 180 120 160 105 160 80 \n                 C 160 55 175 40 200 40 Z\n                 M 180 120 L 180 145 C 130 155 110 175 90 220 L 70 340 L 95 350 L 115 250 L 135 240\n                 L 140 370 C 140 430 160 450 170 470 L 155 580 L 185 585 L 195 480 L 205 480 L 215 585 L 245 580 L 230 470\n                 C 240 450 260 430 260 370 L 265 240 L 285 250 L 305 350 L 330 340 L 310 220 C 290 175 270 155 220 145 L 220 120 Z", fill: "rgba(148, 163, 184, 0.05)", stroke: "rgba(148, 163, 184, 0.25)", strokeWidth: "1.5" }), _jsxs("g", { id: "node-lungs", onClick: () => setActiveId('lungs'), className: "cursor-pointer group", opacity: systemFilter === 'systemic' ? 0.35 : 1, children: [_jsx("path", { d: "M 175 190 C 150 190 130 210 125 240 C 120 270 130 290 150 295 C 165 300 175 270 175 240 Z", fill: "#FDA4AF", opacity: activeId === 'lungs' ? 0.65 : 0.35, stroke: "#E11D48", strokeWidth: activeId === 'lungs' ? 2 : 1, className: "transition-all duration-300" }), _jsx("path", { d: "M 225 190 C 250 190 270 210 275 240 C 280 270 270 290 250 295 C 235 285 230 270 230 240 Z", fill: "#FDA4AF", opacity: activeId === 'lungs' ? 0.65 : 0.35, stroke: "#E11D48", strokeWidth: activeId === 'lungs' ? 2 : 1, className: "transition-all duration-300" })] }), _jsxs("g", { stroke: "url(#artery-stroke)", fill: "none", strokeLinecap: "round", opacity: systemFilter === 'pulmonary' ? 0.35 : 1, children: [_jsx("path", { d: "M 195 200 L 190 120 M 190 120 L 175 90 M 190 120 L 195 85", strokeWidth: activeId === 'carotid_vessels' ? 4 : 2.5, onClick: () => setActiveId('carotid_vessels'), className: "cursor-pointer" }), _jsx("path", { d: "M 205 200 L 210 120 M 210 120 L 225 90 M 210 120 L 205 85", strokeWidth: activeId === 'carotid_vessels' ? 4 : 2.5, onClick: () => setActiveId('carotid_vessels'), className: "cursor-pointer" }), _jsx("path", { d: "M 195 200 Q 150 190 100 240 L 80 320", strokeWidth: "2.2" }), _jsx("path", { d: "M 205 200 Q 250 190 300 240 L 320 320", strokeWidth: "2.2" }), _jsx("path", { d: "M 202 245 L 202 380", strokeWidth: activeId === 'aorta' ? 5 : 3.5, onClick: () => setActiveId('aorta'), className: "cursor-pointer" }), _jsx("path", { d: "M 202 320 L 170 330 M 202 320 L 234 330", strokeWidth: "2" }), _jsx("path", { d: "M 202 380 Q 185 410 175 460 L 170 560", strokeWidth: activeId === 'iliac_vessels' ? 4 : 2.5, onClick: () => setActiveId('iliac_vessels'), className: "cursor-pointer" }), _jsx("path", { d: "M 202 380 Q 215 410 225 460 L 230 560", strokeWidth: activeId === 'iliac_vessels' ? 4 : 2.5, onClick: () => setActiveId('iliac_vessels'), className: "cursor-pointer" })] }), _jsxs("g", { stroke: "url(#vein-stroke)", fill: "none", strokeLinecap: "round", opacity: systemFilter === 'pulmonary' ? 0.35 : 1, children: [_jsx("path", { d: "M 183 120 L 183 190", strokeWidth: "2.5" }), _jsx("path", { d: "M 217 120 L 217 190", strokeWidth: "2.5" }), _jsx("path", { d: "M 188 160 L 188 235", strokeWidth: activeId === 'vena_cava' ? 5 : 3.5, onClick: () => setActiveId('vena_cava'), className: "cursor-pointer" }), _jsx("path", { d: "M 193 250 L 193 385", strokeWidth: activeId === 'vena_cava' ? 5 : 3.5, onClick: () => setActiveId('vena_cava'), className: "cursor-pointer" }), _jsx("path", { d: "M 193 385 Q 178 415 168 460 L 163 560", strokeWidth: "2.5" }), _jsx("path", { d: "M 193 385 Q 208 415 218 460 L 223 560", strokeWidth: "2.5" })] }), _jsxs("g", { opacity: systemFilter === 'systemic' ? 0.35 : 1, children: [_jsx("path", { d: "M 195 220 Q 170 215 145 230 M 195 220 Q 220 215 255 230", stroke: "#0284C7", strokeWidth: activeId === 'pulmonary_artery' ? 4 : 2.5, fill: "none", onClick: () => setActiveId('pulmonary_artery'), className: "cursor-pointer" }), _jsx("path", { d: "M 150 245 Q 175 240 195 235 M 250 245 Q 225 240 205 235", stroke: "#E11D48", strokeWidth: activeId === 'pulmonary_veins' ? 4 : 2.5, fill: "none", onClick: () => setActiveId('pulmonary_veins'), className: "cursor-pointer" })] }), _jsxs("g", { id: "node-heart", onClick: () => setActiveId('heart'), className: "cursor-pointer group", children: [_jsx("ellipse", { cx: "198", cy: "235", rx: "24", ry: "28", fill: "#BE123C", stroke: activeId === 'heart' ? '#FFFFFF' : '#881337', strokeWidth: activeId === 'heart' ? 3 : 1.5, className: "transition-all duration-300 filter drop-shadow-md" }), _jsx("path", { d: "M 190 220 Q 200 240 210 255", stroke: "#F43F5E", strokeWidth: "1.8", fill: "none" }), activeId === 'heart' && (_jsxs("circle", { cx: "198", cy: "235", r: "32", stroke: "#BE123C", strokeWidth: "1.5", fill: "none", opacity: "0.6", children: [_jsx("animate", { attributeName: "r", values: "24;36;24", dur: "1.5s", repeatCount: "indefinite" }), _jsx("animate", { attributeName: "opacity", values: "0.8;0;0.8", dur: "1.5s", repeatCount: "indefinite" })] }))] }), _jsxs("g", { className: "text-[10px] font-bold font-sans select-none", children: [_jsx("text", { x: "90", y: "110", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('carotid_vessels'), children: "A. Carotis \u2192" }), _jsx("text", { x: "65", y: "235", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('lungs'), children: "Paru Kanan \u2192" }), _jsx("text", { x: "285", y: "235", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('heart'), children: "\u2190 Jantung" }), _jsx("text", { x: "285", y: "330", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('aorta'), children: "\u2190 Aorta" }), _jsx("text", { x: "70", y: "350", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('vena_cava'), children: "V. Kava \u2192" }), _jsx("text", { x: "240", y: "520", fill: "#0F172A", className: "cursor-pointer dark:fill-white", onClick: () => setActiveId('iliac_vessels'), children: "\u2190 A. Femoralis" })] })] }) }), _jsx("div", { className: "lg:col-span-6 space-y-5", children: currentNode ? (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: `text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${currentNode.oxygenated
                                                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'}`, children: [_jsx(Droplets, { size: 11, className: "inline mr-1" }), currentNode.oxygenated ? 'Kaya Oksigen (O₂)' : 'Deoksigenasi (Kaya CO₂)'] }), _jsx("span", { className: "text-xs italic text-slate-400 font-serif", children: currentNode.latin })] }), _jsx("h4", { className: "text-2xl font-bold text-slate-900 dark:text-white mt-1", children: currentNode.name })] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed", children: currentNode.description }), _jsxs("div", { className: "p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300", children: [_jsxs("p", { className: "font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1", children: [_jsx(Activity, { size: 14, className: "text-rose-600" }), "Keterangan Klinis & Fisiologis:"] }), _jsx("p", { className: "leading-relaxed", children: currentNode.clinicalNote })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2", children: "Pilih Organ / Pembuluh Lain:" }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.values(anatomicalData).map((item) => (_jsx("button", { onClick: () => setActiveId(item.id), className: `px-3 py-1 rounded-lg text-xs font-semibold transition-all ${activeId === item.id
                                                    ? 'bg-rose-700 text-white shadow-sm'
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'}`, children: item.name.split('(')[0].trim() }, item.id))) })] })] }, currentNode.id)) : (_jsxs("div", { className: "text-center py-12 text-slate-400", children: [_jsx(Eye, { size: 32, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "Pilih organ atau pembuluh darah pada diagram untuk melihat data anatomi" })] })) })] })] }));
}
