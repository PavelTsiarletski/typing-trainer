import { useMemo } from 'react'

interface ProgressChartProps {
  /** WPM values in chronological order (oldest first). */
  values: number[]
}

/**
 * Minimal dependency-free SVG line chart of WPM over time. Uses a 0..0..1
 * viewBox-relative path so it scales with its container.
 */
export function ProgressChart({ values }: ProgressChartProps) {
  const { path, area, max, points } = useMemo(() => {
    const W = 600
    const H = 180
    const pad = 8
    if (values.length === 0) {
      return { path: '', area: '', max: 0, points: [] as [number, number][] }
    }
    const maxV = Math.max(...values, 10)
    const stepX =
      values.length > 1 ? (W - pad * 2) / (values.length - 1) : 0
    const pts: [number, number][] = values.map((v, i) => {
      const x = pad + i * stepX
      const y = H - pad - (v / maxV) * (H - pad * 2)
      return [x, y]
    })
    const d = pts
      .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
      .join(' ')
    const areaD =
      pts.length > 0
        ? `${d} L${pts[pts.length - 1][0].toFixed(1)},${H - pad} L${pts[0][0].toFixed(1)},${H - pad} Z`
        : ''
    return { path: d, area: areaD, max: maxV, points: pts }
  }, [values])

  if (values.length === 0) return null

  return (
    <svg
      viewBox="0 0 600 180"
      className="h-44 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="WPM over time"
    >
      <defs>
        <linearGradient id="wpmFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={area} fill="url(#wpmFill)" />}
      {path && (
        <path
          d={path}
          fill="none"
          stroke="rgb(99 102 241)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="rgb(79 70 229)" />
      ))}
      <text x="8" y="16" className="fill-slate-400 text-[11px]">
        {max}
      </text>
    </svg>
  )
}
