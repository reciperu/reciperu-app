import { SpaceUser } from '@/features/User/types';

export interface Recipe {
  id: string;
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
  spaceId: string;
  userId: string;
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
