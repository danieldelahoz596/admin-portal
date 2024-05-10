import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import UserPage from "./pages/users";
import OrderPage from "./pages/orders";
import BusinessSettings from "./pages/businessSettings";
import Layout from "./components/Layout";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="business-settings" element={<BusinessSettings />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
