import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Activity } from 'lucide-react';
export const medicalOrgans = [
    {
        id: 'heart',
        title: 'Jantung (Cor)',
        latin: 'Cor Humanum',
        subtitle: 'Pompa Muskular Berongga 4 Ruang',
        imageSrc: '/assets/heart_anatomical.jpg',
        anatomicalType: 'heart',
        stats: [
            { label: 'Denyut Normal', value: '60 – 100 bpm' },
            { label: 'Curah Jantung', value: '~5.0 L / menit' },
            { label: 'Kerja Kontraksi', value: '100.000 x / hari' },
        ],
        keyStructures: [
            'Atrium Dextrum & Sinistrum',
            'Ventriculus Dexter & Sinister',
            'Valvula Mitralis & Tricuspidalis',
            'Arteria Coronaria (Nutrisi Miokard)',
        ],
        description: 'Organ berotot berukuran kepalan tangan di rongga mediastinum tengah. Bertindak sebagai dua pompa terkoordinasi: jantung kanan menggerakkan sirkulasi pulmonalis bertekanan rendah, dan jantung kiri menggerakkan sirkulasi sistemik bertekanan tinggi.',
        clinicalRelevance: 'Iskemia miokard akibat stenosis arteri koroner memicu angina pektoris dan infark miokard akut (serangan jantung).',
    },
    {
        id: 'lungs',
        title: 'Paru-Paru (Pulmo)',
        latin: 'Pulmones',
        subtitle: 'Organ Respirasi & Oksigenasi Darah',
        anatomicalType: 'lungs',
        stats: [
            { label: 'Luas Difusi Alveoli', value: '70 – 100 m²' },
            { label: 'Jumlah Alveolus', value: '~480 Juta' },
            { label: 'Saturasi Oksigen', value: '95 – 100% SpO₂' },
        ],
        keyStructures: [
            'Arbor Bronchialis & Bronkiolus',
            'Lobus Superior, Medius, Inferior',
            'Membrana Alveolocapillaris',
            'Pleura Visceralis & Parietalis',
        ],
        description: 'Pasangan organ berbentuk kerucut spons di rongga toraks. Tempat pertemuan langsung antara udara pernapasan dan eritrosit dalam kapiler alveolus untuk pertukaran gas hematik (oksigenasi Hb dan pembuangan CO₂).',
        clinicalRelevance: 'Edema paru terjadi ketika tekanan kapiler paru meningkat, menyebabkan cairan transudat merembes ke alveoli dan menghambat difusi oksigen.',
    },
    {
        id: 'vessels',
        title: 'Sistem Pembuluh Darah',
        latin: 'Systema Vasorum',
        subtitle: 'Jaringan Konduksi & Mikrosirkulasi',
        anatomicalType: 'vessels',
        stats: [
            { label: 'Panjang Total', value: '~100.000 km' },
            { label: 'Resistensi Sistemik', value: 'Arteriol Perifer' },
            { label: 'Distribusi Volume', value: '65% di Sistem Vena' },
        ],
        keyStructures: [
            'Arteri Elastis (Aorta) & Muskular',
            'Arteriol (Regulator Tekanan)',
            'Anyaman Kapiler Pertukaran Nutrisi',
            'Vena & Katup Antirefluks',
        ],
        description: 'Jalur sirkuit tertutup tubuh manusia yang terbagi menjadi arteri berotot tebal, arteriol pengatur resistensi perifer, kapiler berpori halus tempat transfer molekular, dan vena berkapasitansi tinggi dengan katup satu arah.',
        clinicalRelevance: 'Aterosklerosis (penumpukan plak kolesterol dan kalsifikasi pada tunika intima arteri) membatasi perfusi organ vital.',
    },
    {
        id: 'perfusion',
        title: 'Organ Perfusi Utama',
        latin: 'Organa Perfusionis (Encephalon & Ren)',
        subtitle: 'Otak & Ginjal Penerima Curah Darah Kritis',
        anatomicalType: 'perfusion',
        stats: [
            { label: 'Aliran Darah Otak', value: '15% Curah Jantung' },
            { label: 'Filtrasi Ginjal', value: '~180 Liter / hari' },
            { label: 'Toleransi Anoksia', value: '< 4 – 5 Menit' },
        ],
        keyStructures: [
            'Circulus Arteriosus Willisi (Otak)',
            'Blood-Brain Barrier (Sawar Darah Otak)',
            'Glomerulus & Nefron Renal',
            'Sistem Renin-Angiotensin-Aldosteron',
        ],
        description: 'Otak membutuhkan suplai glukosa dan oksigen tanpa henti untuk mempertahankan aktivitas neuron, sementara ginjal memfiltrasi seluruh volume plasma berulang kali setiap hari untuk membuang zat toksik dan mengatur tekanan darah sistemik.',
        clinicalRelevance: 'Hipotensi berat yang berkepanjangan memicu iskemia serebral dan gagal ginjal akut akibat penurunan laju filtrasi glomerulus.',
    },
];
export default function OrganCards() {
    const [selectedOrgan, setSelectedOrgan] = useState(null);
    return (_jsxs("div", { className: "w-full", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: medicalOrgans.map((organ) => (_jsxs("div", { onClick: () => setSelectedOrgan(organ), className: "group relative cursor-pointer rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-900/5 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-rose-900/60", children: [_jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-serif italic text-slate-500 dark:text-slate-400", children: organ.latin }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors", children: organ.title })] }), _jsx("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300", children: organ.subtitle.split(' ')[0] })] }), _jsxs("div", { className: "relative my-4 flex h-52 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-white to-rose-50/20 p-4 border border-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800/60 overflow-hidden", children: [organ.anatomicalType === 'heart' && (_jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [_jsx("img", { src: "/assets/heart_anatomical.jpg", alt: "Anatomi Jantung Manusia", className: "max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(190,18,60,0.15)] group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm", children: "Netter Atlas Standard" })] })), organ.anatomicalType === 'lungs' && (_jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [_jsx(LungsVignetteSVG, {}), _jsx("div", { className: "absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm", children: "Arbor Alveolaris" })] })), organ.anatomicalType === 'vessels' && (_jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [_jsx(VascularNetworkSVG, {}), _jsx("div", { className: "absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm", children: "Arteri \u2022 Vena \u2022 Kapiler" })] })), organ.anatomicalType === 'perfusion' && (_jsxs("div", { className: "relative w-full h-full flex items-center justify-center", children: [_jsx(PerfusionOrgansSVG, {}), _jsx("div", { className: "absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm", children: "Perfusi Kritis Encephalon" })] }))] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed", children: organ.description }), _jsx("div", { className: "mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-4", children: organ.stats.map((st, i) => (_jsxs("div", { className: "text-left", children: [_jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-slate-400", children: st.label }), _jsx("p", { className: "text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5", children: st.value })] }, i))) }), _jsxs("div", { className: "mt-5 flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400", children: [_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(Activity, { size: 14 }), "Buka Telaah Anatomi Lengkap"] }), _jsx(ArrowRight, { size: 16, className: "transform group-hover:translate-x-1.5 transition-transform" })] })] }, organ.id))) }), _jsx(AnimatePresence, { children: selectedOrgan && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-2xl dark:border-slate-800 dark:bg-slate-900", children: [_jsx("button", { onClick: () => setSelectedOrgan(null), className: "absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(X, { size: 20 }) }), _jsxs("div", { className: "border-b border-slate-100 dark:border-slate-800 pb-4 mb-6", children: [_jsx("span", { className: "text-xs italic text-rose-600 dark:text-rose-400 font-serif", children: selectedOrgan.latin }), _jsx("h3", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mt-1", children: selectedOrgan.title }), _jsx("p", { className: "text-sm text-slate-500", children: selectedOrgan.subtitle })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6", children: [_jsxs("div", { className: "flex items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 min-h-[220px]", children: [selectedOrgan.anatomicalType === 'heart' && (_jsx("img", { src: "/assets/heart_anatomical.jpg", alt: "Anatomi Jantung", className: "max-h-56 object-contain filter drop-shadow-md rounded-xl" })), selectedOrgan.anatomicalType === 'lungs' && _jsx(LungsVignetteSVG, {}), selectedOrgan.anatomicalType === 'vessels' && _jsx(VascularNetworkSVG, {}), selectedOrgan.anatomicalType === 'perfusion' && _jsx(PerfusionOrgansSVG, {})] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Struktur Anatomi Kunci:" }), _jsx("ul", { className: "space-y-2", children: selectedOrgan.keyStructures.map((struct, idx) => (_jsxs("li", { className: "flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-rose-600" }), struct] }, idx))) }), _jsxs("div", { className: "pt-2", children: [_jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2", children: "Parameter Fisiologis:" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: selectedOrgan.stats.map((st, i) => (_jsxs("div", { className: "p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center", children: [_jsx("p", { className: "text-[10px] text-slate-400", children: st.label }), _jsx("p", { className: "text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5", children: st.value })] }, i))) })] })] })] }), _jsxs("div", { className: "space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5", children: [_jsx("p", { children: selectedOrgan.description }), _jsxs("div", { className: "p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 text-xs", children: [_jsxs("p", { className: "font-bold flex items-center gap-1.5 mb-1", children: [_jsx(Activity, { size: 14, className: "text-rose-600" }), "Signifikansi Klinis & Patologi:"] }), _jsx("p", { children: selectedOrgan.clinicalRelevance })] })] })] }) })) })] }));
}
function LungsVignetteSVG() {
    return (_jsxs("svg", { viewBox: "0 0 240 180", className: "w-48 h-36", children: [_jsx("defs", { children: _jsxs("radialGradient", { id: "vignette-lung", cx: "40%", cy: "30%", r: "70%", children: [_jsx("stop", { offset: "0%", stopColor: "#FDA4AF" }), _jsx("stop", { offset: "50%", stopColor: "#F43F5E" }), _jsx("stop", { offset: "100%", stopColor: "#9F1239" })] }) }), _jsx("path", { d: "M 115 15 L 115 55 Q 120 60 125 55 L 125 15 Z", fill: "#CBD5E1", stroke: "#64748B", strokeWidth: "1" }), _jsx("path", { d: "M 115 25 Q 120 22 125 25", stroke: "#94A3B8", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M 115 35 Q 120 32 125 35", stroke: "#94A3B8", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M 115 45 Q 120 42 125 45", stroke: "#94A3B8", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M 105 60 C 85 60 55 75 45 100 C 35 125 35 155 45 170 C 55 180 85 180 110 165 C 115 145 115 100 105 60 Z", fill: "url(#vignette-lung)", stroke: "#881337", strokeWidth: "1.5" }), _jsx("path", { d: "M 135 60 C 155 60 185 75 195 100 C 205 125 205 155 195 170 C 185 180 155 180 130 165 C 128 145 138 125 138 115 C 138 100 130 85 135 60 Z", fill: "url(#vignette-lung)", stroke: "#881337", strokeWidth: "1.5" }), _jsx("path", { d: "M 115 65 Q 90 75 65 110", stroke: "#0284C7", strokeWidth: "1.8", fill: "none" }), _jsx("path", { d: "M 125 65 Q 150 75 175 110", stroke: "#0284C7", strokeWidth: "1.8", fill: "none" }), _jsx("path", { d: "M 70 120 Q 95 105 115 95", stroke: "#E11D48", strokeWidth: "1.8", fill: "none" }), _jsx("path", { d: "M 170 120 Q 145 105 125 95", stroke: "#E11D48", strokeWidth: "1.8", fill: "none" })] }));
}
function VascularNetworkSVG() {
    return (_jsxs("svg", { viewBox: "0 0 240 180", className: "w-48 h-36", children: [_jsx("path", { d: "M 40 40 Q 90 35 120 70 Q 150 105 200 100", stroke: "#BE123C", strokeWidth: "7", fill: "none", strokeLinecap: "round" }), _jsx("path", { d: "M 40 140 Q 90 145 120 110 Q 150 75 200 80", stroke: "#0284C7", strokeWidth: "7", fill: "none", strokeLinecap: "round" }), _jsxs("g", { stroke: "#9333EA", strokeWidth: "1.5", opacity: "0.75", fill: "none", children: [_jsx("path", { d: "M 105 50 Q 115 90 110 130" }), _jsx("path", { d: "M 120 70 Q 130 90 125 110" }), _jsx("path", { d: "M 135 90 Q 140 85 145 95" })] }), _jsx("circle", { cx: "120", cy: "70", r: "4", fill: "#BE123C" }), _jsx("circle", { cx: "120", cy: "110", r: "4", fill: "#0284C7" })] }));
}
function PerfusionOrgansSVG() {
    return (_jsxs("svg", { viewBox: "0 0 240 180", className: "w-48 h-36", children: [_jsx("path", { d: "M 120 30 \n           C 90 30 70 50 70 75 \n           C 70 95 90 110 115 110 \n           L 125 110 \n           C 150 110 170 95 170 75 \n           C 170 50 150 30 120 30 Z", fill: "#FFE4E6", stroke: "#E11D48", strokeWidth: "1.5" }), _jsx("path", { d: "M 85 55 Q 105 65 115 50", stroke: "#FB7185", strokeWidth: "1.2", fill: "none" }), _jsx("path", { d: "M 155 55 Q 135 65 125 50", stroke: "#FB7185", strokeWidth: "1.2", fill: "none" }), _jsx("path", { d: "M 80 80 Q 100 85 110 75", stroke: "#FB7185", strokeWidth: "1.2", fill: "none" }), _jsx("path", { d: "M 160 80 Q 140 85 130 75", stroke: "#FB7185", strokeWidth: "1.2", fill: "none" }), _jsx("path", { d: "M 105 160 L 105 110", stroke: "#BE123C", strokeWidth: "3" }), _jsx("path", { d: "M 135 160 L 135 110", stroke: "#BE123C", strokeWidth: "3" }), _jsx("ellipse", { cx: "120", cy: "100", rx: "14", ry: "8", fill: "none", stroke: "#E11D48", strokeWidth: "2" })] }));
}
