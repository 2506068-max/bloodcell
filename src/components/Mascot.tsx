type MascotProps = {
  section: string
}

export default function Mascot({ section }: MascotProps) {
  return (
    <div
      className="fixed bottom-24 right-6 z-50 text-6xl animate-bounce"
      title={`Section: ${section}`}
    >
      🩸
    </div>
  )
}