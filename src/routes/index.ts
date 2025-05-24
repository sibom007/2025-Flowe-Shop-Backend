import { Router } from 'express';
import { AuthRoutes } from "../app/module/Auth/auth.routs";
import { FlowerRoutes } from "../app/module/Flower/Flower.routs";
import { UserRoutes } from "../app/module/user/user.routs";
import { PaymentRoutes } from "../app/module/Payment/payment.routs";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/u",
    route: UserRoutes,
  },
  {
    path: "/f",
    route: FlowerRoutes,
  },
  {
    path: "/p",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
