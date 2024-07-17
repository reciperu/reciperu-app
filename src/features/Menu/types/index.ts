import { SpaceRecipe } from '@/features/Recipe/types';

export enum MenuStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}

export interface MenuItem {
  id: number;
  status: MenuStatus;
  scheduledAt: string;
  userId: number;
  recipeId: number;
  recipe: SpaceRecipe;
}

export interface MenusResponse {
  menus: MenuItem[];
  nextCursor: string;
}
