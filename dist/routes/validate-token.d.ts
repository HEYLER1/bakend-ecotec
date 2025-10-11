import { Request, Response, NextFunction } from 'express';
declare const validateToken: (req: Request, res: Response, next: NextFunction) => void;
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export default validateToken;
//# sourceMappingURL=validate-token.d.ts.map