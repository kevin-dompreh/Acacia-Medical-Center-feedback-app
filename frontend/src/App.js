import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./styles.css";
import RegisterAdmin from "./RegisterAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
