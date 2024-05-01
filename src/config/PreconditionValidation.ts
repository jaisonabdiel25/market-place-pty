import { Response } from 'express';

export class PreconditionValidation {

    constructor(
        public readonly message: string[],
        public readonly statusCode: number,
    ) {
    }

    static PreconditionsFailed(message: string[]) {
        return new PreconditionValidation(message, 412);
    }

    static handleErrors(error: unknown, res: Response) {
        if (error instanceof PreconditionValidation) return res.status(412).send({ validations: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }
}