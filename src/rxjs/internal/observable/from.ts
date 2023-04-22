import { Observable } from '../Observable'
import { Subscriber } from '../Subscriber'

export function from<T>(array: T[]) {
  return fromArrayLike(array)
}

export function fromArrayLike<T>(array: ArrayLike<T>): Observable<T> {
  return new Observable((subscriber: Subscriber<T>) => {
    subscribeToArray(array, subscriber)
  })
}

export function subscribeToArray<T>(array: ArrayLike<T>, subscriber: Subscriber<T>) {
  const length = array.length
  for (let i = 0; i < length && !subscriber.closed; i++) {
    subscriber.next(array[i])
  }

  subscriber.complete()
}
