exports.func = (client, msg, args) => {
  client.guildsDB.get(msg.guild.id, (err,guildConfig) => {
    if (err) return console.error(err)
    console.log(guildConfig);
    if (guildConfig[args[0]]) {
      return msg.channel.send(`${args[0]} already exists`)
    }
    guildConfig[args[0]] = args[1]
    console.log(guildConfig);
    client.guildsDB.set(msg.guild.id, guildConfig, (err,newGuildConfig) => {
      if (err) return console.error(err)
      console.log('newGuildConfig: ',newGuildConfig);
      if (newGuildConfig[args[0]] === args[1]) {
        msg.channel.send(`set ${args[0]} to ${args[1]}`)
      }
    })
  });
}