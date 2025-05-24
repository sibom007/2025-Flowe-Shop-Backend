import { Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";

const CreateCardItems = async ({
  UserId,
  FlowerIds,
}: {
  UserId: string;
  FlowerIds: string[];
}) => {
  if (FlowerIds.length === 0) throw new Error("No flower IDs provided");

  try {
    // Get flower details by IDs
    const flowers = await prisma.flower.findMany({
      where: {
        id: { in: FlowerIds },
      },
      select: {
        id: true,
        price: true,
      },
    });

    if (flowers.length === 0) {
      throw new Error("No flowers found with the provided IDs");
    }

    const quantity = flowers.length;
    const totalPrice = flowers.reduce((acc, flower) => acc + flower.price, 0);

    // Check if user already has a card
    const existingCard = await prisma.cardItem.findFirst({
      where: { UserId },
    });

    if (existingCard) {
      // Append new flower IDs, avoiding duplicates
      const updatedFlowerIds = Array.from(
        new Set([...existingCard.FlowerIds, ...FlowerIds])
      );

      // Get prices of updated list
      const updatedFlowers = await prisma.flower.findMany({
        where: { id: { in: updatedFlowerIds } },
        select: { price: true },
      });

      const updatedTotalPrice = updatedFlowers.reduce(
        (acc, f) => acc + f.price,
        0
      );

      await prisma.cardItem.update({
        where: { id: existingCard.id },
        data: {
          FlowerIds: updatedFlowerIds,
          Quantity: updatedFlowerIds.length,
          TotalPrice: updatedTotalPrice,
        },
      });
    } else {
      // Create a new card if none exists
      await prisma.cardItem.create({
        data: {
          UserId,
          FlowerIds,
          Quantity: quantity,
          TotalPrice: totalPrice,
        },
      });
    }
  } catch (error) {
    console.error("Error creating/updating card:", error);
    throw new Error("Card creation failed");
  }
};

const getCardItems = async () => {
  const items = await prisma.cardItem.findMany();
  return items;
};

export const deleteCardItems = async ({ FlowerId }: { FlowerId: string }) => {
  try {
    const exId = await prisma.cardItem.findFirst({
      where: {
        FlowerIds: {
          has: FlowerId,
        },
      },
    });

    if (!exId) {
      throw new Error("Card item not found");
    }

    const cardItems = await prisma.cardItem.findMany({
      where: {
        FlowerIds: {
          has: FlowerId,
        },
      },
    });

    if (cardItems.length === 0) return;

    // Prepare all Prisma operations first
    const operations: Prisma.PrismaPromise<any>[] = [];

    for (const item of cardItems) {
      const updatedFlowerIds = item.FlowerIds.filter((id) => id !== FlowerId);

      if (updatedFlowerIds.length === 0) {
        operations.push(
          prisma.cardItem.delete({
            where: { id: item.id },
          })
        );
      } else {
        const remainingFlowers = await prisma.flower.findMany({
          where: { id: { in: updatedFlowerIds } },
          select: { price: true },
        });

        const totalPrice = remainingFlowers.reduce(
          (sum, f) => sum + f.price,
          0
        );

        operations.push(
          prisma.cardItem.update({
            where: { id: item.id },
            data: {
              FlowerIds: updatedFlowerIds,
              Quantity: updatedFlowerIds.length,
              TotalPrice: totalPrice,
            },
          })
        );
      }
    }

    // Execute all Prisma operations inside a transaction
    await prisma.$transaction(operations);
  } catch (error) {
    console.error("Failed to delete/update card items:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const PaymentService = {
  CreateCardItems,
  getCardItems,
  deleteCardItems,
};
