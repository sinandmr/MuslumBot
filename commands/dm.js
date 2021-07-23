module.exports = {
  kod: 'dm',
  async run(client, msg, args) {
    const dmKisi = msg.mentions.users.first();
    const dmMesajı = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('**DM atmak için yetkiniz yok.**');
    if (dmKisi === msg.author)
      return msg.reply('**Neden kendine dm atıyorsun ki..**');
    if (!dmKisi) return msg.reply("**DM'nin kime yapılacağını yazmalısın.**");
    if (!dmMesajı) return msg.reply("**DM'nin ne olacağını yazmalısın.**");

    msg.reply(`${dmKisi} kişisine "${dmMesajı}" duyurusu yapıldı.`);
    dmKisi.send(dmMesajı);
  },
};
