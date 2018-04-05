exports.func = (client, msg, args) => {
  client.guildsDB.get(msg.guild.id,(err,guildConfig) => {
    if (err) return console.error(err)
    if (!guildConfig[args[0]]) {
      return msg.channel.send(`${args[0]} does not exist`)
    }
    client.guildsDB.del(msg.guild.id, args[0]).then(pass => {
      console.log('pass: ',pass)
    })
  })
}