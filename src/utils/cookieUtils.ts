// utils/cookieUtils.ts
import { Response } from 'express';

export class CookieUtils {
    // Configurar cookie de refresh token
    static setRefreshTokenCookie(res: Response, refreshToken: string): void {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });
    }

    // Limpiar cookie de refresh token
    static clearRefreshTokenCookie(res: Response): void {
        res.clearCookie('refreshToken');
    }
}