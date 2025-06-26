"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function DatabaseAdminPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isInitializing, setIsInitializing] = useState(false)
  const [dbData, setDbData] = useState<any>(null)
  const { toast } = useToast()

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchDatabaseData()
    }
  }, [status])

  const fetchDatabaseData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/database")
      if (!response.ok) {
        throw new Error("Failed to fetch database data")
      }
      const data = await response.json()
      setDbData(data)
    } catch (error) {
      console.error("Error fetching database data:", error)
      toast({
        title: "Error",
        description: "Failed to load database data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const initializeDatabase = async () => {
    setIsInitializing(true)
    try {
      const response = await fetch("/api/database", {
        method: "POST",
      })
      if (!response.ok) {
        throw new Error("Failed to initialize database")
      }

      toast({
        title: "Success",
        description: "Database initialized successfully.",
      })

      // Refresh data
      await fetchDatabaseData()
    } catch (error) {
      console.error("Error initializing database:", error)
      toast({
        title: "Error",
        description: "Failed to initialize database. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsInitializing(false)
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container py-12 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-terracotta" />
        <p className="mt-4 text-muted-foreground">Loading database data...</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold">Database Admin</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={fetchDatabaseData} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={initializeDatabase}
            disabled={isInitializing}
            className="bg-terracotta hover:bg-terracotta/90"
          >
            {isInitializing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Initialize Database"
            )}
          </Button>
        </div>
      </div>

      {dbData ? (
        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="all">All Data</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <DatabaseTable title="Users" description="All registered users in the database" data={dbData.users || []} />
          </TabsContent>

          <TabsContent value="addresses">
            <DatabaseTable
              title="Addresses"
              description="All saved addresses in the database"
              data={dbData.addresses || []}
            />
          </TabsContent>

          <TabsContent value="orders">
            <DatabaseTable title="Orders" description="All orders in the database" data={dbData.orders || []} />
          </TabsContent>

          <TabsContent value="products">
            <DatabaseTable title="Products" description="All products in the database" data={dbData.products || []} />
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Database Data</CardTitle>
                <CardDescription>Complete database contents</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[500px]">
                  {JSON.stringify(dbData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Data Found</CardTitle>
            <CardDescription>The database appears to be empty or not properly initialized.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Click the "Initialize Database" button to set up the database with default values.</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={initializeDatabase}
              disabled={isInitializing}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              {isInitializing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                "Initialize Database"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

function DatabaseTable({ title, description, data }: { title: string; description: string; data: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-muted-foreground">No data available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left font-medium">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b">
                    {Object.values(item).map((value: any, i) => (
                      <td key={i} className="px-4 py-2">
                        {typeof value === "object"
                          ? JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? "..." : "")
                          : String(value).substring(0, 50) + (String(value).length > 50 ? "..." : "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
