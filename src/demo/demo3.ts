import { of } from '../rxjs'

export default function () {
  of(1, 2, 3).subscribe({
    next(val) {
      console.log('demo3 next val:', val)
    },
    error(err) {
      console.log('demo3 err:', err)
    },
    complete() {
      console.log('demo3 complete')
    },
  })
}
