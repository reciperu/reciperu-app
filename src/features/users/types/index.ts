export interface SpaceUser {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
  spaceRole: UserRole;
}

export interface UserCheckResponse {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
  spaceRole: UserRole;
}

export enum UserStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_SPACE',
  NOT_JOINED_SPACE = 'NOT_JOINED_SPACE',
}

export enum UserRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export interface UpdatedUserBody {
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}
