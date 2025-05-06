import { FlowerCategory, FlowerType } from "@prisma/client";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { FlowerService } from "./Flower.service";

const createFLower = catchAsync(async (req, res) => {
  const result = await FlowerService.CreateFlower(req.body, req.user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Flower registered successfully",
    data: result,
  });
});

const AllFlower = catchAsync(async (req, res) => {
  const {
    page,
    limit,
    minPrice,
    maxPrice,
    selectedColor,
    selectedSort,
    selectedType,
    selectedCategory,
    selectedRating,
    searchInput,
  } = req.query;

  const result = await FlowerService.AllFlower({
    page: Number(page),
    limit: Number(limit),
    minPrice: Number(minPrice),
    maxPrice: Number(maxPrice),
    color: selectedColor as string,
    sort: selectedSort as string,
    FlowerType: selectedType as FlowerType,
    rating: selectedRating as string,
    searchInput: searchInput as string,
    category: selectedCategory as FlowerCategory,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Flower successfully",
    data: result,
  });
});
const getSingleFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.getSingleFlower(req.params.flowerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get Flower successfully",
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const result = await FlowerService.updateFlower(
    req.params.flowerId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Update Flower successfully",
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  await FlowerService.deleteFlower(req.params.flowerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Flower successfully",
    data: {},
  });
});

export const FlowerController = {
  createFLower,
  AllFlower,
  getSingleFlower,
  updateFlower,
  deleteFlower,
};
