import { useState } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import KeyButton from './components/KeyButton'
import Display from './components/Display'

function App() {
  const [value, setValue] = useState('0')
  const [history, setHistory] = useState('')
  const [operator, setOperator] = useState(null)
  const [stack, setStack] = useState(null)
  const [justEvaluated, setJustEvaluated] = useState(false)

  const inputDigit = (d) => {
    setValue((prev) => {
      if (justEvaluated) {
        setJustEvaluated(false)
        return d
      }
      if (prev === '0') return d
      return prev + d
    })
  }

  const inputDot = () => {
    setValue((prev) => (prev.includes('.') ? prev : prev + '.'))
  }

  const clearAll = () => {
    setValue('0')
    setHistory('')
    setOperator(null)
    setStack(null)
    setJustEvaluated(false)
  }

  const toggleSign = () => {
    setValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev))
  }

  const percent = () => {
    setValue((prev) => String(parseFloat(prev) / 100))
  }

  const setOp = (op) => {
    setJustEvaluated(false)
    if (operator && stack !== null) {
      // chain operation
      const res = compute(stack, parseFloat(value), operator)
      setStack(res)
      setValue('0')
      setOperator(op)
      setHistory(`${res} ${op}`)
    } else {
      setStack(parseFloat(value))
      setValue('0')
      setOperator(op)
      setHistory(`${parseFloat(value)} ${op}`)
    }
  }

  const equals = () => {
    if (operator && stack !== null) {
      const res = compute(stack, parseFloat(value), operator)
      setValue(String(trimNumber(res)))
      setHistory(`${stack} ${operator} ${value} =`)
      setOperator(null)
      setStack(null)
      setJustEvaluated(true)
    }
  }

  const compute = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b
      case '−':
        return a - b
      case '×':
        return a * b
      case '÷':
        return b === 0 ? NaN : a / b
      default:
        return b
    }
  }

  const trimNumber = (num) => {
    const str = String(num)
    if (!str.includes('.')) return num
    return parseFloat(Number(num).toFixed(10))
  }

  const keys = [
    { label: 'C', variant: 'action', onClick: clearAll },
    { label: '+/−', variant: 'action', onClick: toggleSign },
    { label: '%', variant: 'action', onClick: percent },
    { label: '÷', variant: 'accent', onClick: () => setOp('÷') },

    { label: '7', onClick: () => inputDigit('7') },
    { label: '8', onClick: () => inputDigit('8') },
    { label: '9', onClick: () => inputDigit('9') },
    { label: '×', variant: 'accent', onClick: () => setOp('×') },

    { label: '4', onClick: () => inputDigit('4') },
    { label: '5', onClick: () => inputDigit('5') },
    { label: '6', onClick: () => inputDigit('6') },
    { label: '−', variant: 'accent', onClick: () => setOp('−') },

    { label: '1', onClick: () => inputDigit('1') },
    { label: '2', onClick: () => inputDigit('2') },
    { label: '3', onClick: () => inputDigit('3') },
    { label: '+', variant: 'accent', onClick: () => setOp('+') },

    { label: '0', className: 'col-span-2', onClick: () => setValue((p) => (p === '0' ? '0' : p + '0')) },
    { label: '.', onClick: inputDot },
    { label: '=', variant: 'accent', onClick: equals },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0a0f] via-[#0b0b12] to-[#0e0e18] text-white">
      {/* Hero with Spline */}
      <div className="relative h-[42vh] sm:h-[50vh] md:h-[56vh]">
        <Spline scene="https://prod.spline.design/sHDPSbszZja1qap3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b12]/40 to-[#0e0e18]" />
        <div className="absolute inset-0 flex items-end justify-center pb-6 md:pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent"
          >
            NeoCalc
          </motion.h1>
        </div>
      </div>

      {/* Calculator */}
      <div className="px-4 md:px-6 -mt-16 md:-mt-24">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6 shadow-2xl shadow-indigo-500/10">
          <Display value={value} history={history} />

          <div className="mt-4 grid grid-cols-4 gap-3 md:gap-4">
            {keys.map((k, i) => (
              <KeyButton key={i} variant={k.variant || 'neutral'} className={`py-4 md:py-5 ${k.className || ''}`} onClick={k.onClick}>
                {k.label}
              </KeyButton>
            ))}
          </div>
        </div>

        <footer className="mx-auto max-w-md text-center text-white/50 text-xs md:text-sm py-6">
          A fresh, modern calculator with smooth interactions.
        </footer>
      </div>
    </div>
  )
}

export default App
