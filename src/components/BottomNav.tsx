import { Heart, Activity, BookOpen, Sparkles } from 'lucide-react'

const items = [
  { href: '#hero', label: 'Beranda', icon: Heart },
  { href: '#organ', label: 'Organ', icon: Activity },
  { href: '#diagram', label: 'Diagram', icon: BookOpen },
  { href: '#kuis', label: 'Kuis', icon: Sparkles },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-xl py-3 shadow-soft dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <a key={item.href} href={item.href} className="inline-flex flex-col items-center gap-1 rounded-3xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <Icon size={18} />
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
