import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainNav from "../components/MainNav";
import Header from "../components/Header";
import Account from "../components/Account";

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
        isEditMode={isEditMode}
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        amountDescription="Current Balance"
        isEditMode={isEditMode}
      />
    </main>
  );
};

export default ProfilePage;
