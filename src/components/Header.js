import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/components/header.css";

const Header = ({ onEditClick, isEditMode }) => {
  //const [isEditMode, setIsEditMode] = useState(false);
  //const user = useSelector((state) => state.auth.user);
  const [firstName, setFirstName] = useState("Tony");
  const [lastName, setLastName] = useState("Jarvis");

  const handleEditClick = () => {
    //setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Perform any necessary save operations
    //setIsEditMode(false);
  };

  const handleCancelClick = () => {
    // Optionally revert any changes made in the form
    console.log("cancel");
  };

  const handleFirstNameChange = (e) => {
    // Handle first name change
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    // Handle last name change
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
              //value={user.firstName}
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              //value={user.lastName}
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
            {/* {user.firstName} {user.lastName}! */}
            {firstName} {lastName} !
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
