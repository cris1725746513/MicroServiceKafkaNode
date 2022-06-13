
const sworm = require('sworm');
const pool = sworm.db({
  driver: 'pg',
  url:'postgres://postgres:0bilisam0@localhost:5432/blackList'
});
module.exports= pool;