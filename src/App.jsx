import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, RotateCcw, Trash2, History } from 'lucide-react'
import useCounter from './useCounter.js'
import useTheme from './useTheme.js'
import ThemeToggle from './ThemeToggle.jsx'
import images from './images.js'

const STEPS = [1, 5, 10, 100]

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  return `${h}h ago`
}

export default function App() {
  const { count, step, setStep, history, increment, decrement, reset, clearHistory } = useCounter()
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-20"
        style={{ backgroundImage: `url(${images.home.counter.background})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white dark:from-slate-950/60 dark:via-slate-950/80 dark:to-slate-950" />

      {/* Floating theme toggle */}
      <div className="absolute right-5 top-5 z-20">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-5 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Counter</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A simple, persistent counter. Pick a step and tap away.
          </p>
        </header>

        {/* Counter card */}
        <section className="w-full rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={count}
                initial={{ y: 18, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -18, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`text-7xl font-black tabular-nums sm:text-8xl ${
                  count > 0
                    ? 'text-emerald-600 dark:text-emerald-300'
                    : count < 0
                    ? 'text-rose-600 dark:text-rose-300'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {count}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={decrement}
                aria-label="Decrement"
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/90 text-white shadow-lg transition hover:bg-rose-500"
              >
                <Minus className="h-7 w-7" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92, rotate: -180 }}
                onClick={reset}
                aria-label="Reset"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <RotateCcw className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={increment}
                aria-label="Increment"
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/90 text-white shadow-lg transition hover:bg-emerald-500"
              >
                <Plus className="h-7 w-7" />
              </motion.button>
            </div>
          </div>

          {/* Step selector */}
          <div className="mt-8">
            <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Step size
            </p>
            <div className="flex justify-center gap-2">
              {STEPS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`min-w-12 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    step === s
                      ? 'bg-indigo-500 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mt-6 w-full rounded-3xl border border-slate-200 bg-white/70 p-5 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <History className="h-4 w-4" /> History
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">No actions yet.</p>
          ) : (
            <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {history.map((h) => (
                  <motion.li
                    key={h.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between rounded-xl bg-slate-100/70 px-3 py-2 text-sm dark:bg-white/5"
                  >
                    <span
                      className={`font-semibold ${
                        h.label === 'reset'
                          ? 'text-slate-500 dark:text-slate-400'
                          : h.label.startsWith('+')
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-rose-600 dark:text-rose-300'
                      }`}
                    >
                      {h.label}
                    </span>
                    <span className="tabular-nums text-slate-600 dark:text-slate-300">= {h.value}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{timeAgo(h.at)}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>

        <footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          Your count is saved automatically in this browser.
        </footer>
      </main>
    </div>
  )
}
