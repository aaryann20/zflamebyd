import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "@/components/dashboard/user-profile"
import OrderHistory from "@/components/dashboard/order-history"
import AddressBook from "@/components/dashboard/address-book"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="container py-12">
      <h1 className="font-playfair text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="addresses">Address Book</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfile user={session.user} />
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory userId={session.user.id} />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressBook userId={session.user.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
