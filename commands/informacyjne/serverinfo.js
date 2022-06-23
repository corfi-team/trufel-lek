const emotes = require('../../emotes.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'serverinfo',
    aliases: [`server`],
    description: 'Informacje o serwerze',
    category: 'informacyjne',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const owner = await message.guild.fetchOwner()

        const types = {
            NONE: "Brak poziomu",
            TIER_1: "Poziom 1",
            TIER_2: "Poziom 2",
            TIER_3: "Poziom 3",
        }
        
        const embed = new MessageEmbed()
        .setAuthor(
            message.guild.name,
            message.guild.iconURL({dynamic: true})
        )
        .addField(`${emotes.support} Ogólne`, `
        Właściciel: \` ${owner.user.username} \`
        Tag właściciela: \` ${owner.user.tag} \`
        ID właściciela: \` ${owner.user.id} \`
        Nazwa: \` ${message.guild.name} \`
        ID serwera: \` ${message.guild.id} \`
        Stworzony: <t:${parseInt(message.guild.createdAt / 1000)}:R>
        `)

        .addField(`${emotes.boosts} Ulepszenia`, `
        Poziom serwera: \` ${types[message.guild.premiumTier]} \`
        Ilość Boostów: \` ${message.guild.premiumSubscriptionCount || "0"} \`
        `)

        .addField(`${emotes.stats} Statystyki`, `
        Ilość emotek: \` ${message.guild.emojis.cache.size} \`
        Ilość ról: \` ${message.guild.roles.cache.size} \`
        Ilość kanałów: \` ${message.guild.channels.cache.size} \`
        Ilość osób: \` ${message.guild.members.cache.size} \`
        `)
        .setColor('#01fe80')
        .setThumbnail(
            message.guild.iconURL({dynamic: true})
        )
            message.reply({embeds: [embed] })
    }
}