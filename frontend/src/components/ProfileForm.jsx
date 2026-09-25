import { useState } from "react";
import { createUser, updateUser } from "../services/profile.service";

function ProfileForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    age: user?.age || "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        age: Number(formData.age),
      };

      if (user?.id) {
        await updateUser(user.id, data);
        setMessage("User updated successfully");
      } else {
        const response = await createUser(data);

        setMessage(`Profile created successfully. ID: ${response.id}`);

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          age: "",
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <h2>{user ? "Update User Profile" : "Create Profile of User"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>

        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
            min="0"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : user ? "Update User" : "Create User"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfileForm;
