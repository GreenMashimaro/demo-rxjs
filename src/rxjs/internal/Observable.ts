import { Observer, OperatorFunction, Subscribable, TeardownLogic } from './Type'
import { Subscriber } from './Subscriber'
import { Subscription } from './Subscription'
import { pipeFromArray } from '../util/pipe'

export class Observable<T> implements Subscribable<T> {
  constructor(
    subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic
  ) {
    if (subscribe) {
      this._subscribe = subscribe
    }
  }

  public subscribe(observerOrNext: Partial<Observer<T>>): Subscription {
    const subscriber =
      observerOrNext instanceof Subscriber
        ? observerOrNext
        : new Subscriber(observerOrNext)

    subscriber.add(this._trySubscribe(subscriber))

    return subscriber
  }

  public pipe<A>(op1: OperatorFunction<T, A>): Observable<A>
  public pipe<A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>
  public pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>
  public pipe<A, B, C, D>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>
  ): Observable<D>
  public pipe<A, B, C, D, E>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>
  ): Observable<D>
  public pipe<A, B, C, D, E, F>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>
  ): Observable<F>
  public pipe<A, B, C, D, E, F, G>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>
  ): Observable<G>
  public pipe<A, B, C, D, E, F, G, H>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>
  ): Observable<H>
  public pipe<A, B, C, D, E, F, G, H, I>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>,
    op4: OperatorFunction<C, D>,
    op5: OperatorFunction<D, E>,
    op6: OperatorFunction<E, F>,
    op7: OperatorFunction<F, G>,
    op8: OperatorFunction<G, H>,
    op9: OperatorFunction<H, I>
  ): Observable<I>
  public pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    return pipeFromArray(operations)(this)
  }

  protected _subscribe(_subscriber: Subscriber<any>): TeardownLogic {
    return
  }

  protected _trySubscribe(sink: Subscriber<T>): TeardownLogic {
    try {
      return this._subscribe(sink)
    } catch (err) {
      sink.error(err)
    }
  }
}
