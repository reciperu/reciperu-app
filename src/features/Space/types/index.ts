import { SpaceUser } from '@/features/User/types';

export interface Space {
  id: string;
  name: string;
  users: SpaceUser[];
}
