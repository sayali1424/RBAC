import React, { useState, useEffect } from "react";
import { api } from "../api/mockApi";
import "./RoleManagement.css";
import "./Sidebar.css"; // Import the sidebar CSS

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions] = useState(["Read", "Write", "Delete"]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    api.getRoles().then(setRoles);
  }, []);

  const handleAddRole = () => {
    if (!newRole.name) {
      alert("Role name is required!");
      return;
    }
    const id = Math.max(...roles.map((r) => r.id), 0) + 1;
    api.addRole({ id, ...newRole }).then((role) => setRoles([...roles, role]));
    setNewRole({ name: "", permissions: [] });
  };

  const handleUpdateRole = (id) => {
    if (!editingRole.name) {
      alert("Role name is required!");
      return;
    }
    api.updateRole(id, editingRole).then((updatedRole) => {
      setRoles(roles.map((role) => (role.id === id ? updatedRole : role)));
      setEditingRole(null);
    });
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const togglePermission = (permission) => {
    const updatedPermissions = editingRole.permissions.includes(permission)
      ? editingRole.permissions.filter((p) => p !== permission)
      : [...editingRole.permissions, permission];

    setEditingRole({ ...editingRole, permissions: updatedPermissions });
  };

  return (
    <div className="role-management">
      {/* Add Role Section */}
      <div className="add-role-form">
        <h3>Add New Role</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <div className="permissions-checkboxes">
          {permissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission)}
                onChange={() =>
                  setNewRole({
                    ...newRole,
                    permissions: newRole.permissions.includes(permission)
                      ? newRole.permissions.filter((p) => p !== permission)
                      : [...newRole.permissions, permission],
                  })
                }
              />
              {permission}
            </label>
          ))}
        </div>
        <button className="add-role-button" onClick={handleAddRole}>
          Add Role
        </button>
      </div>

      {/* Role Management Section */}
      <h2>Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                {editingRole?.id === role.id ? (
                  <input
                    type="text"
                    value={editingRole.name}
                    onChange={(e) =>
                      setEditingRole({ ...editingRole, name: e.target.value })
                    }
                  />
                ) : (
                  role.name
                )}
              </td>
              <td>
                {permissions.map((permission) => (
                  <label key={permission}>
                    <input
                      type="checkbox"
                      checked={editingRole?.permissions.includes(permission) || role.permissions.includes(permission)}
                      disabled={editingRole?.id !== role.id} // Editable only in edit mode
                      onChange={() => editingRole?.id === role.id && togglePermission(permission)}
                    />
                    {permission}
                  </label>
                ))}
              </td>
              <td>
                {editingRole?.id === role.id ? (
                  <button
                    onClick={() => handleUpdateRole(role.id)}
                    className="add-role-button"
                  >
                    <i className="fas fa-save"></i> 
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingRole({ ...role })}
                    className="edit-btn"
                  >
                    <i className="fas fa-edit"></i> 
                  </button>
                )}
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="delete-btn"
                >
                  <i className="fas fa-trash-alt"></i> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
