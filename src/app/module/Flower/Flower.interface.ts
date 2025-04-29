import { FlowerCategory, FlowerType } from "@prisma/client";

export interface FlowerFilter {
  page?: number;
  limit?: number;
  price?: number;
  FlowerType?: FlowerType;
  category?: FlowerCategory;
}

export type FlowerFilters = {
  price?: {
    gte?: number;
    lte?: number;
  };
  FlowerType?: FlowerType;
  category?: FlowerCategory;
};
