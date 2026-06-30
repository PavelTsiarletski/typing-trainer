import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lang, RunResult, ScoreRecord } from '../types'
import { useTypingEngine } from '../hooks/useTypingEngine'
import { useScores } from '../store/useScores'
import { useT } from '../i18n/useT'
import { TypingArea } from './TypingArea'
import { VirtualKeyboard } from './VirtualKeyboard'
import { LiveStats } from './LiveStats'
import { ResultsCard } from './ResultsCard'

interface TypingSessionProps {
  text: string
  contentLang: Lang
  /** Timed mode (test): seconds before the run auto-finishes. */
  timeLimitSec?: number
  mode: ScoreRecord['mode']
  /** Human label stored with the score (lesson title, "60 sec", ...). */
  label: string
  /** Extra side-effect on finish, e.g. marking a lesson complete. */
  onFinish?: (result: RunResult) => void
  secondaryLabel?: string
  onSecondary?: () => void
  /** Re-mount key bump from the parent to force a brand-new run. */
  runKey?: number
}

/**
 * Self-contained typing run: captures keystrokes, shows the text, keyboard and
 * live stats, then a results card. Reused by lessons, the speed test and
 * free practice.
 */
export function TypingSession({
  text,
  contentLang,
  timeLimitSec,
  mode,
  label,
  onFinish,
  secondaryLabel,
  onSecondary,
  runKey,
}: TypingSessionProps) {
  const t = useT()
  const addScore = useScores((s) => s.addScore)
  const containerRef = useRef<HTMLDivElement>(null)
  const [focused, setFocused] = useState(false)
  const [result, setResult] = useState<RunResult | null>(null)
  const [isRecord, setIsRecord] = useState(false)

  const handleEngineFinish = useCallback(
    (r: RunResult) => {
      const record = addScore({ ...r, lang: contentLang, mode, label })
      setResult(r)
      setIsRecord(record)
      onFinish?.(r)
    },
    [addScore, contentLang, mode, label, onFinish],
  )

  const engine = useTypingEngine({
    text,
    timeLimitSec,
    onFinish: handleEngineFinish,
  })

  // Auto-focus the typing surface on mount and whenever a new run starts.
  useEffect(() => {
    setResult(null)
    setIsRecord(false)
    containerRef.current?.focus()
  }, [text, runKey])

  const restart = useCallback(() => {
    engine.reset()
    setResult(null)
    setIsRecord(false)
    containerRef.current?.focus()
  }, [engine])

  if (result) {
    return (
      <ResultsCard
        result={result}
        isRecord={isRecord}
        onRetry={restart}
        secondaryLabel={secondaryLabel}
        onSecondary={onSecondary}
      />
    )
  }

  const elapsedSec = Math.floor(engine.elapsedMs / 1000)

  return (
    <div className="flex flex-col gap-5">
      <LiveStats
        wpm={engine.currentWpm}
        accuracy={engine.currentAccuracy}
        errors={engine.errors}
        seconds={engine.remainingSec ?? elapsedSec}
        countdown={engine.remainingSec != null}
      />

      <div
        ref={containerRef}
        tabIndex={0}
        role="textbox"
        aria-label={t.typeTheText}
        onKeyDown={engine.handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => containerRef.current?.focus()}
        className="cursor-text rounded-2xl bg-white p-6 shadow-sm outline-none ring-indigo-400 focus:ring-2 dark:bg-slate-800 sm:p-8"
      >
        <TypingArea
          text={text}
          charStatuses={engine.charStatuses}
          cursor={engine.cursor}
          focused={focused}
          focusHint={t.clickToFocus}
        />
      </div>

      <VirtualKeyboard lang={contentLang} nextChar={engine.nextChar} />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={restart}
          className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          ↻ {t.restart}
        </button>
      </div>
    </div>
  )
}
