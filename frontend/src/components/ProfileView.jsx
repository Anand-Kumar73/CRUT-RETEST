import { useState } from "react";
import axios from "axios";

const ProfileView = () => {
  const [searchId, setSearchId] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile/users/${searchId}`,
      );
      setUser(response.data[0]);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  return (
    <div>
      <h1>Search Profile</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchId}
          placeholder="Enter profile UUID string"
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Query</button>
      </form>

      {user && (
        <div>
          <h3>Profile Details</h3>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
