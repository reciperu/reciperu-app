import { create } from 'zustand';

import { OnboardingRecipe } from '@/features/Recipe/types';

type State = {
  onboardingSelectedRecipeList: OnboardingRecipe[];
};

type Action = {
  setOnboardingSelectedRecipeList: (obj: OnboardingRecipe) => void;
  updateOnboardingSelectedRecipeList: (obj: OnboardingRecipe) => void;
};

export const useStore = create<State & Action>()((set) => ({
  onboardingSelectedRecipeList: [],
  setOnboardingSelectedRecipeList: (obj) =>
    set((state) => ({
      onboardingSelectedRecipeList: state.onboardingSelectedRecipeList.find(
        (item) => item.idx === obj.idx
      )
        ? state.onboardingSelectedRecipeList.filter((item) => item.idx !== obj.idx)
        : [...state.onboardingSelectedRecipeList, obj],
    })),
  updateOnboardingSelectedRecipeList: (obj) =>
    set((state) => ({
      onboardingSelectedRecipeList: state.onboardingSelectedRecipeList.find(
        (item) => item.idx === obj.idx
      )
        ? state.onboardingSelectedRecipeList.map((item) =>
            item.idx === obj.idx ? { ...item, ...obj } : item
          )
        : state.onboardingSelectedRecipeList,
    })),
}));
