const player = require('discordjs-ytdl-advanced');
const Discord = require('discord.js');
const prefix = require('../prefix.json').prefix;
module.exports = {
  kod: 'p',
  async run(client, msg, args) {
    if (!args[0]) return msg.channel.send('Lütfen bir kelime giriniz.');
    if (msg.member.voice.channel) {
      const baglan = await msg.member.voice.channel.join();
      const song = await player(args.join(' '));
      const sarki = await song.play(baglan);
      // Şarkı bitince çıksın.
      sarki.on('finish', () => {
        const saniye = 120;
        setTimeout(() => {
          msg.member.voice.channel.leave();
          msg.channel.send(
            '**2 dakika boyunca şarkı açılmadığı için kanaldan çıkıldı.**'
          );
        }, 1000 * saniye);
      });

      // Dur ve Devam komutları
      client.on('message', msg2 => {
        if (msg2.content === prefix + 'dur') return sarki.pause();
        if (msg2.content === prefix + 'devam') return sarki.resume();
      });

      const embed = new Discord.MessageEmbed()
        .setTitle('Çalan Şarkı')
        .setColor('RED')
        .setDescription(`:headphones:  [${song.title}](${song.url})`)
        .setThumbnail(song.thumbnail)
        .addFields(
          {
            name: 'Şarkı Süresi',
            value: `:clock3:  ${song.time}`,
            inline: true,
          },
          {
            name: 'Kanal Adı',
            value: `:loud_sound:  [${song.channel}](${song.channelURL})`,
            inline: true,
          }
        )
        .setFooter(
          msg.member.user.tag + ' tarafından eklendi.',
          'https://cdn.discordapp.com/avatars/' +
            msg.author.id +
            '/' +
            msg.author.avatar +
            '.jpeg'
        );
      msg.channel.send(embed);
    } else {
      msg.reply('Bir sesli kanala katılmalısın.');
    }
  },
};
