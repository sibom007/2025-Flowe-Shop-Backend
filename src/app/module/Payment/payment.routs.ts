import express from "express";
import { PaymentController } from "./payment.contorler";
import { Role } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/createUser-payment",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.createUserPayment
);

router.post(
  "/getUser-paymentById/:id",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.UserPaymentById
);

router.post(
  "/Change-userPaymentStatus/:id",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.UserPaymentStatusChange
);

router.post(
  "/createDistributor-payment",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.createDistributorPayment
);

router.post(
  "/getDistributor-paymentById/:id",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.DistributorPaymentById
);

router.post(
  "/ChangeDistributor-PaymentStatus/:id",
  auth(Role.MANAGER, Role.EMPLOY),
  PaymentController.DistributorPaymentStatusChange
);
