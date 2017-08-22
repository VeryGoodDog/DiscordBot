exports.func = (client, msg, args) => {
  let numOne = Number(args[0]) ? Number(args[0]) : 'wow';
  let numTwo = Number(args[1]) ? Number(args[1]) : 'u need a number';
  let diff = (typeof numOne === 'number' && typeof numOne === 'number') ? numOne - numTwo : 'gimmeth numbr';
  msg.channel.send(`${numOne} - ${numTwo} = ${diff}`);
};