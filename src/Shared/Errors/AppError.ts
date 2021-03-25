export class AppError {
    public status: number;
    public message: string;

    constructor(message: string, status = 400) {
        this.message = message;
        this.status = status;
    }
}
