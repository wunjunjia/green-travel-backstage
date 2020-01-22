const redis = require('redis');
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

client.on('error', (err) => {
  console.log(err);
});

client.on('connect', () => {
  console.log('connected redis service success!');
});

module.exports = {};