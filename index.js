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
    guildsDB.set('guild','text stuff').then(() => {
      guildsDB.get('guild').then(val => {
        console.log('returned ',val);
        client.guildsDB = guildsDB;
      });
    });
  });
});

client.on('message', msg => {

  if (msg.author.bot) return;
  if (!msg.content.startsWith(settingsStore.get(msg.guild.id).prefix)) return;
  try {
    client.helpers.getCommand(client, msg);
  } catch (err) {
    console.error(err);
  }
});

client.login(client.config.devtoken);