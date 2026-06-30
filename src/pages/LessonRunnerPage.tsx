import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { useSettings } from '../store/useSettings'
import { useScores } from '../store/useScores'
import { getLesson } from '../data/lessons'
import { TypingSession } from '../components/TypingSession'

export function LessonRunnerPage() {
  const t = useT()
  const navigate = useNavigate()
  const { lessonId = '' } = useParams()
  const contentLang = useSettings((s) => s.contentLang)
  const markCompleted = useScores((s) => s.markLessonCompleted)

  const lesson = getLesson(contentLang, lessonId)

  const handleFinish = useCallback(() => {
    markCompleted(lessonId)
  }, [markCompleted, lessonId])

  const goBack = useCallback(() => navigate('/lessons'), [navigate])

  if (!lesson) {
    return (
      <div className="text-center">
        <p className="text-slate-600 dark:text-slate-300">
          {/* Lesson not found in the current content language. */}
          404
        </p>
        <Link to="/lessons" className="mt-4 inline-block text-indigo-600">
          ← {t.backToLessons}
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/lessons"
            className="text-sm text-slate-500 hover:text-indigo-600"
          >
            ← {t.backToLessons}
          </Link>
          <h1 className="mt-1 text-2xl font-bold">{lesson.title}</h1>
        </div>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {lesson.group}
        </span>
      </div>

      <TypingSession
        text={lesson.text}
        contentLang={contentLang}
        mode="lesson"
        label={lesson.title}
        onFinish={handleFinish}
        secondaryLabel={t.backToLessons}
        onSecondary={goBack}
      />
    </div>
  )
}
