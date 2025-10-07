'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    forgotPasswordSchema,
    type ForgotPasswordSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordSchema) => {
        setIsLoading(true);
        try {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_FORGOT_PASSWORD}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )
            const { message } = await result.json();

            if (result.ok) {
                setEmailSent(true);
                alert(message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1d4b] via-[#24295f] to-[#3c476f]">
        <div className="w-full max-w-md p-8 space-y-6 bg-[#2b2d31] rounded-lg shadow-xl">
            {!emailSent ? (
            <>
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold text-white">
                        Esqueceu sua senha?
                    </h1>
                    <p className="text-[#b5bac1]">
                        Digite seu e-mail e enviaremos instruções para redefinir sua
                        senha.
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                    Nome de usuário
                                    <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        disabled={isLoading}
                                        className="bg-[#1e1f22] border-none text-white"
                                        placeholder="nomedeusuario"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                        />
                        <div className="flex flex-col gap-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white"
                            >
                                {isLoading ? 'Enviando...' : 'Enviar e-mail'}
                            </Button>
                            <Link
                                href="/login"
                                className="flex items-center justify-center text-sm text-[#00a8fc] hover:underline gap-1"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Voltar para o login
                            </Link>
                        </div>
                    </form>
                </Form>
            </>
            ) : (
            <div className="space-y-4 text-center">
                <h2 className="text-xl font-semibold text-white">
                    Instruções enviadas!
                </h2>
                <p className="text-[#b5bac1]">
                    Se uma conta existir com o e-mail fornecido, você receberá um
                    e-mail com instruções para redefinir sua senha.
                </p>
                <Link
                    href="/login"
                    className="flex items-center justify-center text-sm text-[#00a8fc] hover:underline gap-1"
                >
                <ArrowLeft className="h-4 w-4" />
                    Voltar para o login
                </Link>
            </div>
            )}
        </div>
        </div>
    );
}
