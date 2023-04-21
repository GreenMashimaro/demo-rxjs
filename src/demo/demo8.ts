import { Subject } from '../rxjs'

export default function () {
  const subject = new Subject<number>()

  subject.subscribe({
    next: (v) => console.log(`demo8 observerA: ${v}`),
    complete: () => {
      console.log('demo8 complete B')
    },
  })
  subject.subscribe({
    next: (v) => console.log(`demo8 observerB: ${v}`),
    complete: () => {
      console.log('demo8 complete B')
    },
  })

  subject.next(1)
  subject.next(2)
  subject.complete()
  subject.next(3)
}
