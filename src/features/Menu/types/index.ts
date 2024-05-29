import { SpaceRecipe } from '@/features/Recipe/types';

export enum MenuStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}

export interface MenuItem {
  id: string;
  status: MenuStatus;
  scheduledAt: string;
  userId: string;
  recipeId: string;
  recipe: SpaceRecipe;
}

export interface MenusResponse {
  menus: MenuItem[];
  nextCursor: string;
}
