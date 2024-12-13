import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);

  return (
    <UserContext.Provider value={{ users, setUsers, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
}
