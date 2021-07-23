module.exports = {
  kod: 'rolver',
  async run(client, msg, args) {
    try {
      if (!msg.member.hasPermission('ADMINISTRATOR'))
        return msg.channel.send('Bu komutu kullanamazsın.');
      const verilecekRol = msg.mentions.roles.first();
      const verilecekUye = msg.mentions.members.first();
      if (!verilecekRol) return msg.reply('**Verilecek rolü yazmalısın.**');
      if (!verilecekUye)
        return msg.reply('**Rolün verileceği üyeyi yazmalısın.**');
      if (verilecekUye && verilecekRol) {
        verilecekUye.roles.add(verilecekRol);
        msg.channel.send(
          `${verilecekUye} kişisine ${verilecekRol} rolü verildi.`
        );
      }
    } catch (e) {
      console.log(e);
    }
  },
};
