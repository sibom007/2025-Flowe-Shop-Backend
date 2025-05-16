import express from "express";
import { UserControllers } from "./user.contorler";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.zodvalidation";

const router = express.Router();

router.get(
  "/all-user",
  auth(Role.ADMIN, Role.MANAGER),
  UserControllers.GetAllUser
);

router.get("/user-by-token", UserControllers.getUserByToken);

router.get(
  "/:userId",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.DISTRIBUTOR, Role.USER),
  UserControllers.getUserById
);

router.post(
  "/update-userProfile",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  UserControllers.updateUserProfile
);

router.patch(
  "/update-userProfile/image",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  validateRequest(userValidation.UpdateImage),
  UserControllers.updateUserProfileImage
);
router.patch(
  "/update-userProfile/contactInfo",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  validateRequest(userValidation.UpdateContactInfo),
  UserControllers.updateUserProfileContactInfo
);
router.patch(
  "/update-userProfile/roleInfo",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  validateRequest(userValidation.UpdateRoleInfo),
  UserControllers.updateUserProfileRoleInfo
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
