import { describe, expect, it } from 'vitest'
import { Subject } from './Subject'

describe('Subject', () => {
  it('normal', () => {
    const subject = new Subject<number>()
    const results: Array<string> = []

    subject.subscribe({
      next: (val) => {
        results.push(`A${val}`)
      },
      complete: () => {
        results.push('A|')
      },
    })
    subject.subscribe({
      next: (val) => {
        results.push(`B${val}`)
      },
      complete: () => {
        results.push('B|')
      },
    })

    subject.next(1)
    expect(results.join('')).toBe('A1B1')

    subject.next(2)
    expect(results.join('')).toBe('A1B1A2B2')

    subject.complete()
    expect(results.join('')).toBe('A1B1A2B2A|B|')

    subject.next(3)
    expect(results.join('')).toBe('A1B1A2B2A|B|')
  })
})
