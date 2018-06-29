// Discord Bot
require('./config/config');
require('./utils/console.js');



//Discord Bot load file
if(!process.env.DEVELOPMENT_BOT || process.env.DEVELOPMENT_BOT === 'true') {
    require('./discordBot');
  } else {
    consoleInfo('Discord Development Bot Disabled');
}