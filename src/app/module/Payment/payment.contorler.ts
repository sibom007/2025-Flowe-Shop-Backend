import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PaymentService } from "./payment.service";

const createUserPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createUserPayment(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "user payment registered successfully",
    data: result,
  });
});

const UserPaymentById = catchAsync(async (req, res) => {
  const result = await PaymentService.GetUserPaymentById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment Get successfully",
    data: result,
  });
});

const UserPaymentStatusChange = catchAsync(async (req, res) => {
  const result = await PaymentService.paymentStatusChange(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment status change successfully",
    data: result,
  });
});

const createDistributorPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createDistributorPayment(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Distributor payment registered successfully",
    data: result,
  });
});

const DistributorPaymentById = catchAsync(async (req, res) => {
  const result = await PaymentService.getDistributorPaymentById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Distributor payment registered successfully",
    data: result,
  });
});

const DistributorPaymentStatusChange = catchAsync(async (req, res) => {
  const result = await PaymentService.distributorPaymentStatusChange(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Distributor payment registered successfully",
    data: result,
  });
});

export const PaymentController = {
  createUserPayment,
  UserPaymentById,
  UserPaymentStatusChange,
  createDistributorPayment,
  DistributorPaymentById,
  DistributorPaymentStatusChange,
};
