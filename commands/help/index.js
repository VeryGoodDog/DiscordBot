exports.func = (client, msg, args) => {
  client.guildsDB.get(msg.guild.id,(err,guild) => {
    if (err) return console.error(err)
    let commands = client.helpers.clone(client.commands)

    if (args) {
      arg = args.shift()
      if (!commands[arg]) return
      let helps = getOneHelp(commands[arg],args)
      console.log('helps: ',helps)
      return msg.channel.send(`${helps.usage.replace('%prefix%',guild.prefix)}:\n${helps.description}.`)
    } else {
      let mainHelps = getAllHelp(commands)
      let helpMessage = formMainHelp(0,mainHelps)
      return msg.channel.send(helpMessage)
    }

    function getOneHelp(com, args) {
      if (!args[0]) return com.help
      arg = args.shift()
      if (!com.subCom[arg]) return com.help
      return getOneHelp(com.subCom[arg],args)
    }

    function getAllHelp(coms) {
      let allHelps = {}
      for (var name in coms) {
        com = coms[name]
        allHelps[name] = findHelp(com)
      }
      return allHelps
    }

    function findHelp(com) {
      let helps = com.help
      if (com.subCom) {
        helps.subCom = {}
        helps.subCom = getAllHelp(com.subCom)
      }
      return helps
    }

    function formMainHelp(depth,mainHelpObj) {
      let indent = ''
      for (var i = 0; i < depth; i++) {
        indent += '\t'
      }
      let levelsHelps = ''
      for (var key in mainHelpObj) {
        let currentHelp = mainHelpObj[key]
        let subComExists = typeof currentHelp.subCom !== 'undefined'
        levelsHelps += `${indent}**${currentHelp.usage.replace('%prefix%',guild.prefix)}**: ${currentHelp.shortDescription}\n`
        if (subComExists) {
          levelsHelps += `${formMainHelp(depth+1,currentHelp.subCom)}`
        }
      }
      return levelsHelps
    }
  })
}