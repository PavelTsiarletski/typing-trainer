/** Centralised localStorage keys + safe JSON helpers (SSR / private-mode safe). */

export const STORAGE_KEYS = {
  settings: 'tt:settings',
  scores: 'tt:scores',
  completedLessons: 'tt:completed-lessons',
} as const

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Quota exceeded or storage disabled — nothing we can do, fail silently.
  }
}
