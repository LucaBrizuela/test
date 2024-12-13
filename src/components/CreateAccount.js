import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function CreateAccount() {
  const { users, setUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || password.length < 8) {
      alert('Please provide valid inputs');
      return;
    }

    setUsers([...users, { name, email, password }]);
    setName('');
    setEmail('');
    setPassword('');
    setSuccess(true);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        {success && <Alert variant="success">Account Created!</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            disabled={!name || !email || password.length < 8}
            onClick={handleSubmit}
          >
            Create Account
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateAccount;
