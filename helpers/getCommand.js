module.exports = (client, msg) => {
  client.guildsDB.get(msg.guild.id).then(guildConfig => {
    let preArgs = msg.content.slice(guildConfig.prefix.length).trim().split(/ +/g);
    args = preArgs[0] ? preArgs : null;

    command = args.shift();
    com = client.commands[command];

    // console.log('client.commands: ',client.commands);

    getCommand(args, com);

    function getCommand(args, com) {
      let arg = args[0];
      // console.log('com: ', com,'\nargs: ', args, '\narg: ', !!arg);
      if (com.subCom && com.subCom[arg]) {
        // console.log('subCom');
        args.shift();
        getCommand(args, com.subCom[arg]);
      } else if (com.func) {
        // console.log('msg.channel: ', msg.channel);
        // if(channelPerms(client, msg, com)) return;
        if(com.config.minArgs === null ? false : (com.config.minArgs > args.length)) return msg.channel.send('you need more args');
        if(args[0] === undefined) args = null;

        // console.log('com');
        com.func(client, msg, args);
      }
    }

    function channelPerms(client, msg, com) {
      if (com.config.allowedChannels === 'all') {
        console.log('command run due to all channels');
        return false;
      }
      if (!guildConfig.channels[msg.channel.id]) {
        console.log('command not run due to improper configuration');
        return true;
      }
      if (guildConfig.channels[msg.channel.id] === 'debug') {
        console.log('command run due to debug channel');
        return false;
      }
      if (com.config.allowedChannels === null) {
        console.log('command denied due to null channels');
        return true;
      }
      if (com.config.allowedChannels.includes(msg.channel.id)) {
        console.log('command run due to allowed channel');
        return false;
      }
      console.log('command denied due to default');
      return true;
    }
  });
}