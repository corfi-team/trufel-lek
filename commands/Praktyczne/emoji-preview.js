const { MessageEmbed, MessageAttachment } = require('discord.js');
const emotes = require('../../emotes.json')
const Canvas = require('canvas')
const fetch = require('node-fetch')

module.exports = {
    name: 'emoji-preview',
    category: 'praktyczne',
    description: 'Ustawia status afk na serwerze',
    usage: 'emoji-preview <emoji>',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {
      try {
        let id = args[0]
        if(!id) {
          const err = new MessageEmbed()
          .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({dynamic: true})
          )
          .setDescription(`${emotes.crossmark} Nie podałeś emoji`)
          .setColor('#e37171')
          return message.reply({embeds: [err] });
      }
        if(id.match(/<a:.+?:\d+>|<:.+?:\d+>/gm)) id = id.split('<')[1].split('>')[0].split(':')[2]
        await fetch(`https://cdn.discordapp.com/emojis/${encodeURIComponent(id)}`)
        .then((res) => {
          if(res.status === 404) {
            const err33 = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({dynamic: true})
      )

      .setDescription(`${emotes.crossmark} Nie znaleziono emoji!`)
      .setColor('#e37171')
            return message.reply({embeds: [err33] });
          }
          if(res.status !== 200) {
            const err333 = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({dynamic: true})
            )

            .setDescription(`${emotes.crossmark} Wystąpił Błąd!`)
            .setColor('#e37171')
            return message.reply({embeds: [err333] });
          }
    })
        
        const darkMode = Canvas.createCanvas(300, 100)
        const darkContext = darkMode.getContext('2d')

        const lightMode = Canvas.createCanvas(300, 100)
        const lightContext = lightMode.getContext('2d')

        const lightBackground = await Canvas.loadImage('./emoji_background_light.png')
        const darkBackground = await Canvas.loadImage('./emoji_background_dark.png')

        darkContext.drawImage(darkBackground, 0, 0, darkMode.width, darkMode.height)
        lightContext.drawImage(lightBackground, 0, 0, lightMode.width, lightMode.height)
    
        const emojiImg = await Canvas.loadImage(`https://cdn.discordapp.com/emojis/${id}`)
        darkContext.drawImage(
          emojiImg,
          16 + 39 + 18 + 5.25 * `Tak wygląda emoji w motywie ciemnym `.length,
          25 + 16 - 5,
          16,
          16
        )
    
        const lightEmojiImg = await Canvas.loadImage(`https://cdn.discordapp.com/emojis/${id}`)
        lightContext.drawImage(
          lightEmojiImg,
          16 + 39 + 18 + 5.25 * `Tak wygląda emoji w motywie jasnym`.length,
          25 + 16 - 5,
          16,
          16
        )

        darkContext.drawImage(emojiImg, 16 + 39, 25 + 16 + 15, 40, 40)
        lightContext.drawImage(emojiImg, 16 + 39, 25 + 16 + 15, 40, 40)
    
        const darkAttachment = new MessageAttachment(darkMode.toBuffer(), 'emoji.png')
        const lightAttachment = new MessageAttachment(lightMode.toBuffer(), 'light_emoji.png')
    
        message.reply({
          files: [darkAttachment, lightAttachment],
        })
      } catch(e) {
  return;
      }
    }
}