import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from "bcrypt"
import { get, set } from "@vercel/edge-config"

// In a real app, you would use a database
// This is a simplified version using Edge Config for demo purposes
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // In a real app, fetch from database
          // For demo, we'll use Edge Config
          const users = (await get("users")) || []
          const user = users.find((u: any) => u.email === credentials.email)

          if (!user) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.hashedPassword)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

// Helper function to create a new user
export async function createUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  try {
    // In a real app, save to database
    // For demo, we'll use Edge Config
    const users = (await get("users")) || []

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error("User already exists")
    }

    const hashedPassword = await hash(password, 10)
    const id = crypto.randomUUID()

    const newUser = {
      id,
      name,
      email,
      hashedPassword,
      createdAt: new Date().toISOString(),
    }

    await set("users", [...users, newUser])

    return { id, name, email }
  } catch (error) {
    console.error("Create user error:", error)
    throw error
  }
}
