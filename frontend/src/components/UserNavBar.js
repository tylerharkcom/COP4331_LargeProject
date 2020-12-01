import React, { useState, useEffect } from "react";

function UserNavBar() {
  const user = JSON.parse(localStorage.getItem("user_data"));
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");

  useEffect(() => {
    setfName(user.firstName);
    setlName(user.lastName);
  });

  const doLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        body: null,
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200) {
        return;
      } else {
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const NavMsg = () => {
    console.log(window.location.pathname);
    if (window.location.pathname == "/dashboard") {
      return (
        <div className="navbar-text" style={{ marginRight: "10px" }}>
          Welcome {fName.concat(" ", lName)}
        </div>
      );
    } else
      return (
        <span className="navbar-text" style={{ marginRight: "10px" }}>
          Logged in as {fName.concat(" ", lName)}
        </span>
      );
  };

  const goToFridge = (event) => {
    event.preventDefault();
    window.location.href = "/dashboard";
  };

  const goToAccount = (event) => {
    event.preventDefault();
    window.location.href = "/account";
  };

  const goToFeed = (event) => {
    event.preventDefault();
    window.location.href = "/feed";
  };

  const goToRecipes = (event) => {
    event.preventDefault();
    window.location.href = "/recipes";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand">FoodBuddy</a>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <input
              name="fridge"
              type="button"
              className="link-button-dark"
              value="My Fridge"
              onClick={goToFridge}
            />
          </li>
          <li className="nav-item">
            <input
              name="account"
              type="button"
              className="link-button-dark"
              value="My Account"
              onClick={goToAccount}
            />
          </li>
          <li className="nav-item">
            <input
              name="feed"
              type="button"
              className="link-button-dark"
              value="My Feed"
              onClick={goToFeed}
            />
          </li>
        </ul>
        <NavMsg />
        {/* <span className="navbar-text" style={{ marginRight: "10px" }}>
          {/* Welcome, {fName} {lName} }
          {<NavMsg />}
        </span> */}
        <form className="form-inline">
          <button
            type="button"
            id="logoutButton"
            className="btn btn-secondary"
            onClick={doLogout}
          >
            {" "}
            Log Out{" "}
          </button>
        </form>
      </div>
    </nav>
  );
}

export default UserNavBar;
