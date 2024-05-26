import { z } from 'zod';

// Definir el esquema
export const loginUserSchema = z.object({
    email: z.string({ required_error: 'El email es requerido', }).email({ message: 'El email no es valido' }),
    password: z.string({ required_error: 'La contraseña es requerida', }).min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});
