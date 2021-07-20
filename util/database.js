const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'the_collect_db',
    password: '04011994Flex15$'
})

module.exports = pool.promise();