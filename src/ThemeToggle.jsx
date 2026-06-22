import { Sun, Moon, Monitor } from 'lucide-react'
import { motion } from 'framer-motion'

const OPTIONS = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'dark', label: 'Dark', Icon: Moon },
]

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="relative flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full"
          >
            {active && (
              <motion.span
                layoutId="theme-toggle-active"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute inset-0 rounded-full bg-indigo-500 shadow"
              />
            )}
            <Icon
              className={`relative h-4 w-4 transition ${
                active
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
