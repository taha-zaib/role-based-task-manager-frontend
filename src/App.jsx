import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import UserRegister from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";

import AdminRegister from "./pages/admin/Register"
import AdminPanel from "./pages/admin/AdminPanel";
import UsersPage from "./pages/admin/UsersPage";
import UserDetailsPage from "./pages/admin/userDetailsPage";
import AdminRoute from "./components/AdminRoute";

import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin/register" element={<AdminRegister />} />


        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/users/:id" element={<UserDetailsPage />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;