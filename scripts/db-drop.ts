import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

async function dropDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: parseInt(DB_PORT || "3306"),
    user: DB_USER,
    password: DB_PASSWORD,
  });

  try {
    await connection.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
    console.log(`Database '${DB_NAME}' dropped`);
  } finally {
    await connection.end();
  }
}

dropDatabase().catch((error) => {
  console.error("Error dropping database:", error);
  process.exit(1);
});
