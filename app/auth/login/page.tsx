import type { Metadata } from "next"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Zflamebyd",
  description: "Login to your Zflamebyd account",
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="font-playfair text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email and password to sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
