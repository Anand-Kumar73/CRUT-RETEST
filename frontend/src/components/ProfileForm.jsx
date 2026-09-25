import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/profile/users", {
        name: name,
        email: email,
        phone: phone,
        address: address,
        age: Number(age),
      });

      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create New Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Enter full name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={phone}
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={address}
          placeholder="Enter physical address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <br />
        <input
          type="number"
          value={age}
          placeholder="Enter age"
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
