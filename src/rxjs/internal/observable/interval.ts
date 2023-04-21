import { Observable } from '../Observable'

export function interval(time: number): Observable<number> {
  return new Observable((subscribe) => {
    let index = 0
    const intervalInstance = setInterval(() => {
      if (subscribe.closed) {
        clearInterval(intervalInstance)
      }
      subscribe.next(index++)
    }, time)
  })
}
