import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface MenuCardProps {
  icon: string
  title: string
  description: string
  link: string
  color: 'primary' | 'secondary' | 'accent'
  delay?: number
}

export default function MenuCard({ icon, title, description, link, color, delay = 0 }: MenuCardProps) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 border-primary/20 hover:border-primary/50',
    secondary: 'from-secondary/20 to-secondary/5 border-secondary/20 hover:border-secondary/50',
    accent: 'from-accent/20 to-accent/5 border-accent/20 hover:border-accent/50',
  }

  return (
    <Link to={link}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -12, scale: 1.02 }}
        className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-8 border backdrop-blur-md cursor-pointer group h-full transition-all duration-300`}
      >
        <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-text-dark mb-3 group-hover:text-gradient transition-all">
          {title}
        </h3>
        <p className="text-text-muted mb-4">{description}</p>
        <motion.div
          className="flex items-center text-primary font-semibold group-hover:gap-2 gap-1 transition-all"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <span>Pelajari Lebih</span>
          <span>→</span>
        </motion.div>
      </motion.div>
    </Link>
  )
}
