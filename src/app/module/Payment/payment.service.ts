import { DistributorPayment, PaymentStatus, userPayment } from "@prisma/client";
import prisma from "../../../utils/prisma";

export const createUserPayment = async (payload: userPayment) => {
  const result = await prisma.userPayment.create({
    data: payload,
  });
  return result;
};

export const GetUserPaymentById = async (id: string) => {
  const result = await prisma.userPayment.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const paymentStatusChange = async (
  id: string,
  payload: PaymentStatus
) => {
  const result = await prisma.userPayment.update({
    where: {
      id: id,
    },
    data: {
      paymentStatus: payload,
    },
  });
  return result;
};

export const createDistributorPayment = async (payload: DistributorPayment) => {
  const result = await prisma.distributorPayment.create({
    data: payload,
  });
  return result;
};

export const getDistributorPaymentById = async (id: string) => {
  const result = await prisma.distributorPayment.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const distributorPaymentStatusChange = async (
  id: string,
  payload: PaymentStatus
) => {
  const result = await prisma.distributorPayment.update({
    where: {
      id: id,
    },
    data: {
      paymentStatus: payload,
    },
  });
  return result;
};

export const PaymentService = {
  createUserPayment,
  GetUserPaymentById,
  paymentStatusChange,
  createDistributorPayment,
  getDistributorPaymentById,
  distributorPaymentStatusChange,
};
