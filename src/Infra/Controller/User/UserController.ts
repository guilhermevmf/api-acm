import { Request, Response } from 'express';
import { container } from 'tsyringe';
// Services
import { FindByIdUserService } from '@domain/Services/User/FindByIdUserService';
import { FindAllUserService } from '@domain/Services/User/FindAllUserService';
import { CreateUserService } from '@domain/Services/User/CreateUserService';
import { UpdateUserService } from '@domain/Services/User/UpdateUserService';
import { RemoveUserService } from '@domain/Services/User/RemoveUserService';

export class UserController {
    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const userService = container.resolve(FindByIdUserService);
        const user = await userService.execute(id);

        delete user.password;

        return response.json(user);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { id, unitId } = request.user;

        const userService = container.resolve(FindAllUserService);
        const users = await userService.execute(unitId, id);

        return response.json(users);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { unitId } = request.user;
        const { departmentId, cod, name, email, role, active } = request.body;

        const userService = container.resolve(CreateUserService);
        const user = await userService.execute({
            unitId,
            departmentId,
            cod,
            name,
            email,
            role,
            active,
        });

        delete user.password;

        return response.status(201).json(user);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { unitId } = request.user;
        const { id } = request.params;
        const { departmentId, cod, name, email, role, active } = request.body;

        const userService = container.resolve(UpdateUserService);
        const user = await userService.execute({
            id,
            unitId,
            departmentId,
            cod,
            name,
            email,
            role,
            active,
        });

        delete user.password;

        return response.json(user);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const userService = container.resolve(RemoveUserService);
        await userService.execute(id);

        return response.status(204).send();
    }
}
