const fs = require('fs');

module.exports = (client, msg, args) => {
  const comPath = `${client.config.root}/commands`;

  const commands = addFuncAndConfig(comPath);

  // console.log('commands: ',commands);

  function addFuncAndConfig(dir) {
    if (typeof commandObj === 'undefined') commandObj = {};
    dirs = fs.readdirSync(dir);
    // console.log('dir: ',dir);
    for (v of dirs) {
      if(v.includes('.')) continue;
      // console.log(`index: ${dir}/${v}`);
      commandObj[v] = {};
      delete require.cache[require.resolve(`${dir}/${v}/index.js`)];
      commandObj[v] = require(`${dir}/${v}/index.js`);
      commandObj[v].config = require(`${dir}/${v}/config.json`);

      // console.log(`v: ${v}`);
      // console.log(`commandObj[v]: `,commandObj[v]);

      subComDir = `${dir}/${v}/subCom`;
      // console.log(`subComDir: ${dir}/${v}/subCom`);
      if (fs.existsSync(subComDir)) {
        // console.log(`commandObj[v]:2 `,commandObj[v]);
        commandObj[v].subCom = addFuncAndConfig(subComDir);
        // console.log(`commandObj[v]:3 `,commandObj[v]);
        // console.log(`commandObj[v].subCom: `,commandObj[v].subCom);
      }
    }
    // console.log(`commandObj: `,commandObj);
    return commandObj;
  }

  return commands;
}