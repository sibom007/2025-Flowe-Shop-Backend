import express from 'express';
import { AuthControllers } from './auth.contorler';
import auth from '../../middlewares/auth';
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/signup", AuthControllers.SignUpUser);

router.post("/login", AuthControllers.LoginUser);

router.post("/refresh-token", AuthControllers.refreshToken);
router.post("/logout", AuthControllers.userLogout);

router.post(
  "/change-password",
  auth(Role.USER, Role.ADMIN),
  AuthControllers.changepassword
);

export const AuthRoutes = router;
