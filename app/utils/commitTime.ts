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

  const output = child.stdout.toString()
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

    const output = child.stdout.toString().trim()
    console.log('output', file, output)

    const arr = output.split(String.fromCharCode(10))
    const firstCommitTime =
      arr.length > 1 ? arr[arr.length - 1] : arr[0]
    console.log('output', file, firstCommitTime)
    createdCache.set(file, firstCommitTime)

    return firstCommitTime
  } catch (error) {
    console.error('Error getting earliest commit time:', error)
    return ''
  }
}
