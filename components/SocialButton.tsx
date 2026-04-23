'use client';

import { authClient } from "@/lib/auth-client";
import { JSX, useState } from "react";
import { toastError } from "./ui/sonner";

type Icons = {
    google: JSX.Element;
    discord: JSX.Element;
    github: JSX.Element;
}

const icons: Icons = {
    google: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7## L1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
        </svg>
    ),
    discord: (
        <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" aria-hidden="true">
            <path
                fill="#5865F2"
                d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.14,72.14,0,0,0-3.36,6.84,97.68,97.68,0,0,0-29.3,0A72.24,72.24,0,0,0,45.45,0,105.89,105.89,0,0,0,19.14,8.09C2.74,32.65-1.71,56.6.54,80.21A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-11.9-5.08c.86-.62,1.7-1.27,2.5-1.94A75.57,75.57,0,0,0,97,78.23c.81.67,1.65,1.31,2.5,1.94A68.68,68.68,0,0,1,87.46,85.2a77.2,77.2,0,0,0,6.89,11.13A105.25,105.25,0,0,0,126.6,80.24C129.24,52.84,122.09,29.11,107.7,8.07ZM42.22,65.69C36.18,65.69,31.19,60,31.19,53s5-12.74,11-12.74S53.26,46,53.26,53,48.26,65.69,42.22,65.69Zm42.7,0C78.89,65.69,73.9,60,73.9,53s5-12.74,11-12.74S95.91,46,95.91,53,90.93,65.69,84.92,65.69Z"
            />
        </svg>
    ),
    github: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,0.297C5.373,0.297,0,5.67,0,12.297c0,5.292,3.438,9.787,8.205,11.387c0.599,0.111,0.82-0.261,0.82-0.577c0-0.285-0.011-1.04-0.016-2.042c-3.338,0.726-4.042-1.608-4.042-1.608c-0.546-1.387-1.333-1.756-1.333-1.756c-1.089-0.745,0.082-0.73,0.082-0.73c1.205,0.084,1.839,1.237,1.839,1.237c1.07,1.834,2.809,1.304,3.495,0.997c0.108-0.774,0.419-1.305,0.762-1.605c-2.665-0.303-5.467-1.332-5.467-5.931c0-1.31,0.469-2.381,1.236-3.221c-0.124-0.303-0.536-1.523,0.117-3.176c0,0,1.008-0.322,3.301,1.23c0.957-0.266,1.983-0.399,3.003-0.404c1.02,0.005,2.047,0.138,3.006,0.404c2.291-1.552,3.297-1.23,3.297-1.23c0.655,1.653,0.243,2.873,0.119,3.176c0.77,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.625-5.479,5.921c0.43,0.372,0.815,1.102,0.815,2.222c0,1.604-0.015,2.896-0.015,3.286c0,0.32,0.218,0.694,0.825,0.576C20.565,22.082,24,17.587,24,12.297C24,5.67,18.627,0.297,12,0.297z" />
        </svg>
    )
}

type SocialButtonProps = {
    provider: "google" | "discord" | "github";
}

export const SocialButton = ({ provider }: SocialButtonProps) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await authClient.signIn.social({
                provider,
                callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
            }) 

            if (result.error){
                toastError({title: "Erro ao autenticar", description: result.error.message})
            }
        }
        catch (error) {
            toastError({title: "Erro ao autenticar", description: "Ocorreu um erro inesperado. Tente novamente."})
            console.error("Error during social sign-in:", error);
        }
        finally {
            setLoading(false);
        }   
    }

    return (
        <div className="rounded-lg border border-border bg-background transition-colors hover:border-primary hover:bg-muted/40">
            <button className="flex cursor-pointer items-center justify-center px-8 py-4 text-foreground/60 transition-colors hover:text-foreground" onClick={handleSubmit}>
                {
                    loading ? (
                        <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    ) : (
                        icons[provider]
                    )
                }
            </button>
        </div>
    )
}
