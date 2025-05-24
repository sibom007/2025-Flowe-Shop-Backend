import express from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { PaymentController } from "./payment.contorler";

const router = express.Router();

router.post(
  "/create-cardItems",
  auth(Role.ADMIN, Role.MANAGER, Role.USER, Role.EMPLOY, Role.DISTRIBUTOR),
  PaymentController.CreateCardItems
);

router.get(
  "/card",
  auth(Role.ADMIN, Role.MANAGER, Role.USER, Role.EMPLOY, Role.DISTRIBUTOR),
  PaymentController.GetCardItems
);

router.delete(
  "/delete-cardItems",
  auth(Role.ADMIN, Role.MANAGER, Role.USER, Role.EMPLOY, Role.DISTRIBUTOR),
  PaymentController.DeleteCardItems
);

export const PaymentRoutes = router;
