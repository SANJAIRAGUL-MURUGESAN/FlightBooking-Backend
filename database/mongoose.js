const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://localhost:27017')

const db = conn.useDb("NEW")

module.exports = {db}