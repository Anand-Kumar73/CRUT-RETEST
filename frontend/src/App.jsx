import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileForm from "./components/profileForm.jsx";
import ProfileView from "./components/profileView.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<ProfileForm />} />
        <Route path="/view" element={<ProfileView />} />
        <Route path="/Home" element={<h1>Profile</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
