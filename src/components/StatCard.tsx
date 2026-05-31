import { motion } from 'framer-motion'

interface StatCardProps {
  icon: string
  title: string
  value: string
  description: string
  delay?: number
}

export default function StatCard({ icon, title, value, description, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="card-glass"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gradient mb-2">{title}</h3>
      <p className="text-2xl font-display font-bold text-text-dark mb-2">{value}</p>
      <p className="text-text-muted text-sm">{description}</p>
    </motion.div>
  )
}
