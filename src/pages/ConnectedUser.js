import React from "react";
import MainNav from "../components/MainNav";
import Header from "../components/Header";
import Account from "../components/Account";
const ConnectedUser = () => {
  return (
    <main className="main">
      <MainNav />
      <Header />
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        amountDescription="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        amountDescription="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        amountDescription="Current Balance"
      />
    </main>
  );
};

export default ConnectedUser;
