import { useT } from '../i18n/useT'
import { useScores } from '../store/useScores'
import { useSettings } from '../store/useSettings'
import { ProgressChart } from '../components/ProgressChart'
import { formatAccuracy, round } from '../lib/metrics'
import type { ScoreRecord } from '../types'

function modeLabel(mode: ScoreRecord['mode'], t: ReturnType<typeof useT>) {
  if (mode === 'lesson') return t.modeLesson
  if (mode === 'test') return t.modeTest
  return t.modePractice
}

export function ProgressPage() {
  const t = useT()
  const uiLang = useSettings((s) => s.uiLang)
  const scores = useScores((s) => s.scores)
  const clearHistory = useScores((s) => s.clearHistory)

  const best = scores.length ? Math.max(...scores.map((s) => s.wpm)) : 0
  const avg = scores.length
    ? round(scores.reduce((sum, s) => sum + s.wpm, 0) / scores.length)
    : 0

  // Chart wants oldest-first; scores are stored newest-first.
  const chartValues = [...scores].reverse().map((s) => s.wpm)

  const dateFmt = new Intl.DateTimeFormat(uiLang === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.progressTitle}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t.progressIntro}
          </p>
        </div>
        {scores.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t.confirmClear)) clearHistory()
            }}
            className="shrink-0 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-500/40 dark:hover:bg-rose-500/10"
          >
            {t.clearHistory}
          </button>
        )}
      </div>

      {scores.length === 0 ? (
        <p className="mt-12 text-center text-slate-400">{t.noHistory}</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                {best}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {t.bestWpm}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                {avg}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {t.avgWpm}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                {scores.length}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {t.totalRuns}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <ProgressChart values={chartValues} />
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">{t.date}</th>
                  <th className="px-4 py-3">{t.mode}</th>
                  <th className="px-4 py-3 text-right">{t.wpm}</th>
                  <th className="px-4 py-3 text-right">{t.accuracy}</th>
                  <th className="px-4 py-3 text-center">RU/EN</th>
                </tr>
              </thead>
              <tbody>
                {scores.slice(0, 50).map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-700/50"
                  >
                    <td className="px-4 py-2.5 text-slate-500">
                      {dateFmt.format(s.date)}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-slate-700 dark:text-slate-200">
                        {modeLabel(s.mode, t)}
                      </span>
                      <span className="ml-2 text-xs text-slate-400">
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-indigo-600 dark:text-indigo-300">
                      {s.wpm}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                      {formatAccuracy(s.accuracy)}
                    </td>
                    <td className="px-4 py-2.5 text-center text-xs font-medium uppercase text-slate-400">
                      {s.lang}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
