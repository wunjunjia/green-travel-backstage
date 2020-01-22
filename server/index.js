const express = require('express');
const axios = require('axios');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client = require('./init/redis');
const upload = require('./init/upload');
require('./init/mysql');
const { GITHUB_OAUTH_URL, CLIENT_ID, CLIENT_SECRET } = require('./config/auth');
const merchandiseRouter = require('./routes/merchandise');

const app = express();

/* application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: false }));
/* application/json */
app.use(express.json());

/* session */
app.use(session({
  secret: 'green travel backstage',
  resave: false,
  saveUninitialized: true,
  store: new redisStore({ client }),
}));

/* favicon */
app.use(favicon(path.join(__dirname, './public/favicon.ico')));

/* static */
app.use('/static/', express.static(path.join(__dirname, './public/static')));
app.use('/upload/', express.static(path.join(__dirname, './upload')));

const router = express.Router();

router.post('/upload', upload.single('merchandise'), (req, res, next) => {
  const { path } = req.file;
  return res.send(path.substring(path.indexOf('/upload')));
});

router.get('/user', (req, res, next) => {
  const user = req.session.user;
  return res.json({ user });
});

router.get('/login', (req, res, next) => {
  return res.redirect(GITHUB_OAUTH_URL);
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;
  return res.send();
});

router.get('/auth', async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    return res.send('the code is lost!');
  }
  let result = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  }, {
    headers: {
      Accept: 'application/json',
    },
  });
  if (result.status !== 200) return res.send('github auth fail!');
  if (result.data.error) return res.send('the code is expired!');
  const { token_type, access_token } = result.data;
  result = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
  if (result.status !== 200) return res.send('get user information fail!');
  req.session.user = result.data;
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '/';
  return res.redirect(url);
});

app.use('/api/merchandise', merchandiseRouter);

app.use('/api', router);

app.use((req, res, next) => {
  fs.readFile(path.join(__dirname, './public/index.html'), 'utf-8', (err, data) => {
    if (err) return res.send('server error!');
    return res.send(data);
  });
});

app.listen(3000, () => {
  console.log('green travel backstage server started at port 3000!');
});