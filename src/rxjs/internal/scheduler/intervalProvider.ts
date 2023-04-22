import type { TimerHandler } from './timerHandler'

type SetIntervalFunction = (
  handler: () => void,
  timeout?: number,
  ...args: any[]
) => TimerHandler

type ClearIntervalFunction = (handle: TimerHandler) => void

interface IntervalProvider {
  setInterval: SetIntervalFunction
  clearInterval: ClearIntervalFunction
  delegate:
    | {
        setInterval: SetIntervalFunction
        clearInterval: ClearIntervalFunction
      }
    | undefined
}

export const intervalProvider: IntervalProvider = {
  setInterval(handler: () => void, timeout?: number, ...args) {
    const delegate = intervalProvider.delegate
    if (delegate?.setInterval) {
      return delegate.setInterval(handler, timeout, ...args)
    }
    return setInterval(handler, timeout, ...args)
  },

  clearInterval(handle) {
    const delegate = intervalProvider.delegate
    if (delegate?.clearInterval) {
      delegate.clearInterval(handle)
      return
    }
    return clearInterval(handle)
  },

  delegate: undefined,
}
