const play = require('discordjs-ytdl');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
module.exports = {
  kod: 'p',
  async run(client, msg, args) {
    if (msg.member.voice.channel) {
      const veri = msg.content.split(' ').slice(1).join(' ');

      // Şarkı link olarak yazıldıysa burası çalışır.
      if (veri.includes('https://')) {
        const sarkiURL = veri;
        if (!msg.member.voice.channel)
          return msg.reply('**Sesli kanalda değilsin.**');
        if (!sarkiURL.includes('https://'))
          return msg.reply('**Lütfen doğru URL adresi yazın.**');
        if (!sarkiURL) return msg.reply('**Şarkı linkini de yazmalısın.**');
        const baglan = await msg.member.voice.channel.join();
        baglan.play(ytdl(sarkiURL, { filter: 'audioonly' }));

        // Embed mesajı
        return sarkiEmbed(msg, args, 'AIzaSyBHqNFAlJaP4m318NihptHgmpH5eDrSOCk');
      }

      // Şarkı kelime olarak yazıldıysa burası çalışır.
      const baglan = await msg.member.voice.channel.join();
      play.play(
        baglan,
        args.join(' '),
        'AIzaSyBHqNFAlJaP4m318NihptHgmpH5eDrSOCk'
      );

      // Embed mesajı
      sarkiEmbed(msg, args, 'AIzaSyBHqNFAlJaP4m318NihptHgmpH5eDrSOCk');
    } else {
      msg.reply('Bir kanala katılmalısınız.');
    }
  },
};
async function sarkiEmbed(msg, args, api) {
  const sarkiAdi = await play.title(args.join(' '), api);
  const kanalAdi = await play.channel(args.join(' '), api);
  const sarkiId = await play.id(args.join(' '), api);
  const sarkiThumbnail = `https://img.youtube.com/vi/${sarkiId}/hqdefault.jpg`;
  const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setAuthor('Eklenen Şarkı')
    .setTitle(sarkiAdi)
    .setURL(`https://www.youtube.com/watch?v=${sarkiId}`)
    .setDescription('')
    .setThumbnail(sarkiThumbnail)
    .addField('Kanal', kanalAdi)
    .setFooter(
      msg.member.user.tag + ' tarafından eklendi.',
      'https://cdn.discordapp.com/avatars/' +
        msg.author.id +
        '/' +
        msg.author.avatar +
        '.jpeg'
    );
  return msg.channel.send(embed);
}
