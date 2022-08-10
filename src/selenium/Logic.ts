import {By, Browser, Builder, ThenableWebDriver, WebElement} from 'selenium-webdriver'
import {Options} from "selenium-webdriver/chrome";
import {Preferences} from "selenium-webdriver/lib/logging";

class Logic {

	private static readonly chromeOptionArgv = ['--disable-logging', '--log-level=3', '--headless']

	private readonly driver: ThenableWebDriver

	private logging = new Preferences()

	private chromeOptions: Options = new Options()
		.addArguments(...Logic.chromeOptionArgv)
		.excludeSwitches('enable-logging')

	constructor(identity: string) {

		console.log(`Created driver ${identity}`)

		this.driver = new Builder()
			.setChromeOptions(this.chromeOptions)
			.forBrowser(Browser.CHROME)
			.setLoggingPrefs(this.logging)
			.build()

		this.driver.manage()
			.setTimeouts({implicit: 5})
			.catch(err => console.error(err))
	}

	public async get(url: string) {
		await this.driver.get(url)
	}

	public async querySelector(selector: string): Promise<WebElement> {
		return this.driver.findElement(By.css(selector))
	}

	public async querySelectorAll(selector: string): Promise<WebElement[]> {
		return this.driver.findElements(By.css(selector))
	}

	public getDriver(): ThenableWebDriver {
		return this.driver
	}

}

export default Logic