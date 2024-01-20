import { describe, expect, it } from 'vitest';
import Category from './category.entity';

describe('Category unit tests', () => {
  it('should create a category', () => {
    const category = new Category('id', 'name', 'functionInGame', 'serverId');
    expect(category.id).toBe('id');
    expect(category.name).toBe('name');
    expect(category.functionInGame).toBe('functionInGame');
    expect(category.serverId).toBe('serverId');
  });
});
