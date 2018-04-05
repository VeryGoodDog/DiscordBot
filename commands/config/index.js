exports.func = (client, msg, args) => {
  client.guildsDB.get(msg.guild.id,(err,guildConfig) => {
    if (err) return console.error(err)
    let configs = ''
    for (var v in guildConfig) {
      configs += `${v}:${JSON.stringify(guildConfig[v])}\n`
    }
    msg.channel.send(configs)
  });
}