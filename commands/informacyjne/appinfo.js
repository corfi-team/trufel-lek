const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')
const fetch = require('node-fetch')
const Discord = require('discord.js')
module.exports = {
    name: 'appinfo',
    category: 'fun',
    description: 'Wyświetl informacje o aplikacji',
    aliases: ['app'],
    usage: 'app <ID bota>',
    cooldown: 60000,
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        let id = args[0] || "953310829732855888";
        let userToken = 'OTI2MDUzMDMxNDU4NTIxMTA4.YkC0IQ.OneEfjpSmCNE_UxHMRRe3Cl7iKw'

        let res = await fetch(`https://discord.com/api/v9/oauth2/authorize?client_id=${id}&scope=bot`, {headers: {Authorization: userToken}});
        if(!res) {
            const err3 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Podałeś nieprawidłowe ID!`)
            .setColor('#e37171')
            return message.reply({embeds: [err3] });
        }
        let json = await res.json()
        if (json.code == 10002 || json.code == 50035) {
            const err33 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Podałeś nieprawidłowe ID!`)
            .setColor('#e37171')
            return message.reply({embeds: [err33] });
        }
        const types = {
            false: "Nie",
            true: "Tak"
        }
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Dodaj bota')
                .setURL(`https://discord.com/api/oauth2/authorize?client_id=${id}&scope=bot`)
            .setStyle('LINK')
        )
        let {application, bot} = json
        const embed = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`Informacje o aplikacji \` ${application.name || 'Brak nazwy'} \`
        ID: \` ${application.id} \`
        Publiczny: \` ${application.bot_public ? "Tak" : "Nie"} \`
        Weryfikacja: \` ${types[(bot.public_flags & (1 << 16)) == (1 << 16)]} \`
        Ilość serwerów: \` ${bot.approximate_guild_count || 'Brak'} \`
        Stworzony: <t:${parseInt(Discord.SnowflakeUtil.deconstruct(id).timestamp / 1000)}:R>

        Opis: 
        ${application.description || '\` Brak \`'}`)
        .setColor('#01fe80')
        .setThumbnail(`https://cdn.discordapp.com/avatars/${id}/${application.icon}.webp`)
        return message.reply({
            embeds: [embed],
            components: [row]})
    }
}