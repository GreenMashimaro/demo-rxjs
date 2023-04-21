import { of } from '../rxjs'

export default function () {
  of([1, 2, 3]).subscribe({
    next(val) {
      console.log('demo4 next val:', val)
    },
    error(err) {
      console.log('demo4 err:', err)
    },
    complete() {
      console.log('demo4 complete')
    },
  })
}
