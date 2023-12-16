import { create } from 'zustand';

type State = {
  onboardingSelectedRecipeIdxList: number[];
};

type Action = {
  setOnboardingSelectedRecipeIdxList: (idx: number) => void;
};

export const useStore = create<State & Action>()((set) => ({
  onboardingSelectedRecipeIdxList: [],
  setOnboardingSelectedRecipeIdxList: (idx) =>
    set((state) => ({
      onboardingSelectedRecipeIdxList: state.onboardingSelectedRecipeIdxList.includes(idx)
        ? state.onboardingSelectedRecipeIdxList.filter((i) => i !== idx)
        : [...state.onboardingSelectedRecipeIdxList, idx],
    })),
}));
