import { useEffect } from "react"

export default function HeartbeatLoader({ onFinish }: { onFinish?: () => void }){
  useEffect(()=>{
    const t = setTimeout(()=> onFinish && onFinish(), 1800)
    return ()=> clearTimeout(t)
  },[]) 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg">
        <svg width="120" height="40" viewBox="0 0 120 40">
          <polyline points="0,20 20,20 30,5 40,35 50,20 90,20 100,5 110,30 120,20" fill="none" stroke="#FF4D6D" strokeWidth="3" className="monitor-line" />
        </svg>
        <div>
          <div className="font-semibold">Memuat…</div>
          <div className="text-sm text-slate-500">Sedang menyiapkan pengalaman interaktif</div>
        </div>
      </div>
    </div>
  )
}
