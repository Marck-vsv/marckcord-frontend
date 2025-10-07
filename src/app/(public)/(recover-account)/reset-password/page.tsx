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
    resetPasswordSchema,
    type ResetPasswordSchema,
} from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [token, router])

    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            token: token || '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetPasswordSchema) => {
        setIsLoading(true);
        try {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_RESET_PASSWORD}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        newPassword: data.newPassword
                    }),
                }
            )

            const { message } = await result.json();

            if (result.ok) {
                alert(message);
                setResetSuccess(true);
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
                {!resetSuccess ? (
                    <>
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-white">Redefinir senha</h1>
                            <p className="text-[#b5bac1]">Digite sua nova senha abaixo.</p>
                        </div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                                Nova senha
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    type={showPassword ? 'text' : 'password'}
                                                    disabled={isLoading}
                                                    className="bg-[#1e1f22] border-none text-white pr-10"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-[#b5bac1]" />
                                                    ) : (
                                                    <Eye className="h-4 w-4 text-[#b5bac1]" />
                                                    )}
                                                </Button>
                                            </div>
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                                Confirmar nova senha
                                                <span className="text-red-500 ml-1">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        disabled={isLoading}
                                                        className="bg-[#1e1f22] border-none text-white pr-10"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() =>
                                                            setShowConfirmPassword(!showConfirmPassword)
                                                        }
                                                    >
                                                        {showConfirmPassword ? (
                                                        <EyeOff className="h-4 w-4 text-[#b5bac1]" />
                                                        ) : (
                                                        <Eye className="h-4 w-4 text-[#b5bac1]" />
                                                        )}
                                                    </Button>
                                                </div>
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
                                    {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
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
                        Senha redefinida!
                    </h2>
                    <p className="text-[#b5bac1]">
                        Sua senha foi redefinida com sucesso. Você já pode fazer login com
                        sua nova senha.
                    </p>
                    <Link href="/login" className="inline-block w-full">
                    <Button className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white">
                        Ir para o login
                    </Button>
                    </Link>
                </div>
                )}
            </div>
        </div>
    );
}
