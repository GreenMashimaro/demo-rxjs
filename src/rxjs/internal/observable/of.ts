import { Observable } from '../Observable'
import { fromArrayLike } from './from'
import { ValueFromArray } from '../Type'

export function of<T>(): Observable<never>
export function of<A extends readonly unknown[]>(
  ...values: A
): Observable<ValueFromArray<A>>

export function of<T>(...values: T[]): Observable<T> {
  return fromArrayLike<T>(values)
}
