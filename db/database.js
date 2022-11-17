const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '4434',
    database: 'fea-database'
}) 

module.exports = pool


