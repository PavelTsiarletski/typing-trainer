import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LessonsPage } from './pages/LessonsPage'
import { LessonRunnerPage } from './pages/LessonRunnerPage'
import { SpeedTestPage } from './pages/SpeedTestPage'
import { PracticePage } from './pages/PracticePage'
import { ProgressPage } from './pages/ProgressPage'

/**
 * HashRouter keeps deep links working on any static host (GitHub Pages,
 * file://, etc.) without server-side rewrite rules.
 */
export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="lessons/:lessonId" element={<LessonRunnerPage />} />
          <Route path="test" element={<SpeedTestPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
