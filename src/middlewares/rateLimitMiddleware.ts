// middlewares/rateLimitMiddleware.ts
import rateLimit from 'express-rate-limit';

// Rate limiting para login (máximo 5 intentos por IP cada 15 minutos)
export const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos por ventana de tiempo
    message: {
        msg: 'Demasiados intentos de login. Intenta nuevamente en 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Solo aplicar rate limit si el login falla
    skipSuccessfulRequests: true
});

// Rate limiting general para registro (más permisivo)
export const registerRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 registros por IP cada 15 minutos
    message: {
        msg: 'Demasiados intentos de registro. Intenta nuevamente en 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false
});
