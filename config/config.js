var env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });

  process.env["BINANCE_API_KEY"] = config["STEAM_API_KEY"];
  process.env["BINANCE_API_SECRET"] = config["STEAM_API_KEY"];
  process.env["DEVELOPMENT_BOT"] = config["DEVELOPMENT_BOT"];
}
process.env["DISCORD_BOT"] = config["DISCORD_BOT"];
process.env["STEAM_API_KEY"] = config["STEAM_API_KEY"];
