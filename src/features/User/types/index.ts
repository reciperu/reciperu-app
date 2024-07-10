export interface SpaceUser {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
  spaceId: string;
  spaceRole: 'OWNER' | 'PARTICIPANT';
}

export interface UserCheckResponse {
  id: string;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}

export enum UserStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_SPACE',
  NOT_JOINED_SPACE = 'NOT_JOINED_SPACE',
}

export interface UpdatedUserBody {
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}

export interface UpdatedUserTokenRequestBody {
  token: string;
  deviceId: string;
}

export interface UpdatedUserTokenResponse {
  token: string;
  deviceId: string;
}
