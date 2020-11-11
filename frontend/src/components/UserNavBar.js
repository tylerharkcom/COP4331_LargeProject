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

    const doLogout = event => 
    {
	    event.preventDefault();
		// call to API to reset JWT
        localStorage.clear();
        window.location.href = '/';
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

    return( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">FoodBuddy</a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <input 
                        name="fridge" 
                        type="button" 
                        className="link-button" 
                        value="My Fridge" 
                        onClick={goToFridge}
                    />
                </li>
                <li className="nav-item">
                    <input 
                        name="meals" 
                        type="button" 
                        className="link-button" 
                        value="My Meals" 
                    />
                </li>
                <li className="nav-item">
                    <input 
                        name="account" 
                        type="button" 
                        className="link-button" 
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

export default UserNavBar;
