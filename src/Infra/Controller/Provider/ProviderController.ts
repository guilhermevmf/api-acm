import { Request, Response } from 'express';
import { container } from 'tsyringe';
// Services
import { FindByIdProviderService } from '@domain/Services/Provider/FindByIdProviderService';
import { FindAllProviderService } from '@domain/Services/Provider/FindAllProviderService';
import { CreateProviderService } from '@domain/Services/Provider/CreateProviderService';
import { UpdateProviderService } from '@domain/Services/Provider/UpdateProviderService';
import { RemoveProviderService } from '@domain/Services/Provider/RemoveProviderService';

export class ProviderController {
    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const providerService = container.resolve(FindByIdProviderService);
        const provider = await providerService.execute(id);

        return response.json(provider);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { departmentId } = request.params;

        const providerService = container.resolve(FindAllProviderService);
        const providers = await providerService.execute(departmentId);

        return response.json(providers);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { departmentId } = request.params;
        const {
            name,
            email,
            phone,
            document,
            bankId,
            agency,
            typeAccount,
            account,
            digit,
        } = request.body;

        const providerService = container.resolve(CreateProviderService);
        const provider = await providerService.execute({
            departmentId,
            name,
            email,
            phone,
            document,
            bankId,
            agency,
            typeAccount,
            account,
            digit,
        });

        return response.json(provider);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {
            name,
            email,
            phone,
            document,
            bankId,
            agency,
            typeAccount,
            account,
            digit,
        } = request.body;

        const providerService = container.resolve(UpdateProviderService);
        const provider = await providerService.execute({
            id,
            name,
            email,
            phone,
            document,
            bankId,
            agency,
            typeAccount,
            account,
            digit,
        });

        return response.json(provider);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const providerService = container.resolve(RemoveProviderService);
        const providers = await providerService.execute(id);

        return response.json(providers);
    }
}
