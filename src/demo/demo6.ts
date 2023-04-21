import { from, map } from '../rxjs'

export default function () {
  from([1, 2, 3])
    .pipe(
      map((val) => val + 1),
      map((val) => val + 1)
    )
    .subscribe({
      next(val) {
        console.log('demo6 next val:', val)
      },
      error(err) {
        console.log('demo6 err:', err)
      },
      complete() {
        console.log('demo6 complete')
      },
    })
}
