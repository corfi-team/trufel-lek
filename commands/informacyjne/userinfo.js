const emotes = require('../../emotes.json')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'userinfo',
    aliases: [`user`],
    description: 'Informacje o użytkowniku',
    usage: 'userinfo [osoba]',
    category: 'informacyjne',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member
        const guildMember = message.guild.members.cache.get(member.id)
        const statuses = {
            "online":"Dostępny",
            "idle":"Zaraz wracam",
            "dnd":"Nie przeszkadzać",
            "offline":"Niewidoczny"
        }
        const status = statuses[member.presence?.status] || member.presence?.status
        const embed = new MessageEmbed()
        
        .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({ dynamic: true })
          )

        .addField(`${emotes.perm} Ogólne`, `
        Nick: \` ${member.user.username || 'Brak'} \`
        Tag: \` ${member.user.tag} \`
        ID: \` ${member.id} \`
        `)

        .addField(`${emotes.support} Serwerowe`, `
        Pseudonim: \` ${guildMember.nickname || `${member.user.username}`} \`
        Najwyższa rola: ${guildMember.roles.highest}
        Ilość ról: \` ${guildMember.roles.cache.size -1} \`
        Dołączył do serwera: <t:${parseInt(member.joinedAt / 1000)}:R>
        `)

        .addField(`${emotes.planet} Inne`, `
        Konto stworzone: <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
        Bot: \` ${guildMember.user.bot ? "Tak" : "Nie"} \`
        Status: \` ${status || 'Niewidoczny'} \`
        `)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor('#01fe80')
        .setImage((await member.user.fetch({force: true})).bannerURL({dynamic: true, size: 2048}))
        message.reply({embeds: [embed] })
        }
}