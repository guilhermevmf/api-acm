import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/Errors/AppError';

export default function authentication(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError('Enter the token');
    }

    try {
        const tokenDecoded = JSON.stringify(
            verify(authorization, process.env.TOKEN_KEY || ''),
        );
        const { sub, unitId, cod, role } = JSON.parse(tokenDecoded) as {
            sub: string;
            unitId: string;
            cod: string;
            role: string;
        };

        request.user = {
            id: sub,
            cod,
            unitId,
            role,
        };
        next();
    } catch {
        throw new AppError('Token invalido');
    }
}
