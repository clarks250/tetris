const Pool = require('pg').Pool
const sql = new Pool({
    user: 'postgres',            // Username of database user
    password: 'root',            // Password of database user
    host: 'localhost',            // Postgres ip address[s] or domain name[s]
    port: 5432,          // Postgres server port[s]
    database: 'tetrus',            // Name of database to connect to
}) // will use psql environment variables

module.exports = sql
// export default sql