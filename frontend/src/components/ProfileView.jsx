import { useState } from "react";
import { getProfileDetails } from "../services/profile.service";

function ProfileView({ onEdit }) {
  const [id, setId] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!id) {
      setError("Please enter user ID");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await getProfileDetails(id);
      setUser(data);
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Profile not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-view">
      <h2>Search User By Id</h2>

      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter User ID"
      />

      <button onClick={handleSearch}>Get User</button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {user && (
        <div>
          <h3>User Details</h3>

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

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.created_at).toLocaleString()}
          </p>

          <button onClick={() => onEdit(user)}>Edit User Profile</button>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
