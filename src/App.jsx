import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ClientRegisterPage from "./pages/auth/ClientRegisterPage";
import CustomerLayout from "./layouts/CustomerLayout";
import WorkerLayout from "./layouts/WorkerLayout";
import ProDashboard from "./pages/worker/DashboardPage";
import BookingPage from "./pages/customer/BookingPage";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/client-register" element={<ClientRegisterPage />} />

        <Route path="/booking" element={<BookingPage/>} />

        {/* Customer Routes */}
        <Route path="/customer/*" element={<CustomerLayout />}>
          <Route path="dashboard" element={<CustomerDashboard/>} />
        </Route>

        {/* Worker Routes */}
        <Route path="/worker/*" element={<WorkerLayout />}/>
      </Routes>
    </Router>
  );
}

export default App;