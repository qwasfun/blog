import Link from 'next/link'
import { calendarDate } from '../utils/post-index'

export type ArchiveEntry = {
  id: string | number
  title: string
  href: string
  date: string | Date
  external?: boolean
}

export function ChronologicalArchive({
  title,
  description,
  entries,
}: {
  title: string
  description: string
  entries: ArchiveEntry[]
}) {
  const groups = new Map<
    string,
    { entry: ArchiveEntry; date: ReturnType<typeof calendarDate> }[]
  >()
  const ordered = entries
    .map((entry) => ({ entry, date: calendarDate(entry.date) }))
    .sort(
      (a, b) =>
        (b.date ? Date.parse(b.date.iso) : 0) -
        (a.date ? Date.parse(a.date.iso) : 0)
    )
  for (const item of ordered) {
    const year = item.date?.year || '日期待补充'
    groups.set(year, [...(groups.get(year) || []), item])
  }
  return (
    <section className="article-archive">
      <div className="archive-intro">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {entries.length === 0 && <p className="archive-empty">暂无内容。</p>}
      {Array.from(groups, ([year, rows]) => (
        <section
          className="archive-year"
          key={year}
          aria-labelledby={`year-${year}`}
        >
          <h2 id={`year-${year}`}>{year}</h2>
          <ul className="editorial-post-list archive-post-list">
            {rows.map(({ entry, date }) => (
              <li key={entry.id}>
                {entry.external ? (
                  <a
                    className="editorial-post-row"
                    href={entry.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <time dateTime={date?.iso}>
                      {date ? `${date.month}.${date.day}` : '日期待补充'}
                    </time>
                    <span className="editorial-post-title">{entry.title}</span>
                    <span className="sr-only">（在新标签页打开）</span>
                  </a>
                ) : (
                  <Link className="editorial-post-row" href={entry.href}>
                    <time dateTime={date?.iso}>
                      {date ? `${date.month}.${date.day}` : '日期待补充'}
                    </time>
                    <span className="editorial-post-title">{entry.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  )
}
