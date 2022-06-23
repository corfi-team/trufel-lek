const Discord = require("discord.js");
const { inspect } = require("util");
const emotes = require('../../emotes.json')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "eval",
    szefOnly: true,
    category: "developerskie",
    userperm: [''],
    botperm: [''],
    hidden: true,
    usage: "eval <code>",
    run: async(client, message, args) => {
    try {
      
        let query = args.join(" ")
        if(!query) {
            const err = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({
                    dynamic: true
                })
            )
            .setDescription(`${emotes.crossmark} Nie podałeś żadnego kodu!`)
            .setColor('#e37171')
        return message.reply({embeds: [err]})
        }
        let hrDiff;
        let evaled;
        try {
            let hrStart = process.hrtime();
            evaled = eval(query);
            hrDiff = process.hrtime(hrStart);
        } catch (err) {
            if (query?.length > 1012) query = query?.substring(0, 1010) + "...";
            const embed = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )
            .addField('📤 Wejście', `\`\`\`js\n${query}\`\`\``)
            .addField(`${emotes.crossmark} Błąd`, `\`\`\`js\n${err.message}\`\`\``)
            .setColor('#e37171')
            return message.reply({embeds: [embed] })
        }
       
        if(message.content.match("client.token")) {
            return message.reply("https://tenor.com/view/rick-astley-never-gonna-give-you-up-cry-for-help-pwl-stock-aitken-waterman-gif-17671973")
            
        } else {
        let inspected = inspect(evaled, { depth: 0 });
        if (query?.length > 1012) query = query?.substring(0, 1010) + "...";
        if (inspected.toString().length > 1012) inspected = inspected.toString().substring(0, 1010) + "...";
        const embedd = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .addField('📤 Wejście', `\`\`\`js\n${query}\`\`\``)
        .addField('📥 Wyjście', `\`\`\`js\n${inspected}\`\`\``)
        .setColor('#01fe80')
        return message.reply({embeds: [embedd] })
        }
    } catch (e) {
        message.reply('Wystąpił Błąd')
        }
    }
}