import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPages";
import Login from "./pages/Login";
import Dashboard from "./pages/Agent_Form_Dashboard";
import ProtectedRoute from "./PrivateRoutes/ProctedRoutes";
import Signup from "./pages/Signup";
import { ServiceDashboard } from "./pages/ServiceDashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
     <Route path="/service/:agentKey" element={<ServiceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
