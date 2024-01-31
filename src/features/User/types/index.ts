export interface SpaceUser {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
  recipeBookOwnerId: 'string';
  recipeBookParticipantId: 'string';
}

export interface UserCheckResponse {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}

export enum UserStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_RECIPE_BOOK',
  NOT_JOINED_SPACE = 'NOT_JOINED_SPACE',
}

export interface UpdatedUserBody {
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}
