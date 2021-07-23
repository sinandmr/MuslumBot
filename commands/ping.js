module.exports = {
  kod: 'ping',
  async run(client, msg, args) {
    const Discord = require('discord.js');
    msg.channel.send('**Gecikme süresi hesaplanıyor...**').then(sent => {
      setTimeout(function () {
        sent.delete();
        msg.channel.send(
          new Discord.MessageEmbed().setColor('#00ff6e').addFields(
            {
              name: ':grey_question: Websocket',
              value: `:satellite: ${client.ws.ping} ms`,
            },
            {
              name: ':grey_question:  Gecikme',
              value: `:satellite: ${
                sent.createdTimestamp - msg.createdTimestamp
              } ms`,
            }
          )
        );
      }, 1000);
    });
  },
};
