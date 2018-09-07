var mongoose = require('mongoose');

var SteamUserSchema = mongoose.Schema({
  discordUser: {
    type: String,
    required: true,
    trim: true
  },
  discordId: {
    type: String,
    required: true,
    trim: true
  },
  steamUsername: {
    type: String,
    required: true,
    trim: true
  },
  steamId: {
    type: String,
    required: true,
    trim: true
  }
});

SteamUserSchema.statics.findByDiscordId = function(id) {
  var SteamUser = this;

  return SteamUser.findOne({
    'discordId': id
  });
};

SteamUserSchema.methods.updateSteamAccount = function(name, id) {
  var SteamUser =this;
  return SteamUser.update({steamUsername: name, steamId: id});
};

var SteamUser = mongoose.model('SteamUser', SteamUserSchema);

module.exports = {SteamUser};