import { AppError } from '@shared/Errors/AppError';
import { NextFunction, Request, Response } from 'express';

export class Authorization {
    admin(request: Request, response: Response, next: NextFunction): void {
        const { role } = request.user;

        if (role === 'admin') {
            next();
        } else {
            throw new AppError('Você não tem permissão');
        }
    }
}
