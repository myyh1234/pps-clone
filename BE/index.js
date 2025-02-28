const express = require('express')
const cors = require('cors')
const session = require('express-session');
const { sequelize, User } = require('./models')
const app = express()
const port = 4000

const config = require('./config/config.json')['development']

app.use(express.json({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(session({
  secret: 'test', // 실제 서비스에서는 안전하게 관리
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true, // HTTPS 일 때 활성화
    maxAge: 1000 * 60 * 10, // 쿠키 만료 시간
  }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', async (req, res) => {
  try{  
    const { username, password } = req.body
    const user = await User.findOne({ where: { username }})

    if (!user)
      return res.status(401).json({ error: '등록되지 않은 사용자입니다.' })

    if (password !== user.password)
      return res.status(401).json({ error: '비밀번호 틀림' })

    req.session.username = username
    res.json({ message: '로그인 성공', username, maxAge: req.session.cookie.expires })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: '로그인 실패' });
  }
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const usernameConflict = await User.findOne({ where: { username }})
    if (usernameConflict){
      return res.status(409).json({ error: '아이디 중복'})
    }
    const createdUser = await User.create({ username, password })
    res.status(201).json({ message: '회원가입 성공', username })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: '회원가입 실패' });
  }
})

app.get('/logincheck', (req, res) => {
  if (!req.session.username) return res.json({ isLoggedIn: false })
  
})

app.get('/logout', (req, res) => {
  if (req.session.username) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Logout failed' });
      }

      res.clearCookie('connect.sid')
      res.json({ message: 'Logout successful' });
    })
  }
  else {
    res.status(401).json({ error: '로그인되어있지 않음' })
  }
})

app.post('/modifyPassword', async (req, res) => {
  if (!req.session.username) 
    return res.status(401).json({ error: '로그인되어있지 않음', isLoggedIn: false })
  try {
    const { newPassword } = req.body
    await User.update(
      { password: newPassword }, 
      { where: 
        { username: req.session.username }
      }
    )
    res.status(200).json({ message: '비밀번호 수정 성공' })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: '비밀번호 수정 실패' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
