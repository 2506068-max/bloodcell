import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const facts = {
    '/': '💡 Tahukah kamu? Jantung kamu berdetak sekitar 100.000 kali setiap hari!',
    '/pengertian': '🩸 Sistem peredaran darah Anda memiliki pembuluh darah sepanjang 96.000 km!',
    '/organ': '❤️ Jantung adalah organ seukuran kepalan tangan tapi sangat kuat!',
    '/jenis': '🔄 Darah mengalir ke seluruh tubuh Anda dalam waktu kurang dari 60 detik!',
    '/gangguan': '⚠️ Gaya hidup sehat dapat mencegah 80% penyakit jantung!',
    '/galeri': '🎨 Setiap sel darah merah berumur sekitar 120 hari!',
    '/kuis': '🧠 Semakin sering latihan soal, semakin bagus pemahamanmu!',
    '/tentang': '🌟 Setiap hari tubuhmu memproduksi 2,4 juta sel darah merah baru!',
};
export default function Mascot() {
    const [showFact, setShowFact] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const location = useLocation();
    useEffect(() => {
        setShowFact(true);
        const timer = setTimeout(() => setShowFact(false), 5000);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    return (_jsxs(motion.div, { className: "fixed bottom-8 right-8 z-30", drag: true, dragConstraints: { left: -500, right: 0, top: 0, bottom: 500 }, initial: { x: 0, y: 0 }, animate: { x: position.x, y: position.y }, onDragEnd: (_event, info) => {
            setPosition({
                x: position.x + info.offset.x,
                y: position.y + info.offset.y,
            });
        }, children: [_jsx(motion.div, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, onClick: () => setShowFact(!showFact), className: "cursor-grab active:cursor-grabbing", children: _jsx(motion.div, { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity }, className: "text-6xl filter drop-shadow-lg", children: "\uD83D\uDD34" }) }), _jsx(AnimatePresence, { children: showFact && (_jsx(motion.div, { initial: { opacity: 0, y: 20, scale: 0.8 }, animate: { opacity: 1, y: -80, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.8 }, className: "absolute bottom-full right-0 mb-4 w-64", children: _jsxs("div", { className: "bg-white rounded-xl shadow-glow border-2 border-primary p-4 text-sm font-medium text-text-dark", children: [facts[location.pathname] || facts['/'], _jsx("div", { className: "absolute -bottom-2 right-6 w-4 h-4 bg-white border-2 border-primary border-t-transparent border-l-transparent transform rotate-45" })] }) })) })] }));
}
