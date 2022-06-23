const mongoose = require('mongoose')

const afkdb = new mongoose.Schema({
    guild: String,
    user: String,
    reason: String,
    timestamp: Number
})
module.exports = mongoose.model('afk', afkdb)