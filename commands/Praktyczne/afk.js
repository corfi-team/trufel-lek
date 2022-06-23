const { MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')
const afkdb = require('../../models/afkdb')
const humanize = require("humanize-duration");

module.exports = {
    name: 'afk',
    category: 'praktyczne',
    description: 'Ustawia status afk na serwerze',
    usage: 'afk [reason]',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const reason = args.join(" ") || 'Nie podano'
        let afkInfo = await afkdb.findOne({user: message.author.id, guild: message.guild.id})
        if (!afkInfo) {
          const embed = new MessageEmbed()
          .setAuthor(
               message.author.tag,
               message.author.displayAvatarURL({dynamic: true})
          )
          .setDescription(`${emotes.checkmark} Ustawiono status AFK: \` ${reason} \``)
          .setColor('#01fe80')
          message.reply({embeds: [embed] })
          message.member.setNickname(`${message.author.username} [AFK]`).catch(e => null)
          await afkdb.create({user: message.author.id, guild: message.guild.id, reason, timestamp: Date.now()})
        } else {
          const embed = new MessageEmbed()
          .setAuthor(
             message.author.tag,
             message.author.displayAvatarURL({dynamic: true})
           )
           .setDescription(`${emotes.checkmark} Witaj z powrotem, <@${message.author.id}>
           Byłeś AFK przez: \` ${humanize(Date.now() - afkInfo.get("timestamp"), {maxDecimalPoints: 0, language: "pl"})} \``)
           .setColor('#01fe80')
           message.reply({embeds: [embed] })
          await afkdb.findOneAndDelete({user: message.author.id, guild: message.guild.id})
            message.member.setNickname(`${message.author.username}`).catch(e => null)
        }
    }
}