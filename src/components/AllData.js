import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Card, Table } from 'react-bootstrap';

function AllData() {
  const { users } = useContext(UserContext);

  return (
    <Card>
      <Card.Body>
        <Card.Title>All Data</Card.Title>
        {users.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>${user.balance || 0}</td> {/* Display balance with $ */}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No user data available.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default AllData;
