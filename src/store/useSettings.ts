import { create } from 'zustand'
import type { Lang } from '../types'
import { STORAGE_KEYS, readJSON, writeJSON } from '../lib/storage'

interface SettingsState {
  /** Language of the interface chrome. */
  uiLang: Lang
  /** Language / layout of the text the user types. */
  contentLang: Lang
  setUiLang: (lang: Lang) => void
  setContentLang: (lang: Lang) => void
}

interface PersistedSettings {
  uiLang: Lang
  contentLang: Lang
}

function detectDefaultLang(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

const fallback = detectDefaultLang()
const initial = readJSON<PersistedSettings>(STORAGE_KEYS.settings, {
  uiLang: fallback,
  contentLang: fallback,
})

export const useSettings = create<SettingsState>((set, get) => ({
  uiLang: initial.uiLang,
  contentLang: initial.contentLang,
  setUiLang: (uiLang) => {
    set({ uiLang })
    writeJSON(STORAGE_KEYS.settings, { uiLang, contentLang: get().contentLang })
  },
  setContentLang: (contentLang) => {
    set({ contentLang })
    writeJSON(STORAGE_KEYS.settings, { uiLang: get().uiLang, contentLang })
  },
}))
