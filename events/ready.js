const mongoose = require('mongoose')

module.exports.run = async client => {
  console.log(`${client.user.username} โ`)
    client.user.setActivity("๐ค๐งก", { type: "WATCHING"});

    mongoose.connect('mongodb+srv://yovisek:d1U1zLgQKOI2Kt2C@manticbot.8az1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
      console.log('Database โ')
    })
    .catch((err) => {
      console.log(err)
    })
}

//d1U1zLgQKOI2Kt2C