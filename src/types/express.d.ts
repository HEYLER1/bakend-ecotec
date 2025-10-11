// types/express.d.ts
import { JWTPayload } from './auth.types';

declare global {
    namespace Express {
        interface Request {
            usuario?: JWTPayload;
        }
    }
}

export {};