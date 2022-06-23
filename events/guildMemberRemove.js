const { MessageEmbed } = require('discord.js')
const emotes = require('../emotes.json')
module.exports.run = async (client, member) => {
    const channel = client.channels.cache.get('964787042083012609')
    const embed = new MessageEmbed()
    .setAuthor(
        'Użytkownik wyszedł!',
        member.user.displayAvatarURL({dynamic: true})
    )
    .setDescription(`${emotes.truftywave} Pożegnajmy **${member.user.username}**
    ${emotes.perm} Dziękujemy za przebywanie na naszym Serwerze Wsparcia!
    ${emotes.planet} Mamy nadzieję, że kiedyś do nas wrócisz!
    ${emotes.create} Konto stworzył <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`)
    .setThumbnail(
        member.user.displayAvatarURL({dynamic: true})
    )
    .setColor('#01fe80')
    channel.send({embeds: [embed] })
}