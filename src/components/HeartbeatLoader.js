import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
export default function HeartbeatLoader({ onFinish }) {
    useEffect(() => {
        const t = setTimeout(() => onFinish && onFinish(), 1800);
        return () => clearTimeout(t);
    }, []);
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30", children: _jsxs("div", { className: "bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg", children: [_jsx("svg", { width: "120", height: "40", viewBox: "0 0 120 40", children: _jsx("polyline", { points: "0,20 20,20 30,5 40,35 50,20 90,20 100,5 110,30 120,20", fill: "none", stroke: "#FF4D6D", strokeWidth: "3", className: "monitor-line" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: "Memuat\u2026" }), _jsx("div", { className: "text-sm text-slate-500", children: "Sedang menyiapkan pengalaman interaktif" })] })] }) }));
}
