/**
 * Created by KaiLx on 2017/05/04.
 */
import * as File from "fs";
import * as Path from "path";
import * as Winston from "winston";
require('winston-daily-rotate-file');

let logDir = process.env.BOT_LOG_OUTPUT_DIR || Path.resolve('.', 'logs');
if (!File.existsSync(logDir)) {
    console.log(`Not found log output directory. Create directory to '${logDir}'.`);
    File.mkdirSync(logDir);
}

let transports = [];

// コンソールに出力する設定を追加
transports.push(new (Winston.transports.Console)({
    level: 'verbose',
    timestamp: true,
    colorize: true,
    json: true,
    prettyPrint: true
}));

// ログファイルのローテート設定を追加
transports.push(
    new Winston.transports.DailyRotateFile({
        dirname: logDir,
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        level: process.env.ENV === 'development' ? 'debug' : 'info'
    })
);

export default new (Winston.Logger)({
    transports: transports,
    exceptionHandlers: transports,
    exitOnError: true
});