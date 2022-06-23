const emotes = require('../../emotes.json')
const { MessageEmbed } = require('discord.js')
let os = require('os')
const { version } = require("discord.js");

module.exports = {
    name: 'botinfo',
    aliases: [`bot`],
    description: 'Informacje o bocie',
    category: 'informacyjne',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const uptime = process.uptime();
        const days = Math.floor((uptime % 31536000) / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.round(uptime % 60);
        const botuptime = (days > 0 ? days + 'd, ' : '') + (hours > 0 ? hours + 'h, ' : '') + (minutes > 0 ? minutes + 'm, ' : '') + (seconds > 0 ? seconds + 's' : '');
        const embed = new MessageEmbed()
        .setAuthor(
            client.user.username,
            client.user.displayAvatarURL({dynamic: true})
        )
        .addField(`${emotes.stats} Statystyki`, `
        Ilość serwerów: \` ${client.guilds.cache.size} \`
        Ilość użytkowników: \` ${client.guilds.cache.reduce((value, guild) => value + guild.memberCount, 0)} \`
        Ilość kanałów \` ${client.channels.cache.size} \`
        Ping: \` ${client.ws.ping}ms \`
        UpTime: \` ${botuptime} \``)

        .addField(`${emotes.planet} Serwer`, `
        Platforma: \` ${os.platform()} \`
        CPU: \` ${os.cpus().map(i => `${i.model}`)[0]} \`
        RAM: \` ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} / 2 GB \``)

        .addField(`${emotes.desktop} Wersje`, `
        Wersja Node.js \` ${process.version} \`
        Wersja Discord.js \` ${version} \``)
        .setColor('#01fe80')
        .setThumbnail(
            client.user.displayAvatarURL({dynamic: true})
        )
        message.reply({embeds: [embed] })
    }
}