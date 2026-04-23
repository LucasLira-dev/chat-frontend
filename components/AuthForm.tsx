'use client';

import { MessageCircle, Mail, Lock, User, Eye, EyeOff, ArrowRight, } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginData, LoginSchema, RegisterData, RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError, toastSuccess } from "./ui/sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export const AuthForm = () => {

    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    const router = useRouter();
    const { refreshSession } = useAuth();

    const { register, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors, isSubmitting: registerIsSubmitting }} = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
        mode: 'onTouched'
    })

    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors, isSubmitting: loginIsSubmitting }} = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        mode: 'onTouched'
    })

    const onLoginSubmit = async (data: LoginData) => {
        try {
            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            })

            if (result.error) {
                toastError({ title: "Erro de autenticação", description: "Ocorreu um erro ao tentar fazer login." });
            }
            else {
                toastSuccess({ title: "Login bem-sucedido!", description: "Você entrou com sucesso." });
                await refreshSession();
                router.push('/')
            }
        }
        catch {
            toastError({ title: "Erro de autenticação", description: "Ocorreu um erro ao tentar fazer login." });
        }
    }

    const onRegisterSubmit = async (data: RegisterData) => {
        try {
            const result = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            })

            if (result.error) {
                toastError({ title: "Erro de registro", description: "Ocorreu um erro ao tentar criar a conta." });
            }
            else {
                toastSuccess({ title: "Registro bem-sucedido!", description: "Sua conta foi criada com sucesso." });
                await refreshSession();
                router.push('/')
            }
        }
        catch {
            toastError({ title: "Erro de registro", description: "Ocorreu um erro ao tentar criar a conta." });
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-center items-center">
                <div className="inline-flex items-center justify-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7] flex items-center justify-center shadow-lg shadow-[#6C5CE7]/30">
                            <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#F8F5FF] bg-[#00CEC9] dark:border-[#111723]" />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-[#1A1A2E] dark:text-white">
                        Chat<span className="text-[#6C5CE7]">wme</span>
                    </span>
                </div>
            </div>

            <p className="mb-7 text-center text-sm leading-relaxed text-[#6B6B8D] dark:text-[#A7AEC6]">
                {mode === 'login' ? 'Bem-vindo de volta! Entre para continuar conversando.' : 'Crie sua conta e comece a conversar agora.'}
            </p>

            <Tabs defaultValue="login" className="w-full">
                <TabsList className="w-full min-h-14 rounded-xl border border-[#E0D8F0] bg-primary/10 p-1 dark:border-[#31384D] dark:bg-[#161C2A]">
                    <TabsTrigger value="login" className="p-2 cursor-pointer rounded-lg" onClick={() => setMode("login")}>Entrar</TabsTrigger>
                    <TabsTrigger value="register" className="p-2 cursor-pointer rounded-lg" onClick={() => setMode("register")}>Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="pt-4">
                    <form className="space-y-4" onSubmit={handleLoginSubmit(onLoginSubmit)}>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="w-full rounded-xl border border-transparent bg-primary/10 p-4 pl-12 text-foreground placeholder:text-foreground/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                {...loginRegister('email')}
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                        </div>
                        {loginErrors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {loginErrors.email.message}
                            </p>
                        )}
                        
                        <div className="relative">
                            <input
                                type={showLoginPassword ? "text" : "password"}
                                placeholder="sua senha"
                                className="w-full rounded-xl border border-transparent bg-primary/10 p-4 pl-12 text-foreground placeholder:text-foreground/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                {...loginRegister('password')}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                {showLoginPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                        </div>
                        {loginErrors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {loginErrors.password.message}
                            </p>
                        )}
                        <p className="text-sm text-primary text-right cursor-pointer hover:text-primary/80 transition-colors">
                            Esqueceu a senha?
                        </p>
                        <button 
                        type="submit"
                        className="w-full py-3 bg-[#6C5CE7] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#5A4BCF] transition-colors cursor-pointer mt-6 font-medium"
                        disabled={loginIsSubmitting}>
                            {loginIsSubmitting ? 'Entrando' : 'Entrar'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </TabsContent>

                <TabsContent value="register" className="pt-4">
                    <form className="space-y-4" onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="seu nome"
                                className="w-full rounded-xl border border-transparent bg-primary/10 p-4 pl-12 text-foreground placeholder:text-foreground/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                {...register('name')}

                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                        </div>
                        {registerErrors.name && (
                            <p className="text-sm text-red-500 mt-1">
                                {registerErrors.name.message}
                            </p>
                        )}
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="seu email"
                                className="w-full rounded-xl border border-transparent bg-primary/10 p-4 pl-12 text-foreground placeholder:text-foreground/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                {...register('email')}
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                        </div>
                        {registerErrors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {registerErrors.email.message}
                            </p>
                        )}
                        <div className="relative">
                            <input
                                type={showRegisterPassword ? "text" : "password"}
                                placeholder="sua senha"
                                className="w-full rounded-xl border border-transparent bg-primary/10 p-4 pl-12 text-foreground placeholder:text-foreground/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#6C5CE7]"
                                {...register('password')}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 w-5 h-5" />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                                {showRegisterPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                        </div>
                        {registerErrors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {registerErrors.password.message}
                            </p>
                        )}
                        <button 
                        type="submit"
                        className="w-full py-3 bg-[#6C5CE7] text-white rounded-xl flex items-center justify-center gap-2 hover:bg-[#5A4BCF] transition-colors cursor-pointer mt-6 font-medium"
                        disabled={registerIsSubmitting}
                        >
                            {registerIsSubmitting ? 'Cadastrando' : 'Cadastrar'}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                </TabsContent>
            </Tabs>
        </div>
    )
}
