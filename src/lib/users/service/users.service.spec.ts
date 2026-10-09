import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity.js';
import { UsersMapper } from '../mapper/users_mapper.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  let repository: {
    create: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    merge: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      create: vi.fn(),
      findOne: vi.fn(),
      merge: vi.fn(),
      save: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useValue: repository },
        { provide: UsersMapper, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws a conflict when creating a user with a duplicate email', async () => {
    repository.create.mockReturnValue({});
    repository.save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

    await expect(
      service.create({
        name: 'Example',
        age: 30,
        address: 'Example address',
        email: 'existing@example.com',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('throws a conflict when updating a user to a duplicate email', async () => {
    repository.findOne
      .mockResolvedValueOnce({ id: 1, email: 'current@example.com' })
      .mockResolvedValueOnce({ id: 2, email: 'existing@example.com' });

    await expect(
      service.update(1, { email: 'existing@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('allows updating a user without changing their email', async () => {
    const user = { id: 1, email: 'current@example.com' };
    repository.findOne
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(user);
    repository.save.mockResolvedValue(user);

    await expect(
      service.update(1, { email: 'current@example.com' }),
    ).resolves.toBe(user);
  });

  it('throws a conflict when the email becomes duplicate during update', async () => {
    repository.findOne
      .mockResolvedValueOnce({ id: 1, email: 'current@example.com' })
      .mockResolvedValueOnce(null);
    repository.save.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

    await expect(
      service.update(1, { email: 'existing@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
