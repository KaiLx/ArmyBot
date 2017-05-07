/**
 * Created by KaiLx on 2017/05/03.
 */
import Logger from './util/logger';
let Botkit = require('botkit');

Logger.info('ArmyBot startup.');

if (process.env.BOT_TOKEN == null) {
    Logger.error('BOT_TOKEN is not found in env.');
    console.log('起動変数、もしくは環境変数にBOT_TOKENが設定されていないため起動を中止します。');
    process.exit();
}

const slackbotConfig = {
    debug: process.env.ENV === "development",
    json_file_store: 'var/armybot_storage'
};
Logger.debug(`slackbot's config: ${JSON.stringify(slackbotConfig)}`);
export let controller = Botkit.slackbot(slackbotConfig);

const botControllerConfig = {
    token: process.env.BOT_TOKEN,
    retry: 500
};
Logger.debug(`bot controller config: ${JSON.stringify(botControllerConfig)}`);
export let bot = controller.spawn(botControllerConfig);

bot.startRTM();
Logger.info('ArmyBot startup complete.');

require('./reactions');
