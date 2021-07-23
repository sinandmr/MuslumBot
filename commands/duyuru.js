module.exports = {
  kod: 'duyuru',
  async run(client, msg, args) {
    const Discord = require('discord.js');
    const duyuruKanali = msg.mentions.channels.first();
    const duyuruMesaji = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('**Duyuru yapmak için yetkiniz yok.**');
    if (!duyuruKanali)
      return msg.reply('**Duyurunun hangi kanalda yapılacağını yazmalısın.**');
    if (!duyuruMesaji)
      return msg.reply('**Duyurunun ne olacağını yazmalısın.**');
    msg.reply(
      new Discord.MessageEmbed()
        .setColor('#00ceff')
        .addFields(
          {
            name: ':bust_in_silhouette: Gönderen Kişi',
            value: msg.member,
            inline: true,
          },
          {
            name: ':pencil: Yayınlanan Kanal ',
            value: duyuruKanali,
            inline: true,
          },
          {
            name: ':scroll: Mesaj',
            value: duyuruMesaji,
            inline: false,
          }
        )
        .setFooter(
          msg.member.user.tag + ' tarafından duyuru yapıldı.',
          'https://cdn.discordapp.com/avatars/' +
            msg.author.id +
            '/' +
            msg.author.avatar +
            '.jpeg'
        )
    );
    duyuruKanali.send(
      new Discord.MessageEmbed()
        .setColor('#00ceff')
        .setTitle(':scroll: Duyuru Mesajı')
        .setDescription(duyuruMesaji)
        //.addField(':scroll: Duyuru Mesajı', duyuruMesaji)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    );
  },
};
