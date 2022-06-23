const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shards',
    category: 'informacyjne',
    description: `Wyświetla status shardów bota`,
    usage: 'shards',
    userperm: [''],
    botperm: [''],
    run: async(client, message, args) => {

        const guildCount = await client.shard.fetchClientValues('guilds.cache.size')
        const users = await client.shard.fetchClientValues('users.cache.size')
        const ping = await client.shard.fetchClientValues('ws.ping')

        guildCount.forEach((count, shardId) => {

            const embed = new MessageEmbed()
            .setAuthor(
                'Informacje o shardach',
                message.author.displayAvatarURL({dynamic: true})
            )
            .setColor('#01fe80')
            .setDescription(`Ten serwer korzysta z sharda o id \` ${message.guild.shardId} \`
            Ilość shardów: \` ${guildCount.length} \`
            Ping: \` ${ping[shardId]}ms \`
            Użytkownicy: \` ${users[shardId]} \`
            Serwery: \` ${count} \``)
            message.reply({embeds: [embed] })
        })
    }
}