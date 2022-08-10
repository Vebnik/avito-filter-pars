import Logic from './selenium/Logic'
import * as fs from "fs";
const rootUrl = (page) => `https://www.avito.ru/irkutsk/kvartiry/prodam/2-komnatnye/vtorichka-ASgBAQICAUSSA8YQAkDmBxSMUsoIFIJZ?cd=1&district=391-392-393&f=ASgBAQECAUSSA8YQAkDmBxSMUsoIFIJZAUXGmgwdeyJmcm9tIjoxMDAwMDAwLCJ0byI6NDUwMDAwMH0&p=${page}&s=104`


const getItem = async (page) => {

	const driver = new Logic('getItem')

	await driver.get(rootUrl(page))

	return await driver.querySelectorAll('[data-marker="item"]')
		.then(async webEls => {

			const urls = await driver.querySelectorAll('[data-marker="item-title"]')
				.then(async webEls => webEls.map(async el => await el.getAttribute('href')))

			await Promise.all(urls)

			const getDescription = webEls.map((el, index) => el.getText()
				.then(async str => {
					const splitDescription = str.split('\n')
					splitDescription.push(await urls[index])
					return splitDescription
				}))

			await Promise.all(getDescription)
			return getDescription
		})

}

const getPages = async () => {

	const driver = new Logic('getPages')

	await driver.get(rootUrl(1))

	return driver.querySelector('[data-marker="pagination-button"]')
		.then(webEl => webEl.getText()
			.then(str => str.split('.').at(-2).replace(/\D/gmi, '')))
}

const startApp = async () => {

	await getPages()
		.then(async pages => {

		const promiseArr = []

		for (let i = 1; i <= +pages; i++) {
			promiseArr.push(...(await getItem(i)))
		}

		await Promise.all(promiseArr)
		return promiseArr
	})
		.then(async fullField => {

			const convertToArrayFromPromise = []

			for (const el of fullField)
				convertToArrayFromPromise.push(await  el)

			await fs.writeFile('avito_home.json', JSON.stringify(convertToArrayFromPromise, null, 2), (err) => console.error(err))
		})

}

startApp().catch(err => console.error(err.message))