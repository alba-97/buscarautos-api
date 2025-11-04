import { Router } from "express";
import pool from "../database/connection";
import { RowDataPacket } from "mysql2";

const router = Router();

router.get("/brands", async (_req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT DISTINCT brand FROM cars ORDER BY brand"
    );
    const brands = (result as RowDataPacket[]).map((row) => row.brand);
    res.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/max-price", async (_req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT MAX(price) as maxPrice FROM cars"
    );
    const { maxPrice } = (result as RowDataPacket[])[0];
    res.json(maxPrice);
  } catch (error) {
    console.error("Error fetching price range:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const ITEMS_PER_PAGE = 6;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    let query = "SELECT * FROM cars";
    const queryParams: any[] = [];
    const conditions: string[] = [];

    if (req.query.brand) {
      conditions.push("brand = ?");
      queryParams.push(req.query.brand);
    }

    if (req.query.minPrice) {
      conditions.push("price >= ?");
      queryParams.push(parseFloat(req.query.minPrice as string));
    }

    if (req.query.maxPrice) {
      conditions.push("price <= ?");
      queryParams.push(parseFloat(req.query.maxPrice as string));
    }

    if (req.query.search) {
      conditions.push("(brand LIKE ? OR model LIKE ? OR description LIKE ?)");
      const searchTerm = `%${req.query.search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM cars${
        conditions.length > 0 ? " WHERE " + conditions.join(" AND ") : ""
      }`,
      queryParams
    );
    const total = (countResult as RowDataPacket[])[0].total;

    query += " LIMIT ? OFFSET ?";
    queryParams.push(ITEMS_PER_PAGE, offset);

    const [cars] = await pool.query(query, queryParams);

    res.json({
      data: cars,
      total,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [cars] = await pool.query("SELECT * FROM cars WHERE id = ?", [
      req.params.id,
    ]);
    const car = (cars as RowDataPacket[])[0];

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router };
