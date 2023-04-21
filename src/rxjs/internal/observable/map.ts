import { Observable } from '../Observable'
import { OperatorFunction } from '../Type'

export function map<T, R>(
  project: (value: T, index: number) => R
): OperatorFunction<T, R> {
  return (source) =>
    new Observable((subscribe) => {
      let index = 0
      source.subscribe({
        next(val) {
          subscribe.next(project(val, index++))
        },
        error(err) {
          subscribe.error(err)
        },
        complete() {
          subscribe.complete()
        },
      })
    })
}
