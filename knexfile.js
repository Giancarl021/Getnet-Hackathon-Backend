require('dotenv').config();
const path = require('path');

const {
    SQL_USERNAME: user,
    SQL_PASSWORD: password,
    SQL_SERVER: server,
    SQL_DATABASE: database
} = process.env;

console.log(`[SECURITY] Database credentials set`);

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'src', 'database', 'db.sqlite')
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },

        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },

        useNullAsDefault: true
    },

    production: {
        client: 'mssql',
        connection: {
            server: `${server}.database.windows.net`,
            user,
            password,
            database,
            options: {
                port: 1433,
                encrypt: true
            }
        },

        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },
    }
};