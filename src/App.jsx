import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/userDetailsPage";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

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