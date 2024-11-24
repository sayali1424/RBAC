import React, { useState, useEffect } from "react";
import { api } from "../api/mockApi"; // Assuming you have mockApi for data
import "./UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Assuming these functions fetch data from an API
    api.getUsers().then(setUsers);
    api.getRoles().then(setRoles);
  }, []);

  const handleAddUser = () => {
    const id = Math.max(...users.map((u) => u.id), 0) + 1;
    api.addUser({ id, ...newUser }).then((user) => setUsers([...users, user]));
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  };

  const handleDeleteUser = (id) => {
    api.deleteUser(id).then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user });
  };

  const handleSaveUser = () => {
    api.updateUser(editingUser.id, newUser).then(() => {
      setUsers(users.map((user) => (user.id === editingUser.id ? newUser : user)));
      setEditingUser(null);
      setNewUser({ name: "", email: "", role: "", status: "Active" });
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Add or Edit User Form */}
      <div className="add-user-form">
        <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {editingUser ? (
          <button onClick={handleSaveUser}>Save Changes</button>
        ) : (
          <button onClick={handleAddUser}>Add User</button>
        )}
      </div>

      {/* Users List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`status-circle ${user.status === "Active" ? "active" : "inactive"}`}
                ></span>
                {user.status}
              </td>
              <td>
                <button onClick={() => handleEditUser(user)} className="edit-btn">
                  <i className="fas fa-edit"></i> {/* Font Awesome edit icon */}
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">
                  <i className="fas fa-trash-alt"></i> {/* Font Awesome delete icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
