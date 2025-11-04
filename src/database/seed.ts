import { v4 as uuidv4 } from "uuid";
import pool from "./connection";
import { carsData } from "./data";

async function seedDatabase() {
  try {
    await pool.query("TRUNCATE TABLE cars");
    for (const car of carsData) {
      await pool.query(
        "INSERT INTO cars (id, brand, model, year, price, image, description, fuelType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          uuidv4(),
          car.brand,
          car.model,
          car.year,
          car.price,
          car.image,
          car.description,
          car.fuelType,
        ]
      );
    }
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
