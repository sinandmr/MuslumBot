module.exports = {
  kod: 'çal',
  async run(client, msg, args) {
    const ytdl = require('ytdl-core');
    const sarkiURL = msg.content.split(' ').slice(1).join(' ');
    if (!msg.member.voice.channel)
      return msg.reply('**Sesli kanalda değilsin.**');
    if (!sarkiURL.includes('https://'))
      return msg.reply('**Lütfen doğru URL adresi yazın.**');
    if (!sarkiURL) return msg.reply('**Şarkı linkini de yazmalısın.**');
    const connection = await msg.member.voice.channel.join();
    connection.play(ytdl(sarkiURL, { filter: 'audioonly' }));
  },
};
