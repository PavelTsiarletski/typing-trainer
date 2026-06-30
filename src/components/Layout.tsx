import { NavLink, Outlet } from 'react-router-dom'
import { useT } from '../i18n/useT'
import { LanguageSwitcher } from './LanguageSwitcher'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-indigo-600 text-white'
      : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700',
  ].join(' ')

export function Layout() {
  const t = useT()
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-800/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="./keyboard.svg" alt="" className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight">
              {t.appName}
            </span>
          </NavLink>

          <nav className="order-3 flex w-full justify-center gap-1 sm:order-2 sm:w-auto">
            <NavLink to="/lessons" className={navItemClass}>
              {t.navLessons}
            </NavLink>
            <NavLink to="/test" className={navItemClass}>
              {t.navTest}
            </NavLink>
            <NavLink to="/practice" className={navItemClass}>
              {t.navPractice}
            </NavLink>
            <NavLink to="/progress" className={navItemClass}>
              {t.navProgress}
            </NavLink>
          </nav>

          <div className="order-2 sm:order-3">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-slate-400">
        {t.appName} · {t.tagline}
      </footer>
    </div>
  )
}
