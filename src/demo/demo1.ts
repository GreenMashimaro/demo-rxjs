import { Observable } from '../rxjs'

export default function () {
  const stream$ = new Observable<string>((subscribe) => {
    subscribe.next('11')

    setTimeout(() => {
      subscribe.next('22')
      subscribe.complete()
      subscribe.next('33')
    }, 100)
  })

  stream$.subscribe({
    next(value) {
      console.log('next', value)
    },
    error(err) {
      console.log('err:', err)
    },
    complete() {
      console.log('complete')
    },
  })
}
