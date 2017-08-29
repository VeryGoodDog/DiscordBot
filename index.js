const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.config = require('./config/config.json');

client.helpers = {};
client.helpers.getCommand = require('./helpers/getCommand.js');
client.helpers.requireCommand = require('./helpers/requireCommand.js')

const simpleDB = require('./helpers/simpleDB.js');
options = {
  name: 'guilds',
  path: `${client.config.root}/data`
}

client.on('ready', () => {
  const guildsDB = new simpleDB(options);

  guildsDB.on('ready', () => {
    const defaults = require('./config/defaults.json');
    for (v of client.guilds) {
      guildID = v[0];
      guildsDB.set(guildID, defaults).then(() => {
        client.commands = client.helpers.requireCommand(client);
        console.log('PEPPER ready');
      });
    }
    client.guildsDB = guildsDB;
  });
});

client.on('message', msg => {
  if (msg.author.bot) return;

  client.guildsDB.get(msg.guild.id).then(val =>{
    val = JSON.parse(val);
    if (!msg.content.startsWith(val.prefix)) return;
    try {
      client.helpers.getCommand(client, msg);
    } catch (err) {
      console.error(err);
    }
  });
});

client.login(client.config.devtoken);