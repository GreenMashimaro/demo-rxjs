import selfTest from './selfTest'
import { BehaviorSubject } from '../originRxjs'

function demoMain() {
  const behaviorSubject = new BehaviorSubject<number>(10)

  behaviorSubject.subscribe({
    next(val) {
      console.log('main val:', val)
    },
  })

  behaviorSubject.next(20)
}

export function main() {
  demoMain()

  selfTest()
}
