import { describe, expect, it, vi } from 'vitest'
import { asyncScheduler, Observable, observeOn } from '../../index'

describe('AsyncScheduler', () => {
  it('normal', () => {
    const results: Array<string> = []
    vi.useFakeTimers()

    const observable = new Observable((observer) => {
      observer.next('1')
      observer.next('2')
      observer.next('3')
      observer.complete()
    }).pipe(observeOn(asyncScheduler, 100))

    observable.subscribe({
      next(val) {
        results.push(val as string)
      },
      error(err) {
        results.push(err)
      },
      complete() {
        results.push('|')
      },
    })

    expect(results.join('')).toBe('')
    vi.advanceTimersByTime(90)
    expect(results.join('')).toBe('')
    vi.advanceTimersByTime(10)
    expect(results.join('')).toBe('123|')
  })
})
