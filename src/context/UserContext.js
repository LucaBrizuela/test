import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(""); // To store withdrawal error messages

  // Initialize balance to 0 for new users
  const addUser = (name, email, password) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { name, email, password, balance: 0 },
    ]);
  };

  const updateUserBalance = (email, amount) => {
    setError(""); // Clear previous errors
    const user = users.find((user) => user.email === email);

    if (user) {
      const newBalance = user.balance + amount;

      if (newBalance < 0) {
        setError("Insufficient funds. Cannot complete the withdrawal.");
        return;
      }

      // Update the user's balance
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, balance: newBalance } : user
        )
      );

      // Update current user balance if they are logged in
      if (currentUser && currentUser.email === email) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          balance: newBalance,
        }));
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        addUser,
        updateUserBalance,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

