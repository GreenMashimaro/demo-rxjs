import { Observable } from '../rxjs'

export default function () {
  const now = new Date().getTime()

  // 创建流
  const stream$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next([1, 2, 3])
    }, 500)
    setTimeout(() => {
      subscriber.next({ a: 1000 })
    }, 1000)
    setTimeout(() => {
      subscriber.next('end')
    }, 3000)
    setTimeout(() => {
      subscriber.complete()
    }, 4000)
  })

  // 启动流
  const subscription1 = stream$.subscribe({
    complete: () => console.log('done'),
    next: (v) => console.log(new Date().getTime() - now, 'ms stream1', v),
    error: () => console.log('error'),
  })

  //  延时1s后，启动流
  setTimeout(() => {
    subscription1.unsubscribe()
  }, 1000)
}
