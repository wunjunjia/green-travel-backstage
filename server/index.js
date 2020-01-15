const express = require('express');
const axios = require('axios');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const { GITHUB_OAUTH_URL, CLIENT_ID, CLIENT_SECRET } = require('./config');

const app = express();

app.use(session({
  secret: 'green travel backstage',
  resave: false,
  saveUninitialized: true,
}));

app.use(favicon(path.join(__dirname, './public/favicon.ico')));

app.use('/static/', express.static(path.join(__dirname, './public/static')));

const router = express.Router();

router.get('/get', (req, res, next) => {
  console.log(req.session.user);
  return res.send(req.session.user);
});

router.get('/login', (req, res, next) => {
  return res.redirect(GITHUB_OAUTH_URL);
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
  req.session.user = JSON.stringify(result.data);
  // return res.redirect('http://localhost:8080');
  return res.redirect('/');
});

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