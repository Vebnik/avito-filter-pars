import {Telegraf} from "telegraf";

class MessageUtils {

	private client = new Telegraf(
		process.env.TOKEN_TG
			? process.env.TOKEN_TG
			: 'null'
	)

	constructor() {
		this.onLaunch()
		this.onMessage()
	}

	public sendDmMessage(chatId: string, message: string) {
		this.client.telegram.sendMessage(chatId, message)
			.catch(err => console.error(err))
	}

	private onMessage() {
		this.client.on('message', () => {
			console.log('Incoming msg')
		})
	}

	private onLaunch() {
		this.client.launch()
			.then(() => console.log('TG app started'))
			.catch(err => console.error(err))
	}

}

export default new MessageUtils()