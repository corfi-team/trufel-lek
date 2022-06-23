const emotes = require('../../emotes.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'channelinfo',
    aliases: [`channel`],
    description: 'Informacje o kanale',
    usage: 'channelinfo [kanał]',
    category: 'informacyjne',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
        let types = {
            GUILD_VOICE: "Głosowy",
            GUILD_TEXT: "Tekstowy",
        }
        const embed = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`Informacje o kanale \` ${channel.name} \`
        ID: \` ${channel.id} \`
        Treść: \` ${channel.topic || 'Brak'} \`
        Typ: \` ${types[channel.type] || 'Kategoria'} \`
        NSFW? \` ${channel.nsfw ? "Tak" : "Nie"} \`
        Stworzony: <t:${parseInt(channel.createdAt / 1000)}:R>`)
        .setColor('#01fe80')
        message.reply({embeds: [embed] })
    }
}