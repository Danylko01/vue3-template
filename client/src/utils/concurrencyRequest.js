import axios from 'axios'

const concurrencyRequest = async (urls, maxConcurrent) => {
	const pool = []
	const results = new Array(urls.length)
	let i = 0
	const fetchUrl = async (url, index) => {
		const response = await axios.get(url)
		results[index] = response.data
	}
	while(i < urls.length) {
		while(pool.length < maxConcurrent && i < urls.length) {
			const currentIndex = i
			const url = urls[i++]
			const promise = fetchUrl(url, currentIndex).then(() => {
				pool.splice(pool.indexOf(promise), 1)
			})
			pool.push(promise)
		}
		await Promise.race(pool)
	}
	await Promise.all(pool)
	return results
}

const urls = [
	'https://jsonplaceholder.typicode.com/todos/1',
	'https://jsonplaceholder.typicode.com/todos/2',
	'https://jsonplaceholder.typicode.com/todos/3',
	'https://jsonplaceholder.typicode.com/todos/4',
	'https://jsonplaceholder.typicode.com/todos/5',
	'https://jsonplaceholder.typicode.com/todos/6',
	'https://jsonplaceholder.typicode.com/todos/7',
]
concurrencyRequest(urls, 2).then((res) => {
	console.log("res", res)
})
// export default concurrencyRequest
