const { MessageEmbed } = require('discord.js');
const emotes = require('../../emotes.json')

module.exports = {
    name: 'password',
    category: 'praktyczne',
    description: 'Twoje hasło',
    usage: 'password',
    userperm: [''],
    cooldown: 5000,
    botperm: [''],
    run: async(client, message, args) => {
        gene = (password = true) => {
        let letters = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'o', 'p', 'r', 's', 't', 'u', 'w']
        if(password) letters.splice(0, 10)
        let z = Math.floor(Math.random() * 10) + 8
        let res = ''
        for(i = 0; i < z; i++) {
            let gen = letters[Math.floor(Math.random() * letters.length)]
            if(Math.floor(Math.random() * 2) != 0 && !Number(gen)) gen = gen.toUpperCase()

            res += gen
        }
        return res
        }

        const password = await gene(false)

        const embed = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.checkmark} Hasło zostało wysłane na prywatną wiadomość!`)
        .setColor('#01fe80')
        message.reply({embeds: [embed] })
        const embed2 = new MessageEmbed()
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({dynamic: true})
        )
        .setDescription(`${emotes.checkmark} Twoje hasło to: || ${password} ||`)
        .setColor('#01fe80')
        message.author.send({embeds: [embed2] }).catch(error => { return })
    }
}