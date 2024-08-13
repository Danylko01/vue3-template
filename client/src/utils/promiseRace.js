function promiseRace(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			return reject(new TypeError('argument must be array'))
		}
		for (let promise of promises) {
			Promise.resolve(promise).then(resolve).catch(reject)
		}
	})
}

const pro1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 500, 'one')
})

const pro2 = new Promise((resolve, reject) => {
	setTimeout(resolve, 100, 'two')
})

const pro3 = new Promise((resolve, reject) => {
	setTimeout(reject, 100, 'three')
})
promiseRace([pro1, pro2, pro3]).then((value) => {
	console.log('value', value)
}).catch((error) => {
	console.log('error', error)
})
