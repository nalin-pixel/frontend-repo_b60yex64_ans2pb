import { motion, AnimatePresence } from 'framer-motion'

export default function Display({ value, history }) {
  return (
    <div className="rounded-2xl bg-black/30 border border-white/10 p-4 md:p-6 text-right text-white space-y-2">
      <div className="text-xs md:text-sm text-white/60 tracking-wide h-5">
        <AnimatePresence mode="wait">
          <motion.span
            key={history}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="inline-block"
          >
            {history}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="text-3xl md:text-5xl font-bold tabular-nums leading-tight">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
