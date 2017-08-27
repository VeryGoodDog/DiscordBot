const fs = require('fs');

module.exports = (client, msg, args) => {
  const comPath = `${client.config.root}/commands`;

  const commands = addFuncAndConfig(comPath, {});

  // console.log('commands: ',commands);

  function addFuncAndConfig(dir, commandObj) {
    // console.log('\n');
    // console.log('commandObj exists: ', !!commandObj);
    // console.log('commandObj pre fn: ', commandObj);
    dirs = fs.readdirSync(dir);
    // console.log('dir: ',dir);
    for (v of dirs) {
      if (v.includes('.')) continue;
      let index = `${dir}/${v}`;
      // console.log('index: ', index);
      commandObj[v] = {};
      commandObj[v] = getFuncAndConfig(index, commandObj);
    }
    // console.log('commandObj post fn: ',commandObj);
    // console.log('\n');
    return commandObj;
  }

  function getFuncAndConfig(index, commandObj) {
    delete require.cache[require.resolve(`${index}/index.js`)];
    commandObj = require(`${index}/index.js`);
    commandObj.config = require(`${index}/config.json`);
    commandObj.help = require(`${index}/help.json`);
    commandObj.help.usage = commandObj.help.usage.replace('%prefix%',  guildConfig.prefix)
    // console.log('commandObj: ',commandObj);

    subComDir = `${index}/subCom`;
    if (fs.existsSync(subComDir)) {
      commandObj.subCom = {};
      commandObj.subCom = addFuncAndConfig(subComDir, commandObj.subCom);
    }
    return commandObj;
  }

  return commands;
}