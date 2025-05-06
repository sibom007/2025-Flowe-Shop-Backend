import { FlowerCategory, FlowerType } from "@prisma/client";
import { z } from "zod";

export const createFlowerValidation = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name cannot be empty" }),

  color: z
    .string({
      required_error: "Color is required",
    })
    .min(1, { message: "Color cannot be empty" }),

  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, { message: "Price cannot be empty" }),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, { message: "Description cannot be empty" }),

  image: z
    .string({
      required_error: "Image is required",
    })
    .min(1, { message: "Image URL cannot be empty" }),

  category: z.enum(
    [
      FlowerCategory.ANNIVERSARY_CELEBRATIONS,
      FlowerCategory.BIRTHDAY_SPECIALS,
      FlowerCategory.CONGRATULATIONS,
      FlowerCategory.FRIENDSHIP,
      FlowerCategory.GET_WELL_SOON,
      FlowerCategory.HAPPY_MOMENTS,
      FlowerCategory.LOVE_AND_ROMANCE,
      FlowerCategory.NEW_BABY,
      FlowerCategory.SYMPATHY_AND_CONDOLENCES,
      FlowerCategory.THANK_YOU,
    ],
    {
      required_error: "Category is required",
    }
  ),

  FlowerType: z.enum(
    [
      FlowerType.REGULAR,
      FlowerType.PREMIUM,
      FlowerType.SPECIAL,
      FlowerType.LIMITED,
    ],
    {
      required_error: "Flower Type is required",
    }
  ),

  stock: z.number({
    required_error: "Stock is required",
  }),

  isAvailable: z.boolean({
    required_error: "Availability is required",
  }),
});

export const updateFlowerValidation = z.object({
  color: z
    .string({
      required_error: "Color is required",
    })
    .min(1, { message: "Color cannot be empty" })
    .optional(),

  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, { message: "Price cannot be empty" })
    .optional(),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, { message: "Description cannot be empty" })
    .optional(),

  image: z
    .string({
      required_error: "Image is required",
    })
    .min(1, { message: "Image URL cannot be empty" })
    .optional(),

  category: z
    .enum(
      [
        FlowerCategory.ANNIVERSARY_CELEBRATIONS,
        FlowerCategory.BIRTHDAY_SPECIALS,
        FlowerCategory.CONGRATULATIONS,
        FlowerCategory.FRIENDSHIP,
        FlowerCategory.GET_WELL_SOON,
        FlowerCategory.HAPPY_MOMENTS,
        FlowerCategory.LOVE_AND_ROMANCE,
        FlowerCategory.NEW_BABY,
        FlowerCategory.SYMPATHY_AND_CONDOLENCES,
        FlowerCategory.THANK_YOU,
      ],
      {
        required_error: "Category is required",
      }
    )
    .optional(),

  FlowerType: z
    .enum(
      [
        FlowerType.REGULAR,
        FlowerType.PREMIUM,
        FlowerType.SPECIAL,
        FlowerType.LIMITED,
      ],
      {
        required_error: "Flower Type is required",
      }
    )
    .optional(),

  stock: z
    .number({
      required_error: "Stock is required",
    })
    .optional(),

  isAvailable: z
    .boolean({
      required_error: "Availability is required",
    })
    .optional(),
});
export const FlowerValidation = {
  createFlowerValidation,
  updateFlowerValidation
};
