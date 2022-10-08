import { StatusCode } from '@/types/status';

export { StatusCode } from '@/types/status';

export type Colors = 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warn';

export enum Role {
  ADMIN = 1,
  EDITOR,
  VIEWER,
}

export interface UserProfile {
  username: string;
  role: Role;
}

export type LoginCredential = Pick<UserProfile, 'username'> & {
  password: string;
};

export interface AppVersion {
  release: string;
  hash: string;
}

export interface ApiResponse<D = unknown> {
  code: StatusCode;
  msg: string;
  data?: D;
}
