import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
const Progress = React.forwardRef(({ className, value = 0, indicatorClassName, ...props }, ref) => {
    const safeValue = Math.min(100, Math.max(0, value));
    return (_jsx("div", { ref: ref, className: cn('relative h-3 w-full overflow-hidden rounded-full bg-slate-200/70', className), ...props, children: _jsx("div", { className: cn('h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500', indicatorClassName), style: { width: `${safeValue}%` } }) }));
});
Progress.displayName = 'Progress';
export { Progress };
