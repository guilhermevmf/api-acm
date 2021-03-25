declare namespace Express {
    export interface Request {
        user: {
            id: string;
            cod: string;
            unitId: string;
            role: string;
        };
    }
}
