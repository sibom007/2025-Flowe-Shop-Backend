import prisma from "../../../utils/prisma";
import { Role, User, UserStatus } from "@prisma/client";

import AppError from "../../Error/AppError";
import { ObjectId } from "mongodb";

const GetAllUserIntoDB = async () => {
  const user = await prisma.user.findMany({});
  return user;
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
  GetUserIdIntoDB,
  UpdateUserProfileIntoDB,
  UpdateUserStatusIntoDB,
  UpdateUserRoleIntoDB,
};
