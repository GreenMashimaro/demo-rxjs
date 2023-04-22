import { Observable } from './Observable'
import { Subscription } from './Subscription'
import { Subscriber } from './Subscriber'
import { Observer, SubscriptionLike } from './Type'

export class Subject<T> extends Observable<T> implements SubscriptionLike {
  private _closed = false

  private _observerCounter = 0
  private currentObservers = new Map<number, Observer<T>>()
  private observerSnapshot: Observer<T>[] | undefined
  private get observers(): Observer<T>[] {
    return (this.observerSnapshot ??= Array.from(this.currentObservers.values()))
  }

  constructor() {
    super()
  }

  public get closed() {
    return this._closed
  }

  public unsubscribe(): void {
    throw new Error('Method not implemented 1.')
  }

  public next(value: T) {
    if (this._closed) {
      return
    }

    const observers = this.observers
    observers.forEach((observer) => {
      observer.next(value)
    })
  }

  public error(err: any) {
    if (this._closed) {
      return
    }
    this._closed = true

    const observers = this.observers
    observers.forEach((observer) => {
      observer.error(err)
    })
  }

  public complete() {
    if (this._closed) {
      return
    }
    this._closed = true

    const observers = this.observers
    observers.forEach((observer) => {
      observer.complete()
    })
  }

  protected _subscribe(subscribe: Subscriber<T>): Subscription {
    return this._innerSubscribe(subscribe)
  }

  private _innerSubscribe(subscribe: Subscriber<T>): Subscription {
    const observerId = this._observerCounter++
    this.currentObservers.set(observerId, subscribe)

    return subscribe
  }
}
