import { useState } from 'react'
import { useT } from '../i18n/useT'
import { useSettings } from '../store/useSettings'
import { getTextByIndex, getTexts } from '../data/texts'
import { TypingSession } from '../components/TypingSession'

export function PracticePage() {
  const t = useT()
  const contentLang = useSettings((s) => s.contentLang)
  const [index, setIndex] = useState(0)

  const text = getTextByIndex(contentLang, index)
  const total = getTexts(contentLang).length

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.practiceTitle}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {t.practiceIntro}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          ⤳ {t.newText}
        </button>
      </div>

      <TypingSession
        key={`${contentLang}-${index}`}
        text={text}
        contentLang={contentLang}
        mode="practice"
        label={t.practiceTitle}
        runKey={index}
      />
    </div>
  )
}
