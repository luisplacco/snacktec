import Routes from "./src/routes.js"
import { AuthProvider } from "./src/contexts/auth.js"
import { CartProvider } from "./src/contexts/cart.js"
// ...existing code...
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  )
}
// ...existing code...