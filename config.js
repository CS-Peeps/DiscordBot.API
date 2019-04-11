
const config = {};

config.discord = {
  botKey: process.env.DISCORD_BOT || null
};

config.steam = {
  apiKey: process.env.STEAM_API_KEY || null
};

config.mongodb = {
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/discord-bot"
};

module.exports = config;
