
import { z } from 'zod';

// Definir el esquema
export const sendMailSchema = z.object({
    to: z.string().email({ message: 'El correo electrónico no es válido' }),
    subject: z.string().min(1, { message: 'El subject es requerido' }),
    html: z.string().min(1, { message: 'El html es requerido' }),
});
