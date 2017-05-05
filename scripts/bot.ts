/**
 * Created by KaiLx on 2017/05/03.
 */
let Botkit = require('botkit');
import Logger from './logger';
import * as Monitor from './logMonitor'
import * as Moment from 'moment';

Logger.info('ArmyBot startup.');

if (process.env.BOT_TOKEN == null) {
    Logger.error('BOT_TOKEN is not found in env.');
    console.log('起動変数、もしくは環境変数にBOT_TOKENが設定されていないため起動を中止します。');
    process.exit();
}

let slackbotConfig = {
    debug: process.env.ENV === "development"
};
Logger.debug(`slackbot's config: ${JSON.stringify(slackbotConfig)}`);
let controller = Botkit.slackbot(slackbotConfig);

let botControllerConfig = {
    token: process.env.BOT_TOKEN,
    retry: 500
};
Logger.debug(`bot controller config: ${JSON.stringify(botControllerConfig)}`);
let bot = controller.spawn(botControllerConfig);

bot.startRTM();
Logger.info('ArmyBot startup complete.');

export default controller;


if (process.env.MONITORING_TARGET_LOG_FILE != null) {
    Monitor.tailLog(process.env.MONITORING_TARGET_LOG_FILE, errorLog => {
        Logger.info("Send error log by snippet.");
        Logger.info(`target channels: ${process.env.POSTING_DESTINATION}`);
        Logger.info(`content: ${errorLog}`);
        let obj = {
            channels: process.env.POSTING_DESTINATION,
            content: errorLog,
            title: `Catch Exception ${Moment().format('YYYY-MM-DD HH:mm:SS')}`
        };
        bot.api.files.upload(obj, (err, res) => {
            if (err) {
                Logger.error(err);
            }
        });
    });
}
