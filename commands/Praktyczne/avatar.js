const emotes = require('../../emotes.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Avatar użytkownika',
    usage: 'avatar [osoba]',
    category: 'praktyczne',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const embed = new MessageEmbed()
        .setAuthor(
            user.tag,
            user.displayAvatarURL({dynamic: true})
        )
        .setImage(user.displayAvatarURL({dynamic: true, size: 2048}))
        .setColor('#01fe80')
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Pobierz!')
            .setURL(user.displayAvatarURL({size: 4096, dynamic: true}))
            .setEmoji(emotes.imgs)
            .setStyle('LINK')
        )
        message.reply({embeds: [embed], components: [row] })
    }
}