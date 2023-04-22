import { Subscription } from '../Subscription'
import { SchedulerAction } from '../Type'
import { Scheduler } from './Scheduler'

export class Action<T> extends Subscription {
  constructor(scheduler: Scheduler, work: (this: SchedulerAction<T>, state?: T) => void) {
    super()
  }

  public schedule(state?: T, delay: number = 0): Subscription {
    return this
  }
}
