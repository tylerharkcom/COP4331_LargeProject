import React from 'react';

function UserNavBar()
{

    var user={}

    const doLogout = event => 
    {
	    event.preventDefault();
		
        alert('doLogout');
    };    

    return( 
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">FoodBuddy</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">My Dashboard <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">My Food</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">My Recipes</a>
                </li>
                </ul>
                <span class="navbar-text">
                Welcome, John Doe 
                </span>
                <form class="form-inline">
                    <button type="button" id="logoutButton" class="button" 
                    onClick={doLogout}> Log Out </button>
                </form>
            </div>
        </nav>
    );
};

export default UserNavBar;
