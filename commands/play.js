const player = require('discordjs-ytdl-advanced');
const Discord = require('discord.js');
module.exports = {
  kod: 'p',
  async run(client, msg, args) {
    if (!args[0]) return msg.channel.send('Lütfen bir kelime giriniz.');
    if (msg.member.voice.channel) {
      const baglan = await msg.member.voice.channel.join();
      const sarki = await player(args.join(' '));
      const song = await sarki.play(baglan);
      sarki.play(baglan);
      const embed = new Discord.MessageEmbed()
        .setTitle('Çalan Şarkı')
        .setColor('RED')
        .setDescription(`:headphones:  [${sarki.title}](${sarki.url})`)
        .setThumbnail(sarki.thumbnail)
        .addFields(
          {
            name: 'Şarkı Süresi',
            value: `:clock3:  ${sarki.time}`,
            inline: true,
          },
          {
            name: 'Kanal Adı',
            value: `:loud_sound:  [${sarki.channel}](${sarki.channelURL})`,
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
