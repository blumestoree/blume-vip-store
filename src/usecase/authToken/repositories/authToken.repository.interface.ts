export default interface AuthTokenRepositoryInterface<T> {
  delete(userId: string): Promise<void>;
  create(userId: string, expiresIn: number): Promise<T>;
  findByUser(userId: string): Promise<T>;
  find(refreshTokenId: string): Promise<T>;
}
