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
