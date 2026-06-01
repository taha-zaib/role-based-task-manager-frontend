import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>

        <Route path="/" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;