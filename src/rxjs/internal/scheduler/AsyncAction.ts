import { Action } from './Action'
import { AsyncScheduler } from './AsyncScheduler'
import { SchedulerAction } from '../Type'
import { Subscription } from '../Subscription'
import type { TimerHandler } from './timerHandler'
import { intervalProvider } from './intervalProvider'

export class AsyncAction<T> extends Action<T> {
  public id: TimerHandler | undefined
  public state?: T
  // @ts-ignore: Property has no initializer and is not definitely assigned
  public delay: number
  public pending: boolean = false

  constructor(
    protected scheduler: AsyncScheduler,
    protected work: (this: SchedulerAction<T>, state?: T) => void
  ) {
    super(scheduler, work)
  }

  public schedule(state?: T, delay: number = 0): Subscription {
    if (this.closed) {
      return this
    }

    const scheduler = this.scheduler

    this.state = state
    this.delay = delay

    if (this.id) {
      this.id = this.recycleAsyncId(scheduler, this.id, delay)
    }

    this.pending = true

    this.id = this.id ?? this.requestAsyncId(scheduler, this.id, delay)

    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(state: T, _delay: number): any {
    if (this.closed) {
      return new Error('executing a cancelled action')
    }

    this.pending = false

    const error = this._execute(state)
    if (error) {
      return error
    } else if (this.pending === false && this.id !== null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null)
    }
  }

  public unsubscribe() {
    const scheduler = this.scheduler
    const id = this.id
    if (id) {
      this.id = this.recycleAsyncId(scheduler, id, null)
    }

    super.unsubscribe()
  }

  protected recycleAsyncId(
    _schedule: AsyncScheduler,
    id?: TimerHandler,
    delay: number | null = 0
  ): TimerHandler | undefined {
    if (delay !== null && this.delay === delay && this.pending === false) {
      return id
    }

    if (id) {
      intervalProvider.clearInterval(id)
    }

    return undefined
  }

  private _execute(state: T) {
    let errored: boolean = false
    let errorValue: any

    try {
      this.work(state)
    } catch (e) {
      errored = true
      errorValue = e ? e : new Error('Scheduled action threw falsy error')
    }
    if (errored) {
      this.unsubscribe()
      return errorValue
    }
  }

  private requestAsyncId(
    scheduler: AsyncScheduler,
    _id?: TimerHandler,
    delay: number = 0
  ): TimerHandler {
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay)
  }
}
