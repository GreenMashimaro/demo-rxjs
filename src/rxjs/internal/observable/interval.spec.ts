import { describe, expect, it, vi } from 'vitest'
import { interval } from './interval'

describe('interval', () => {
  it('normal', () => {
    vi.useFakeTimers()
    const results: Array<number> = []
    const fn = vi.fn()
    const stream = interval(1000).subscribe({
      next(val) {
        results.push(val)
        fn()
      },
    })

    expect(fn).toBeCalledTimes(0)

    vi.advanceTimersByTime(1001)
    expect(results.join('')).toBe('0')
    expect(fn).toBeCalledTimes(1)

    vi.advanceTimersByTime(1000)
    expect(results.join('')).toBe('01')
    expect(fn).toBeCalledTimes(2)

    stream.unsubscribe()
    vi.advanceTimersByTime(1000)
    expect(results.join('')).toBe('01')
    expect(fn).toBeCalledTimes(2)

    vi.useRealTimers()
  })
})
