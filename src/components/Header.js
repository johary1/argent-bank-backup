import React, { useState } from "react";
import "../styles/components/header.css";

const Header = ({ onEditClick, isEditMode }) => {
  const [firstName, setFirstName] = useState("Tony");
  const [lastName, setLastName] = useState("Jarvis");

  const handleSaveClick = () => {
    // Perform any necessary save operations
  };

  const handleCancelClick = () => {
    // Optionally revert any changes made in the form
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  return (
    <div className="header">
      {isEditMode ? (
        <form className="form-container" onSubmit={handleSaveClick}>
          <h1>Welcome back</h1>
          <div className="form-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button className="edit-button" onClick={onEditClick}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
