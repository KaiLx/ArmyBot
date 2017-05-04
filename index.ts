/**
 * Created by KaiLx on 2017/05/03.
 */
let Botkit = require('botkit');
import Logger from './scripts/logger';
import * as Monitor from './scripts/logMonitor'
import * as Moment from 'moment';

// xoxb-178103882658-Q3Os1XqvepDfVbTBp0Gcwlzw
let controller = Botkit.slackbot({
    debug: process.env.ENV === "development"
});
let bot = controller.spawn({
    token: process.env.BOT_TOKEN,
    retry: 500
});

bot.startRTM();

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
