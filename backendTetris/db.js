const Pool = require('pg').Pool
const sql = postgres('postgres://username:password@host:port/database', {
    host: 'localhost',            // Postgres ip address[s] or domain name[s]
    port: 5432,          // Postgres server port[s]
    database: 'tetrus',            // Name of database to connect to
    user: 'postgres',            // Username of database user
    password: 'postgres',            // Password of database user
}) // will use psql environment variables

module.exports = sql
// export default sql