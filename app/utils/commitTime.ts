import { spawn } from 'cross-spawn'
import fs from 'fs-extra'
import { basename, dirname } from 'path'

const updatedCache = new Map<string, string>()
const createdCache = new Map<string, string>()

export function lastUpdatedCommitTime(file: string): string {
  const cached = updatedCache.get(file)
  if (cached) return cached

  if (!fs.existsSync(file)) return ''

  const child = spawn.sync(
    'git',
    ['log', '-1', '--follow', '--pretty="%ai"', basename(file)],
    { cwd: dirname(file) }
  )

  const output = child.stdout
    ? child.stdout.toString().trim().split(String.fromCharCode(10))
    : ''
  updatedCache.set(file, output)

  return output
}

export function createdCommitTime(file: string): string {
  const cached = createdCache.get(file)
  if (cached) return cached

  if (!fs.existsSync(file)) return ''

  try {
    const child = spawn.sync(
      'git',
      ['log', '--follow', '--pretty="%ai"', basename(file)],
      { cwd: dirname(file) }
    )

    const output = child.stdout
      ? child.stdout.toString().trim().split(String.fromCharCode(10))
      : []
    const firstCommitTime = output[output.length - 1] || ''

    createdCache.set(file, firstCommitTime)

    return firstCommitTime
  } catch (error) {
    console.error('Error getting earliest commit time:', error)
    return ''
  }
}
