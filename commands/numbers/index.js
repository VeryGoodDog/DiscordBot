exports.func = (client, msg, args) => {
  msg.channel.send(`use ${client.config.prefix}numbers subtract [number] [number] to find [number] - [number]`);
}