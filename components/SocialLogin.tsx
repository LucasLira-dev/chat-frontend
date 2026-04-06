import { SocialButton } from "./SocialButton"

export const SocialLogin = () => {
    return (
        <div className="flex flex-col items-center ">
            <div className="flex items-center gap-4 mb-4 mt-6 w-full max-w-md">
                <div className="flex-1 h-px bg-primary/20"></div>
                <p className="text-sm text-primary">ou entre com</p>
                <div className="flex-1 h-px bg-primary/20"></div>
            </div>
            <div className="flex items-center gap-4">
                <SocialButton provider="google" />
                <SocialButton provider="discord" />
                <SocialButton provider="github" />
            </div>
        </div>
    )
}