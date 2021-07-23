module.exports = {
  kod: 'oylama',
  async run(client, msg, args) {
    const Discord = require('discord.js');
    const oylamaMesaji = msg.content.split(' ').slice(1).join(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('Oylama yapmak için yetkiniz yok.');
    if (!oylamaMesaji) return msg.reply('Oylamanın ne olacağını yazmalısın.');
    msg.delete(msg.author);
    const embed = new Discord.MessageEmbed()
      .setColor('#00ceff')
      .addFields(
        {
          name: '🗳️  Oylama Mesajı',
          value: oylamaMesaji,
        },
        {
          name: '⏱️  Durum',
          value: 'Lütfen bu talep hakkında düşüncelerinizi oylayarak veriniz.',
        }
      )
      .setFooter(
        msg.member.user.tag + ' tarafından oylamaya sunuldu.',
        'https://cdn.discordapp.com/avatars/' +
          msg.author.id +
          '/' +
          msg.author.avatar +
          '.jpeg'
      );
    msg.reply(embed).then(embedMessage => {
      embedMessage.react('✅');
      embedMessage.react('❎');
    });
  },
};
