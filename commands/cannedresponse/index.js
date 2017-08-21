exports.func = (client, msg, args) => {
  msg.channel.send(`use ${client.config.prefix}cannedresponse add [trigger<string|regExp>] [response<string>] to set a canned response.\n`);
};