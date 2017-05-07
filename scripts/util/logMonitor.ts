/**
 * Created by KaiLx on 2017/05/04.
 */
import Logger from './logger'
let Tail = require('tail').Tail;

let monitor = null;
let errorLogs: string[] = [];

export function tailLog(path: string, callback: (string) => void) {
    monitor = new Tail(path);
    let error: boolean = false;
    monitor.on('line', data => {
        // 例外stackTrace開始判定
        if (isBeginErrorStackTrace(error, data)) {
            Logger.debug("Found exception.");
            error = true;
        }

        if (isEndErrorStackTrace(error, data)) {
            Logger.debug("Error stacktrace end.");
            error = false;
            // エラーのstacktraceと判定した文字列を呼び出し元に返す
            callback(errorLogs.join('\n'));

            // 収集したエラーログを廃棄
            errorLogs = [];
        }

        if (error) {
            Logger.debug("Collecting stacktrace.");
            errorLogs.push(data);
        }
    });
    monitor.watch();
}

function isBeginErrorStackTrace(error: boolean, row: string): boolean {
    return !error 
        && /exception/i.test(row)
        && !/\/heapdump/.test(row)
        && !/ExceptionTranslationFilter/.test(row);
}

function isEndErrorStackTrace(error: boolean, row: string): boolean {
    return error && row == '';
}