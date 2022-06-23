const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    category: 'Moderacyjne',
    description: 'Ustawia tryb powolny na kanale',
    usage: 'slowmode <time> / [off]',
    userperm: ['MANAGE_CHANNELS'],
    botperm: ['MANAGE_CHANNELS'],
    run: async(client, message, args) => {
        try {
            if(message.content.match('off')) {
                await message.channel.setRateLimitPerUser(0)
                const err = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({dynamic: true})
                )
                .setDescription(`${emotes.checkmark} Usunięto tryb powolny`)
                .setColor('#01fe80')
                return message.reply({embeds: [err] });
            }
        let time = ms(args[0])
        if(!time) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś czasu!`)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        if (time < 0) {
            const err333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Podałeś nieprawidłowy czas!`)
            .setColor('#e37171')
            return message.reply({embeds: [err333] });
        }
        if (args.length == 0 || !isNaN(args[0])) {
            const err33333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś jednostki!
            
            **Jednostki**:
            \` h, m, s \``)
            .setColor('#e37171')
            return message.reply({embeds: [err33333] });
        }
        if (time > ms('6h')) {
            const err33333333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Maksymalny czas to \` 6h \``)
            .setColor('#e37171')
            return message.reply({embeds: [err33333333] });
        }
        if (time < 1000) {
            const err33333333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Podaj czas większy niż \` 1s \``)
            .setColor('#e37171')
            return message.reply({embeds: [err33333333] });
        }
        time = Math.min(21600 * 1000, time);
        try { 
            await message.channel.setRateLimitPerUser(time / 1000)
        } catch (e) {
        console.error(e)
        }
        const embed = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.checkmark} Ustawiono tryb powolny na \` ${ms(time)} \``)
        .setColor('#01fe80')
        message.reply({embeds: [embed] })
    } catch(e) {
        const err2123 = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.crossmark} Nie podałeś czasu!`)
        .setColor('#e37171')
        return message.reply({embeds: [err2123] });
        }
    }
}