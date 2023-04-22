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
export type MonoTypeOperatorFunction<T> = OperatorFunction<T, T>

export interface SubscriptionLike extends Unsubscribable {
  readonly closed: boolean
}

export interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription
}

export interface SchedulerLike extends TimestampProvider {
  schedule<T>(
    work: (this: SchedulerAction<T>, state: T) => void,
    delay: number,
    state?: T
  ): Subscription
  schedule<T>(
    work: (this: SchedulerAction<T>, state: T) => void,
    delay: number,
    state: T
  ): Subscription
}

export interface TimestampProvider {
  now(): number
}
