import { useState } from 'react'
import { useT } from '../i18n/useT'
import { useSettings } from '../store/useSettings'
import { getTexts } from '../data/texts'
import { TypingSession } from '../components/TypingSession'

const DURATIONS = [15, 30, 60] as const

/** Build a body of text long enough that even a very fast typist won't run out. */
function buildTestText(texts: string[], seconds: number): string {
  // Budget ~6 chars per "fast" word, 200 wpm ceiling, plus headroom.
  const targetChars = (200 / 60) * seconds * 6 + 400
  let out = ''
  let i = 0
  while (out.length < targetChars) {
    out += (out ? ' ' : '') + texts[i % texts.length]
    i++
  }
  return out
}

export function SpeedTestPage() {
  const t = useT()
  const contentLang = useSettings((s) => s.contentLang)
  const [duration, setDuration] = useState<number>(60)
  const [runKey, setRunKey] = useState(0)

  // Recomputed only when this page re-renders (duration / lang / new attempt);
  // the child TypingSession owns the per-keystroke state, so this stays cheap.
  const texts = getTexts(contentLang)
  const text = buildTestText(texts, duration)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.testTitle}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t.testIntro}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">{t.duration}:</span>
          <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDuration(d)
                  setRunKey((k) => k + 1)
                }}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  duration === d
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {d} {t.seconds}
              </button>
            ))}
          </div>
        </div>
      </div>

      <TypingSession
        key={`${contentLang}-${duration}-${runKey}`}
        text={text}
        contentLang={contentLang}
        timeLimitSec={duration}
        mode="test"
        label={`${duration} ${t.seconds}`}
        runKey={runKey}
      />
    </div>
  )
}
