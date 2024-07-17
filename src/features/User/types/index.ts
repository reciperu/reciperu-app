export interface SpaceUser {
  id: number;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
  spaceId: number;
  spaceRole: 'OWNER' | 'PARTICIPANT';
}

export interface UserCheckResponse {
  id: number;
  name: string;
  imageUrl: string;
  activeStatus: UserStatus;
}

export enum UserStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_SPACE',
  RE_ONBOARDING = 'RE_ONBOARDING',
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
