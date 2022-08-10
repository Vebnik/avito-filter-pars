import {Context} from "telegraf";
import {Message, Update} from "typegram";


class EventHandler {

	public messageEvent(context: Context<Update>) {
		//console.log(context.message)
	}

	public commandEvent(context: Context<Update>) {
		//console.log(context)
	}
}

export default new EventHandler()