import { SpaceUser } from '@/features/User/types';

export interface Recipe {
  id: number;
  title: string;
  thumbnailUrl: string;
  imageUrls: string[];
  memo: string;
  recipeUrl: string;
  faviconUrl: string;
  appName: string;
}

export interface OnboardingRecipe extends Omit<Recipe, 'id'> {
  idx: number;
}

export interface MetaData {
  title: string;
  thumbnailUrl: string;
  appName: string;
  faviconUrl: string;
}

export interface SpaceRecipe extends Recipe {
  spaceId: number;
  userId: number;
  isFavorite: boolean;
  createdAt: string;
  requesters: string[];
  user: SpaceUser;
}

export interface RecipeRequestBody {
  title: string;
  thumbnailUrl: string;
  imageUrls: string[];
  memo: string;
  recipeUrl: string;
  faviconUrl: string;
  appName: string;
}

export interface RecipesResponse {
  recipes: SpaceRecipe[];
  nextCursor: string;
}

export interface RequestedRecipesResponse {
  data: Record<string, SpaceRecipe[]>;
}
