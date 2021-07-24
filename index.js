// *************************************************************************************************************** //
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); // Dosya içeriğini okumamıza yarıyor. https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options
const { join } = require('path'); // https://nodejs.org/api/path.html#path_path_join_paths
const prefix = require('./prefix.json').prefix;
const hedefimiz = require('./hedef.json').hedef;
require('events').EventEmitter.defaultMaxListeners = 15; // client.on içeriklerini dinleme sayımızı 15 olarak ayarlar. Bu az olunca client.on içeriği dinleyemediği için kodda hataya yol açıyor.
// *************************************************************************************************************** //
// BOT AKTİF!
client.on('ready', () => {
  console.log(`${client.user.tag} Aktif!`);
  const durumlar = [
    'Sevgisizliğine bir kalp verdim..',
    'Feleğin cilvesine, hayatın sillesine, dertlerin cümlesine itirazım var..',
    'Her şeyi al, bana beni geri ver..',
    'Kanma sever gibi göründüğüne, seni sevmiyorum diyecek bir gün..',
  ];
  let say = 0;
  setInterval(() => {
    if (say === durumlar.length) say = 0;
    client.user.setActivity(durumlar[say]);
    say++;
  }, 1000 * 5);
});
// *************************************************************************************************************** //
// KOMUTLARI OKUMA İŞLEMİ
client.commands = new Discord.Collection(); // discord.js'in komut ekleme ve çalıştırma için gerekli koleksiyonunu tanımlıyoruz.

const commandFiles = fs
  .readdirSync(join(__dirname, 'commands'))
  .filter(file => file.endsWith('.js')); // commands klasöründen .js uzantılı dosyaları buluyor.

// Yukarıda bir array oluşturduk. Bu array tüm komut.js dosyalarını içinde barındırıyor.
// [selam.js, oylama.js, duyuru.js] gibi.

commandFiles.forEach(file => {
  const command = require(join(__dirname, 'commands', `${file}`));
  client.commands.set(command.kod, command); // client'e set ile komut ekledik.
});
// forEach ile array'in her bir elemanındaki komut.js dosyalarındaki içerikleri set ederek komutu çalışır hale getiriyoruz.
// *************************************************************************************************************** //
client.on('error', console.error);
// *************************************************************************************************************** //
// commands dosyasındaki komutların çalıştırılması..
client.on('message', async msg => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command))
      return msg.channel.send(`**${command}** adında bir komut bulunamıyor.`);

    try {
      client.commands.get(command).run(client, msg, args);
    } catch (error) {
      console.error(error);
    }
  }
});
// *****************************************  KOMUTLAR  ********************************************************** //
// *************************************************************************************************************** //
// Sunucuya katılan kişiye otomatik rol atama
client.on('guildMemberAdd', member => {
  let rol = member.guild.roles.cache.find(role => role.name === 'Mal');
  member.roles.add(rol);
});
// *************************************************************************************************************** //
// Sunucuya katılan ve ayrılanlar için karşılama mesajları
client.on('guildMemberAdd', member => {
  const hosGeldin = member.guild.channels.cache.find(
    channel => channel.id === '866371235113074739'
  );
  hosGeldin.send(`**${member}**, aramıza hoş geldin.`);
});
// *************************************************************************************************************** //
client.on('guildMemberRemove', member => {
  const elveda = member.guild.channels.cache.find(
    channel => channel.id === '866371235113074739'
  );
  elveda.send(`**${member}**, sunucudan ayrıldı.`);
});
// *************************************************************************************************************** //
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
// *************************************************************************************************************** //
// msg.delete() mesajı siler.
// msg.react() ile mesaja emoji ekler.
// msg.member.user.tag ile kullanıcının isim ve kodunu alıyoruz.
// bot pp https://i.hizliresim.com/90nqw7c.jpg
// .setFooter(client.user.username, client.user.displayAvatarURL()); ile direkt botun bilgilerini alabiliyoruz.
// *************************************************************************************************************** //
client.login('ODY1Mjc3ODMzODUyMDkyNDM2.YPBqxw.Dh4aSauYCz68u9_d0hKPZ0ow5bM');
// *************************************************************************************************************** //
