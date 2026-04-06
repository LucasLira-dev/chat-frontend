import { AuthForm } from "@/components/AuthForm";
import { ChatPreview } from "@/components/ChatPreview";
import { SocialLogin } from "@/components/SocialLogin";
import Link from "next/dist/client/link";

export default function AuthPage() {
    return (
        <main className="bg-background min-h-screen grid lg:grid-cols-2">
                <div className="hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-[#6C5CE7]/5 via-[#F8F5FF] to-[#00CEC9]/5 p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <circle cx="1" cy="1" r="0.5" fill="#6C5CE7" opacity="0.3" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl xl:text-5xl font-bold text-[#1A1A2E] mb-4 text-balance">
                                Conecte-se com
                                <span className="block text-[#6C5CE7]">quem importa</span>
                            </h1>
                            <p className="text-[#6B6B8D] text-lg max-w-md mx-auto text-pretty">
                                Conversas em tempo real, seguras e divertidas. Seu novo lugar favorito para conversar.
                            </p>
                        </div>

                        <ChatPreview />

                        <div className="flex justify-center gap-12 mt-12">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#6C5CE7]">10M+</p>
                                <p className="text-sm text-[#6B6B8D]">Usuários ativos</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#00CEC9]">500M+</p>
                                <p className="text-sm text-[#6B6B8D]">Mensagens/dia</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-[#6C5CE7]">150+</p>
                                <p className="text-sm text-[#6B6B8D]">Países</p>
                            </div>
                        </div>
                    </div>
                </div>
              <section className="w-full px-6 py-8 md:py-0 flex flex-col gap-4 justify-center">
                <AuthForm />
                <SocialLogin />
                <p className="text-sm text-[#6B6B8D] text-center mt-6">
                    Ao continuar, você concorda com nossos <Link href="/terms" className="text-[#6C5CE7] hover:underline">
                        Termos de Uso
                    </Link> e <Link href="/privacy" className="text-[#6C5CE7] hover:underline">
                        Política de Privacidade
                    </Link>
                </p>
              </section>
        </main>
    )
}