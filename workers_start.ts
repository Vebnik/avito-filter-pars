import * as cp from 'child_process'
import * as path from 'path'


const parsApp = () => {

	const worker = cp.fork(path.join('src', 'selenium', 'ParsItem.js'))

	worker.on('exit', (code, signal) => {
		console.log(`worker stop\nCode${code}\nSignal${signal}`)
	})

}; parsApp()
