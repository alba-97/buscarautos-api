import { Router } from "express";
import * as CarsController from "../controllers/cars.controller";

const router = Router();

router.get("/brands", CarsController.getBrands);
router.get("/max-price", CarsController.getMaxPrice);
router.get("/", CarsController.getCars);
router.get("/:id", CarsController.getCarById);

export { router };
