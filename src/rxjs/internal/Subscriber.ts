import { Subscription } from './Subscription'
import { Observer } from './Type'

export class Subscriber<T> extends Subscription implements Observer<T> {
  protected isStopped: boolean = false
  protected destination: Observer<T>

  public closed = false

  constructor(destination: Subscriber<T> | Partial<Observer<T>>) {
    super()
    this.destination =
      destination instanceof Subscriber ? destination : createSafeObserver(destination)
  }

  public next(value: T): void {
    if (this.isStopped) {
      return
    }
    this._next(value)
  }

  public error(err: any): void {
    if (this.isStopped) {
      return
    }

    this.isStopped = true
    this._error(err)
  }
  public complete(): void {
    if (this.isStopped) {
      return
    }

    this.isStopped = true
    this._complete()
  }

  public unsubscribe(): void {
    if (this.closed) {
      return
    }

    this.closed = true
    this.isStopped = true
  }

  protected _next(value: T): void {
    this.destination.next(value)
  }

  protected _error(err: any): void {
    this.destination.next(err)
  }

  protected _complete(): void {
    this.destination.complete()
  }
}

function createSafeObserver<T>(observerOrNext: Partial<Observer<T>>): Observer<T> {
  return {
    next(value) {
      if (observerOrNext.next) {
        observerOrNext.next(value)
      }
    },
    complete() {
      if (observerOrNext.complete) {
        observerOrNext.complete()
      }
    },
    error(err: any) {
      if (observerOrNext.error) {
        observerOrNext.error(err)
      }
    },
  }
}
