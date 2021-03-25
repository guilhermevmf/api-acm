import { container } from 'tsyringe';
// Unit
import { IUnitRepository } from '@domain/Repositories/IUnitRepository';
import { UnitRepository } from '@infra/Typeorm/Repositories/UnitRepository';
// User
import { IUserRepository } from '@domain/Repositories/IUserRepository';
import { UserRepository } from '@infra/Typeorm/Repositories/UserRepository';
// UserToken
import { IUserTokenRepository } from '@domain/Repositories/IUserTokenRepository';
import { UserTokenRepository } from '@infra/Typeorm/Repositories/UserTokenRepository';
// Provider
import { IProviderRepository } from '@domain/Repositories/IProviderRepository';
import { ProviderRepository } from '@infra/Typeorm/Repositories/ProviderRepository';
// Bank
import { IBankRepository } from '@domain/Repositories/IBankRepository';
import { BankRepository } from '@infra/Typeorm/Repositories/BankRepository';
// Year
import { IYearRepository } from '@domain/Repositories/IYearRepository';
import { YearRepository } from '@infra/Typeorm/Repositories/YearRepository';
// Department
import { IDepartmentRepository } from '@domain/Repositories/IDepartmentRepository';
import { DepartmentRepository } from '@infra/Typeorm/Repositories/DepartmentRepository';

// Unit
container.registerSingleton<IUnitRepository>('UnitRepository', UnitRepository);
// User
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
// UserToken
container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository,
);
// Department
container.registerSingleton<IDepartmentRepository>(
    'DepartmentRepository',
    DepartmentRepository,
);
// Provider
container.registerSingleton<IProviderRepository>(
    'ProviderRepository',
    ProviderRepository,
);
// Bank
container.registerSingleton<IBankRepository>('BankRepository', BankRepository);
// Year
container.registerSingleton<IYearRepository>('YearRepository', YearRepository);
