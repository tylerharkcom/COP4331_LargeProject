import React, { useState, useEffect } from "react";

function UserNavBar()
{

    const user = JSON.parse(localStorage.getItem("user_data"));
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');

    useEffect(() => {
        setfName(user.firstName);
        setlName(user.lastName);
    });

    const doLogout = async event => 
    {
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
                window.location.href = '/';
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };    

    const goToFridge = event => 
    {
        event.preventDefault();
        window.location.href = '/dashboard';
    }

    const goToAccount = event =>
    {
        event.preventDefault();
        window.location.href = '/account';
    }

    const goToRecipes = event =>
    {
        event.preventDefault();
        window.location.href = '/recipes';
    }

<<<<<<< HEAD
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
        </ul>
        <span className="navbar-text" style={{ marginRight: "5px" }}>
          Welcome, {fName} {lName}
        </span>
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
=======

    return( 
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
                        name="meals" 
                        type="button" 
                        className="link-button-dark" 
                        value="My Meals" 
                        onClick={goToRecipes}
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
                </ul>
                <span className="navbar-text" style={{marginRight: "5px"}}>
                Welcome, {fName} {lName} 
                </span>
                <form className="form-inline">
                    <button type="button" id="logoutButton" className="btn btn-secondary" 
                    onClick={doLogout}> Log Out </button>
                </form>
            </div>
        </nav>
    );
};
>>>>>>> 7b0eec85d2416714d204797117254892e80253be

export default UserNavBar;
