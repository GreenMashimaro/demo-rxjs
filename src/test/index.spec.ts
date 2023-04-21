import { describe, expect, it } from 'vitest'
import { TestScheduler } from 'rxjs/testing'
import { throttleTime } from 'rxjs'

const testScheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal - required
  // for TestScheduler assertions to work via your test framework
  // e.g. using chai.
  expect(actual).deep.equal(expected)
})

describe('main', () => {
  it('ddd', () => {
    testScheduler.run((helpers) => {
      const { cold, time, expectObservable, expectSubscriptions } = helpers
      const e1 = cold(' -a--b--c---|')
      const e1subs = '  ^----------!'
      const t = time('   ---|       ') // t = 3
      const expected = '-a-----c---|'

      expectObservable(e1.pipe(throttleTime(t))).toBe(expected)
      expectSubscriptions(e1.subscriptions).toBe(e1subs)
    })
  })
})
