// const Pool = require('pg').Pool
// const dotenv = require('dotenv');

// const pool = new Pool({
//     user: "postgres",
//     password: 'admin',
//     host: 'localhost',
//     post: '5432',
//     database: 'geobase',
// });

// module.exports = pool;


const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();


// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.DB_STRING + "?sslmode=require"
});

module.exports = pool;
