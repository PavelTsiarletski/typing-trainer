import type { Finger, Lang } from '../types'

export interface KeyDef {
  /** Lowercase character produced by the key (primary legend). */
  char: string
  /** Character produced with Shift, if different (shown as a hint). */
  shift?: string
  /** Finger that should press it. */
  finger: Finger
  /** Relative key width, 1 = a normal key. */
  width?: number
  /** Non-character label for special keys (Shift, Space...). */
  label?: string
}

export type KeyboardRow = KeyDef[]
export type KeyboardLayout = KeyboardRow[]

/** Tailwind background colour per finger — used to colour the virtual keys. */
export const FINGER_COLORS: Record<Finger, string> = {
  'l-pinky': 'bg-rose-500/80',
  'l-ring': 'bg-orange-500/80',
  'l-middle': 'bg-amber-500/80',
  'l-index': 'bg-lime-500/80',
  thumb: 'bg-slate-500/80',
  'r-index': 'bg-emerald-500/80',
  'r-middle': 'bg-sky-500/80',
  'r-ring': 'bg-violet-500/80',
  'r-pinky': 'bg-fuchsia-500/80',
}

/** Human-readable finger names for the legend. */
export const FINGER_NAMES: Record<Lang, Record<Finger, string>> = {
  en: {
    'l-pinky': 'Left pinky',
    'l-ring': 'Left ring',
    'l-middle': 'Left middle',
    'l-index': 'Left index',
    thumb: 'Thumbs',
    'r-index': 'Right index',
    'r-middle': 'Right middle',
    'r-ring': 'Right ring',
    'r-pinky': 'Right pinky',
  },
  ru: {
    'l-pinky': 'Левый мизинец',
    'l-ring': 'Левый безымянный',
    'l-middle': 'Левый средний',
    'l-index': 'Левый указательный',
    thumb: 'Большие пальцы',
    'r-index': 'Правый указательный',
    'r-middle': 'Правый средний',
    'r-ring': 'Правый безымянный',
    'r-pinky': 'Правый мизинец',
  },
}

const k = (char: string, finger: Finger, shift?: string): KeyDef => ({
  char,
  finger,
  shift,
})

// ---- English QWERTY -------------------------------------------------------

const EN_LAYOUT: KeyboardLayout = [
  [
    k('1', 'l-pinky', '!'),
    k('2', 'l-ring', '@'),
    k('3', 'l-middle', '#'),
    k('4', 'l-index', '$'),
    k('5', 'l-index', '%'),
    k('6', 'r-index', '^'),
    k('7', 'r-index', '&'),
    k('8', 'r-middle', '*'),
    k('9', 'r-ring', '('),
    k('0', 'r-pinky', ')'),
  ],
  [
    k('q', 'l-pinky'),
    k('w', 'l-ring'),
    k('e', 'l-middle'),
    k('r', 'l-index'),
    k('t', 'l-index'),
    k('y', 'r-index'),
    k('u', 'r-index'),
    k('i', 'r-middle'),
    k('o', 'r-ring'),
    k('p', 'r-pinky'),
  ],
  [
    k('a', 'l-pinky'),
    k('s', 'l-ring'),
    k('d', 'l-middle'),
    k('f', 'l-index'),
    k('g', 'l-index'),
    k('h', 'r-index'),
    k('j', 'r-index'),
    k('k', 'r-middle'),
    k('l', 'r-ring'),
    k(';', 'r-pinky', ':'),
  ],
  [
    k('z', 'l-pinky'),
    k('x', 'l-ring'),
    k('c', 'l-middle'),
    k('v', 'l-index'),
    k('b', 'l-index'),
    k('n', 'r-index'),
    k('m', 'r-index'),
    k(',', 'r-middle', '<'),
    k('.', 'r-ring', '>'),
    k('/', 'r-pinky', '?'),
  ],
  [{ char: ' ', finger: 'thumb', width: 10, label: 'space' }],
]

// ---- Russian ЙЦУКЕН -------------------------------------------------------

const RU_LAYOUT: KeyboardLayout = [
  [
    k('1', 'l-pinky', '!'),
    k('2', 'l-ring', '"'),
    k('3', 'l-middle', '№'),
    k('4', 'l-index', ';'),
    k('5', 'l-index', '%'),
    k('6', 'r-index', ':'),
    k('7', 'r-index', '?'),
    k('8', 'r-middle', '*'),
    k('9', 'r-ring', '('),
    k('0', 'r-pinky', ')'),
  ],
  [
    k('й', 'l-pinky'),
    k('ц', 'l-ring'),
    k('у', 'l-middle'),
    k('к', 'l-index'),
    k('е', 'l-index'),
    k('н', 'r-index'),
    k('г', 'r-index'),
    k('ш', 'r-middle'),
    k('щ', 'r-ring'),
    k('з', 'r-pinky'),
    k('х', 'r-pinky'),
  ],
  [
    k('ф', 'l-pinky'),
    k('ы', 'l-ring'),
    k('в', 'l-middle'),
    k('а', 'l-index'),
    k('п', 'l-index'),
    k('р', 'r-index'),
    k('о', 'r-index'),
    k('л', 'r-middle'),
    k('д', 'r-ring'),
    k('ж', 'r-pinky'),
    k('э', 'r-pinky'),
  ],
  [
    k('я', 'l-pinky'),
    k('ч', 'l-ring'),
    k('с', 'l-middle'),
    k('м', 'l-index'),
    k('и', 'l-index'),
    k('т', 'r-index'),
    k('ь', 'r-index'),
    k('б', 'r-middle'),
    k('ю', 'r-ring'),
    k('.', 'r-pinky', ','),
  ],
  [{ char: ' ', finger: 'thumb', width: 10, label: 'space' }],
]

const LAYOUTS: Record<Lang, KeyboardLayout> = {
  en: EN_LAYOUT,
  ru: RU_LAYOUT,
}

export function getLayout(lang: Lang): KeyboardLayout {
  return LAYOUTS[lang]
}

/**
 * Build a lookup from a character (lower or upper / shifted form) to its key
 * definition, so we can highlight the right key for the next character.
 */
export function buildKeyIndex(lang: Lang): Map<string, KeyDef> {
  const index = new Map<string, KeyDef>()
  for (const row of LAYOUTS[lang]) {
    for (const key of row) {
      index.set(key.char, key)
      index.set(key.char.toUpperCase(), key)
      if (key.shift) index.set(key.shift, key)
    }
  }
  return index
}
