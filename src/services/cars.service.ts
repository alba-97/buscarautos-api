import * as CarsRepository from "../repositories/cars.repository";
import { Car, CarFilters, PaginatedResult } from "../interfaces/cars";

export async function getCars(
  filters: CarFilters
): Promise<PaginatedResult<Car>> {
  return CarsRepository.findAll(filters);
}

export async function getCarById(id: string): Promise<Car | null> {
  return CarsRepository.findById(id);
}

export async function getBrands(): Promise<string[]> {
  return CarsRepository.findBrands();
}

export async function getMaxPrice(): Promise<number> {
  return CarsRepository.findMaxPrice();
}
