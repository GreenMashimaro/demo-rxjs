import { TeardownLogic, Unsubscribable } from './Type'

export class Subscription implements Unsubscribable {
  public add(teardown: TeardownLogic) {
    if (teardown && teardown !== this) {
      // dd
    }
  }

  public unsubscribe(): void {
    throw new Error('Method not implemented.')
  }
}
