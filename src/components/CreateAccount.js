import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function CreateAccount() {
  const { users, setUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState(false); // Tracks if any input field has been touched

  const validateInputs = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must include an "@" symbol.';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    return newErrors;
  };

  const handleInputChange = (value, setter) => {
    setter(value);
    if (!isTouched) {
      setIsTouched(true); // Enable the Submit button after the first input
    }
    if (!name && !email && !password && value.trim() === '') {
      setIsTouched(false); // Disable if all inputs are cleared
    }
  };

  const handleSubmit = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setUsers([...users, { name, email, password, balance: 0 }]); // Initialize balance at $0
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
    setSuccess(true);
    setIsTouched(false); // Reset Submit button to disabled after successful submission
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Create Account</Card.Title>
        {success && <Alert variant="success">Account Created Successfully!</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => handleInputChange(e.target.value, setName)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => handleInputChange(e.target.value, setEmail)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => handleInputChange(e.target.value, setPassword)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Button
            onClick={handleSubmit}
            disabled={!isTouched} // Initially disabled, enabled after typing, disabled again if cleared
          >
            Create Account
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateAccount;
