const particles = Array.from({ length: 30 }).map((_, index) => ({
  id: index,
  left: Math.random() * 100,
  delay: Math.random() * 1.5,
  hue: 300 + Math.random() * 100,
  size: 6 + Math.random() * 8,
  rotate: Math.random() * 360,
}))

export default function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute block rounded-full bg-gradient-to-br from-primary to-secondary opacity-90"
          style={{
            left: `${particle.left}%`,
            top: `${-8 + Math.random() * 10}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `confettiFall 1.8s ease-out ${particle.delay}s forwards`,
            transform: `rotate(${particle.rotate}deg)`,
            background: `hsl(${particle.hue}, 90%, 64%)`,
          }}
        />
      ))}
    </div>
  )
}
