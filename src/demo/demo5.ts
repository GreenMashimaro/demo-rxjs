import { from } from '../rxjs'

export default function () {
  from([1, 2, 3]).subscribe({
    next(val) {
      console.log('demo5 next val:', val)
    },
    error(err) {
      console.log('demo5 err:', err)
    },
    complete() {
      console.log('demo5 complete')
    },
  })
}
