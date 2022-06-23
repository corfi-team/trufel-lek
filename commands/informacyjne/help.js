const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const emotes = require('../../emotes.json')
const {
  prefix: dPrefix
} = require("../../config");
const db = require('quick.db')

module.exports = {
  name: 'help',
  usage: "help [komenda]",
  description: 'komendy bota',
  aliases: ['h'],
  userperm: [''],
  botperm: [''],
  category: 'praktyczne',
  run: async (client, msg, args) => {
      const data = [];
      const {
          commands
      } = msg.client;
      if (!args[0]) {
          let categories = [];
          readdirSync("./commands/").forEach((dir) => {
              let dir_name = `${dir.charAt(0).toUpperCase() + dir.slice(1)}`
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                  file.endsWith(".js")
              );

              let h = 0;

              let cmds = commands.map((command) => {
                  let file = require(`../../commands/${dir}/${command}`);

                  if (file.hidden) {
                      h += 1;
                      return "";
                  };

                  if (!file.name) return "`brak nazwy!`"

                  let name = file.name.replace(".js", "");

                  return `\`${name}\``;
              });

              cmds = cmds.filter(c => !!c)

              let data = new Object();

              data = {
                  name: dir_name,
                  value: cmds.length === 0 ? "` Już wkrótce... `" : cmds.join(", "),
              };

              if (h < commands.length) categories.push(data);
          });
          const row = new MessageActionRow()
              .addComponents(
                  new MessageButton()
                  .setLabel('Serwer Support')
                  .setEmoji(`${emotes.support}`)
                  .setURL('https://discord.gg/TG2MyX9hj6')
                  .setStyle('LINK')
              )
              .addComponents(
                  new MessageButton()
                  .setLabel('Dodaj Bota')
                  .setEmoji(`${emotes.trufty}`)
                  .setURL('https://discord.com/api/oauth2/authorize?client_id=953310829732855888&permissions=8&scope=bot')
                  .setStyle('LINK')

              )
          const embed = new MessageEmbed()
              .setAuthor(`System pomocy!`, `${client.user.displayAvatarURL({dynamic: true})}`)
              .addFields(categories)
              .setColor('#01fe80')

          return msg.reply({
              embeds: [embed],
              components: [row]
          })
      } else {
          const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
          if (!command) return
          let cprefix = db.get(`prefix_${msg.guild.id}`)
          if (cprefix === null) cprefix = dPrefix;
          if (msg.content.match('eval')) {
              const embecdd = new MessageEmbed()
                  .setAuthor(
                      msg.author.tag,
                      msg.author.displayAvatarURL({
                          dynamic: true
                      })
                  )
                  .setDescription(`${emotes.crossmark} Nie możesz wyświetlić szczegółów tej komendy.`)
                  .setColor('#e37171')
              return msg.reply({
                  embeds: [embecdd]
              })
          }
          let embed2 = new MessageEmbed()
              .setColor('#01fe80')
              .setAuthor(
                  msg.author.tag,
                  msg.author.displayAvatarURL({
                      dynamic: true
                  })
              )
              .setDescription(`
Informacje o komendzie: \` ${command.name} \`
\` [] \` - Argument opcjonalny \` <> \` - Argument wymagany`)
              .addField(`Użycie`, `\` ${command.usage || 'Brak'} \``)

              .addField(`Permisje`, `\` ${command.userperm || 'Brak'} \``)

              .addField(`Opis`, `\` ${command.description || 'Brak'} \``)

              .addField(`Kategoria`, `\` ${command.category || 'Brak'} \``)

              .addField(`Aliasy`, `\` ${command.aliases || 'Brak'} \``)

          return msg.reply({
              embeds: [embed2]
          })
      }
  }
}