const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;
  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
  if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

 const args = message.content
     .trim().slice(config.prefix.length)
     .split(/ +/g);
 const command = args.shift().toLowerCase();

 try {
     const commandFile = require(`./commands/${command}.js`)
     commandFile.run(client, message, args);
 } catch (err) {
 console.error('Erro:' + err);
}
});

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("ID do servidor");
  let channel = await client.channels.cache.get("ID do canal");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#f4000")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(` Bem-vindo(a)`)
      .setImage("https://giphy.com/gifs/brasil-FYqf889lXd9Ru")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, leia as #:rotating_light:┃regras, e evite de ser punido.`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("vsfd random")
      .setTimestamp();

    channel.send(embed);
  }
});
client.once('ready', () => {
    console.log('Ready!');


});

client.on("guildCreate", guild => {
      console.log(`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} !`);
  });
  

  client.on("ready", () => { 
    let activities = [
        `Desenvolvido por @DeimorK#1532`,
        `estou em ${client.guilds.cache.size} servidor`,
        `com ${client.channels.cache.size} canais.`,
        `e com ${client.users.cache.size} usúarios.`
],
i = 0;

setInterval(() => client.user.setActivity(`${activities[i++ %
  activities.length]}`, {
    type: "WATCHING"
}), 5000); //WATCHING, LISTENING, PLAYING, STREAMING
client.user
.setStatus("idle") //idle, dnd, online, invisible
.catch(console.log)

});

client.login('TOKEN do seu BOT');
