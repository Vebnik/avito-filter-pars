import Logic from './Logic'
import * as fs from 'fs'
import * as path from 'path'
import TempStore from "../database/TempStore";
import MessageUtils from "../telegram/bot-logic/utils/MessageUtils"


const checkDataItem = async (data: string[]) => {

	const newHome = () => {
		console.log(`NewHome\n${data.at(-1)}`)
		MessageUtils.sendDmMessage('978068405', data.join('\n'))

		TempStore.lastHome = data
	}

	const write = async () => {
		await fs.writeFile(
			path.join('src', 'database', 'avito_home.json'),
			JSON.stringify(data, null, 2),
			err => console.error(err)
		)
		return;
	}; write().catch(err => console.error(err))

	TempStore.lastHome.at(-1) === data.at(-1)
		? console.log('Current')
		: newHome()
}

const getFreshData = async () => {

	const driver = new Logic('ParsItem')

	await driver.get(process.env.ROOT_URL)

	const targetItem = await driver.querySelector('[data-marker="item"]')
		.then(async webEl => {

			const url = await driver.querySelector('[data-marker="item-title"]')
				.then(async webEl => webEl.getAttribute('href'))

			await Promise.all([url])

			return await webEl.getText()
				.then(async str => {
					const splitDescription = str.split('\n')
					splitDescription.push(url)
					return splitDescription
				})
		})

	await checkDataItem(targetItem)

	await driver.getDriver().quit()

};

setInterval(() => {
	getFreshData().catch(err => console.error(err))
}, 3*60*1000)