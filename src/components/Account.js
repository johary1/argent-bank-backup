import React from "react";

const Account = ({ title, amount, amountDescription, isEditMode }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{amountDescription}</p>
      </div>
      <div
        className={`account-content-wrapper cta ${
          isEditMode ? " edit-mode-wrapper-button" : ""
        }`}
      >
        <button
          className={`transaction-button ${
            isEditMode ? " edit-mode-button" : ""
          }`}
        >
          View transactions
        </button>
      </div>
    </section>
  );
};

export default Account;
