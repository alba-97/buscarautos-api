export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  fuelType: "Gasolina" | "Diesel" | "Electrico" | "Hibrido";
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}
