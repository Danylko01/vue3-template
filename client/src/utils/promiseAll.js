function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			return reject(new TypeError('argument must be an array'))
		}
		const results = []
		let completed = 0
		promises.forEach((promise, index) => {
			Promise.resolve(promise).then((value) => {
				results[index] = value;
				completed++
				if (completed === promises.length) {
					resolve(results)
				}
			}).catch((error) => {
				reject(error)
			})
		})
		if (promises.length === 0) {
			resolve(results)
		}
	}) 
} 


const pro1 = Promise.resolve(42)
const pro2 = 32
const pro3 = new Promise((resolve, reject) => {
	setTimeout(reject, 100, 'foo')
})

promiseAll([pro1, pro2, pro3]).then((res) => {
	console.log("res", res)
}).catch((error) => {
	console.log("error", error)
})

