const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
client.config = require('./config/config.json')

fs.readdir(`${client.config.root}/helpers`,(err, paths) => {
  if (err) console.error(err)

  client.helpers = {}
  for (path of paths) {
    let name = path.split('.')[0]
    const helper = require(`./helpers/${path}`)
    client.helpers[name] = helper
    console.log(`bound ${path} to helper ${name}.`)
    delete require.cache[require.resolve(`./helpers/${path}`)]
  }
})

fs.readdir(`${client.config.root}/events`,(err, paths) => {
  if (err) console.error(err)

  for (path of paths) {
    let name = path.split('.')[0]
    const event = require(`./events/${path}`)
    client.on(name, event.bind(null, client))
    console.log(`bound ${path} to event ${name}.`)
    delete require.cache[require.resolve(`./events/${path}`)]
  }
})
client.login(client.config.devtoken)