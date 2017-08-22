const Discord = require('discord.js');
const client = new Discord.Client();

client.config = require('./config/config.json');
client.config.getCommand = require('./config/getCommand.js');
client.config.requireCommand = require('./config/requireCommand.js')

client.on('ready', () => {
  console.log('PEPPER ready!');
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(client.config.prefix)) return;

  try {
    client.commands = client.config.requireCommand(client);
    client.config.getCommand(client, msg);
  } catch (err) {
    console.error(err);
  }
});

client.login(client.config.token);