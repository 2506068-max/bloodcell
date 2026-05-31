import { jsx as _jsx } from "react/jsx-runtime";
export default function Mascot({ section }) {
    return (_jsx("div", { className: "fixed bottom-24 right-6 z-50 text-6xl animate-bounce", title: `Section: ${section}`, children: "\uD83E\uDE78" }));
}
