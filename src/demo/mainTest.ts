import { selfMain } from './self'
import { Subject } from 'rxjs'

function demoMain() {
  const subject = new Subject<number>()

  subject.subscribe({
    next: (v) => console.log(`main observerA: ${v}`),
    complete: () => {
      console.log('main complete A')
    },
  })
  subject.subscribe({
    next: (v) => console.log(`main observerB: ${v}`),
    complete: () => {
      console.log('main complete B')
    },
  })

  subject.next(1)
  subject.next(2)
  subject.complete()
}

function showLine() {
  console.log('=================')
}

export function main() {
  demoMain()
  showLine()

  selfMain()
}
