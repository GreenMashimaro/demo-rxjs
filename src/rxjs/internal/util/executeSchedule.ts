import type { Subscription } from '../Subscription'
import { SchedulerAction, SchedulerLike } from '../Type'

export function executeSchedule(
  parentSubscription: Subscription,
  scheduler: SchedulerLike,
  work: () => void,
  delay = 0,
  repeat = false
): Subscription | void {
  const scheduleSubscription = scheduler.schedule(function (this: SchedulerAction<any>) {
    work()
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay))
    } else {
      this.unsubscribe()
    }
  }, delay)

  parentSubscription.add(scheduleSubscription)

  if (!repeat) {
    return scheduleSubscription
  }
}
