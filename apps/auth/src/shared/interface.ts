export interface AuthJwtPayload {
  id: number;
  email: string;
  username: string;
  sessionId: number;
  otp: string;
}
