# ⌨️ Typing Trainer

A bilingual (Russian 🇷🇺 / English 🇬🇧) touch-typing trainer in the spirit of
[Ratatype](https://www.ratatype.com/) — built to push your typing speed past
your **speaking** speed.

Structured lessons, timed speed tests, free practice, a colour-coded virtual
keyboard and on-device progress tracking. No backend, no accounts — your
results live in your browser.

![Type faster than you speak](public/keyboard.svg)

## ✨ Features

- **Lessons / course** — learn the keyboard one group at a time: home row →
  top row → bottom row → words → capitals & punctuation → numbers → full-keyboard
  fluency. Progress is saved per lesson.
- **Speed test** — 15 / 30 / 60-second timed runs reporting **WPM**, **CPM**,
  **accuracy** and your most-missed keys.
- **Free practice** — paragraph-length real texts, no timer, just flow.
- **Virtual keyboard** — colour-coded by finger, highlights the next key so you
  learn to type without looking.
- **Two languages, two layouts** — full **QWERTY** and **ЙЦУКЕН** support, with
  independent toggles for the *interface* language and the *typing* language.
- **Progress tracking** — best/average WPM, a WPM-over-time chart, and a history
  table, all stored in `localStorage`.
- **Dark mode** — follows your OS preference automatically.

## 🧮 How the metrics work

- **WPM** = correct characters ÷ 5 ÷ minutes (the standard net-WPM formula).
- **CPM** = correct characters ÷ minutes.
- **Accuracy** = correct keystrokes ÷ total keystrokes (fixing a typo still
  costs you, just like real life).

The metric functions live in [`src/lib/metrics.ts`](src/lib/metrics.ts) and are
covered by unit tests in [`src/lib/metrics.test.ts`](src/lib/metrics.test.ts).

## 🛠 Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state
- [React Router](https://reactrouter.com/) (HashRouter — works on any static host)
- [Vitest](https://vitest.dev/) + Testing Library

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into dist/
npm run preview  # preview the production build
npm test         # run the unit tests
```

## 📁 Project structure

```
src/
├── components/      UI: TypingArea, VirtualKeyboard, LiveStats, ResultsCard, ...
├── hooks/           useTypingEngine — the headless typing engine
├── lib/             metrics, keyboard layouts/finger maps, storage helpers
├── data/            lessons.ts (RU/EN course) + texts.ts (practice/test texts)
├── i18n/            UI string tables (RU/EN) + useT hook
├── store/           Zustand stores: settings (language) + scores (history)
├── pages/           Home, Lessons, LessonRunner, SpeedTest, Practice, Progress
└── types.ts         shared domain types
```

## 🌍 Deploying

The build is fully static and uses `HashRouter` + a relative `base`, so it runs
from any static host or sub-path (GitHub Pages, GitLab Pages, S3, `file://`).
Just serve the `dist/` folder.

## 📈 Roadmap ideas

- Sound on keypress + error feedback
- Custom / pasted text practice
- Per-finger and per-key heat-map of mistakes
- Online leaderboard (optional backend)

---

Made for relentless practice. Accuracy first — speed follows. 🏎️
