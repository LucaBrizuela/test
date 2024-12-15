import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Logout() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleLogout = () => {
    if (!currentUser) {
      alert('No user is currently logged in.');
      return;
    }

    alert(`You have logged out of ${currentUser.email}'s account.`);
    setCurrentUser(null); // Clear the current user
  };

  return (
    <div className="card">
      <div className="card-header">Logout</div>
      <div className="card-body">
        {currentUser ? (
          <p>Currently logged in as: <strong>{currentUser.email}</strong></p>
        ) : (
          <p>No user is currently logged in.</p>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
