module.exports = {
  kod: 'kick',
  async run(client, msg, args) {
    if (!msg.guild) return; // Bu mesaj sunucuda atılmadıysa return et.
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.channel.send('Bu komutu kullanamazsın.');
    const user = msg.mentions.users.first();
    if (!user) return msg.channel.send('Kullanıcı etiketlemelisin.');
    const member = msg.guild.member(user);
    if (!member) return msg.channel.send('Bu kullanıcı sunucuda bulunmuyor.');
    member
      .kick()
      .then(() => {
        const logKanali = msg.guild.channels.cache.find(
          channel => channel.id === '866371235113074739'
        );
        logKanali.send(`**${user.tag}** sunucudan atıldı.`);
      })
      .catch(err => {
        msg.reply('Bunu yapamam.');
        console.error(err);
      });
  },
};
