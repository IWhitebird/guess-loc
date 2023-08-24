const Pool = require('pg').Pool
const dotenv = require('dotenv');
require('dotenv').config();


//LOCAL

// const pool = new Pool({
  //     user: "postgres",
  //     password: 'admin',
  //     host: 'localhost',
  //     post: '5432',
  //     database: 'geobase',
  // });
  
  // module.exports = pool;


  //RENDER
  
  // const pool = new Pool({
  //   connectionString: process.env.DB_STRING + "?sslmode=require"
  // });
  
  // module.exports = pool;

  const pool = new Pool({
    connectionString: process.env.NEON_DB_STRING ,
    ssl: {
      rejectUnauthorized: false,
    },
  })
  
  async function getPostgresVersion() {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT version()');
      console.log(res.rows[0]);
    } finally {
      client.release();
    }
  }
  
  getPostgresVersion();

  module.exports = pool;