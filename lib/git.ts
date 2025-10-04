import { execSync } from 'child_process'
import fs from 'fs'

export interface GitFileInfo {
  firstCommitDate: string
  lastCommitDate: string
  commitCount: number
  authors: string[]
}

// Git 信息缓存
const gitInfoCache = new Map<string, GitFileInfo>()

/**
 * 获取文件的 Git 提交信息
 */
export function getGitFileInfo(filePath: string): GitFileInfo {
  // 检查缓存
  if (gitInfoCache.has(filePath)) {
    return gitInfoCache.get(filePath)!
  }

  const defaultInfo: GitFileInfo = {
    firstCommitDate: getFileSystemDate(filePath),
    lastCommitDate: getFileSystemDate(filePath),
    commitCount: 0,
    authors: [],
  }

  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return defaultInfo
    }

    // 检查是否在 Git 仓库中
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' })
    } catch {
      console.warn('不在 Git 仓库中，使用文件系统时间')
      return defaultInfo
    }

    // 获取第一次提交时间（发布时间）
    const firstCommitDate = execSync(
      `git log --follow --format=%aI --reverse "${filePath}" | head -1`,
      {
        encoding: 'utf8',
      }
    ).trim()

    // 获取最后一次提交时间（更新时间）
    const lastCommitDate = execSync(
      `git log --follow --format=%aI -1 "${filePath}"`,
      { encoding: 'utf8' }
    ).trim()

    // 获取提交次数
    const commitCount = Number.parseInt(
      execSync(`git log --follow --oneline "${filePath}" | wc -l`, {
        encoding: 'utf8',
      }).trim(),
      10
    )

    // 获取所有贡献者
    const authorsOutput = execSync(
      `git log --follow --format=%an "${filePath}" | sort | uniq`,
      {
        encoding: 'utf8',
      }
    ).trim()

    const authors = authorsOutput ? authorsOutput.split('\n') : []

    const gitInfo: GitFileInfo = {
      firstCommitDate: firstCommitDate
        ? formatDate(firstCommitDate)
        : defaultInfo.firstCommitDate,
      lastCommitDate: lastCommitDate
        ? formatDate(lastCommitDate)
        : defaultInfo.lastCommitDate,
      commitCount: commitCount || 0,
      authors,
    }

    // 缓存结果
    gitInfoCache.set(filePath, gitInfo)
    return gitInfo
  } catch (error) {
    console.warn(`获取 ${filePath} 的 Git 信息失败:`, error)
    return defaultInfo
  }
}

/**
 * 获取文件系统时间作为后备
 */
function getFileSystemDate(filePath: string): string {
  try {
    const stats = fs.statSync(filePath)
    return formatDate(stats.mtime.toISOString())
  } catch {
    return formatDate(new Date().toISOString())
  }
}

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
function formatDate(dateString: string): string {
  return new Date(dateString).toISOString().split('T')[0]
}

/**
 * 清除 Git 信息缓存
 */
export function clearGitCache(): void {
  gitInfoCache.clear()
}

/**
 * 获取仓库的基本信息
 */
export function getRepoInfo(): {
  branch: string
  commitHash: string
  remoteUrl: string
} | null {
  try {
    const branch = execSync('git branch --show-current', {
      encoding: 'utf8',
    }).trim()
    const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' })
      .trim()
      .substring(0, 7)
    const remoteUrl = execSync('git config --get remote.origin.url', {
      encoding: 'utf8',
    }).trim()

    return {
      branch,
      commitHash,
      remoteUrl,
    }
  } catch (error) {
    console.warn('获取仓库信息失败:', error)
    return null
  }
}

/**
 * 检查文件是否被 Git 跟踪
 */
export function isFileTracked(filePath: string): boolean {
  try {
    execSync(`git ls-files --error-unmatch "${filePath}"`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}
