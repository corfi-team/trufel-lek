const Discord = require("discord.js");
const config = require("./config.js");
const moment = require("moment")
const { Client } = require("discord.js");
moment.locale("EN")
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});
client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["commands", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.login(config.token)