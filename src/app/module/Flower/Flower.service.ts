import { Flower, Prisma, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { FlowerFilter, FlowerFilters } from "./Flower.interface";

export const CreateFlower = async (
  payload: Flower,
  user: User
): Promise<Flower> => {
  try {
    const result = await prisma.flower.create({
      data: {
        name: payload.name,
        FlowerType: payload.FlowerType,
        price: payload.price,
        description: payload.description,
        image: payload.image,
        category: payload.category,
        stock: payload.stock,
        isAvailable: payload.isAvailable,
        color: payload.color,
        createdById: user.id,
      },
    });
    return result;
  } catch (error) {
    throw new AppError(500, "Internal Server Error", "An error occurred");
  }
};

export const AllFlower = async ({
  page = 1,
  limit = 10,
  price,
  FlowerType,
  category,
}: FlowerFilter): Promise<Flower[]> => {
  try {
    const filters: FlowerFilters = {};

    // Validate price filter
    if (price) {
      filters.price = {
        gte: price || 0,
        lte: price || Infinity,
      };
    }

    // Validate FlowerType filter
    if (FlowerType) {
      filters.FlowerType = FlowerType;
    }

    // Validate category filter
    if (category) {
      filters.category = category;
    }

    // Ensure `page` and `limit` are valid numbers
    const validPage = Number(page) || 1; // Default to 1 if invalid
    const validLimit = Number(limit) || 10; // Default to 10 if invalid

    // Pagination: Calculate skip and take based on valid values
    const skip = (validPage - 1) * validLimit;
    const take = validLimit;

    // Query flowers from the database
    const result = await prisma.flower.findMany({
      where: filters,
      skip,
      take,
    });

    return result;
  } catch (error) {
    // Log the error for debugging
    console.error("Error in AllFlower function:", error);

    // Handle the error and throw a custom error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Error:", error.message);
    }

    throw new AppError(500, "Internal Server Error", "An error occurred");
  }
};

export const getSingleFlower = async (id: string): Promise<Flower | null> => {
  try {
    const result = await prisma.flower.findUnique({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw new AppError(500, "Internal Server Error", "An error occurred");
  }
};

export const updateFlower = async (
  id: string,
  payload: Partial<Flower>
): Promise<Flower | null> => {
  try {
    const result = await prisma.flower.update({
      where: {
        id,
      },
      data: payload,
    });
    return result;
  } catch (error) {
    // Catch any unhandled error cases
    throw new AppError(
      500,
      "Internal Server Error",
      "An unexpected error occurred."
    );
  }
};

export const deleteFlower = async (id: string): Promise<Flower | null> => {
  try {
    const result = await prisma.flower.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    throw new AppError(500, "Internal Server Error", "An error occurred");
  }
};

export const FlowerService = {
  CreateFlower,
  AllFlower,
  getSingleFlower,
  updateFlower,
  deleteFlower,
};
