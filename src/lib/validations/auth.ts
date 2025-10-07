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

export const forgotPasswordSchema = z.object({
    username: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
})

export const resetPasswordSchema = z.object({
    token: z
        .string()
        .min(1, {
            message: 'Um token de reset deve ser fornecido',
        }),
    newPassword: z.
        string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
        .min(8, {
            message: 'A senha deve ter pelo menos 8 caracteres',
        }),
    confirmPassword: z
        .string()
        .min(1, {
            message: 'Este campo é obrigatório',
        })
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
})

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
