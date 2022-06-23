const mongoose = require('mongoose')

module.exports.run = async client => {
  console.log(`${client.user.username} ✅`)
    client.user.setActivity("🖤🧡", { type: "WATCHING"});

    mongoose.connect('mongodb+srv://yovisek:d1U1zLgQKOI2Kt2C@manticbot.8az1k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
      console.log('Database ✅')
    })
    .catch((err) => {
      console.log(err)
    })
}

//d1U1zLgQKOI2Kt2C