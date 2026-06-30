import type { Lang } from '../types'
import { useSettings } from '../store/useSettings'
import { useT } from '../i18n/useT'

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: Lang
  onChange: (lang: Lang) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500">{label}</span>
      <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
        {(['ru', 'en'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => onChange(lang)}
            className={`px-2.5 py-1 text-sm font-medium transition-colors ${
              value === lang
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Two toggles: one for the interface language, one for the typing content. */
export function LanguageSwitcher() {
  const t = useT()
  const uiLang = useSettings((s) => s.uiLang)
  const contentLang = useSettings((s) => s.contentLang)
  const setUiLang = useSettings((s) => s.setUiLang)
  const setContentLang = useSettings((s) => s.setContentLang)

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle label={t.uiLanguage} value={uiLang} onChange={setUiLang} />
      <Toggle
        label={t.contentLanguage}
        value={contentLang}
        onChange={setContentLang}
      />
    </div>
  )
}
