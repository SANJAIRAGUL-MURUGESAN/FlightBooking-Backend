const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb+srv://user1:PAnKAkpI6VnCuPcR@cluster0.7jaef.mongodb.net/?retryWrites=true&w=majority')

const db = conn.useDb("NEW")

module.exports = {db}
