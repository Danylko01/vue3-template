class EventEmitter {
	constructor() {
		this.events = {}
	}
	// 注册事件监听器
	on(event, listener) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(listener)
	}
	// 注销事件监听器
	off(event, listener) {
		if (!this.events[event]) {
			return 
		}
		this.events[event] = this.events[event].filter( l => l !== listener )
	}
	// 触发事件
	on(event, ...args) {
		if (!this.events[event]) {
			return 
		}
		this.events[event].forEach((listener) => {
			listener(...args)
		})
	}
}
