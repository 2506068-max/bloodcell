import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUpRight } from 'lucide-react';
export default function Fab() {
    return (_jsx("div", { className: "hidden lg:flex fixed bottom-6 right-6 z-40 items-end justify-end", children: _jsxs("a", { href: "#kuis", className: "inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-primary to-secondary px-5 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-1 hover:shadow-xl", children: [_jsx("span", { children: "Ke Kuis" }), _jsx(ArrowUpRight, { size: 18 })] }) }));
}
