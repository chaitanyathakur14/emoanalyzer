import React, { useState, useEffect } from "react";

// --- UI Components ---
const Card = ({ className, children }) => <div className={`border rounded-xl shadow-sm bg-white ${className}`}>{children}</div>;
const Button = ({ className, variant, size, children, ...props }) => (
  <button {...props} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${className}`}>{children}</button>
);
const Input = (props) => <input {...props} className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className}`} />;

const LOCAL_STORAGE_KEY = "clinicUsers";

export const ClinicFinder = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  // Load users from localStorage or default
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setUsers(storedUsers);
  }, []);

  // Persist users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const handleInviteUser = () => {
    if (!inviteEmail || !/\S+@\S+\.\S+/.test(inviteEmail)) return;
    const newUser = {
      id: Date.now(),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
    };
    setUsers([newUser, ...users]);
    setInviteEmail("");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 rounded-lg bg-gray-50">
      {/* Disclaimer */}
      <Card className="p-4 text-center bg-yellow-50 border-yellow-200">
        <p className="text-sm text-yellow-800">
          Disclaimer: This tool stores only emails of people you want to reach out to for guidance or collaboration. All data can be deleted at any time.
        </p>
      </Card>

      {/* Invite Section */}
      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="someone@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Button variant="hero" size="sm" onClick={handleInviteUser}>Add</Button>
        </div>
      </Card>

      {/* Search Section */}
      <Card className="p-4">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* User List */}
      <div className="space-y-2">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No users found.</p>
        ) : (
          filteredUsers.map(user => (
            <Card key={user.id} className="p-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ClinicFinder;
