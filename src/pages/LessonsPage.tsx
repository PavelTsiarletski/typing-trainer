import { Link } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { useSettings } from '../store/useSettings'
import { useScores } from '../store/useScores'
import { getLessons } from '../data/lessons'
import type { Lesson } from '../types'

export function LessonsPage() {
  const t = useT()
  const contentLang = useSettings((s) => s.contentLang)
  const completed = useScores((s) => s.completedLessons)
  const lessons = getLessons(contentLang)

  // Group lessons by their `group` field, preserving order.
  const groups: { name: string; lessons: Lesson[] }[] = []
  for (const lesson of lessons) {
    let g = groups.find((x) => x.name === lesson.group)
    if (!g) {
      g = { name: lesson.group, lessons: [] }
      groups.push(g)
    }
    g.lessons.push(lesson)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.lessonsTitle}</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        {t.lessonsIntro}
      </p>

      <div className="mt-8 flex flex-col gap-8">
        {groups.map((group) => (
          <section key={group.name}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {group.name}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.lessons.map((lesson) => {
                const done = completed.includes(lesson.id)
                return (
                  <Link
                    key={lesson.id}
                    to={`/lessons/${lesson.id}`}
                    className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800"
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {lesson.title}
                      </div>
                      <div className="mt-1 truncate font-mono text-xs text-slate-400">
                        {lesson.text.slice(0, 28)}…
                      </div>
                    </div>
                    {done ? (
                      <span className="ml-3 shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                        ✓ {t.lessonCompleted}
                      </span>
                    ) : (
                      <span className="ml-3 shrink-0 text-indigo-500 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
