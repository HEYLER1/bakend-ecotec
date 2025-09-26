"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieUtils = void 0;
class CookieUtils {
    static setRefreshTokenCookie(res, refreshToken) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 //la 7 días
        });
    }
    // Limpiar cookie de refresh token
    static clearRefreshTokenCookie(res) {
        res.clearCookie('refreshToken');
    }
}
exports.CookieUtils = CookieUtils;
//# sourceMappingURL=cookieUtils.js.map