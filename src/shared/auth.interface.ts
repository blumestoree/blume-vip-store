export default interface AuthInterface<T> {
  createToken(data: string): string;
  verifyToken(token: string): T;
  createRefreshToken(id: string): Promise<{ id: string; expiresIn: number }>;
  verifyRefreshToken(refreshToken: string): Promise<string>;
}
