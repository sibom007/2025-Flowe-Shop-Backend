import { FlowerCategory, FlowerType } from "@prisma/client";

export interface IFlowerFilterPayload {
  page?: number;
  limit?: number;
  minPrice?: number | null;
  maxPrice?: number | null;
  category?: FlowerCategory;
  FlowerType?: FlowerType;
  color?: string | null;
  rating?: string | null;
  searchInput?: string | null;
  sort?: string | null;
}







