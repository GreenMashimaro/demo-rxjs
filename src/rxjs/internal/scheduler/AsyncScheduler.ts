import { Scheduler } from './Scheduler'
import { Action } from './Action'
import { AsyncAction } from './AsyncAction'

export class AsyncScheduler extends Scheduler {
  public _active: boolean = false
  public actions: Array<AsyncAction<any>> = []

  constructor(SchedulerAction: typeof Action, now: () => number = Scheduler.now) {
    super(SchedulerAction, now)
  }

  public flush(action: AsyncAction<any>): void {
    const actions = this.actions
    if (this._active) {
      this.actions.push(action)
      return
    }

    let error: any

    this._active = true
    do {
      error = action.execute(action.state, action.delay)
      if (error) {
        break
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } while ((action = actions.shift()!))
    this._active = false

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      while ((action = actions.shift()!)) {
        action.unsubscribe()
      }

      throw error
    }
  }
}
