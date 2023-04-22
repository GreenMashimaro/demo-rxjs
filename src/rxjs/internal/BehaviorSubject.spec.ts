import { describe, expect, it } from 'vitest'
import { BehaviorSubject } from './BehaviorSubject'

describe('BehaviorSubject', () => {
  it('normal', () => {
    const behaviorSubject = new BehaviorSubject<string>('a')
    const results: Array<string> = []

    behaviorSubject.subscribe({
      next(val) {
        results.push(val)
      },
      error(err) {
        results.push(err)
      },
      complete() {
        results.push('|')
      },
    })
    expect(results.join('')).toBe('a')
    behaviorSubject.next('b')
    expect(results.join('')).toBe('ab')
    behaviorSubject.complete()
    expect(results.join('')).toBe('ab|')
  })
})
