import { RowDataPacket } from "mysql2";
import pool from "../database/connection";
import { Car, CarFilters, PaginatedResult } from "../interfaces/cars";

const ITEMS_PER_PAGE = 6;

export async function findAll(
  filters: CarFilters
): Promise<PaginatedResult<Car>> {
  const page = filters.page ?? 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (filters.brand) {
    conditions.push("brand = ?");
    params.push(filters.brand);
  }
  if (filters.minPrice !== undefined) {
    conditions.push("price >= ?");
    params.push(filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    conditions.push("price <= ?");
    params.push(filters.maxPrice);
  }
  if (filters.search) {
    conditions.push("(brand LIKE ? OR model LIKE ? OR description LIKE ?)");
    const term = `%${filters.search}%`;
    params.push(term, term, term);
  }

  const where =
    conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";

  const [countResult] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM cars${where}`,
    params
  );
  const total = countResult[0].total as number;

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM cars${where} LIMIT ? OFFSET ?`,
    [...params, ITEMS_PER_PAGE, offset]
  );

  return { data: rows as Car[], total };
}

export async function findById(id: string): Promise<Car | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM cars WHERE id = ?",
    [id]
  );
  return rows.length > 0 ? (rows[0] as Car) : null;
}

export async function findBrands(): Promise<string[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT DISTINCT brand FROM cars ORDER BY brand"
  );
  return rows.map((row) => row.brand as string);
}

export async function findMaxPrice(): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT MAX(price) as maxPrice FROM cars"
  );
  return rows[0].maxPrice as number;
}
