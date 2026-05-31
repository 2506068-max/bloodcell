import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const updateProgress = () => {
            const scroll = window.scrollY;
            const height = document.body.scrollHeight - window.innerHeight;
            setProgress(height > 0 ? Math.min(100, Math.round((scroll / height) * 100)) : 0);
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);
    return (_jsx("div", { className: "fixed inset-x-0 top-0 z-50 h-1 bg-slate-200/50 dark:bg-slate-800/80", children: _jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-primary via-secondary to-lavender transition-all duration-200", style: { width: `${progress}%` } }) }));
}
