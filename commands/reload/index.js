exports.func = (client, msg, args) => {
  client.commands = client.config.requireCommand(client);
  return msg.channel.send('commands reloaded');
}