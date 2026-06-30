import type { Lang, Lesson } from '../types'

/**
 * Lessons are grouped from easiest to hardest. Each lesson's text only uses
 * characters introduced up to that point, so the learner builds the keyboard
 * incrementally — the same pedagogy Ratatype uses.
 */

const en: Lesson[] = [
  {
    id: 'en-home-1',
    lang: 'en',
    group: 'Home row',
    title: 'Home row: f j',
    text: 'fff jjj fjf jfj ff jj fj jf fjj jff fjfj jfjf ffjj jjff fj fj jf jf',
  },
  {
    id: 'en-home-2',
    lang: 'en',
    group: 'Home row',
    title: 'Home row: d k',
    text: 'ddd kkk dkd kdk fdk jkd dkfj kdjf fjdk jkfd dk kd dkdk kdkd fdjk',
  },
  {
    id: 'en-home-3',
    lang: 'en',
    group: 'Home row',
    title: 'Home row: s l',
    text: 'sss lll sls lsl asdf jkl sad lad ask all fall salk lask sdfl lkjs',
  },
  {
    id: 'en-home-4',
    lang: 'en',
    group: 'Home row',
    title: 'Home row: a ; g h',
    text: 'aaa ;;; ggg hhh gas had has flag glass shall hall lag dash a sad gas',
  },
  {
    id: 'en-top-1',
    lang: 'en',
    group: 'Top row',
    title: 'Top row: e i r u',
    text: 'eee iii rrr uuu fire hire user rule ride true side life dire ruler ire',
  },
  {
    id: 'en-top-2',
    lang: 'en',
    group: 'Top row',
    title: 'Top row: w o q p t y',
    text: 'two type tower power query happy yellow output pretty wiry torque pewter',
  },
  {
    id: 'en-bottom-1',
    lang: 'en',
    group: 'Bottom row',
    title: 'Bottom row: c v n m',
    text: 'cave move numb cvnm man can vine mine convince common minimum nominal',
  },
  {
    id: 'en-bottom-2',
    lang: 'en',
    group: 'Bottom row',
    title: 'Bottom row: x z b , .',
    text: 'zebra boxer buzz amaze, blaze. zigzag bronze. exobyte, lazybox, zinc.',
  },
  {
    id: 'en-words-1',
    lang: 'en',
    group: 'Words',
    title: 'Common words',
    text: 'the quick brown fox jumps over the lazy dog while the calm river flows past green fields and quiet little towns at dawn',
  },
  {
    id: 'en-caps-1',
    lang: 'en',
    group: 'Capitals & punctuation',
    title: 'Capitals and punctuation',
    text: 'The Sun rose over Berlin. Anna asked, "Where is the map?" John replied: it is on the desk! We left at noon; the road was empty.',
  },
  {
    id: 'en-numbers-1',
    lang: 'en',
    group: 'Numbers',
    title: 'Numbers row',
    text: 'order 12 boxes by 3:45 pm, total 678 items at 90 each, room 405, code 1029, year 2026, gate 7, flight 384, seat 12C',
  },
  {
    id: 'en-fluency-1',
    lang: 'en',
    group: 'Fluency',
    title: 'Full-keyboard fluency',
    text: 'Typing fast is a skill built one clean keystroke at a time. Keep your wrists relaxed, your eyes on the screen, and let your fingers find each key without looking. Accuracy first, then speed will follow naturally.',
  },
]

const ru: Lesson[] = [
  {
    id: 'ru-home-1',
    lang: 'ru',
    group: 'Домашний ряд',
    title: 'Домашний ряд: а о',
    text: 'ааа ооо аоа оао аа оо ао оа аоо оаа аоао оаоа аао оао ао ао оа оа',
  },
  {
    id: 'ru-home-2',
    lang: 'ru',
    group: 'Домашний ряд',
    title: 'Домашний ряд: в л',
    text: 'ввв ллл влв лвл вол лов вал лав вола лова вл лв влвл лвлв вола лава',
  },
  {
    id: 'ru-home-3',
    lang: 'ru',
    group: 'Домашний ряд',
    title: 'Домашний ряд: ы д п р',
    text: 'дом род дар пар рыба пора дыра право драп рапорт пары рады поры дары',
  },
  {
    id: 'ru-home-4',
    lang: 'ru',
    group: 'Домашний ряд',
    title: 'Домашний ряд: ф ж э',
    text: 'фара ваза жар джаз эра фаза вожак фламо лажа этаж эфир ажур ваф жаба',
  },
  {
    id: 'ru-top-1',
    lang: 'ru',
    group: 'Верхний ряд',
    title: 'Верхний ряд: е н г',
    text: 'нога гена пена него ген нева гена ноге гонг негр генерал гонево нега',
  },
  {
    id: 'ru-top-2',
    lang: 'ru',
    group: 'Верхний ряд',
    title: 'Верхний ряд: к у ш щ з х',
    text: 'ука куш зашита щука хата кузов узор шкаф хорек защита уход кухня зухра',
  },
  {
    id: 'ru-bottom-1',
    lang: 'ru',
    group: 'Нижний ряд',
    title: 'Нижний ряд: с м и т ь',
    text: 'мост сила мысль тень мисс смесь тимс мить мост сито мать мить смит сети',
  },
  {
    id: 'ru-bottom-2',
    lang: 'ru',
    group: 'Нижний ряд',
    title: 'Нижний ряд: я ч б ю',
    text: 'юбка ябеда чабан бочка яблочко чуб юла бяка чай боярыня бюро ябедничать',
  },
  {
    id: 'ru-words-1',
    lang: 'ru',
    group: 'Слова',
    title: 'Частые слова',
    text: 'быстрая бурая лиса прыгает через ленивого пса пока тихая река несёт свои воды мимо зелёных полей и маленьких уютных городов на рассвете',
  },
  {
    id: 'ru-caps-1',
    lang: 'ru',
    group: 'Заглавные и пунктуация',
    title: 'Заглавные и пунктуация',
    text: 'Солнце встало над Москвой. Анна спросила: «Где карта?» Иван ответил — она на столе! Мы вышли в полдень; дорога была пустой.',
  },
  {
    id: 'ru-numbers-1',
    lang: 'ru',
    group: 'Цифры',
    title: 'Цифровой ряд',
    text: 'заказать 12 коробок к 15:45, всего 678 позиций по 90 каждая, комната 405, код 1029, год 2026, место 7, рейс 384, ряд 12',
  },
  {
    id: 'ru-fluency-1',
    lang: 'ru',
    group: 'Беглость',
    title: 'Беглость на всей клавиатуре',
    text: 'Быстрая печать складывается из чистых нажатий, по одному за раз. Держи запястья расслабленными, смотри на экран и позволь пальцам находить клавиши не глядя. Сначала точность, а скорость придёт сама собой.',
  },
]

const LESSONS: Record<Lang, Lesson[]> = { en, ru }

export function getLessons(lang: Lang): Lesson[] {
  return LESSONS[lang]
}

export function getLesson(lang: Lang, id: string): Lesson | undefined {
  return LESSONS[lang].find((l) => l.id === id)
}
