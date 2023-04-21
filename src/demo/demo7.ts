import { interval } from '../rxjs'

export default function () {
  const stream = interval(1000).subscribe({
    next(val) {
      console.log('demo7 next', val)
    },
    error(err) {
      console.log('demo7 err:', err)
    },
    complete() {
      console.log('demo7 complete')
    },
  })

  setTimeout(() => {
    stream.unsubscribe()
  }, 1500)
}
