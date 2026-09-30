const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Pequeno teste para avisar na consola se a ligação funcionou
pool.getConnection()
    .then(() => console.log('✅ Ligação à base de dados MySQL bem-sucedida!'))
    .catch((err) => console.error('❌ Erro ao ligar ao MySQL:', err.message));

module.exports = pool;