
import { z } from 'zod';

// Definir el esquema
export const productSchema = z.object({
    name: z.string({ required_error: 'El nombre del producto es requerido', }).min(1, { message: 'El nombre del producto es requerido' }),
    price: z.number({required_error: 'El precio es requerido'}).int().positive({ message: 'El precio del producto es requerido' }),
    description: z.string({required_error: 'La descripción del producto es requerido'}).min(1, { message: 'La descripción del producto es requerida' }),
});
