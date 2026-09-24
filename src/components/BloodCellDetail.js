import { jsx as _jsx } from "react/jsx-runtime";
import MicroscopicBloodCells from './anatomical/MicroscopicBloodCells';
export default function BloodCellDetail({ cellType: _cellType }) {
    return (_jsx("div", { className: "w-full", children: _jsx(MicroscopicBloodCells, {}) }));
}
