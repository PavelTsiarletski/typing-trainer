import { StrictMode } from 'react'
import { describe, it, expect } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTypingEngine } from './useTypingEngine'

const noop = { preventDefault: () => {} }
const press = (key: string) => ({ key, ...noop })

/** Render the engine inside StrictMode so updater double-invocation is exercised. */
function renderEngine(text: string, timeLimitSec?: number) {
  return renderHook(() => useTypingEngine({ text, timeLimitSec }), {
    wrapper: StrictMode,
  })
}

describe('useTypingEngine', () => {
  it('does not double-count keystrokes under StrictMode', () => {
    const { result } = renderEngine('abc')

    act(() => result.current.handleKeyDown(press('a')))
    act(() => result.current.handleKeyDown(press('b')))

    // Two correct keystrokes -> perfect accuracy, no errors. The historical bug
    // logged each keystroke twice, yielding 50% accuracy here.
    expect(result.current.errors).toBe(0)
    expect(result.current.currentAccuracy).toBe(1)
    expect(result.current.cursor).toBe(2)
    expect(result.current.charStatuses).toEqual(['correct', 'correct', 'pending'])
  })

  it('marks a wrong key as an error but still advances', () => {
    const { result } = renderEngine('abc')

    act(() => result.current.handleKeyDown(press('a')))
    act(() => result.current.handleKeyDown(press('x'))) // wrong, expected 'b'

    expect(result.current.cursor).toBe(2)
    expect(result.current.errors).toBe(1)
    expect(result.current.currentAccuracy).toBe(0.5)
    expect(result.current.charStatuses[1]).toBe('incorrect')
  })

  it('walks back and clears a slot on Backspace', () => {
    const { result } = renderEngine('abc')

    act(() => result.current.handleKeyDown(press('a')))
    act(() => result.current.handleKeyDown(press('b')))
    act(() => result.current.handleKeyDown(press('Backspace')))

    expect(result.current.cursor).toBe(1)
    expect(result.current.charStatuses[1]).toBe('pending')
    // The keystroke log keeps the original presses (accuracy still reflects them).
    expect(result.current.charStatuses[0]).toBe('correct')
  })

  it('finishes a fixed-length run when the last char is typed', () => {
    let finished: number | null = null
    const { result } = renderHook(
      () =>
        useTypingEngine({
          text: 'ab',
          onFinish: (r) => {
            finished = r.correctChars
          },
        }),
      { wrapper: StrictMode },
    )

    act(() => result.current.handleKeyDown(press('a')))
    act(() => result.current.handleKeyDown(press('b')))

    expect(result.current.status).toBe('finished')
    expect(finished).toBe(2)
  })

  it('ignores non-printable keys', () => {
    const { result } = renderEngine('abc')

    act(() => result.current.handleKeyDown(press('Shift')))
    act(() => result.current.handleKeyDown(press('Enter')))

    expect(result.current.cursor).toBe(0)
    expect(result.current.errors).toBe(0)
  })
})
