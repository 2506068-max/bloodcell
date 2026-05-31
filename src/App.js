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
            .catch((err) => {
            console.error("Gagal ambil data:", err);
        });
    }, []);
    return (_jsxs("div", { children: [_jsx("h1", { children: "Blood Cell Edu" }), cells.map((cell) => (_jsxs("div", { children: [_jsx("h2", { children: cell.name }), _jsx("p", { children: cell.function })] }, cell.id)))] }));
}
export default App;
