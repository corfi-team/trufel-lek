const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')
const ms = require('ms')
const humanize = require('humanize-duration')
const parseTime = require("parse-duration")

module.exports = {
    name: 'timeout',
    category: 'Moderacyjne',
    description: 'Nadaje timeout dla użytkownika',
    usage: 'timeout <osoba> <czas> [powód]',
    userperm: ['MODERATE_MEMBERS'],
    botperm: ['MODERATE_MEMBERS'],
    run: async(client, message, args) => {
        try {
        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0])
        if(!member) {
            const er3 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie oznaczyłeś osoby!
            
            **Użycie**:
            \` timeout <osoba> <czas> [powód] \``)
            .setColor('#e37171')
            return message.reply({embeds: [er3] });
        }
        if (message.member.roles.highest.position < member.roles.highest.position) {
            const er31111111 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz nadać timeout'a dla tego użytkownika, ponieważ ma wyższą rolę niż Ty!`)
            .setColor('#e37171')
            return message.reply({embeds: [er31111111] });
         }
        if(member.id === message.author.id) {
            const err3 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz timeout'ować samego siebie!`)
            .setColor('#e37171')
            return message.reply({embeds: [err3] });  
        }
        if(member.user.bot) {
            const err33 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz timeout'ować bota!`)
            .setColor('#e37171')
            return message.reply({embeds: [err33] });  
        }
        const time = args.slice(1).join(' ')
        if(!time) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś czasu!
            
            **Użycie**:
            \` timeout <osoba> <czas> [powód] \``)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        const parsedTime = parseTime(time)
        if(parsedTime < ms('1s')) {
            const er33333r = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Podałeś czas mniejszy niż \` 1s \` Lub nie podałeś jednostki!
            
            **Jednostki**:
            \` d, h, m, s \``)
            .setColor('#e37171')
            return message.reply({embeds: [er33333r] });
        }
        if (parsedTime > ms('28d')) {
            const err33323 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Czas nie może być większy niż \` 28d \`!`)
            .setColor('#e37171')
            return message.reply({embeds: [err33323] });
        }
        const reason = args.slice(2).join(" ") || 'Nie podano'
        await member.timeout(parsedTime, reason)
        const end = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.checkmark} Nadano timeout dla \` ${member.user.tag} \`
        Powód: \` ${reason} \`
        Czas: \` ${humanize(parsedTime, {verbose: true, language: "pl"})} \``)
        .setColor('#01fe80')
        message.reply({embeds: [end]})
        } catch(e) {
            console.error(e)
        }
    }
}