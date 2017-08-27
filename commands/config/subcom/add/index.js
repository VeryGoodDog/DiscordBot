const PersistentCollection = require('djs-collection-persistent');

const guildSettings = new PersistentCollection({name: 'guildSettings'});

exports.func = (client, msg, args) => {
  console.log(client.guilds.get(msg.guild.id));
  console.log('guildSettings.get(msg.guild.id): ', guildSettings.get(msg.guild.id));
}