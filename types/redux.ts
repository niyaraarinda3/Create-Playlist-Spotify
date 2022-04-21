import { UserProfile } from "./spotify";

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string;
  userInfo: UserProfile | null;
}
