const fs = require('fs');

module.exports = (client) => {
  client.commands = {}
  // console.log(client.commands);
  const comPath = `${client.config.root}/commands`;

  const commands = addFuncAndConfig(comPath);

  function addFuncAndConfig(dir) {
    let commandObj = {};
    // console.log('\n');
    // console.log('commandObj exists: ', !!commandObj);
    // console.log('\n\ncommandObj pre fn: ', commandObj);
    dirs = fs.readdirSync(dir);
    // console.log('dir: ',dir);
    for (v of dirs) {
      if (v.includes('.')) continue;
      let index = `${dir}/${v}`;
      // console.log('index: ', index);
      commandObj[v] = {};
      commandObj[v] = getFuncAndConfig(index, commandObj);
    }
    // console.log('\n\ncommandObj post fn: ',commandObj);
    // console.log('\n');
    return commandObj;
  }

  function getFuncAndConfig(index) {
    delete require.cache[require.resolve(`${index}/index.js`)];
    let commandObj = {};
    commandObj = require(`${index}/index.js`);
    commandObj.config = require(`${index}/config.json`);
    commandObj.help = require(`${index}/help.json`);

    subComDir = `${index}/subCom`;
    if (fs.existsSync(subComDir)) {
      commandObj.subCom = {};
      commandObj.subCom = addFuncAndConfig(subComDir, commandObj.subCom);
    }
    // console.log('\n\ncommandObj: ',commandObj);
    return commandObj;
  }
  // console.log(commands);
  client.commands = commands
}