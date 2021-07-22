const Discord = require('discord.js'); // discord.js modülü tanımlıyoruz.
const client = new Discord.Client(); // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar
const prefix = require('./prefix.json').prefix;

client.commands = new Discord.Collection(); // komutları alıyoruz

const commandFiles = readdirSync(join(__dirname, 'komutlar')).filter(file =>
  file.endsWith('.js')
); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
  const command = require(join(__dirname, 'komutlar', `${file}`));
  client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

client.on('error', console.error);

client.on('ready', () => {
  client.user.setActivity('MentalPower YouTube');
  console.log('Botumuz Aktif');
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command))
      return message.channel.send(
        `Komut dosyamda **${command}** adlı bir komut bulamadım.`
      );

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
});

client.login('ODY1Mjc3ODMzODUyMDkyNDM2.YPBqxw.Dh4aSauYCz68u9_d0hKPZ0ow5bM');
