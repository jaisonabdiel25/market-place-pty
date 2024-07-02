
import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string({ required_error: 'El nombre del producto es requerido', }).min(1, { message: 'El nombre del producto es requerido' }),
    price: z.number({required_error: 'El precio es requerido'}).positive({ message: 'El precio del producto es requerido' }),
    description: z.string({required_error: 'La descripción del producto es requerido'}).min(1, { message: 'La descripción del producto es requerida' }),
    categoryId: z.string({required_error: 'La categoría del producto es requerida'}).min(1, { message: 'La categoría del producto es requerida' }),
    img: z.string().optional(),
});

export const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
    categoryId: z.string().optional(),
    img: z.string().optional(),
});
