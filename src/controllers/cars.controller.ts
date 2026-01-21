import { Request, Response } from "express";
import * as CarsService from "../services/cars.service";

export async function getCars(req: Request, res: Response): Promise<void> {
  try {
    const filters = {
      brand: req.query.brand as string | undefined,
      minPrice: req.query.minPrice
        ? parseFloat(req.query.minPrice as string)
        : undefined,
      maxPrice: req.query.maxPrice
        ? parseFloat(req.query.maxPrice as string)
        : undefined,
      search: req.query.search as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : undefined,
    };
    const result = await CarsService.getCars(filters);
    res.json(result);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCarById(req: Request, res: Response): Promise<void> {
  try {
    const car = await CarsService.getCarById(req.params.id);
    if (!car) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getBrands(_req: Request, res: Response): Promise<void> {
  try {
    const brands = await CarsService.getBrands();
    res.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMaxPrice(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const maxPrice = await CarsService.getMaxPrice();
    res.json(maxPrice);
  } catch (error) {
    console.error("Error fetching max price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
