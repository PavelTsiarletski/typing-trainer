import { useSettings } from '../store/useSettings'
import { STRINGS, type UIStrings } from './strings'

/** Returns the UI string table for the currently selected interface language. */
export function useT(): UIStrings {
  const uiLang = useSettings((s) => s.uiLang)
  return STRINGS[uiLang]
}
