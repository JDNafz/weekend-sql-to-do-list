const pg = require('pg');

const Pool = pg.Pool;

// Import your secret database info from the environment variables.
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
    host: PGHOST,
    port: 5432,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
})

// Spit out a console log when the pool connects
// successfully:
pool.on('connect', () => {
    console.log('Clip Clop, we\'re connected to neon');
})

// Spit out a console log when the pool errors:
pool.on('error', (error) => {
    console.log('The magical pool has errored. Bummer.', error);
})





module.exports = pool