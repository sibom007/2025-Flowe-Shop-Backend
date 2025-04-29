import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { Authservice } from './auth.service';
import { Request, Response } from 'express';


const SignUpUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await Authservice.SignUpIntoDB(userData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Create in successfully",
    data: result,
  });
});

const LoginUser = catchAsync(async (req, res) => {
  const {
    token: accessToken,
    userData,
    refreshToken,
  } = await Authservice.LoginIntoDB(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: {
      userData,
      accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await Authservice.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get Token  successfully!",
    data: result,
  });
});

const changepassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const passwords = req.body;
    const result = await Authservice.ChangePassword(passwords, user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Change successfully!",
      data: result,
    });
  }
);

const userLogout = catchAsync(async (_req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/", // Match the original cookie path
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logout in successfully",
    data: {},
  });
});

export const AuthControllers = {
  SignUpUser,
  LoginUser,
  refreshToken,
  changepassword,
  userLogout,
};
