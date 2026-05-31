import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const badgeVariants = cva('inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors', {
    variants: {
        variant: {
            default: 'border-primary/20 bg-primary/10 text-primary',
            secondary: 'border-secondary/20 bg-secondary/10 text-secondary-dark',
            accent: 'border-accent/30 bg-accent/40 text-text-dark',
            outline: 'border-slate-200 bg-white/70 text-text-dark',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
function Badge({ className, variant, ...props }) {
    return _jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
export { Badge, badgeVariants };
