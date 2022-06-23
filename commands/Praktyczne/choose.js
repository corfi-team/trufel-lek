const { MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json');

module.exports = {
    name: 'choose',
    category: 'praktyczne',
    description: 'Wybierz',
    usage: 'choose <tekst1> | <tekst2>',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const split = args.join(" ").split(" | ")

        if(message.content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz używać emotek z subskrybcji Nitro!`)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        const text1 = split[0]
        if(!text1) {
            const txt = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś 1 tekstu!
            
            **Użycie**:
            \` choose <tekst1> | <tekst2> \``)
            .setColor('#e37171')
            return message.reply({embeds: [txt] });
        }
        const text2 = split[1]
        if(!text2) {
            const txt2 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś 2 tekstu!

            **Użycie**:
            \` choose <tekst1> | <tekst2> \``)
            .setColor('#e37171')
            return message.reply({embeds: [txt2] });
        }

        const choose = [
            `${text1}`,
            `${text2}`
        ]
        const gen = choose[Math.floor(Math.random() * choose.length)]

        const embed = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.checkmark} Wybrałem: \` ${gen} \``)
        .setColor('#01fe80')
        message.reply({embeds: [embed] })
    }
}