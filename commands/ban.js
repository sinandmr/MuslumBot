module.exports = {
  kod: 'ban',
  async run(client, msg, args) {
    // MODERASYON KOMUTLARI - Ban
    if (!msg.guild) return;

    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.channel.send('Bu komutu kullanamazsın.');

    const user = msg.mentions.users.first();

    if (!user) return msg.reply('Sunucudan banlanacak kişiyi yazmalısın.');

    const member = msg.guild.member(user);

    if (!member) return msg.reply('Sunucuda böyle bir kullanıcı yok.');

    member
      .ban()
      .then(() => {
        const logKanali = msg.guild.channels.cache.find(
          channel => channel.id === '866371235113074739'
        );
        logKanali.send(
          `**${user.tag}** sunucudan banlandı. Kullanıcının sunucuya yeniden katılabilmesi için sunucu ayarlarındaki yasaklar kısmından yasağını kaldırmalısın.`
        );
      })
      .catch(err => {
        msg.reply('Bunu yapamam.');
        console.error(err);
      });
  },
};
