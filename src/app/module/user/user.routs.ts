import express from 'express';
import { UserControllers } from './user.contorler';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';


const router = express.Router();


router.get("/all-user", auth(Role.ADMIN), UserControllers.GetAllUser);

router.get(
  "/:userId",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY),
  UserControllers.getUserById
);

router.post(
  "/update-userProfile",
  auth(Role.ADMIN, Role.MANAGER, Role.EMPLOY, Role.USER),
  UserControllers.updateUserProfile
);

router.put(
  "/updateUser-status/userId",
  auth(Role.ADMIN),
  UserControllers.UpdateUserStatus
);

router.put(
  "/updateUser-role/:userId",
  auth(Role.ADMIN, Role.MANAGER),
  UserControllers.UpdateUserRole
);


export const UserRoutes = router;
