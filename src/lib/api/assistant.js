import GoogleAssistant from 'google-assistant';
import path from 'path';
import { load } from 'cheerio'

const __dirname = path.join(path.resolve(path.dirname('')), './src');

let config = {
    auth: {
        keyFilePath: path.resolve(__dirname, 'client_secret.json'),
        savedTokensPath: path.resolve(__dirname, 'tokens.json'),
    }
};

var assistantReady = false;

var assistant = new GoogleAssistant(config.auth, () => {
  assistantReady = true;
  console.log("New Assistant Ready");
});

export function getAssistant() {
  let p = new Promise((resolve, reject) => {
    if (assistantReady) {
      resolve(assistant);
    } else {
      assistant.on('ready', () => {
        resolve(assistant);
      });
    }
  });
  return p;
}

export function assist(query) {
  let p = new Promise((resolve, reject) => {
    getAssistant().then((assistant) => {
      let conversationConf = {
        lang: 'en-CA', // language code for input/output (defaults to en-US)
        textQuery: query, // if this is set, audio input is ignored
        isNew: true, // set this to true if you want to force a new conversation and ignore the old state
        screen: {
            isOn: true // set this to true if you want to output results to a screen
        }
      };
      assistant.start(conversationConf, (conversation) => {
        conversation.on('screen-data', (screen) => {
          let $ = load(screen.data.toString());
          resolve($('.show_text_content').text());
        });
      })
    });
  });
  return p;
}
