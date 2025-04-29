import httpStatus from "http-status";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { TChangePassword, Tlogin } from "./auth.interface";
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User, UserStatus } from "@prisma/client";

const SignUpIntoDB = async (payload: User) => {

  if (!payload) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!payload.password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is required");
  }

  payload.password = await bcrypt.hash(payload.password, 12);
  payload.role = "USER";
  payload.status = UserStatus.ACTIVE;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (existingUser) {
    throw new AppError(400, "User already exist");
  }

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const LoginIntoDB = async (payload: Tlogin) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User does not exist");
  }

  const currentpassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!currentpassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is not match");
  }

  const token = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.accesToken_secret as Secret,
    config.accesToken_secret_exparein!
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.refreshToken_secret as Secret,
    config.refreshToken_secret_exparein!
  );
  return {
    token,
    refreshToken,
    userData: { id: userData.id, email: userData.email, role: userData.role },
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.refreshToken_secret as Secret
    );
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.accesToken_secret as Secret,
    config.accesToken_secret_exparein!
  );

  return {
    accessToken,
  };
};

const ChangePassword = async (payload: TChangePassword, user: User) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });
  const iscurrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData?.password
  );

  if (!iscurrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  const updatePasswordUser = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatePasswordUser;
};

export const Authservice = {
  SignUpIntoDB,
  LoginIntoDB,
  refreshToken,
  ChangePassword,
};