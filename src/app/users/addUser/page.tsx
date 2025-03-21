"use client"; // Enables client-side rendering

import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    street: "",
    housenumber: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Fetch users from API
  async function fetchUsers() {
    const res = await fetch("/api/getUsers", { cache: "no-store" });
    const data = await res.json();
    setUsers(data);
  }

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Submit form data to API
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userPayload = {
      name: formData.name,
      email: formData.email,
      phonenumber: formData.phonenumber,
      address: {
        street: formData.street,
        housenumber: formData.housenumber,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
    };

    const res = await fetch("/api/addUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPayload),
    });

    if (res.ok) {
      alert("User added successfully!");
      setFormData({ name: "", email: "", phonenumber: "", street: "", housenumber: "", city: "", state: "", postalCode: "" });
      fetchUsers(); // Refresh user list
    } else {
      alert("Failed to add user");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Addresses</h1>

      {/* Form to add a user */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">Add a User</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phonenumber" placeholder="Phone number" value={formData.phonenumber} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="housenumber" placeholder="Housenumber" value={formData.housenumber} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add User</button>
      </form>

      {/* Display users */}
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Phone number: {user.phonenumber}</p>
              <p>Address: {user.address.street} {user.address.housenumber}, {user.address.city}, {user.address.state}, {user.address.postalCode}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
