import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Button, Form, Alert } from 'react-bootstrap';

function Withdraw() {
  const { balance, setBalance } = useContext(UserContext);
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount)) {
      alert('Please enter a valid number.');
      return;
    }
    if (withdrawAmount <= 0) {
      alert('Withdraw amount must be greater than zero.');
      return;
    }
    if (withdrawAmount > balance) {
      alert('Insufficient funds.');
      return;
    }

    setBalance(balance - withdrawAmount);
    setAmount('');
    setSuccess(true);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Withdraw</Card.Title>
        <Card.Text>Balance: ${balance.toFixed(2)}</Card.Text>
        {success && <Alert variant="success">Withdraw successful!</Alert>}
        <Form>
          <Form.Group>
            <Form.Label>Withdraw Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Button
            disabled={!amount}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Withdraw;
