import { get, set, getAll } from "@vercel/edge-config"

// Basic database operations
export async function getAllData() {
  try {
    return await getAll()
  } catch (error) {
    console.error("Error getting all data:", error)
    return null
  }
}

// User-related functions
export async function getUsers() {
  try {
    return (await get("users")) || []
  } catch (error) {
    console.error("Error getting users:", error)
    return []
  }
}

export async function getUser(userId: string) {
  try {
    const users = (await get("users")) || []
    return users.find((user: any) => user.id === userId) || null
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function updateUser(userId: string, userData: any) {
  try {
    const users = (await get("users")) || []
    const updatedUsers = users.map((user: any) => (user.id === userId ? { ...user, ...userData } : user))
    await set("users", updatedUsers)
    return true
  } catch (error) {
    console.error("Error updating user:", error)
    return false
  }
}

// Address-related functions
export async function getAddresses() {
  try {
    return (await get("addresses")) || []
  } catch (error) {
    console.error("Error getting addresses:", error)
    return []
  }
}

export async function getUserAddresses(userId: string) {
  try {
    const addresses = (await get("addresses")) || []
    return addresses.filter((address: any) => address.userId === userId) || []
  } catch (error) {
    console.error("Error getting user addresses:", error)
    return []
  }
}

export async function addAddress(address: any) {
  try {
    const addresses = (await get("addresses")) || []
    const newAddress = {
      ...address,
      id: `addr_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    await set("addresses", [...addresses, newAddress])
    return newAddress
  } catch (error) {
    console.error("Error adding address:", error)
    return null
  }
}

export async function updateAddress(addressId: string, addressData: any) {
  try {
    const addresses = (await get("addresses")) || []
    const updatedAddresses = addresses.map((address: any) =>
      address.id === addressId ? { ...address, ...addressData } : address,
    )
    await set("addresses", updatedAddresses)
    return true
  } catch (error) {
    console.error("Error updating address:", error)
    return false
  }
}

export async function deleteAddress(addressId: string) {
  try {
    const addresses = (await get("addresses")) || []
    const filteredAddresses = addresses.filter((address: any) => address.id !== addressId)
    await set("addresses", filteredAddresses)
    return true
  } catch (error) {
    console.error("Error deleting address:", error)
    return false
  }
}

// Order-related functions
export async function getOrders() {
  try {
    return (await get("orders")) || []
  } catch (error) {
    console.error("Error getting orders:", error)
    return []
  }
}

export async function getUserOrders(userId: string) {
  try {
    const orders = (await get("orders")) || []
    return orders.filter((order: any) => order.userId === userId) || []
  } catch (error) {
    console.error("Error getting user orders:", error)
    return []
  }
}

export async function createOrder(orderData: any) {
  try {
    const orders = (await get("orders")) || []
    const newOrder = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    }
    await set("orders", [...orders, newOrder])
    return newOrder
  } catch (error) {
    console.error("Error creating order:", error)
    return null
  }
}

export async function updateOrder(orderId: string, orderData: any) {
  try {
    const orders = (await get("orders")) || []
    const updatedOrders = orders.map((order: any) => (order.id === orderId ? { ...order, ...orderData } : order))
    await set("orders", updatedOrders)
    return true
  } catch (error) {
    console.error("Error updating order:", error)
    return false
  }
}

// Product-related functions
export async function getProducts() {
  try {
    return (await get("products")) || []
  } catch (error) {
    console.error("Error getting products:", error)
    return []
  }
}

// Payment-related functions
export async function savePaymentMethod(userId: string, paymentMethod: any) {
  try {
    const user = await getUser(userId)
    if (!user) {
      console.error("User not found")
      return false
    }

    // In a real app, you would store payment methods securely
    // For demo, we'll just log it
    console.log(`Payment method saved for user ${userId}:`, paymentMethod)
    return true
  } catch (error) {
    console.error("Error saving payment method:", error)
    return false
  }
}

// Initialize database with default values if empty
export async function initializeDatabase() {
  try {
    // Check if users exist
    const users = await get("users")
    if (!users) {
      await set("users", [])
    }

    // Check if addresses exist
    const addresses = await get("addresses")
    if (!addresses) {
      await set("addresses", [])
    }

    // Check if orders exist
    const orders = await get("orders")
    if (!orders) {
      await set("orders", [])
    }

    // Check if products exist
    const products = await get("products")
    if (!products) {
      // Initialize with sample products
      const sampleProducts = [
        {
          id: "candle-1",
          name: "Pumpkin Spice Candle",
          price: 999,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fea9912-96ac-4fb7-953b-9b385fb5c3ad.JPG-lhRUnPtQLGFBJDGUP8LOw2AojOsie6.jpeg",
          category: "candles",
          description: "A warm and cozy candle with notes of pumpkin, cinnamon, and nutmeg.",
        },
        {
          id: "candle-2",
          name: "Pinecone Candle",
          price: 999,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d51a97c-4d61-4e2e-a233-819b9b7f2de4.JPG-xLWyxQxHhLGm0fuBx3rFPLVJXM18VN.jpeg",
          category: "candles",
          description: "A textured candle inspired by nature with a fresh pine scent.",
        },
        {
          id: "tote-1",
          name: "Heart Balance Tote",
          price: 899,
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d62fbf7-2ef8-4865-a3c2-1dfe74c884f4.JPG-UVP6sXnj7AtcKd8a4x9tCe60oFnbE6.jpeg",
          category: "totes",
          description: "A cotton tote bag featuring a yin-yang heart design.",
        },
      ]
      await set("products", sampleProducts)
    }

    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}
