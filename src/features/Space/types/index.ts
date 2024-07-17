import { SpaceUser } from '@/features/User/types';

export interface Space {
  id: number;
  name: string;
  users: SpaceUser[];
}
