import type { Keystroke, RunResult } from '../types'

/** Standard "word" length used by WPM the world over. */
const CHARS_PER_WORD = 5

/**
 * Compute typing metrics from the raw keystroke log of a single run.
 *
 * WPM uses the classic (chars / 5) / minutes formula on *correctly* typed
 * characters, which is how Ratatype, Monkeytype and friends report net speed.
 * CPM is correct characters per minute. Accuracy is correct keystrokes over
 * all keystrokes (so fixing a typo still costs you, just like real life).
 */
export function computeResult(
  keystrokes: Keystroke[],
  durationMs: number,
): RunResult {
  const totalKeystrokes = keystrokes.length
  const correctChars = keystrokes.filter((k) => k.correct).length
  const errors = totalKeystrokes - correctChars

  const minutes = durationMs / 1000 / 60
  // Guard against division by zero for instant / empty runs.
  const safeMinutes = minutes > 0 ? minutes : 1 / 60

  const wpm = correctChars / CHARS_PER_WORD / safeMinutes
  const cpm = correctChars / safeMinutes
  const accuracy = totalKeystrokes > 0 ? correctChars / totalKeystrokes : 0

  const mistakesByChar: Record<string, number> = {}
  for (const k of keystrokes) {
    if (!k.correct) {
      mistakesByChar[k.expected] = (mistakesByChar[k.expected] ?? 0) + 1
    }
  }

  return {
    wpm: round(wpm),
    cpm: round(cpm),
    accuracy: round(accuracy, 4),
    totalKeystrokes,
    errors,
    correctChars,
    durationMs,
    mistakesByChar,
  }
}

/**
 * Live WPM while a run is in progress. Uses correct characters typed so far
 * over elapsed time. Returns 0 before any time has passed.
 */
export function liveWpm(correctChars: number, elapsedMs: number): number {
  const minutes = elapsedMs / 1000 / 60
  if (minutes <= 0) return 0
  return round(correctChars / CHARS_PER_WORD / minutes)
}

/** Round to `digits` decimal places (default 0). */
export function round(value: number, digits = 0): number {
  const f = 10 ** digits
  return Math.round(value * f) / f
}

/** Format a 0..1 accuracy ratio as a percentage string, e.g. 0.973 -> "97%". */
export function formatAccuracy(accuracy: number): string {
  return `${Math.round(accuracy * 100)}%`
}
