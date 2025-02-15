import * as z from 'zod';

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        }),
    password: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .min(8, {
            message: 'A senha deve ter pelo menos 8 caracteres',
        }),
});

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .email({
            message: 'E-mail inválido',
        }),
    displayname: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .min(2, {
            message: 'O nome deve ter pelo menos 2 caracteres',
        }),
    username: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .min(2, {
            message: 'O nome de usuário deve ter pelo menos 2 caracteres',
        }),
    password: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .min(8, {
            message: 'A senha deve ter pelo menos 8 caracteres',
        })
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
