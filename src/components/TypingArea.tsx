import { memo, useLayoutEffect, useRef } from 'react'
import type { CharStatus } from '../hooks/useTypingEngine'

interface TypingAreaProps {
  text: string
  charStatuses: CharStatus[]
  cursor: number
  /** Whether the hidden input currently has focus. */
  focused: boolean
  focusHint: string
}

/** Fixed line box height (px). Must match the `leading-[44px]` class below. */
const LINE_HEIGHT = 44
/** How many lines stay visible at once. */
const VISIBLE_LINES = 4
const VIEWPORT_HEIGHT = LINE_HEIGHT * VISIBLE_LINES

const STATUS_CLASS: Record<CharStatus, string> = {
  pending: 'text-slate-400',
  correct: 'text-slate-900 dark:text-slate-100',
  // Wrong characters are tinted red; spaces get a red box so they show.
  incorrect: 'text-rose-600 bg-rose-100 dark:bg-rose-500/20 rounded',
}

/**
 * Renders the target text character-by-character, colouring each by status and
 * drawing a blinking caret at the cursor.
 *
 * The text lives in a fixed 4-line viewport with `overflow: hidden`. As the
 * cursor advances, the paragraph is translated up so the line being typed is
 * always pinned to the top — a smooth, scrollbar-less "teleprompter" scroll.
 */
function TypingAreaImpl({
  text,
  charStatuses,
  cursor,
  focused,
  focusHint,
}: TypingAreaProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  // Keep the cursor's line at the top of the viewport. Snapping to whole lines
  // (rather than the raw pixel offset) keeps completed lines from jittering.
  useLayoutEffect(() => {
    const align = () => {
      const p = paragraphRef.current
      if (!p) return
      const idx = Math.min(cursor, Math.max(0, text.length - 1))
      const child = p.children[idx] as HTMLElement | undefined
      const lineIndex = child ? Math.round(child.offsetTop / LINE_HEIGHT) : 0
      p.style.transform = `translateY(${-lineIndex * LINE_HEIGHT}px)`
    }
    align()
    // Re-align if the viewport reflows (resize changes how the text wraps).
    window.addEventListener('resize', align)
    return () => window.removeEventListener('resize', align)
  }, [cursor, text])

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        style={{ height: VIEWPORT_HEIGHT }}
      >
        <p
          ref={paragraphRef}
          // position:relative makes the paragraph the offsetParent so each
          // char span's offsetTop is measured against it. pre-wrap restores
          // wrapping at spaces (each char is its own span with no whitespace
          // text nodes between them); leading-[44px] must equal LINE_HEIGHT.
          className="relative select-none whitespace-pre-wrap break-words font-mono text-2xl leading-[44px] tracking-wide transition-transform duration-150 ease-out will-change-transform sm:text-[28px]"
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
                  <span className="absolute -left-0.5 top-1 h-[28px] w-0.5 animate-pulse bg-indigo-600" />
                )}
                {ch === ' ' ? ' ' : ch}
              </span>
            )
          })}
        </p>
      </div>

      {/* Soft fade at the bottom so the cut-off line reads as intentional. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white dark:to-slate-800" />

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
