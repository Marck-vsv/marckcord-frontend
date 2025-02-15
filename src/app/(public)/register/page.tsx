'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema, type RegisterSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            displayname: '',
            username: '',
            password: '',
        },
    })

    const onSubmit = async (data: RegisterSchema) => {
        setIsLoading(true)
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_USER_BASE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (result.ok) {
                alert('Usuário criado com sucesso!')
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
                <h1 className="text-2xl font-bold text-white text-center">
                    Criar uma conta
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                        E-mail
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
                            name="displayname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                        Nome de exibição
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-xs font-bold text-[#b5bac1]">
                                        Nome de usuário
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

                        <Button type="submit" disabled={isLoading} className="w-full !mt-6 bg-[#5865f2] hover:bg-[#4752c4] text-white">
                            {isLoading ? 'Registrando...' : 'Continuar'}
                        </Button>
                        <div className="text-xs text-[#b5bac1]">
                            Ao se registrar, você concorda com os{' '}

                            <Link href="/terms" className="text-[#00a8fc] hover:underline">
                                termos de serviço
                            </Link>{' '}

                            e a{' '}

                            <Link href="/privacy" className="text-[#00a8fc] hover:underline">
                                política de privacidade
                            </Link>{' '}

                            do Discord.
                        </div>
                        <p className="text-sm text-[#b5bac1]">
                            Já tem uma conta?{' '}
                            <Link href="/login" className="text-[#00a8fc] hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

