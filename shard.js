const { ShardingManager } = require('discord.js')
const config = require('./config')

let manager = new ShardingManager('./app.js', {
    token: config.token,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    console.log(`Launched Shard ${shard.id} ✅`)
})

manager.spawn()