import { TeardownLogic, Unsubscribable } from './Type'

export class Subscription implements Unsubscribable {
  public closed = false

  public static Empty = (() => {
    const empty = new Subscription()
    empty.closed = true
    return empty
  })()

  public add(teardown: TeardownLogic) {
    if (teardown && teardown !== this) {
      // dd
    }
  }

  public unsubscribe(): void {
    // nothing
  }
}
