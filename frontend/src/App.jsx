import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "../components/ProfileForm.jsx";
import ProfileView from "../components/ProfileView.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<ProfileForm />} />
        <Route path="/view" element={<ProfileView />} />
        <Route path="/Home" element={<h1>Welcome to Profile Management</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
