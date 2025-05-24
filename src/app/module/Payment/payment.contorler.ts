import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const CreateCardItems = catchAsync(async (req, res) => {
  const result = await PaymentService.CreateCardItems({
    UserId: req.user.id,
    FlowerIds: req.body.FlowerIds,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Card created successfully",
    data: result,
  });
});

const GetCardItems = catchAsync(async (req, res) => {
  const result = await PaymentService.getCardItems();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Items Get successfully",
    data: result,
  });
});

const DeleteCardItems = catchAsync(async (req, res) => {
  const { FlowerId } = req.query;
  if (!FlowerId || typeof FlowerId !== "string") {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "FlowerId is required and must be a string",
      data: null,
    });
  }

  const result = await PaymentService.deleteCardItems({ FlowerId });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Items successfully",
    data: result,
  });
});

export const PaymentController = {
  CreateCardItems,
  GetCardItems,
  DeleteCardItems,
};
