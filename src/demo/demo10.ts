import { BehaviorSubject } from '../rxjs'

export default function () {
  const behaviorSubject = new BehaviorSubject<number>(10)

  behaviorSubject.subscribe({
    next(val) {
      console.log('demo10 val:', val)
    },
  })

  behaviorSubject.next(20)
}
