const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = require('./prefix.json').prefix;
const hedefimiz = require('./hedef.json').hedef;
require('events').EventEmitter.defaultMaxListeners = 15;
// ************************************** //
// BOT AKTİF!
client.on('ready', () => {
  console.log(`${client.user.tag} Aktif!`);
  client.user
    .setActivity('Sevgisizliğine bir kalp verdim..', { type: 'PLAYING' })
    .then(presence =>
      console.log(`Durum "${presence.activities[0].name}" oldu.`)
    )
    .catch(console.error);
});
// ************************************** //
// FONKSİYOLAR
function embedOlustur(
  renk,
  ustBaslik,
  ustFoto,
  ustLink,
  titleYazi,
  titleUrl,
  titleAciklama,
  thumbnailLink,
  footerYazi,
  footerFotoLink
) {
  const embed = new Discord.MessageEmbed()
    .setAuthor(ustBaslik, ustFoto, ustLink)
    .setColor(renk)
    .setTitle(titleYazi)
    .setURL(titleUrl)
    .setDescription(titleAciklama)
    .setThumbnail(thumbnailLink)
    /*.addFields(
      {
        name: 'Regular field title',
        value: 'Selam \n Merhaba \n Nasılsın \n İyiyim',
      },
      {
        name: 'Inline field title',
        value: 'Selam \n Merhaba \n Nasılsın \n İyiyim',
        inline: true,
      }
    )
    .addField('Inline fielasdsadsad title', 'Some value here', true)*/
    .setImage('https://i.imgur.com/dC7QJ75.jpeg')
    .setTimestamp()
    .setFooter(footerYazi, footerFotoLink);
  return embed;
}
// ************************************** //

// KOMUTLAR

// ************************************** //
// Müzik botu
client.on('message', async msg => {
  const ytdl = require('ytdl-core');
  if (msg.content.startsWith(prefix + 'çal')) {
    const args = msg.content.split(' ').slice(1);
    const sarkiURL = args.join(' ');
    if (!msg.member.voice.channel) return msg.reply('Sesli kanalda değilsin.');
    if (!sarkiURL.includes('https://'))
      return msg.reply('Lütfen doğru URL adresi yazın.');
    if (!sarkiURL) return msg.reply('Şarkı linkini de yazmalısın.');
    const connection = await msg.member.voice.channel.join();
    connection.play(ytdl(sarkiURL, { filter: 'audioonly' }));
    /* embed
    ytdl(sarkiURL).on('info', info => {
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(info.title);
      msg.reply(embed);
    });
    */
  }
});
// ************************************** //
// Tepkiler ile oylama komutu.
client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix + 'oylama')) {
    const args = msg.content.split(' ').slice(1);
    const oylamaMesaji = args.join(' ');
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
  }
});
// ************************************** //

// Duyuru komutu
client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'duyur')) {
    const args = msg.content.split(' ').slice(2);
    const duyuruKanali = msg.mentions.channels.first();
    const duyuruMesaji = args.join(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('**Duyuru yapmak için yetkiniz yok.**');
    if (!duyuruKanali)
      return msg.reply('**Duyurunun hangi kanalda yapılacağını yazmalısın.**');
    if (!duyuruMesaji)
      return msg.reply('**Duyurunun ne olacağını yazmalısın.**');

    // msg.delete(msg.author);
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
            value: `\n ${duyuruKanali}`,
            inline: true,
          },
          {
            name: ':scroll: Mesaj',
            value: duyuruMesaji,
            inline: false,
          }
        )
        .setFooter(
          msg.member.user.tag,
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
        .setDescription(duyuruMesaji)
    );
  }
});
// ************************************** //
// Kişiye özel olarak duyuru atma
client.on('message', msg => {
  if (msg.content === 'özelduyuru?') {
    msg.reply(
      'Bu komutu şöyle kullanabilirsin. **özelduyuru @kişi akşam discorda gel.**'
    );
  }
  if (msg.content.startsWith(prefix + 'özelduyuru')) {
    const args = msg.content.split(' ').slice(2);
    const duyuruKisi = msg.mentions.users.first();
    const duyuruMesaji = args.join(' ');
    if (!msg.member.hasPermission('ADMINISTRATOR'))
      return msg.reply('**Duyuru yapmak için yetkiniz yok.**');
    if (duyuruKisi === msg.author)
      return msg.reply('Neden kendine duyuru atıyorsun ki..');
    if (!duyuruKisi)
      return msg.reply('**Duyurunun kime yapılacağını yazmalısın.**');
    if (!duyuruMesaji)
      return msg.reply('**Duyurunun ne olacağını yazmalısın.**');

    msg.reply(`${duyuruKisi} kişisine "${duyuruMesaji}" duyurusu yapıldı.`);
    duyuruKisi.send(duyuruMesaji);
  }
});
// ************************************** //
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ping') {
    // msg.reply('pong'); // Kişiyi etikelleyip, 'pong' yazdırıyoruz.
    msg.channel.send('pong'); // Direkt sunucuya mesaj gönderiyoruz.
  }
});
// ************************************** //
// Sunucuya katılan kişiye otomatik rol atama
client.on('guildMemberAdd', member => {
  let rol = member.guild.roles.cache.find(role => role.name === 'Mal');
  member.roles.add(rol);
});
// ************************************** //
// Mesaj ile rol verdirme
client.on('message', msg => {
  try {
    if (msg.content.startsWith(prefix + 'rolver')) {
      if (!msg.member.hasPermission('ADMINISTRATOR'))
        return msg.channel.send('Bu komutu kullanamazsın.');
      const verilecekRol = msg.mentions.roles.first();
      const verilecekUye = msg.mentions.members.first();
      if (!verilecekRol) msg.channel.send('Verilecek rolü yazmalısın.');
      if (!verilecekUye) msg.channel.send('Rolün verileceği üyeyi yazmalısın.');
      if (verilecekUye && verilecekRol) {
        verilecekUye.roles.add(verilecekRol);
        msg.channel.send(
          `${verilecekUye} kişisine ${verilecekRol} rolü verildi.`
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// ************************************** //
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'sa') {
    msg.author.send('as'); // Yazara özel mesaj olarak cevap verir.
  }
});
// ************************************** //
// Foto Komutu
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'foto') {
    msg.reply(msg.author.displayAvatarURL());
  }
});
// ************************************** //
// Embed Mesajı
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'embed') {
    embedOlustur(
      msg.channel,
      'RANDOM',
      'Sinan Demir',
      'https://lh3.googleusercontent.com/proxy/ba2BFmSdUHiO136yW-YEdJH3UVYiXgtzqDW6RoWZqXnVV1tlf5_6Z0pktSSFkWtnISng3zPdmU0qOv-5CJOYm-MKfOu-Wkdj-GY',
      'https://google.com',
      'Duyuru: Oyun gelişimi',
      'https://google.com',
      'Oyunda çok güzel şeyler yapıldı',
      'https://lh3.googleusercontent.com/proxy/ba2BFmSdUHiO136yW-YEdJH3UVYiXgtzqDW6RoWZqXnVV1tlf5_6Z0pktSSFkWtnISng3zPdmU0qOv-5CJOYm-MKfOu-Wkdj-GY',
      'Sinan Demir tarafından eklendi.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcq6FvFhAjogg_q9-nWWekarCHUqk6VwNqyA&usqp=CAU'
    );
  }
});

// ************************************** //
// Sunucuya katılan ve ayrılanlar için karşılama mesajları
/*
client.on('guildMemberAdd', member => {
  const hosGeldin = member.guild.channels.cache.find(
    channel => channel.id === '569104990652858397'
  );
  hosGeldin.send(`${member}, aramıza hoş geldin.`);
});
*/
// ************************************** //
/*
client.on('guildMemberRemove', member => {
  const elveda = member.guild.channels.cache.find(
    channel => channel.id === '569104990652858397'
  );
  elveda.send(`${member}, sunucudan ayrıldı.`);
});
*/
// ************************************** //
// ÜYE GELDİKÇE VE GİTTİKÇE KANAL ADINDA ÜYE SAYISINI GÖSTERMEK
client.on('guildMemberAdd', member => {
  try {
    const sayac = member.guild.channels.cache.find(
      channel => channel.id === '866371297939423282'
    );
    sayac.setName(`Üye Sayısı : ${member.guild.memberCount}`);
  } catch (e) {
    console.log(e);
  }
});
client.on('guildMemberRemove', member => {
  try {
    const sayac = member.guild.channels.cache.find(
      channel => channel.id === '866371297939423282'
    );
    sayac.setName(`Üye Sayısı ${member.guild.memberCount}`);
  } catch (e) {
    console.log(e);
  }
});

// ************************************** //
// MODERASYON KOMUTLARI - Kick
client.on('message', message => {
  if (!message.guild) return; // Bu mesaj sunucuda atılmadıysa return et.
  if (message.content.startsWith(prefix + 'at')) {
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send('Bu komutu kullanamazsın.');
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
            const log = message.guild.channels.cache.find(
              channel => channel.id === '866371235113074739'
            );
            log.send(`${user.tag} sunucudan atıldı.`);
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply('Sunucuda böyle bir kullanıcı yok.');
      }
    } else {
      message.reply('Sunucudan atılacak kişiyi yazmalısın.');
    }
  }
});
// ************************************** //
// MODERASYON KOMUTLARI - Ban
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'ban')) {
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send('Bu komutu kullanamazsın.');
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
            const log = message.guild.channels.cache.find(
              channel => channel.id === '866371235113074739'
            );
            log.send(`${user.tag} sunucudan banlandı.`);
            log.send(
              `${user.tag} kişisinin sunucuya yeniden katılabilmesi için sunucu ayarlarındaki yasaklar kısmından yasağını kaldırmalısın.`
            );
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply('Sunucuda böyle bir kullanıcı yok');
      }
    } else {
      message.reply('Sunucudan banlanacak kişiyi yazmalısın.');
    }
  }
});
// ************************************** //
// msg.delete() mesajı siler.
// msg.react() ile mesaja emoji ekler.
// msg.member.user.tag ile kullanıcının isim ve kodunu alıyoruz.
// bot pp https://i.hizliresim.com/90nqw7c.jpg
// .setFooter(client.user.username, client.user.displayAvatarURL()); ile direkt botun bilgilerini alabiliyoruz.

// ************************************** //
client.login('ODY1Mjc3ODMzODUyMDkyNDM2.YPBqxw.Dh4aSauYCz68u9_d0hKPZ0ow5bM');
// ************************************** //
