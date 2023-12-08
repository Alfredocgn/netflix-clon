// eslint-disable-next-line no-undef
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {

    type:String,
    required:true,
    unique:true,
    max:50
  },
  likedMovies:Array,
})

// eslint-disable-next-line no-undef
module.exports = mongoose.model("users",userSchema)