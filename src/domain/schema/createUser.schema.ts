import { z } from 'zod';

// Definir el esquema
export const createUserSchema = z.object({
    name: z.string({ required_error: 'El nombre es requerido', }).min(1, { message: 'El nombre es requerido' }),
    firstName: z.string({ required_error: 'El Apellido es requerido', }).min(1).refine(value => value.trim() !== '', { message: 'El apellido es requerido' }),
    email: z.string({ required_error: 'El email es requerido', }).email({ message: 'El email no es valido' }),
    password: z.string({ required_error: 'La contraseña es requerida', }).min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmPassword: z.string({ required_error: 'La confirmación de la contraseña es requerida', }),
    phone: z.string().optional(),
    img: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, { message: 'Las contraseñas no coinciden', path: ['confirmPassword'] })


export const updateUserSchema = z.object({
    name: z.string().optional(),
    firstName: z.string().optional(),
    phone: z.string().optional(),
    img: z.string().optional(),
    description: z.string().optional(),
    password: z.string().optional(),
}).passthrough().partial()
