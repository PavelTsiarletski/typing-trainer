import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Keystroke, RunResult } from '../types'
import { computeResult, liveWpm } from '../lib/metrics'

export type CharStatus = 'pending' | 'correct' | 'incorrect'
export type EngineStatus = 'idle' | 'running' | 'finished'

export interface UseTypingEngineOptions {
  /** The text the user must type. */
  text: string
  /** When set, the run ends after this many seconds (timed test mode). */
  timeLimitSec?: number
  /** Called once when the run finishes, with the final metrics. */
  onFinish?: (result: RunResult) => void
}

export interface TypingEngine {
  status: EngineStatus
  /** Index of the next character to type. */
  cursor: number
  /** Per-character status, same length as `text`. */
  charStatuses: CharStatus[]
  /** The next character expected (for keyboard highlighting). */
  nextChar: string | undefined
  /** Milliseconds elapsed since the first keystroke. */
  elapsedMs: number
  /** Seconds left in timed mode, or undefined in fixed mode. */
  remainingSec: number | undefined
  /** Running words-per-minute estimate. */
  currentWpm: number
  /** Running accuracy, 0..1. */
  currentAccuracy: number
  /** Incorrect keystrokes so far. */
  errors: number
  /** Feed a keydown event into the engine. */
  handleKeyDown: (e: { key: string; preventDefault: () => void }) => void
  /** Reset back to idle, ready for another run. */
  reset: () => void
}

function freshStatuses(length: number): CharStatus[] {
  return Array.from({ length }, () => 'pending')
}

/**
 * Headless typing engine. Owns the keystroke log, cursor, timer and live
 * metrics; rendering and key capture are left to the component using it.
 *
 * Advancing is forgiving (Ratatype-style): a wrong key still moves the cursor
 * forward and is recorded as a mistake; Backspace walks back to let the user
 * correct the highlighted text. Every keystroke counts toward accuracy.
 *
 * All mutation happens imperatively inside the (single-fire) key handler via
 * refs — never inside a setState updater — so React StrictMode's double
 * invocation of updaters can't double-count keystrokes.
 */
export function useTypingEngine({
  text,
  timeLimitSec,
  onFinish,
}: UseTypingEngineOptions): TypingEngine {
  const [status, setStatus] = useState<EngineStatus>('idle')
  const [cursor, setCursor] = useState(0)
  const [charStatuses, setCharStatuses] = useState<CharStatus[]>(() =>
    freshStatuses(text.length),
  )
  const [elapsedMs, setElapsedMs] = useState(0)
  // Bumped on every keystroke so derived metrics recompute on render.
  const [, setTick] = useState(0)

  // Synchronous source of truth, immune to StrictMode updater double-calls.
  const cursorRef = useRef(0)
  const statusesRef = useRef<CharStatus[]>(freshStatuses(text.length))
  const keystrokesRef = useRef<Keystroke[]>([])
  const startTimeRef = useRef<number | null>(null)
  const finishedRef = useRef(false)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  const resetState = useCallback(() => {
    cursorRef.current = 0
    statusesRef.current = freshStatuses(text.length)
    keystrokesRef.current = []
    startTimeRef.current = null
    finishedRef.current = false
    setStatus('idle')
    setCursor(0)
    setCharStatuses(statusesRef.current)
    setElapsedMs(0)
    setTick((t) => t + 1)
  }, [text])

  // Reset everything whenever the target text changes.
  useEffect(() => {
    resetState()
  }, [resetState])

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    const start = startTimeRef.current ?? Date.now()
    const duration = Date.now() - start
    setElapsedMs(duration)
    setStatus('finished')
    const result = computeResult(keystrokesRef.current, duration)
    onFinishRef.current?.(result)
  }, [])

  // Tick the clock while running (drives live WPM + the countdown).
  useEffect(() => {
    if (status !== 'running') return
    const interval = setInterval(() => {
      const start = startTimeRef.current
      if (start == null) return
      const elapsed = Date.now() - start
      setElapsedMs(elapsed)
      if (timeLimitSec != null && elapsed >= timeLimitSec * 1000) {
        finish()
      }
    }, 100)
    return () => clearInterval(interval)
  }, [status, timeLimitSec, finish])

  const handleKeyDown = useCallback(
    (e: { key: string; preventDefault: () => void }) => {
      if (finishedRef.current) return

      // Backspace: walk the cursor back and clear that slot.
      if (e.key === 'Backspace') {
        e.preventDefault()
        const c = cursorRef.current
        if (c === 0) return
        const prev = c - 1
        cursorRef.current = prev
        statusesRef.current = statusesRef.current.map((s, i) =>
          i === prev ? 'pending' : s,
        )
        setCursor(prev)
        setCharStatuses(statusesRef.current)
        return
      }

      // Only printable single characters advance the run.
      if (e.key.length !== 1) return
      e.preventDefault()

      const c = cursorRef.current
      if (c >= text.length) return

      // First keystroke starts the clock.
      if (startTimeRef.current == null) {
        startTimeRef.current = Date.now()
        setStatus('running')
      }

      const expected = text[c]
      const correct = e.key === expected
      keystrokesRef.current.push({
        expected,
        typed: e.key,
        correct,
        at: Date.now() - (startTimeRef.current ?? Date.now()),
      })

      const advanced = c + 1
      cursorRef.current = advanced
      statusesRef.current = statusesRef.current.map((s, i) =>
        i === c ? (correct ? 'correct' : 'incorrect') : s,
      )
      setCursor(advanced)
      setCharStatuses(statusesRef.current)
      setTick((t) => t + 1)

      // In fixed mode, reaching the end finishes the run.
      if (timeLimitSec == null && advanced >= text.length) {
        finish()
      }
    },
    [text, timeLimitSec, finish],
  )

  const correctChars = useMemo(
    () => charStatuses.filter((s) => s === 'correct').length,
    [charStatuses],
  )
  const total = keystrokesRef.current.length
  const errors = total - keystrokesRef.current.filter((k) => k.correct).length

  // Suppress the wild first-fraction-of-a-second spike before real time accrues.
  const currentWpm = elapsedMs < 1000 ? 0 : liveWpm(correctChars, elapsedMs)
  const currentAccuracy = total > 0 ? correctChars / total : 1

  const remainingSec =
    timeLimitSec != null
      ? Math.max(0, Math.ceil(timeLimitSec - elapsedMs / 1000))
      : undefined

  return {
    status,
    cursor,
    charStatuses,
    nextChar: text[cursor],
    elapsedMs,
    remainingSec,
    currentWpm,
    currentAccuracy,
    errors,
    handleKeyDown,
    reset: resetState,
  }
}
