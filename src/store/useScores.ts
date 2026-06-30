import { create } from 'zustand'
import type { Lang, RunResult, ScoreRecord } from '../types'
import { STORAGE_KEYS, readJSON, writeJSON } from '../lib/storage'

interface AddScoreInput extends RunResult {
  lang: Lang
  mode: ScoreRecord['mode']
  label: string
}

interface ScoresState {
  scores: ScoreRecord[]
  completedLessons: string[]
  /** Adds a finished run; returns true if it set a new personal-best WPM. */
  addScore: (input: AddScoreInput) => boolean
  markLessonCompleted: (lessonId: string) => void
  clearHistory: () => void
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`
}

export const useScores = create<ScoresState>((set, get) => ({
  scores: readJSON<ScoreRecord[]>(STORAGE_KEYS.scores, []),
  completedLessons: readJSON<string[]>(STORAGE_KEYS.completedLessons, []),

  addScore: (input) => {
    const prevBest = Math.max(0, ...get().scores.map((s) => s.wpm))
    const record: ScoreRecord = {
      ...input,
      id: makeId(),
      date: Date.now(),
    }
    const scores = [record, ...get().scores]
    set({ scores })
    writeJSON(STORAGE_KEYS.scores, scores)
    return input.wpm > prevBest
  },

  markLessonCompleted: (lessonId) => {
    if (get().completedLessons.includes(lessonId)) return
    const completedLessons = [...get().completedLessons, lessonId]
    set({ completedLessons })
    writeJSON(STORAGE_KEYS.completedLessons, completedLessons)
  },

  clearHistory: () => {
    set({ scores: [], completedLessons: [] })
    writeJSON(STORAGE_KEYS.scores, [])
    writeJSON(STORAGE_KEYS.completedLessons, [])
  },
}))
