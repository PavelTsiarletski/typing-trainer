import { useT } from '../i18n/useT'
import { formatAccuracy } from '../lib/metrics'

interface LiveStatsProps {
  wpm: number
  accuracy: number
  errors: number
  /** Seconds remaining (timed mode) or elapsed seconds (fixed mode). */
  seconds: number
  /** Whether `seconds` is a countdown (timed) or a stopwatch (fixed). */
  countdown: boolean
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
        {value}
      </span>
      <span className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </span>
    </div>
  )
}

/** The live metrics bar shown above the typing area during a run. */
export function LiveStats({
  wpm,
  accuracy,
  errors,
  seconds,
  countdown,
}: LiveStatsProps) {
  const t = useT()
  return (
    <div className="flex items-center justify-around rounded-2xl bg-white px-4 py-4 shadow-sm dark:bg-slate-800">
      <Stat value={wpm} label={t.liveSpeed} />
      <Stat value={formatAccuracy(accuracy)} label={t.accuracy} />
      <Stat value={errors} label={t.errors} />
      <Stat
        value={countdown ? `${seconds}${t.seconds}` : `${seconds}${t.seconds}`}
        label={t.time}
      />
    </div>
  )
}
