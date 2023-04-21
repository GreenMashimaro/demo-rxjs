import { describe, expect, it } from 'vitest'
import { of } from './of'

describe('of', () => {
  it('normal', () => {
    const results: Array<number | string> = []

    of(1, 2, 3).subscribe({
      next(val) {
        results.push(val)
      },
      error(err: string) {
        results.push(err)
      },
      complete() {
        results.push('|')
      },
    })

    expect(results.join('')).toBe('123|')
  })
})
