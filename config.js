
const config = {};

config.discord = {
  botKey: process.env.DISCORD_BOT || null
};

config.steam = {
  apiKey: process.env.STEAM_API_KEY || null
};

config.mongodb = {
  uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/discord-bot"
};

module.exports = config;
