exports.func = (client, msg, args) => {
  if (args) {
    let helps = getOneHelp(client,args);
    return msg.channel.send(`${helps.usage}:\n${helps.description}.`)
  } else {
    let helps = {};
    helps = getAllHelp(client.commands, helps);
  }

  function getAllHelp(coms, helps) {
    console.log('coms: ', coms);
    for (var comName in coms) {
      com = coms[comName];
      // console.log('comName: ', comName,'\ncom: ', com);
      helps[comName] = {};
      helps[comName] = findHelp(com, comName)
    }
    // console.log('helps: ', helps);
    return helps;
  }

  function findHelp(com, comName) {
    let helps = com.help;
    if (com.subCom) {
      helps.subCom = {};
      helps.subCom = getAllHelp(com.subCom, helps)
    }
    console.log('com.help: ', com.help);
    return helps;
  }
}