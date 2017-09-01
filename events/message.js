module.exports = (client, msg) => {
  if (msg.author.bot) return

  client.guildsDB.get(msg.guild.id).then(guildConfig =>{
    guildConfig = JSON.parse(guildConfig)
    if (!msg.content.startsWith(guildConfig.prefix)) return
    try {
      client.helpers.getCommand(client, msg)
    } catch (err) {
      console.error(err)
    }
  });
}