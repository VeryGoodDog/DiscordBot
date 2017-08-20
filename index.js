const Discord = require('discord.js');
const client = new Discord.Client();

client.config = require('./config.json');

client.config.getCommand = (client, msg, args, com) => {
  if (!args) {
    let preArgs = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    var args = preArgs[0] ? preArgs : null;
  }
  if (!com) {
    var com = require(`./commands/${args.shift().toLowerCase()}.js`);
  }
  let arg = args[0];
  console.log('command: ', com.config.name, '\nargs: ', args, '\narg: ', !!arg);
  if (com.subCom && com.subCom[arg]) {
    console.log('subCom');
    args.shift();
    client.config.getCommand(client, msg, args, com.subCom[arg]);
  } else if (com.func) {
    if(com.config.minArgs === null ? false : (com.config.minArgs > args.length)) return msg.channel.send('you need more args');
    if(args[0] === undefined) args = null;
    console.log(args);
    com.func(client, msg, args);
  }
}

client.on('ready', () => {
  console.log('PEPPER ready!');
});

client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(client.config.prefix)) return;

  // console.log('test');

  try {
    client.config.getCommand(client, msg);
  } catch (err) {
    console.error(err);
  }
});

client.login(client.config.token);