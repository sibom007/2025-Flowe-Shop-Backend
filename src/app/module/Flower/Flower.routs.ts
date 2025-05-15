import express from "express";
import { FlowerController } from "./Flower.controler";
import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";
import { FlowerValidation } from "./Flower.validation";
import { Role } from "@prisma/client";


const router = express.Router();

router.post(
  "/create-flower",
  auth(Role.ADMIN, Role.MANAGER),
  validateRequest(FlowerValidation.createFlowerValidation),
  FlowerController.createFLower
);
router.get("/all-flowers", FlowerController.AllFlower);

router.get(
  "/single-flower/:flowerId",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  FlowerController.getSingleFlower
);

router.patch(
  "/update-flower/:flowerId",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY),
  validateRequest(FlowerValidation.updateFlowerValidation),
  FlowerController.updateFlower
);

router.delete(
  "/delete-flower/:flowerId",
  auth(Role.ADMIN, Role.MANAGER),
  FlowerController.deleteFlower
);

export const FlowerRoutes = router;
