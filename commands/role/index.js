exports.func = (client, msg, args) => {
  user = msg.member;
  if(msg.guild.roles.find('name', args[0].toLowerCase())) {
    role = msg.guild.roles.find('name', args[0].toLowerCase());
  } else {
    return msg.channel.send('no such role');
  }
  if (user.roles.has(role)) {
    user.removeRole(role).catch(console.error);
    return msg.channel.send(`removed role ${role.name}`);
  } else {
    user.addRole(role).catch(console.error);
    return msg.channel.send(`added role ${role.name}`);
  }
}