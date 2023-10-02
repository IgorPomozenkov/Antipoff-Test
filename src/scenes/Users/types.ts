import { User } from '@/utils/types';

export interface PropsUsers {
  list: Array<User>;
  likes?: Array<Like>;
}

export interface Like {
  userId: number;
}
