import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    user: DB_USER,
    password: DB_PASSWORD,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database '${DB_NAME}' created (or already exists)`);

    await connection.query(`USE \`${DB_NAME}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id VARCHAR(36) PRIMARY KEY,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        fuelType ENUM('Gasolina', 'Diesel', 'Electrico', 'Hibrido') NOT NULL
      )
    `);
    console.log("Tables created successfully");
  } finally {
    await connection.end();
  }
}

createDatabase().catch((error) => {
  console.error("Error creating database:", error);
  process.exit(1);
});
