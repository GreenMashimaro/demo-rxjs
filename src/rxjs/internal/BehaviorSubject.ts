import { Subject } from './Subject'
import { Subscriber } from './Subscriber'
import { Subscription } from './Subscription'

export class BehaviorSubject<T> extends Subject<T> {
  constructor(private _value: T) {
    super()
  }

  public get value(): T {
    return this._value
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber)
    subscriber.next(this._value)
    return subscription
  }
}
