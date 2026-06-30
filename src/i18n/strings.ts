import type { Lang } from '../types'

/** Every UI string key the app uses. */
export interface UIStrings {
  appName: string
  tagline: string

  navLessons: string
  navTest: string
  navPractice: string
  navProgress: string

  uiLanguage: string
  contentLanguage: string

  // Home
  heroTitle: string
  heroSubtitle: string
  startLessons: string
  startTest: string

  // Lessons
  lessonsTitle: string
  lessonsIntro: string
  lessonStart: string
  lessonCompleted: string
  backToLessons: string

  // Test
  testTitle: string
  testIntro: string
  duration: string
  seconds: string
  startTest2: string

  // Practice
  practiceTitle: string
  practiceIntro: string
  newText: string

  // Typing
  clickToFocus: string
  restart: string
  finished: string
  typeTheText: string

  // Stats
  wpm: string
  cpm: string
  accuracy: string
  errors: string
  time: string
  liveSpeed: string

  // Results
  resultsTitle: string
  yourSpeed: string
  newRecord: string
  tryAgain: string
  topMistakes: string
  noMistakes: string

  // Progress
  progressTitle: string
  progressIntro: string
  noHistory: string
  bestWpm: string
  avgWpm: string
  totalRuns: string
  clearHistory: string
  confirmClear: string
  date: string
  mode: string
  modeLesson: string
  modeTest: string
  modePractice: string

  // Keyboard
  keyboardLegend: string
  nextKey: string
}

const en: UIStrings = {
  appName: 'Typing Trainer',
  tagline: 'Type faster than you speak',

  navLessons: 'Lessons',
  navTest: 'Speed test',
  navPractice: 'Practice',
  navProgress: 'Progress',

  uiLanguage: 'Interface',
  contentLanguage: 'Typing',

  heroTitle: 'Master touch typing in two languages',
  heroSubtitle:
    'Structured lessons, timed speed tests and progress tracking — in Russian and English. Build muscle memory until your fingers outrun your voice.',
  startLessons: 'Start the course',
  startTest: 'Take a speed test',

  lessonsTitle: 'Lessons',
  lessonsIntro:
    'Work through the keyboard one group at a time — start with the home row and add keys as you go.',
  lessonStart: 'Start',
  lessonCompleted: 'Done',
  backToLessons: 'Back to lessons',

  testTitle: 'Speed test',
  testIntro: 'Type as much as you can before the timer runs out.',
  duration: 'Duration',
  seconds: 'sec',
  startTest2: 'Start',

  practiceTitle: 'Free practice',
  practiceIntro: 'Type real paragraphs at your own pace. No timer, just flow.',
  newText: 'New text',

  clickToFocus: 'Click here and start typing',
  restart: 'Restart',
  finished: 'Finished!',
  typeTheText: 'Type the text below',

  wpm: 'WPM',
  cpm: 'CPM',
  accuracy: 'Accuracy',
  errors: 'Errors',
  time: 'Time',
  liveSpeed: 'Speed',

  resultsTitle: 'Results',
  yourSpeed: 'Your speed',
  newRecord: 'New personal record!',
  tryAgain: 'Try again',
  topMistakes: 'Most-missed keys',
  noMistakes: 'Flawless — no mistakes!',

  progressTitle: 'Your progress',
  progressIntro: 'Every finished run is saved on this device.',
  noHistory: 'No runs yet. Finish a lesson or a test to see your progress here.',
  bestWpm: 'Best WPM',
  avgWpm: 'Average WPM',
  totalRuns: 'Runs',
  clearHistory: 'Clear history',
  confirmClear: 'Delete all saved results? This cannot be undone.',
  date: 'Date',
  mode: 'Mode',
  modeLesson: 'Lesson',
  modeTest: 'Test',
  modePractice: 'Practice',

  keyboardLegend: 'Finger guide',
  nextKey: 'Next key',
}

const ru: UIStrings = {
  appName: 'Тренажёр печати',
  tagline: 'Печатай быстрее, чем говоришь',

  navLessons: 'Уроки',
  navTest: 'Тест скорости',
  navPractice: 'Практика',
  navProgress: 'Прогресс',

  uiLanguage: 'Интерфейс',
  contentLanguage: 'Печать',

  heroTitle: 'Освой слепую печать на двух языках',
  heroSubtitle:
    'Пошаговые уроки, тесты на скорость и отслеживание прогресса — на русском и английском. Доведи мышечную память до того, чтобы пальцы обгоняли речь.',
  startLessons: 'Начать курс',
  startTest: 'Пройти тест',

  lessonsTitle: 'Уроки',
  lessonsIntro:
    'Осваивай клавиатуру группа за группой — начни с домашнего ряда и добавляй клавиши по мере прохождения.',
  lessonStart: 'Начать',
  lessonCompleted: 'Пройден',
  backToLessons: 'К урокам',

  testTitle: 'Тест скорости',
  testIntro: 'Печатай как можно больше, пока не вышло время.',
  duration: 'Длительность',
  seconds: 'сек',
  startTest2: 'Старт',

  practiceTitle: 'Свободная практика',
  practiceIntro: 'Печатай настоящие абзацы в своём темпе. Без таймера, просто поток.',
  newText: 'Новый текст',

  clickToFocus: 'Нажми сюда и начинай печатать',
  restart: 'Заново',
  finished: 'Готово!',
  typeTheText: 'Печатай текст ниже',

  wpm: 'зн/мин ÷5',
  cpm: 'зн/мин',
  accuracy: 'Точность',
  errors: 'Ошибки',
  time: 'Время',
  liveSpeed: 'Скорость',

  resultsTitle: 'Результаты',
  yourSpeed: 'Твоя скорость',
  newRecord: 'Новый личный рекорд!',
  tryAgain: 'Ещё раз',
  topMistakes: 'Чаще всего ошибки',
  noMistakes: 'Идеально — ни одной ошибки!',

  progressTitle: 'Твой прогресс',
  progressIntro: 'Каждый завершённый заход сохраняется на этом устройстве.',
  noHistory:
    'Пока нет заходов. Заверши урок или тест, чтобы увидеть прогресс здесь.',
  bestWpm: 'Лучший WPM',
  avgWpm: 'Средний WPM',
  totalRuns: 'Заходов',
  clearHistory: 'Очистить историю',
  confirmClear: 'Удалить все сохранённые результаты? Это нельзя отменить.',
  date: 'Дата',
  mode: 'Режим',
  modeLesson: 'Урок',
  modeTest: 'Тест',
  modePractice: 'Практика',

  keyboardLegend: 'Раскладка по пальцам',
  nextKey: 'Следующая клавиша',
}

export const STRINGS: Record<Lang, UIStrings> = { en, ru }
