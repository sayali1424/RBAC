const mockUsers = [
    { id: 1, name: "Emily Stock", email: "emily@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Johnny Head", email: "johnny@example.com", role: "Editor", status: "Inactive" },
  ];
  
  const mockRoles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },             // New role added
    { id: 3, name: "Moderator", permissions: ["Read", "Write"] }, // New role added
  ];
  
  export const api = {
    getUsers: () => Promise.resolve(mockUsers),
    getRoles: () => Promise.resolve(mockRoles),
    addUser: (user) => {
      mockUsers.push(user);
      return Promise.resolve(user);
    },
    updateUser: (id, updatedUser) => {
      const index = mockUsers.findIndex((user) => user.id === id);
      if (index !== -1) mockUsers[index] = { ...mockUsers[index], ...updatedUser };
      return Promise.resolve(updatedUser);
    },
    deleteUser: (id) => {
      const index = mockUsers.findIndex((user) => user.id === id);
      if (index !== -1) mockUsers.splice(index, 1);
      return Promise.resolve(id);
    },
    addRole: (role) => {
      mockRoles.push(role);
      return Promise.resolve(role);
    },
    updateRole: (id, updatedRole) => {
      const index = mockRoles.findIndex((role) => role.id === id);
      if (index !== -1) mockRoles[index] = { ...mockRoles[index], ...updatedRole };
      return Promise.resolve(updatedRole);
    },
  };
  