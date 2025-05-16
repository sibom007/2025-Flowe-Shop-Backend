import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendResponse from '../../../utils/sendResponse';
import { userFilterableFields } from './user.constant';
import { userservise } from './user.service';

const GetAllUser = catchAsync(async (req, res) => {
  const result = await userservise.GetAllUserIntoDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User get successfully",
    data: result,
  });
});

const getUserByToken = catchAsync(async (req, res) => {
  const token = req.query.token as string;
  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }
  
  const result = await userservise.GetUserByTokenIntoDB(token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user retrieved successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await userservise.GetUserIdIntoDB(req.params.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user retrieved successfully",
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const UpdateData = req.body;
  const result = await userservise.UpdateUserProfileIntoDB(user, UpdateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateUserProfileImage = catchAsync(async (req, res) => {
  const user = req.user;
  const UpdateData = req.body;
  const result = await userservise.UpdateUserProfileImageIntoDB(
    user,
    UpdateData
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateUserProfileContactInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const UpdateData = req.body;
  const result = await userservise.UpdateUserProfileContactIntoDB(
    user,
    UpdateData
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});
const updateUserProfileRoleInfo = catchAsync(async (req, res) => {
  const user = req.user;
  const UpdateData = req.body;
  const result = await userservise.UpdateUserProfileRoleInfoIntoDB(
    user,
    UpdateData
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

const UpdateUserStatus = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;
  const result = await userservise.UpdateUserStatusIntoDB(userId, status);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update status successfully",
    data: result,
  });
});

const UpdateUserRole = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const result = await userservise.UpdateUserRoleIntoDB(userId, role);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update successfully",
    data: result,
  });
});

export const UserControllers = {
  GetAllUser,
  getUserByToken,
  getUserById,
  updateUserProfile,
  UpdateUserStatus,
  UpdateUserRole,
  updateUserProfileImage,
  updateUserProfileContactInfo,
  updateUserProfileRoleInfo,
};
