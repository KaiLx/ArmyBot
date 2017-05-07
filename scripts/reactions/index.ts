/**
 * Created by KaiLx on 2017/05/05.
 */
import * as App from "../app";
import * as Monitor from "../util/logMonitor";
import Logger from "../util/logger";
import * as Moment from "moment";
import * as Q from "q";

export namespace reaction {
    class StoredData {
        id: any;
        mentionTargets: Array<string>;
        tailTarget: string;
    }
    // App.bot.api.users.list({}, (err, response) => {
    //     console.log(err);
    //     console.log(response);
    // });
    App.controller.hears('ログ監視開始', ['direct_mention'], (bot, message) => {
        
        let d = Q.defer();
        App.controller.storage.channels.get(message.channel, (err, storedData) => {
            if (err) {
                d.reject(err);
                return;
            }
            Logger.debug(`storedData is null?: ${storedData == null}`);
            if (storedData != null) {
                Logger.debug(JSON.stringify(storedData));
                d.resolve(storedData);
                return;
            }
        });

        bot.startConversation(message, (err, conversation) => {
            var arr = ['誰にメンションを送りますか？', 'どのログファイルを監視しますか？'];
            
            Q.when('', conversation)
            .then();
            
            
            let d = Q.defer();
            
            conversation.addQuestion('really?', (res, conversation) => {
                Logger.debug('first callback');
                conversation.say(`oh, ${res.text}`);
                conversation.next();

                conversation.addQuestion('what?', (res, conversation) => {
                    Logger.debug('second callback');
                    conversation.say(`oh, ${res.text}`);
                    conversation.next();
                });
            });
        });
        // let data = new StoredData();
        // data.id = message.channel;
        // data.mentionTargets = ['kailx'];
        // data.tailTarget = '/tmp/temp.log';
        // App.controller.storage.channels.save(data, (err) => {
        //     Logger.error(`tail parameter stored failure. response: ${JSON.stringify(err)}`);
        // });

        
    });
    
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
            App.bot.api.files.upload(obj, (err, res) => {
                if (err) {
                    Logger.error(err);
                }
            });
        });
    }

    function checkStoredParameters(channelId: string) {
        let d = Q.defer();
        App.controller.storage.channels.get(channelId, (err, storedJson) => {
            
        });
    }

    function inputTailParameters(question: string, conversation) {
        let d = Q.defer();
        conversation.addQuestion(question, (res, conversation) => {
            if (!res.text) {
                // conversation.say('各入力は必須項目です。');
                d.reject(`input is null res.text: ${res.text}`);
            } else {
                d.resolve(res.text);
                conversation.next();
            }
        });
        return d.promise;
    }
}