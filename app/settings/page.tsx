import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { NavBar } from "@/components/NavBar";
import { DeleteAccount } from "@/components/DeleteAccount";
import { Logout } from "@/components/Logout";
import { UpdateNickname } from "@/components/UpdateNickname";
import { SimpleCards } from "@/components/SimpleCard";
import { SectionHeader } from "@/components/SectionHeader";
import { UpdateTheme } from "@/components/UpdateTheme";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function SettingsPage() {

  let session = null;

  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      }
    });
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  if (session?.data === null) {
    redirect("/auth");
  }

  const nickname = session?.data?.user?.name || "";

  const nicknamePreview = nickname.trim() || "Seu nickname";

  return (
    <>
      <div className="min-h-screen bg-[#F6F7FB] transition-colors dark:bg-[#0F1320]">
        <NavBar />

        <main className="ml-0 pt-16 md:ml-80 md:pt-0">
          <div className="mx-auto max-w-5xl p-4 md:p-8">
            <div className="relative overflow-hidden rounded-[32px] border border-[#E8EAF4] bg-white shadow-[0_24px_80px_rgba(22,27,45,0.08)] transition-colors dark:border-[#2D3447] dark:bg-[#151A28] dark:shadow-none">

              <div className="relative p-5 md:p-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-[#6D7388] transition-colors hover:text-[#181C2A] dark:text-[#98A0BC] dark:hover:text-white"
                >
                  <ArrowLeft className="size-4" />
                  Voltar para as conversas
                </Link>

                <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#181C2A] dark:text-white">
                      Configurações
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-[#6D7388] dark:text-[#A7AEC6]">
                      Uma central simples para editar seu nickname, alternar o
                      modo da interface e deixar as ações de conta prontas para
                      integração.
                    </p>
                  </div>

                  <SimpleCards nicknamePreview={nicknamePreview} />

           </div>   
                <div className="mt-8 space-y-5">
                  <section className="rounded-[28px] border border-[#E8EAF4] bg-[#FCFCFE] p-5 transition-colors dark:border-[#2E3548] dark:bg-[#101522]">
                    <SectionHeader
                      icon={UserRound}
                      title="Nickname"
                      description="Campo visual pronto para você conectar ao update do perfil."
                    />
                    <UpdateNickname nickname={nicknamePreview} />
                  </section>

                 <UpdateTheme />

                  <section className="rounded-[28px] border border-[#E8EAF4] bg-[#FCFCFE] p-5 transition-colors dark:border-[#2E3548] dark:bg-[#101522]">
                    <SectionHeader
                      icon={ShieldAlert}
                      title="Conta"
                      description="Ações visuais de sessão e exclusão, prontas para receber seus handlers."
                    />

                    <div className="mt-5 grid gap-3">
                      <Logout />
                      <DeleteAccount />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

     
    </>
  );
}
