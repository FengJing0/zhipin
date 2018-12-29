var express = require('express')
var router = express.Router()

const {UserModel, ChatModel} = require('../db/models')
const md5 = require('blueimp-md5')

const filter = {password: 0, __v: 0}

router.post('/register', (req, res) => {
  const {username, password, type} = req.body
  UserModel.findOne({username}, (err, user) => {
    if (user) {
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      new UserModel({username, type, password: md5(password)}).save((err, user) => {
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        res.send({code: 0, data: {username, type, _id: user._id}})
      })
    }
  })

})

router.post('/login', (req, res) => {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, (err, user) => {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: '用户名或者密码不正确！'})
    }
  })
})

router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({code: 1, msg: '请先登录'})
  }

  const user = req.body
  UserModel.findByIdAndUpdate({_id: userid}, user, (err, oldUser) => {
    if (!oldUser) {

      res.clearCookie('userid')
      res.send({code: 1, msg: '请先登录'})

    } else {
      const {_id, username, type} = oldUser
      const data = Object.assign(user, {_id, username, type})
      res.send({code: 0, data})

    }
  })
})


router.get('/user', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({code: 1, msg: '请先登录'})
  }

  UserModel.findOne({_id: userid}, filter, (err, user) => {
    if (user) {
      res.send({code: 0, data: user})
    } else {
      res.send({code: 1, msg: '用户不存在'})
    }
  })
})


router.get('/userlist', (req, res) => {
  const {type} = req.query

  UserModel.find({type}, filter, (err, users) => {
    res.send({code: 0, data: users})
  })


})


router.get('/msglist', (req, res) => {

  const userid = req.cookies.userid

  UserModel.find((err, userDocs) => {
    // const users = {}
    //
    // userDocs.forEach(doc => {
    //   users[doc._id] = {username: doc.username, header: doc.header}
    // })

    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    }, {})

    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, (err, chatMsgs) => {
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})


router.post('/readmsg', (req, res) => {
  const {from} = req.body
  const to = req.cookies.userid

  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, (err, doc) => {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified})
  })

})

module.exports = router
