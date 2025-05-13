import prisma from "../../../utils/prisma";
import { Role, User, UserStatus } from "@prisma/client";

import AppError from "../../Error/AppError";
import { ObjectId } from "mongodb";
import { jwtHelpers } from "../../../helper/jwtHelpers";

const GetAllUserIntoDB = async () => {
  const user = await prisma.user.findMany({});
  return user;
};

export const GetUserByTokenIntoDB = async (token: string) => {
  const user = jwtHelpers.verifyToken(token, process.env.ACCESTOKEN_SECRET!);
  if (!user) {
    throw new AppError(400, "User not Found!");
  }
  const CurrentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      number: true,
      status: true,
      point: true,
      membership: true,
      currentAddress: true,
      homeAddress: true,
      buyRecord: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!CurrentUser) {
    throw new AppError(400, "User not Found!");
  }
  return CurrentUser;
};

export const GetUserIdIntoDB = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectID format");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError(400, "User not Found!");
  }
  return user;
};

export const UpdateUserProfileIntoDB = async (user: User, payload: User) => {
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: payload,
  });
  return result;
};

const UpdateUserStatusIntoDB = async (id: string, payload: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError(400, "User not Found!");
  }

  const result = await prisma.user.updateMany({
    where: { id: id },
    data: {
      status: payload,
    },
  });
  return result;
};

const UpdateUserRoleIntoDB = async (id: string, payload: Role) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError(400, "User not Found!");
  }

  const result = await prisma.user.updateMany({
    where: { id: id },
    data: {
      role: payload,
    },
  });
  return result;
};

export const userservise = {
  GetAllUserIntoDB,
  GetUserByTokenIntoDB,
  GetUserIdIntoDB,
  UpdateUserProfileIntoDB,
  UpdateUserStatusIntoDB,
  UpdateUserRoleIntoDB,
};
