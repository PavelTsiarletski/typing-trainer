import type { Lang } from '../types'

/**
 * Paragraph-length texts for the speed test and free practice. Each is a
 * self-contained snippet using everyday vocabulary and punctuation.
 */

const en: string[] = [
  'The art of typing well is the art of not thinking about typing at all. When your fingers know where every key lives, your mind is free to focus on the words, the ideas, and the rhythm of the sentence forming in front of you.',
  'Every expert was once a beginner who refused to quit. Speed is the reward for patience: a thousand careful repetitions today become effortless muscle memory tomorrow. Keep your hands steady and your goals clear.',
  'A good keyboard feels like an extension of your hands. The keys give way under a light touch, your wrists float just above the desk, and the words appear on the screen almost as fast as you can think them.',
  'Practice does not make perfect; practice makes permanent. Type slowly enough to be accurate, and accuracy will quietly turn into speed. The fastest typists are simply the ones who made the fewest mistakes for the longest time.',
  'Morning light slipped through the blinds as the city slowly woke. Cars hummed in the distance, a kettle clicked off in the kitchen, and somewhere a phone buzzed twice and went silent again.',
]

const ru: string[] = [
  'Искусство хорошей печати — это искусство вовсе не думать о печати. Когда пальцы знают, где живёт каждая клавиша, разум свободен и сосредоточен на словах, мыслях и ритме фразы, рождающейся прямо перед тобой.',
  'Каждый мастер когда-то был новичком, который не сдался. Скорость — награда за терпение: тысяча аккуратных повторений сегодня завтра станет лёгкой мышечной памятью. Держи руки спокойными, а цели ясными.',
  'Хорошая клавиатура ощущается как продолжение рук. Клавиши поддаются лёгкому касанию, запястья парят над столом, а слова появляются на экране почти так же быстро, как ты успеваешь их подумать.',
  'Практика не делает идеальным; практика делает привычным. Печатай достаточно медленно, чтобы не ошибаться, и точность тихо превратится в скорость. Самые быстрые — это просто те, кто дольше всех делал меньше всего ошибок.',
  'Утренний свет пробивался сквозь жалюзи, пока город медленно просыпался. Вдалеке шуршали машины, на кухне щёлкнул выключившийся чайник, а где-то дважды зажужжал телефон и снова затих.',
]

const TEXTS: Record<Lang, string[]> = { en, ru }

export function getTexts(lang: Lang): string[] {
  return TEXTS[lang]
}

/**
 * Pick a text by index (wraps around). Index-based rather than random so
 * callers stay deterministic and testable; the UI advances the index.
 */
export function getTextByIndex(lang: Lang, index: number): string {
  const list = TEXTS[lang]
  return list[((index % list.length) + list.length) % list.length]
}
