/*
 * @Description: 手写promise
 * @Author: Danylko
 * @Date: 2024-05-31 07:07:32
 * @LastEditTime: 2024-05-31 07:08:46
 */
class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach((callback) => callback(this.value))
      }
    }

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((callback) => callback(this.reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.state === 'pending') {
        this.onResolvedCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason)
              this.resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }

    let called = false

    if (x instanceof MyPromise) {
      x.then(
        (value) => {
          if (called) return
          called = true
          this.resolvePromise(promise2, value, resolve, reject)
        },
        (reason) => {
          if (called) return
          called = true
          reject(reason)
        }
      )
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            (value) => {
              if (called) return
              called = true
              this.resolvePromise(promise2, value, resolve, reject)
            },
            (reason) => {
              if (called) return
              called = true
              reject(reason)
            }
          )
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

// 使用示例
// eslint-disable-next-line
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!')
  }, 1000)
})

promise
  .then((value) => {
    console.log(value)
    return 123
  })
  .then((value) => {
    console.log(value)
    // eslint-disable-next-line
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('Another Promise')
      }, 1000)
    })
  })
  .then((value) => {
    console.log(value)
    throw new Error('Something went wrong')
  })
  .catch((error) => {
    console.log('Error:', error.message)
  })
