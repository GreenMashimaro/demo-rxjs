import { TimestampProvider } from '../Type'

interface DateTimestampProvider extends TimestampProvider {
  delegate: TimestampProvider | undefined
}

export const dateTimestampProvider: DateTimestampProvider = {
  now(): number {
    return (dateTimestampProvider.delegate || Date).now()
  },
  delegate: undefined,
}
