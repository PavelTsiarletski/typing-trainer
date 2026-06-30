export type Lang = 'ru' | 'en'

/** Which of the ten fingers presses a key — drives keyboard colouring. */
export type Finger =
  | 'l-pinky'
  | 'l-ring'
  | 'l-middle'
  | 'l-index'
  | 'thumb'
  | 'r-index'
  | 'r-middle'
  | 'r-ring'
  | 'r-pinky'

/** A single keystroke recorded while the user types. */
export interface Keystroke {
  /** Character the user was expected to type. */
  expected: string
  /** Character the user actually typed. */
  typed: string
  correct: boolean
  /** ms since the run started. */
  at: number
}

/** Final metrics for a completed run. */
export interface RunResult {
  /** Words per minute (chars / 5 / minutes). */
  wpm: number
  /** Characters per minute. */
  cpm: number
  /** Share of correct keystrokes, 0..1. */
  accuracy: number
  /** Total keystrokes the user made. */
  totalKeystrokes: number
  /** Number of incorrect keystrokes. */
  errors: number
  /** Number of correctly typed characters. */
  correctChars: number
  /** Duration of the run, in milliseconds. */
  durationMs: number
  /** Per-character mistakes, keyed by the expected char. */
  mistakesByChar: Record<string, number>
}

/** A persisted record of one finished run. */
export interface ScoreRecord extends RunResult {
  id: string
  /** epoch ms. */
  date: number
  lang: Lang
  mode: 'lesson' | 'test' | 'practice'
  /** Lesson id, test duration label, or practice source — for display. */
  label: string
}

/** A typing lesson: focused on a set of characters. */
export interface Lesson {
  id: string
  lang: Lang
  /** Group the lesson belongs to (home row, top row, etc.). */
  group: string
  title: string
  /** The text the user must type for this lesson. */
  text: string
}
