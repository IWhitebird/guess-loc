const Pool = require('pg').Pool
const dotenv = require('dotenv');

const pool = new Pool({
    user: "postgres",
    password: 'admin',
    host: 'localhost',
    post: '5432',
    database: 'geobase',
});

module.exports = pool;
