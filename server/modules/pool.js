const pg = require('pg');
let pool;

if (process.env.DB_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

else {
    let databaseName = 'cmsc495_news_project'

    if (process.env.NODE_ENV === 'test') {
        databaseName = 'unit_testing'
    }

    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: databaseName,
    });
}

module.exports = pool;