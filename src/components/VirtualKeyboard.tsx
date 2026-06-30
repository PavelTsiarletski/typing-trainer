import { memo, useMemo } from 'react'
import type { Lang } from '../types'
import {
  FINGER_COLORS,
  buildKeyIndex,
  getLayout,
  type KeyDef,
} from '../lib/keyboard'

interface VirtualKeyboardProps {
  lang: Lang
  /** The next character to type — its key is highlighted. */
  nextChar?: string
}

function keyWidthClass(width?: number): string {
  if (!width || width === 1) return 'w-10 sm:w-12'
  if (width >= 10) return 'flex-1'
  return 'w-16'
}

/**
 * Static on-screen keyboard, coloured by finger, that highlights the key the
 * user should press next. Helps build the look-away muscle memory.
 */
function VirtualKeyboardImpl({ lang, nextChar }: VirtualKeyboardProps) {
  const layout = useMemo(() => getLayout(lang), [lang])
  const index = useMemo(() => buildKeyIndex(lang), [lang])

  const activeKey: KeyDef | undefined =
    nextChar != null ? index.get(nextChar) : undefined

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-1.5 rounded-2xl bg-slate-200/60 p-2 sm:p-3 dark:bg-slate-800/60">
      {layout.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const isActive = activeKey != null && key.char === activeKey.char
            const isSpace = key.label === 'space'
            return (
              <div
                key={key.char}
                className={[
                  keyWidthClass(key.width),
                  'flex h-10 select-none items-center justify-center rounded-lg text-sm font-medium text-white shadow-sm transition-transform sm:h-12',
                  FINGER_COLORS[key.finger],
                  isActive
                    ? 'scale-110 ring-4 ring-indigo-500 ring-offset-1 ring-offset-slate-100 dark:ring-offset-slate-900'
                    : 'opacity-80',
                ].join(' ')}
              >
                {isSpace ? '' : key.char.toUpperCase()}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export const VirtualKeyboard = memo(VirtualKeyboardImpl)
