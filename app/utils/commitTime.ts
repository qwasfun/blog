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
  //

  try {
    const child = spawn.sync(
      'git',
      ['log', '--follow', '--pretty="%ai"', basename(file)],
      { cwd: dirname(file) }
    )

    const child2 = spawn.sync(
      'git',
      ['version'],
      { cwd: dirname(file) }
    )

    console.log("child2child2child2child2child2child2",child2.stdout.toString())

    const output = child.stdout.toString()

    const arr = output.split(String.fromCharCode(10))
    const outputT = arr.length > 1 ? arr[arr.length - 2] : arr[arr.length - 1]
    createdCache.set(file, outputT)

    return outputT
  } catch (error) {
    console.error('Error getting earliest commit time:', error)
    return ''
  }
}
