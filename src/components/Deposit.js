import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Deposit() {
  const { currentUser, updateUserBalance } = useContext(UserContext);
  const [amount, setAmount] = useState('');
  const [warning, setWarning] = useState('');

  if (!currentUser) {
    return (
      <div className="alert alert-danger">
        You must <strong>create an account</strong>. If you already have one, <strong>log in</strong>.
      </div>
    );
  }

  const handleDeposit = () => {
    const numericAmount = parseFloat(amount);

    if (numericAmount <= 0) {
      setWarning('Amount must be greater than zero.');
      return;
    }

    updateUserBalance(currentUser.email, numericAmount); // Add the amount
    setWarning('');
    alert(`$${numericAmount} has been deposited into your account.`);
    setAmount('');
  };

  return (
    <div className="card">
      <div className="card-header">
        Deposit (Current Balance: ${currentUser.balance})
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {warning && <div className="text-danger mb-3">{warning}</div>}
        <button className="btn btn-success" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
    </div>
  );
}

export default Deposit;
