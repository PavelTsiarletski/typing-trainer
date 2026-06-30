import type { RunResult } from '../types'
import { useT } from '../i18n/useT'
import { formatAccuracy } from '../lib/metrics'

interface ResultsCardProps {
  result: RunResult
  isRecord: boolean
  onRetry: () => void
  /** Optional secondary action (e.g. "Back to lessons"). */
  secondaryLabel?: string
  onSecondary?: () => void
}

function BigStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-slate-50 px-6 py-4 dark:bg-slate-700/40">
      <span className="text-4xl font-extrabold tabular-nums text-indigo-600 dark:text-indigo-300">
        {value}
      </span>
      <span className="mt-1 text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>
    </div>
  )
}

/** Summary shown when a run finishes. */
export function ResultsCard({
  result,
  isRecord,
  onRetry,
  secondaryLabel,
  onSecondary,
}: ResultsCardProps) {
  const t = useT()

  const mistakes = Object.entries(result.mistakesByChar)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-slate-800 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        {t.resultsTitle}
      </h2>

      {isRecord && (
        <p className="mt-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
          🏆 {t.newRecord}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <BigStat value={result.wpm} label={t.wpm} />
        <BigStat value={result.cpm} label={t.cpm} />
        <BigStat value={formatAccuracy(result.accuracy)} label={t.accuracy} />
        <BigStat value={result.errors} label={t.errors} />
      </div>

      <div className="mt-6 text-left">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {t.topMistakes}
        </h3>
        {mistakes.length === 0 ? (
          <p className="mt-2 text-sm text-emerald-600">{t.noMistakes}</p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {mistakes.map(([char, count]) => (
              <span
                key={char}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 font-mono text-sm text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
              >
                <span className="font-bold">
                  {char === ' ' ? '␣' : char}
                </span>
                <span className="text-xs opacity-70">×{count}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-indigo-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          {t.tryAgain}
        </button>
        {secondaryLabel && onSecondary && (
          <button
            type="button"
            onClick={onSecondary}
            className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  )
}
