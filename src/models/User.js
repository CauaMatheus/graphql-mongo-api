import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  firstName:{
    type: String,
    require: true,
  },
  lastName:{
    type: String,
    require: true,
  },
  email:{
    type: String,
    require: true,
  },
  active:{
    type: Boolean,
    require: true,
  },
})

export default mongoose.model('User', Schema)