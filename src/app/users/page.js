'use client'

import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/getUsers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Addresses</h1>
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
