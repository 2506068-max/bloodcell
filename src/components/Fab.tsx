import { ArrowUpRight } from 'lucide-react'

export default function Fab() {
  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-40 items-end justify-end">
      <a href="#kuis" className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-primary to-secondary px-5 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-1 hover:shadow-xl">
        <span>Ke Kuis</span>
        <ArrowUpRight size={18} />
      </a>
    </div>
  )
}
