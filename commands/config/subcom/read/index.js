exports.func = (client, msg, args) => {
  client.guildsDB.get(msg.guild.id).then(guildConfig => {
    guildConfig = JSON.parse(guildConfig);
    if (args) {
      val = guildConfig[args[0]]
      if (val) {
        val = JSON.stringify(guildConfig[args[0]])
        msg.channel.send(`this guilds ${args[0]} config is: ${val}`)
      } else {
        msg.channel.send(`no such config ${args[0]}`);
      }
    }
  });
}