import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function Deposit() {
  const { balance, setBalance } = useContext(UserContext);
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount)) {
      alert('Please enter a valid number.');
      return;
    }
    if (depositAmount <= 0) {
      alert('Deposit amount must be greater than zero.');
      return;
    }

    setBalance(balance + depositAmount);
    setAmount('');
    setSuccess(true);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Deposit</Card.Title>
        <Card.Text>Balance: ${balance.toFixed(2)}</Card.Text>
        {success && <Alert variant="success">Deposit successful!</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Deposit Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button
            disabled={!amount}
            onClick={handleDeposit}
          >
            Deposit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Deposit;
