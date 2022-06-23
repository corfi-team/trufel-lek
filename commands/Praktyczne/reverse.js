const { MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')

module.exports = {
    name: 'reverse',
    category: 'praktyczne',
    description: 'Odwróć tekst',
    usage: 'reverse <tekst>',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
        const text = args.join(" ")
        if(!text) {
            const err3 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie podałeś tekstu!`)
            .setColor('#e37171')
            return message.reply({embeds: [err3] });
        }
        if(message.content.match(/<a:.+?:\d+>|<:.+?:\d+>/g)) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz używać emotek!`)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        if(message.content.match(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}\u{200d}]/ug)) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz używać emotek!`)
            .setColor('#e37171')
            return message.reply({embeds: [err] });
        }
        if(text.length > 19) {
            const er333r = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .setDescription(`${emotes.crossmark} Nie możesz podać więcej niż 20 znaków`)
            .setColor('#e37171')
            return message.reply({embeds: [er333r] });
        }
        const embgd = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setColor('#01fe80')
        .setDescription(`\` ${text.split("").reverse().join("")} \``)
        message.reply({embeds: [embgd] })
    }
}