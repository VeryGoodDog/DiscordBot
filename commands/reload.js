module.exports = {
  config: {
    name: 'reload',
    needsData: false,
    minArgs: 1
  },
  func (client, msg, args) {
    if (delete require.cache[require.resolve(`./${args[0]}.js`)]) {
      msg.channel.send(`${args[0]} cache deleted`);
    } else {
      msg.channel.send(`${args[0]} cache not deleted`);
    }
  }
}