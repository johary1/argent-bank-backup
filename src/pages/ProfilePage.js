import React, { useState } from "react";
import MainNav from "../components/MainNav";
import Header from "../components/Header";
import Account from "../components/Account";

const ConnectedUser = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <main className={`main ${isEditMode ? "edit-mode" : ""}`}>
      <MainNav />
      <Header onEditClick={handleEditClick} isEditMode={isEditMode} />
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        amountDescription="Available Balance"
        isEditMode={isEditMode}
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        amountDescription="Available Balance"
        isEditMode={isEditMode} // Pass isEditMode to the Account component
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        amountDescription="Current Balance"
        isEditMode={isEditMode} // Pass isEditMode to the Account component
      />
    </main>
  );
};

export default ConnectedUser;
