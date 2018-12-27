const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/zhipin')

const conn = mongoose.connection

conn.on('connected',()=>{
  console.log('数据库连接成功')
})

const userSchema = mongoose.Schema({
  username:{type:String,require:true},
  password:{type:String,require:true},
  type:{type:String,require:true},
  header:{type:String},
  post:{type:String},
  info:{type:String},
  company:{type:String},
  salary:{type:String},
})

const UserModel = mongoose.model('user',userSchema)

exports.UserModel = UserModel