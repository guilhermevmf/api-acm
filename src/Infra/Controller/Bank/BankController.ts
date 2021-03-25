import { Request, Response } from 'express';
import { container } from 'tsyringe';
// Service
import { FindByIdBankService } from '@domain/Services/Bank/FindByIdBankService';
import { FindAllBankService } from '@domain/Services/Bank/FindAllBankService';
import { CreateBankService } from '@domain/Services/Bank/CreateBankService';
import { UpdateBankService } from '@domain/Services/Bank/UpdateBankService';
import { RemoveBankService } from '@domain/Services/Bank/RemoveBankService';

export class BankController {
    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const bankService = container.resolve(FindByIdBankService);
        const banks = await bankService.execute(id);

        return response.json(banks);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const { unitId } = request.user;

        const bankService = container.resolve(FindAllBankService);
        const banks = await bankService.execute(unitId);

        return response.json(banks);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { unitId } = request.user;
        const { name, code } = request.body;

        const bankService = container.resolve(CreateBankService);
        const bank = await bankService.execute({ unitId, name, code });

        return response.status(201).json(bank);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { unitId } = request.user;
        const { name, code } = request.body;

        const bankService = container.resolve(UpdateBankService);
        const bank = await bankService.execute({ id, unitId, name, code });

        return response.json(bank);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const bankService = container.resolve(RemoveBankService);
        await bankService.execute(id);

        return response.status(204).send();
    }
}
