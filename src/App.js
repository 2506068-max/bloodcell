import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
function App() {
    const [cells, setCells] = useState([]);
    useEffect(() => {
        fetch("/api/cells")
            .then((res) => res.json())
            .then((data) => {
            setCells(data.data);
        })
            .catch((error) => {
            console.error("Gagal ambil data:", error);
        });
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Blood Cell Edu" }), cells.map((cell) => (_jsxs("div", { children: [_jsxs("h2", { children: [cell.icon, " ", cell.name] }), _jsx("p", { children: cell.latin }), _jsx("p", { children: cell.function }), _jsx("p", { children: cell.color })] }, cell.id)))] }));
}
export default App;
