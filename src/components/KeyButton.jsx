import { motion } from 'framer-motion'

const base =
  'select-none rounded-xl text-lg md:text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors'

export default function KeyButton({
  children,
  variant = 'neutral',
  className = '',
  onClick,
}) {
  const colors = {
    neutral:
      'bg-white/10 hover:bg-white/20 text-white shadow-inner shadow-white/10 backdrop-blur',
    accent:
      'bg-gradient-to-br from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30',
    action:
      'bg-white/20 hover:bg-white/30 text-white shadow-inner shadow-white/10',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`${base} ${colors[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
