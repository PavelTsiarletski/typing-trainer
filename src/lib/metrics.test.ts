import { describe, it, expect } from 'vitest'
import { computeResult, liveWpm, formatAccuracy, round } from './metrics'
import type { Keystroke } from '../types'

function ks(expected: string, typed: string, at: number): Keystroke {
  return { expected, typed, correct: expected === typed, at }
}

describe('computeResult', () => {
  it('computes WPM from correct chars over one minute', () => {
    // 100 correct chars in 60s -> 100/5 = 20 wpm.
    const keystrokes: Keystroke[] = Array.from({ length: 100 }, (_, i) =>
      ks('a', 'a', i),
    )
    const r = computeResult(keystrokes, 60_000)
    expect(r.wpm).toBe(20)
    expect(r.cpm).toBe(100)
    expect(r.accuracy).toBe(1)
    expect(r.errors).toBe(0)
  })

  it('only counts correct characters toward speed', () => {
    // 50 correct + 50 wrong in 60s -> 50/5 = 10 wpm, 50% accuracy.
    const keystrokes: Keystroke[] = [
      ...Array.from({ length: 50 }, (_, i) => ks('a', 'a', i)),
      ...Array.from({ length: 50 }, (_, i) => ks('a', 'b', i + 50)),
    ]
    const r = computeResult(keystrokes, 60_000)
    expect(r.wpm).toBe(10)
    expect(r.accuracy).toBe(0.5)
    expect(r.errors).toBe(50)
    expect(r.correctChars).toBe(50)
  })

  it('aggregates mistakes per expected character', () => {
    const keystrokes: Keystroke[] = [
      ks('a', 'a', 0),
      ks('b', 'x', 1),
      ks('b', 'y', 2),
      ks('c', 'z', 3),
    ]
    const r = computeResult(keystrokes, 1000)
    expect(r.mistakesByChar).toEqual({ b: 2, c: 1 })
    expect(r.errors).toBe(3)
  })

  it('handles an empty run without dividing by zero', () => {
    const r = computeResult([], 0)
    expect(r.wpm).toBe(0)
    expect(r.cpm).toBe(0)
    expect(r.accuracy).toBe(0)
    expect(Number.isFinite(r.wpm)).toBe(true)
  })

  it('scales WPM with shorter durations', () => {
    // 50 correct chars in 30s -> 50/5 / 0.5min = 20 wpm.
    const keystrokes: Keystroke[] = Array.from({ length: 50 }, (_, i) =>
      ks('a', 'a', i),
    )
    const r = computeResult(keystrokes, 30_000)
    expect(r.wpm).toBe(20)
  })
})

describe('liveWpm', () => {
  it('returns 0 before any time elapses', () => {
    expect(liveWpm(10, 0)).toBe(0)
  })

  it('computes running WPM', () => {
    // 25 correct chars in 30s -> 25/5 / 0.5 = 10 wpm.
    expect(liveWpm(25, 30_000)).toBe(10)
  })
})

describe('formatAccuracy', () => {
  it('renders a ratio as a percentage', () => {
    expect(formatAccuracy(1)).toBe('100%')
    expect(formatAccuracy(0.973)).toBe('97%')
    expect(formatAccuracy(0)).toBe('0%')
  })
})

describe('round', () => {
  it('rounds to the requested precision', () => {
    expect(round(1.234, 2)).toBe(1.23)
    expect(round(1.235, 2)).toBe(1.24)
    expect(round(1.6)).toBe(2)
  })
})
