const fs = require('fs');

module.exports = (client) => {
  const simpleDB = require(`${client.config.root}/helpers/simpleDB.js`)
  options = {
    name: 'guildConfig',
    path: `${client.config.root}/data`
  }
  const guildsDB = new simpleDB(options)
  client.guildsDB = guildsDB

  client.guildsDB.on('ready', () => {
    const defaults = require(`${client.config.root}/config/defaults.json`)
    client.guilds.every(guild => {
      let guildID = guild.id
      client.guildsDB.get(guildID, (err,guildConfig) => {
        if (err) return console.error(err)
        console.log('guildConfig: ',guildConfig)
        if (!guildConfig || guildConfig === {}) {
          client.guildsDB.set(guildID, defaults, (err,guildConfig) => {
            if (err) return console.error(err)
          })
        }
      })
    })
  })
  client.helpers.requireCommand(client)

  fs.watch(`${client.config.root}/commands`, {recursive: true}, (eventType, filename) => {
    if(eventType !== 'change') return
    if (filename) {
      console.log('command saved updating: ',filename)
      client.helpers.requireCommand(client)
    }
  })
}