import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Withdraw() {
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

  const handleWithdraw = () => {
    const numericAmount = parseFloat(amount);

    if (numericAmount <= 0) {
      setWarning('Amount must be greater than zero.');
      return;
    }

    if (numericAmount > currentUser.balance) {
      setWarning('Insufficient funds. Please enter a valid amount.');
      return;
    }

    updateUserBalance(currentUser.email, -numericAmount); // Deduct the amount
    setWarning('');
    alert(`$${numericAmount} has been withdrawn from your account.`);
    setAmount('');
  };

  return (
    <div className="card">
      <div className="card-header">
        Withdraw (Current Balance: ${currentUser.balance})
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
        <button className="btn btn-danger" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Withdraw;
