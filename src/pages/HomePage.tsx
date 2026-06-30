import { Link } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { useScores } from '../store/useScores'
import { useSettings } from '../store/useSettings'
import { getLessons } from '../data/lessons'

export function HomePage() {
  const t = useT()
  const scores = useScores((s) => s.scores)
  const completed = useScores((s) => s.completedLessons)
  const contentLang = useSettings((s) => s.contentLang)
  const totalLessons = getLessons(contentLang).length
  const bestWpm = scores.length ? Math.max(...scores.map((s) => s.wpm)) : 0

  return (
    <div className="flex flex-col items-center gap-10 py-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t.heroSubtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/lessons"
            className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow-md transition-colors hover:bg-indigo-500"
          >
            {t.startLessons}
          </Link>
          <Link
            to="/test"
            className="rounded-xl border border-slate-300 px-7 py-3 font-semibold text-slate-700 transition-colors hover:bg-white dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t.startTest}
          </Link>
        </div>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
            {bestWpm}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
            {t.bestWpm}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
            {completed.length}/{totalLessons}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
            {t.navLessons}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
            {scores.length}
          </div>
          <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
            {t.totalRuns}
          </div>
        </div>
      </div>
    </div>
  )
}
