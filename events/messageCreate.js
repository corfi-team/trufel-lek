const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');
const confik = {
  owners: ["700231994444873748"]
}
const { Permissions } = require('discord.js')
const humanize = require("humanize-duration");
const afkdb = require('../models/afkdb')
const emotes = require('../emotes.json')
const {
  prefix
} = require("../config");
module.exports.run = async (client, message) => {
    if (!message.guild) return;
  const Mention = new RegExp(`^<@!?${client.user.id}>( |)$`, "g");

  const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`);
  let afkInfo = await afkdb.findOne({
      user: message.author.id,
      guild: message.guild.id
  });
  const Prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix
  const args = message.content
      .slice(Prefix.length)
      .trim()
      .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (!!afkInfo && (!client.commands.get(cmd) || client.commands.get(cmd).name != "afk")) {
      const embed = new MessageEmbed()
          .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({
                  dynamic: true
              })
          )
          .setDescription(`${emotes.checkmark} Witaj z powrotem, <@${message.author.id}>
          Byłeś AFK przez: \` ${humanize(Date.now() - afkInfo.get("timestamp"), {maxDecimalPoints: 0, language: "pl"})} \``)
          .setColor('#01fe80')
      message.reply({
          embeds: [embed]
      })
        message.member.setNickname(`${message.author.username}`).catch(e => null)
      await afkdb.findOneAndDelete({
          user: message.author.id,
          guild: message.guild.id
      })
  }
  const row = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setLabel('Serwer Support')
  .setEmoji(`${emotes.support}`)
  .setURL('https://discord.gg/TG2MyX9hj6')
  .setStyle('LINK')
)
.addComponents(
  new MessageButton()
.setLabel('Dodaj Bota')
.setEmoji(`${emotes.trufty}`)
.setURL('https://discord.com/api/oauth2/authorize?client_id=953310829732855888&permissions=8&scope=bot')
.setStyle('LINK')

)
  const ping = new MessageEmbed()
      .setAuthor(
          'Ktoś mnie oznaczył?',
          client.user.displayAvatarURL({
              dynamic: true
          })
      )
      .setColor('#01fe80')
      .setDescription(`👋 Cześć **${message.author.username}**, jestem **${client.user.username}**. Aktualnie mam **${client.commands.filter(c => !c.hidden).size}** komend.
  Mój prefix to: \` ${prefix} \`
  Spis komend bota: \` ${prefix}help \`
  Ping: \` ${client.ws.ping} \`
  Właściciel: [\` yovisek#7777 \`](https://discord.com/users/700231994444873748) `)

  if (message.content.match(Mention)) return message.reply({
      embeds: [ping],
      components: [row]
  })
  if (!message.content.startsWith(Prefix)) return;
  if (!message.member)
      message.member = await message.guild.members.fetch(message);
  

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  global.kommand = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return
  
  if (!message.guild.me.permissions.has(command.botperm || [])) {
    const embed6 = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({
                dynamic: true
            })
        )
        .setDescription(`${emotes.crossmark} Nie posiadam permisji \` ${command.botperm} \``)
        .setColor('#e37171')
    return message.reply({
        embeds: [embed6]
    })
}
if (!message.member.permissions.has(command.userperm || [])) {
    const embed67 = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({
                dynamic: true
            })
        )
        .setDescription(`${emotes.crossmark} Nie posiadasz permisji \` ${command.userperm} \``)
        .setColor('#e37171')
    return message.reply({
        embeds: [embed67]
    })
}

  if (!!command.cooldown && global.cooldowns.has(command.name)) {
    let cld = global.cooldowns.get(command.name)
    if (cld.has(message.author.id)) {
        let cooldowns = cld.get(message.author.id);
        if (cooldowns.has(message.guild.id)) {
            let cooldown = cooldowns.get(message.guild.id)
            if (cooldown + command.cooldown >= Date.now()) {

                const cooldownEmbed = new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({
                            dynamic: true
                        })
                    )
                    .setDescription(`${emotes.crossmark} Musisz poczekać \` ${humanize((cooldown + command.cooldown) - Date.now(), {maxDecimalPoints: 0, language: "pl"})} \` Przed ponownym użyciem tej komendy!`)
                    .setColor('#e37171')
                return message.reply({
                    embeds: [cooldownEmbed]
                });
            } else {
                cooldowns.set(message.guild.id, Date.now())
            }
        } else { 
            cooldowns.set(message.guild.id, Date.now())
        }

    } else {
        let gm = new Map();
        gm.set(message.guild.id, Date.now())
        cld.set(message.author.id, gm)
    }
}
  if (command.szefOnly == true && message.author.id !== "700231994444873748") {
      const embedSzef = new MessageEmbed()
          .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({
                  dynamic: true
              })
          )
          .setDescription(`${emotes.crossmark} Ta komenda jest tylko dla developerów bota!`)
          .setColor('#e37171')
      return message.reply({
          embeds: [embedSzef]
      })
  }
  if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return message.reply(`${emotes.crossmark} Bot nie ma permisji do wysyłania embedów!`)
  if (command.ownerOnly) {
      if (!confik.owners.includes(message.author.id)) {
          return message.channel.send(`Wystąpił Błąd!`)
      }
  }
  try {
      if (command) command.run(client, message, args)
  } catch (err) {
      console.log("błąd! " + err)
  }
}