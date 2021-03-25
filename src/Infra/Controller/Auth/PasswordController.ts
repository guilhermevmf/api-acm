import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordService } from '@domain/Services/Auth/ForgotPasswordService';

export class PasswordController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const forgotService = container.resolve(ForgotPasswordService);
        const message = await forgotService.execute(email);

        return response.json({ message });
    }
}
