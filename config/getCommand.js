module.exports = (client, msg, args, com) => {
  let preArgs = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  args = preArgs[0] ? preArgs : null;

  command = args.shift();
  com = client.commands[command];
  getCommand(args, com);

  function getCommand(args, com) {
    let arg = args[0];
    // console.log('com: ', com,'\nargs: ', args, '\narg: ', !!arg);
    if (com.subCom && com.subCom[arg]) {
      // console.log('subCom');
      args.shift();
      getCommand(args, com.subCom[arg]);
    } else if (com.func) {
      if(com.config.minArgs === null ? false : (com.config.minArgs > args.length)) return msg.channel.send('you need more args');
      if(args[0] === undefined) args = null;
      // console.log(args);
      com.func(client, msg, args);
    }
  }
}