import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindByIdUnitService } from '@domain/Services/Unit/FindByIdUnitService';
import { FindAllUnitService } from '@domain/Services/Unit/FindAllUnitService';
import { CreateUnitService } from '@domain/Services/Unit/CreateUnitService';
import { UpdateUnitService } from '@domain/Services/Unit/UpdateUnitService';
import { RemoveUnitService } from '@domain/Services/Unit/RemoveUnitService';

export class UnitController {
    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const unitService = container.resolve(FindByIdUnitService);
        const unit = await unitService.execute(id);
        return response.json(unit);
    }

    async findAll(request: Request, response: Response): Promise<Response> {
        const unitService = container.resolve(FindAllUnitService);
        const units = await unitService.execute();

        return response.json(units);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, cnpj, active } = request.body;

        const unitService = container.resolve(CreateUnitService);
        const unit = await unitService.execute({ name, cnpj, active });

        return response.json(unit);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, cnpj, active } = request.body;

        const unitService = container.resolve(UpdateUnitService);
        const unit = await unitService.execute({ id, name, cnpj, active });

        return response.json(unit);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const unitService = container.resolve(RemoveUnitService);
        const unit = await unitService.execute(id);

        return response.json(unit);
    }
}
