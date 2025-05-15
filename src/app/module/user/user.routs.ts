import express from "express";
import { UserControllers } from "./user.contorler";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.get("/all-user", auth(Role.ADMIN), UserControllers.GetAllUser);

router.get("/user-by-token", UserControllers.getUserByToken);

router.get(
  "/:userId",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  UserControllers.getUserById
);

router.post(
  "/update-userProfile",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  UserControllers.updateUserProfile
);

router.put(
  "/update-status/:userId",
  auth(Role.ADMIN, Role.MANAGER),
  UserControllers.UpdateUserStatus
);

router.put(
  "/update-role/:userId",
  auth(Role.ADMIN),
  UserControllers.UpdateUserRole
);

export const UserRoutes = router;
