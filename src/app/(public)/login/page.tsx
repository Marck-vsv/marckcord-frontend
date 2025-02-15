'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true)
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (result.ok) {
                alert('Login realizado com sucesso!')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1d4b] via-[#24295f] to-[#3c476f]">
            <div className="w-full max-w-md p-8 space-y-6 bg-[#2b2d31] rounded-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-white">Boas-vindas de volta!</h1>
                    <p className="text-[#b5bac1]">Estamos muito animados em te ver novamente!</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                        Nome de Usuário
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </FormLabel>

                                    <FormControl>
                                        <Input {...field} disabled={isLoading} className="bg-[#1e1f22] border-none text-white" />
                                    </FormControl>

                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                        Senha
                                        <span className="text-red-500 ml-1">
                                            *
                                        </span>
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={isLoading}
                                            className="bg-[#1e1f22] border-none text-white"
                                        />
                                    </FormControl>

                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />

                        <Link href="/forgot-password" className="text-[#00a8fc] hover:underline text-sm inline-block">
                            Esqueceu sua senha?
                        </Link>

                        <Button type="submit" disabled={isLoading} className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white">
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <p className="text-sm text-[#b5bac1]">
                            Precisando de uma conta?{' '}

                            <Link href="/register" className="text-[#00a8fc] hover:underline">
                                Registre-se
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

