import { Observable } from '../Observable'
import { MonoTypeOperatorFunction, SchedulerLike } from '../Type'
import { executeSchedule } from '../util/executeSchedule'
import { createOperatorSubscriber } from './OperatorSubscriber'

export function observeOn<T>(
  scheduler: SchedulerLike,
  delay = 0
): MonoTypeOperatorFunction<T> {
  return (source) =>
    new Observable((subscriber) => {
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            executeSchedule(subscriber, scheduler, () => subscriber.next(value), delay)
          },
          () => {
            executeSchedule(subscriber, scheduler, () => subscriber.complete(), delay)
          },
          (err) => {
            executeSchedule(subscriber, scheduler, () => subscriber.error(err), delay)
          }
        )
      )
    })
}
