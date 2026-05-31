import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
const BADGES = [
    { id: 'first_quiz', label: 'Pemula', icon: '🌱', description: 'Selesaikan kuis pertama' },
    { id: 'perfect_score', label: 'Sempurna', icon: '⭐', description: 'Dapatkan skor 100%' },
    { id: 'streak_5', label: 'Konsisten', icon: '🔥', description: 'Jawab 5 soal benar berturut-turut' },
    { id: 'learn_all', label: 'Pelajar Sejati', icon: '🧠', description: 'Belajar semua organ' },
    { id: 'speed_demon', label: 'Kilat', icon: '⚡', description: 'Selesaikan kuis dalam 30 detik' },
    { id: 'heart_master', label: 'Ahli Jantung', icon: '❤️', description: 'Jawab 10 soal tentang jantung' },
];
export default function BadgeSystem({ unlockedBadges, onBadgeUnlock }) {
    const [showNotification, setShowNotification] = useState(null);
    const unlockBadge = (badgeId) => {
        if (!unlockedBadges.includes(badgeId)) {
            const badge = BADGES.find(b => b.id === badgeId);
            if (badge) {
                setShowNotification(badge);
                setTimeout(() => setShowNotification(null), 3000);
                onBadgeUnlock?.(badgeId);
            }
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: BADGES.map((badge) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);
                    return (_jsxs(motion.div, { whileHover: isUnlocked ? { scale: 1.1, y: -4 } : {}, className: `flex flex-col items-center justify-center p-4 rounded-3xl transition-all duration-300 cursor-help group ${isUnlocked
                            ? 'bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shadow-lg'
                            : 'bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 opacity-50'}`, onClick: () => isUnlocked ? unlockBadge(badge.id) : null, children: [_jsx(motion.div, { className: "text-3xl mb-2", animate: isUnlocked ? { scale: [1, 1.2, 1] } : {}, transition: { duration: 0.5 }, children: badge.icon }), _jsx("p", { className: "text-xs font-semibold text-center", children: badge.label }), _jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10", children: badge.description })] }, badge.id));
                }) }), _jsx(AnimatePresence, { children: showNotification && (_jsx(motion.div, { initial: { opacity: 0, y: -20, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -20, scale: 0.8 }, className: "fixed top-20 left-1/2 -translate-x-1/2 z-50", children: _jsxs(motion.div, { className: "bg-gradient-to-r from-primary to-secondary text-white rounded-full px-6 py-4 shadow-glow flex items-center gap-4", animate: { scale: [1, 1.05, 1] }, transition: { duration: 0.6 }, children: [_jsx("span", { className: "text-2xl", children: showNotification.icon }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-sm", children: "Lencana Baru Terbuka! \uD83C\uDF89" }), _jsx("p", { className: "text-xs opacity-90", children: showNotification.label })] })] }) })) })] }));
}
export { BADGES };
