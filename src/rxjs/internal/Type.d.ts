import type { Observable } from './Observable'
import { Subscription } from './Subscription'

export interface Observer<T> {
  next: (value: T) => void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) => void

  complete: () => void
}

export interface Unsubscribable {
  unsubscribe(): void
}

export interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable
}

export type TeardownLogic = Subscription | Unsubscribable | (() => void) | void

export type ValueFromArray<A extends readonly unknown[]> = A extends Array<infer T>
  ? T
  : never

export interface UnaryFunction<T, R> {
  (source: T): R
}

export type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>

export interface SubscriptionLike extends Unsubscribable {
  readonly closed: boolean
}
