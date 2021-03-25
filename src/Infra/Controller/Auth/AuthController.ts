import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SessionService } from '@domain/Services/Auth/SessionService';
import { RefreshTokenService } from '@domain/Services/Auth/RefreshTokenService';

export class AuthenticationController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const sessionService = container.resolve(SessionService);
        const { token, user } = await sessionService.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ token, user });
    }

    async refreshToken(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { authorization } = request.headers;

        const refreshTokenService = container.resolve(RefreshTokenService);
        const { token, user } = await refreshTokenService.execute(
            authorization,
        );

        delete user.password;

        return response.json({ token, user });
    }
}
