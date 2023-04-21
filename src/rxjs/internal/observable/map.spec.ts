import { describe, expect, it } from 'vitest'
import { from } from './from'
import { map } from './map'

describe('map', () => {
  it('normal', () => {
    const results: Array<number | string> = []

    from([1, 2, 3])
      .pipe(map((val) => val + 1))
      .subscribe({
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

    expect(results.join('')).toBe('234|')
  })
})
