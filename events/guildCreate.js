const { MessageEmbed } = require('discord.js')
const emotes = require('../emotes.json')
module.exports.run = async (client, guild) => {
    const channel = client.channels.cache.get('959815060073615360')
    const owner = await guild.fetchOwner()
    channel.send(`${emotes.guild} **NEW GUILD!** ${emotes.guild}`)
    const embed = new MessageEmbed()
    .setAuthor(
        guild.name,
        guild.iconURL({dynamic: true})
    )
    .setDescription(`
    Właściciel: \` ${owner.user.tag} \`
    Nazwa: \` ${guild.name} \`
    ID: \` ${guild.id} \`
    Użytkownicy: \` ${guild.members.cache.filter(m => !m.user.bot).size} \`
    Boty: \` ${guild.members.cache.filter(m => m.user.bot).size} \``)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setColor('#01fe80')
    channel.send({embeds: [embed] })
}