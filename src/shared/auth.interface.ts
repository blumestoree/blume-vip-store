export default interface AuthInterface<T> {
  createToken(data: string): string;
  verifyToken(token: string): T;
  updateRefreshToken(id: string): Promise<{ id: string; expiresIn: number }>;
  createRefreshToken(id: string): Promise<{ id: string; expiresIn: number }>;
  verifyRefreshToken(refreshToken: string): Promise<string>;
}
