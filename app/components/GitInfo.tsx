export interface GitFileInfo {
  firstCommitDate: string
  lastCommitDate: string
  commitCount: number
  authors: string[]
}

interface GitInfoProps {
  gitInfo: GitFileInfo
  className?: string
}

export function GitInfo({ gitInfo, className }: GitInfoProps) {
  const { firstCommitDate, lastCommitDate, commitCount, authors } = gitInfo

  // 如果发布时间和更新时间相同，只显示发布时间
  const showUpdateTime = firstCommitDate !== lastCommitDate

  return (
    <div
      data-slot="card"
      className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm sticky top-20
      ${className}`}
    >
      <div
        data-slot="card-header"
        className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6
        has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"
      >
        <div data-slot="card-title" className="font-semibold text-lg">
          文章信息
        </div>
        <div
          data-slot="card-description"
          className="text-muted-foreground text-sm"
        >
          基于 Git 提交记录的文章历史
        </div>
      </div>
      <div data-slot="card-content" className="px-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-muted-foreground">发布时间</span>
            <p>{new Date(firstCommitDate).toLocaleDateString('zh-CN')}</p>
          </div>
          {showUpdateTime && (
            <div>
              <span className="font-medium text-muted-foreground">
                更新时间
              </span>
              <p>{new Date(lastCommitDate).toLocaleDateString('zh-CN')}</p>
            </div>
          )}
          <div>
            <span className="font-medium text-muted-foreground">修订次数</span>
            <p>{commitCount} 次提交</p>
          </div>
          {authors.length > 0 && (
            <div>
              <span className="font-medium text-muted-foreground">贡献者</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {authors.map((author) => (
                  <span
                    data-slot="badge"
                    className="inline-flex items-center justify-center rounded-md
                    border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1
                    [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50
                    focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
                    aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground
                     [a&]:hover:bg-accent [a&]:hover:text-accent-foreground text-xs"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
