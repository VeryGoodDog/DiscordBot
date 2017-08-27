const Discord = require('discord.js');
const client = new Discord.Client();

const PersistentCollection = require('djs-collection-persistent');

client.config = require('./config/config.json');

client.helpers = {};
client.helpers.getCommand = require('./helpers/getCommand.js');
client.helpers.requireCommand = require('./helpers/requireCommand.js')

client.on("guildCreate", guild => {
  guildSettings.set(guild.id, require('./config/defaults.json'));
});

client.on("guildDelete", guild => {
  guildSettings.delete(guild.id);
});

const guildSettings = new PersistentCollection({name: 'guildSettings'});

client.on('ready', () => {
  console.log('PEPPER ready!');
  for (k of client.guilds) {
    guild = k[1];
    if (!guildSettings.has(guild.id)) {
      guildSettings.set(guild.id, require('./config/defaults.json'));
    }
    configs = guildSettings.get(guild.id);
    console.log(configs);
  }
});

client.on('message', msg => {
  if (msg.author.bot) return;

  guildConfig = guildSettings.get(msg.guild.id);
  if (!msg.content.startsWith(guildConfig.prefix)) return;

  try {
    client.commands = client.helpers.requireCommand(client);
    client.helpers.getCommand(guildConfig, client, msg);
  } catch (err) {
    console.error(err);
  }
});

client.login(client.config.token);