import { Scheduler } from './Scheduler'
import { Action } from './Action'
import { AsyncAction } from './AsyncAction'

export class AsyncScheduler extends Scheduler {
  constructor(SchedulerAction: typeof Action, now: () => number = Scheduler.now) {
    super(SchedulerAction, now)
  }

  public flush(action: AsyncAction<any>): void {
    action.execute(action.state, action.delay)
  }
}
