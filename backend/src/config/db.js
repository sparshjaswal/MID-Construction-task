import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'tasks_db',
};

const db = mysql.createPool(dbConfig);

async function connectToDatabase() {
  try {
    const connection = await db.getConnection();
    console.log('Connected to MySQL Database');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to MySQL Database:', err);
    process.exit(1);
  }
}

connectToDatabase();

export default db;