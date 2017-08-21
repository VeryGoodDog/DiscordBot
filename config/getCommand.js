module.exports = (client, msg, args, com) => {
  if (!args) {
    let preArgs = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    args = preArgs[0] ? preArgs : null;
  }
  if (!com) {
    command = args.shift();
    com = client.commands[command];
    // console.log('com: ',com);
  }
  let arg = args[0];
  // console.log('command: ', com.config.name, '\nargs: ', args, '\narg: ', !!arg);
  if (com.subCom && com.subCom[arg]) {
    // console.log('subCom');
    args.shift();
    client.config.getCommand(client, msg, args, com.subCom[arg]);
  } else if (com.func) {
    if(com.config.minArgs === null ? false : (com.config.minArgs > args.length)) return msg.channel.send('you need more args');
    if(args[0] === undefined) args = null;
    // console.log(args);
    com.func(client, msg, args);
  }
}