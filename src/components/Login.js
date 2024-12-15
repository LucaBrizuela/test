import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Login() {
  const { users, setCurrentUser, currentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (currentUser) {
      return; // Prevent duplicate logins
    }

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setCurrentUser(user);
      setError('');
    } else {
      setError('User not found. Please create an account or verify that the data is correct.');
    }
  };

  if (currentUser) {
    return (
      <div className="alert alert-success">
        <strong>You are already logged in!</strong>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">Login</div>
      <div className="card-body">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
