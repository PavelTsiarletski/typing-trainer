import { memo } from 'react'
import type { CharStatus } from '../hooks/useTypingEngine'

interface TypingAreaProps {
  text: string
  charStatuses: CharStatus[]
  cursor: number
  /** Whether the hidden input currently has focus. */
  focused: boolean
  focusHint: string
}

const STATUS_CLASS: Record<CharStatus, string> = {
  pending: 'text-slate-400',
  correct: 'text-slate-900 dark:text-slate-100',
  // Wrong characters are tinted red; spaces get a red underline so they show.
  incorrect: 'text-rose-600 bg-rose-100 dark:bg-rose-500/20 rounded',
}

/**
 * Renders the target text character-by-character, colouring each by status and
 * drawing a blinking caret at the cursor position.
 */
function TypingAreaImpl({
  text,
  charStatuses,
  cursor,
  focused,
  focusHint,
}: TypingAreaProps) {
  return (
    <div className="relative">
      <p
        className="select-none font-mono text-2xl leading-relaxed tracking-wide sm:text-[28px]"
        aria-label="text to type"
      >
        {text.split('').map((ch, i) => {
          const status = charStatuses[i] ?? 'pending'
          const isCursor = i === cursor
          return (
            <span
              key={i}
              className={`relative ${STATUS_CLASS[status]} ${
                isCursor
                  ? 'rounded-sm bg-indigo-200/70 dark:bg-indigo-400/30'
                  : ''
              }`}
            >
              {isCursor && focused && (
                <span className="absolute -left-0.5 top-0 h-full w-0.5 animate-pulse bg-indigo-600" />
              )}
              {ch === ' ' ? ' ' : ch}
            </span>
          )
        })}
      </p>

      {!focused && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-[1px] dark:bg-slate-900/70">
          <span className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {focusHint}
          </span>
        </div>
      )}
    </div>
  )
}

export const TypingArea = memo(TypingAreaImpl)
