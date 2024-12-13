import React from 'react';
import { Card } from 'react-bootstrap';

function Home() {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Welcome to the Bank</Card.Title>
        <Card.Text>
          Manage your account, deposits, and withdrawals with ease.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Home;
