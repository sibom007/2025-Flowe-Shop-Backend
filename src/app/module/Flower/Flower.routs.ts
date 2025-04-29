import express from "express";
import { FlowerController } from "./Flower.controler";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { FlowerValidation } from "./Flower.validation";

const router = express.Router();

router.post(
  "/create-flower",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY),
  validateRequest(FlowerValidation.createFlowerValidation),
  FlowerController.createFLower
);
router.get(
  "/all-flower",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  FlowerController.AllFlower
);
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
