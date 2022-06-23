const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')
const ms = require('ms')

module.exports = {
    name: 'remind',
    category: 'praktyczne',
    description: 'Przpomne Ci o czymś',
    usage: 'remind <time> | <remind>',
    userperm: [''],
    cooldown: 5000,
    botperm: [''],
    run: async(client, message, args) => {
        try {
        let time = ms(args[0])
        if(!time) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś czasu!

            **Użycie**:
            \` remind <time> <remind> \``)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        if (time < 0) {
            const err333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Czas nie może zawierać \` - \`!`)
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
            \` d, h, m, s \``)
            .setColor('#e37171')
            return message.reply({embeds: [err33333] });
        }
        if (time > ms('24d')) {
            const err33323 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Czas nie może być większy niż \` 24d \`!`)
            .setColor('#e37171')
            return message.reply({embeds: [err33323] });
        }
        let reminder = args.slice(1).join(" ")
        if(!reminder) {
                const err2 = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({dynamic: true})
                )
                .setDescription(`${emotes.crossmark} Nie podałeś informacji o czym mam Ci przypomnieć!
                
                **Użycie**:
                \` remind <time> <remind> \``)
                .setColor('#e37171')
                return message.reply({embeds: [err2] });
            }
            const embed = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
           )
           .setDescription(`${emotes.checkmark} Przypomnę Ci o \` ${reminder} \` <t:${parseInt((Date.now() + time) / 1000)}:R>`)
           .setColor('#01fe80')
           message.reply({embeds: [embed] })
           const row = new MessageActionRow()
           .addComponents(
               new MessageButton()
               .setLabel('Skocz do wiadomości')
               .setURL(`${message.url}`)
               .setStyle('LINK')
           )
           setTimeout(function () {
               const embedd = new MessageEmbed()
               .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
           )
           .setDescription(`${emotes.checkmark} Przypominam Ci o \` ${reminder} \``)
           .setColor('#01fe80')
           message.author.send({embeds: [embedd], components: [row]}).catch(error => { return })
           }, time)
        } catch(e) {
            const err2123 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś czasu!

            **Użycie**:
            \` remind <time> <remind> \``)
            .setColor('#e37171')
            return message.reply({embeds: [err2123] });
        }
    }
}