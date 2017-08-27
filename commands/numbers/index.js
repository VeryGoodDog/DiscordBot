exports.func = (client, msg, args) => {
  msg.channel.send(`use ${guildConfig.prefix}numbers subtract [number] [number] to find [number] - [number]`);
}