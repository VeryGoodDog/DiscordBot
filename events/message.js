module.exports = (client, msg) => {
  if (msg.author.bot) return

  client.guildsDB.get(msg.guild.id, (err, guildConfig) =>{
    if (err) return console.error(err)
    let prefix = guildConfig.prefix
    if (!msg.content.startsWith(prefix)) return
    try {
      client.helpers.getCommand(client, msg)
    } catch (err) {
      console.error(err)
    }
  });
}