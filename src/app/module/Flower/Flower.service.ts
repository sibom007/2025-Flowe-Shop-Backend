import { Flower, Prisma, User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { IFlowerFilterPayload } from "./Flower.interface";

export const CreateFlower = async (
  payload: Flower,
  user: User
): Promise<Flower> => {

  const exFlowerr = await prisma.flower.findFirst({
    where: {
      name: payload.name,
    },
  });
  if (exFlowerr) {
    throw new AppError(400, "Flower with this name already exists");
  }

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
        color: payload.color,
        isAvailable: true,
        createdById: user.id,
      },
    });
    return result;
  } catch (error) {
    throw new AppError(500, "Internal Server Error", "An error occurred");
  }
};

export const AllFlower = async (
  payload: IFlowerFilterPayload
): Promise<{ data: Flower[]; total: number }> => {
  try {
    const minPrice = Number(payload.minPrice);
    const maxPrice = Number(payload.maxPrice);

    const filters: Prisma.FlowerWhereInput = {
      ...(payload.searchInput && {
        name: {
          contains: payload.searchInput,
          mode: "insensitive",
        },
      }),
      ...(payload.category && { category: payload.category }),
      ...(payload.FlowerType && { FlowerType: payload.FlowerType }),
      ...(payload.color && {
        color: {
          contains: payload.color,
          mode: "insensitive",
        },
      }),
      ...(payload.rating !== undefined && {
        rating: {
          equals: Number(payload.rating),
        },
      }),
      ...((Number.isFinite(minPrice) || Number.isFinite(maxPrice)) && {
        price: {
          ...(Number.isFinite(minPrice) && { gte: minPrice }),
          ...(Number.isFinite(maxPrice) && { lte: maxPrice }),
        },
      }),
    };

    const orderBy: Prisma.FlowerOrderByWithRelationInput | undefined =
      payload.sort
        ? {
            createdAt: payload.sort === "trending" ? "asc" : "desc",
          }
        : undefined;

    // Ensure `page` and `limit` are valid numbers
    const validPage = Math.max(1, Number(payload.page) || 1);
    const validLimit = Math.max(1, Number(payload.limit) || 10);

    // Pagination: Calculate skip and take based on valid values
    const skip = (validPage - 1) * validLimit;
    const take = validLimit;

    const [result, total] = await Promise.all([
      prisma.flower.findMany({ where: filters, orderBy, skip, take }),
      prisma.flower.count({ where: filters }),
    ]);

    return { data: result, total };
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
