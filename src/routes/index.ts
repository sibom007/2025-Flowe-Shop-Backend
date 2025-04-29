import { Router } from 'express';
import { AuthRoutes } from "../app/module/Auth/auth.routs";
import { FlowerRoutes } from "../app/module/Flower/Flower.routs";
import { UserRoutes } from "../app/module/user/user.routs";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/",
    route: FlowerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
