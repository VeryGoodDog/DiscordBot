exports.func = (client, msg, args) => {
  if (typeof args[0] !== 'number' || typeof args[1] !== 'number') return msg.channel.send(`${args[0]} or ${args[1]} is not a number.`);
  let numOne = args[0], numTwo = args[1];
  msg.channel.send(`${numOne} - ${numTwo} = ${numOne - numTwo}`)
};