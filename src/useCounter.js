import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'counter-app-state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default function useCounter() {
  const initial = loadState()
  const [count, setCount] = useState(initial?.count ?? 0)
  const [step, setStep] = useState(initial?.step ?? 1)
  const [history, setHistory] = useState(initial?.history ?? [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, step, history }))
    } catch {
      /* ignore */
    }
  }, [count, step, history])

  const pushHistory = useCallback((label, value) => {
    setHistory((h) => [{ id: Date.now() + Math.random(), label, value, at: Date.now() }, ...h].slice(0, 30))
  }, [])

  const increment = useCallback(() => {
    setCount((c) => {
      const next = c + step
      pushHistory(`+${step}`, next)
      return next
    })
  }, [step, pushHistory])

  const decrement = useCallback(() => {
    setCount((c) => {
      const next = c - step
      pushHistory(`-${step}`, next)
      return next
    })
  }, [step, pushHistory])

  const reset = useCallback(() => {
    setCount(0)
    pushHistory('reset', 0)
  }, [pushHistory])

  const clearHistory = useCallback(() => setHistory([]), [])

  return { count, step, setStep, history, increment, decrement, reset, clearHistory }
}
