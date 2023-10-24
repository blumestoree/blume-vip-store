export default interface AuthTokenRepositoryInterface<T> {
  create(userId: string, expiresIn: number): Promise<T>;
  findByUser(userId: string): Promise<T>;
  find(refreshTokenId: string): Promise<T>;
  delete(userId: string): Promise<void>;
}
