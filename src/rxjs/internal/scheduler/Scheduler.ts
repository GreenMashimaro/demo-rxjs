import { Subscription } from '../Subscription'
import { SchedulerAction, SchedulerLike } from '../Type'
import { dateTimestampProvider } from './dateTimestampProvider'
import { Action } from './Action'

export class Scheduler implements SchedulerLike {
  public static now: () => number = dateTimestampProvider.now

  constructor(
    private schedulerActionCtor: typeof Action,
    now: () => number = Scheduler.now
  ) {
    this.now = now
  }

  public schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay: number,
    state?: T
  ): Subscription {
    return new this.schedulerActionCtor(this, work).schedule(state, delay)
  }

  public now: () => number
}
