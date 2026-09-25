import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ProfileView from "./components/ProfileView";

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1>Student Profile</h1>

      <ProfileForm
        user={selectedUser}
        onSuccess={() => setSelectedUser(null)}
      />

      <hr />

      <ProfileView onEdit={(user) => setSelectedUser(user)} />
    </div>
  );
}

export default App;
