import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';

function Register() 
{

    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;
    
    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();

        alert('doRegister()');
    }

    return (
        <div id="registerDiv" class="center">
            <div id="registerWrapper">
                <h1 class="pageTitle">FoodBuddy</h1>
                <form id="registerForm" onSubmit={doRegister}>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerFirstName">First name</label>
                            <input type="text" class="form-control" id="registerFirstName" placeholder="Enter your first name" ref={(c) => firstName = c} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="registerLastName">Last name</label>
                            <input type="text" class="form-control" id="registerLastName" placeholder="Enter your last name" ref={(c) => lastName = c} />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerEmail1">Email address</label>
                            <input type="email" class="form-control" id="registerEmail1" aria-describedby="emailHelp" placeholder="Enter email" ref={(c) => email = c} />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="verifyEmail1">Verify email address</label>
                            <input type="email" class="form-control" id="verifyEmail1" aria-describedby="emailHelp" placeholder="Reenter email" ref={(c) => email = c} />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="registerLoginName">Username</label>
                            <input type="username" class="form-control" id="registerLoginName" placeholder="Username" ref={(c) => loginName = c} />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="registerLoginPassword1">Password</label>
                            <input type="password" class="form-control" id="registerLoginPassword1" data-tip data-for="passwordTip" placeholder="Password" ref={(c) => loginPassword = c} />
                            <ReactTooltip id="passwordTip" place="bottom" effect="solid">
                                Your password should:
                                <ul>
                                    <li>be at least 8 characters long</li>
                                    <li>contain at least one capital letter, at least one lowercase letter, and at least one digit</li>
                                    <li>contain at least one of the following special characters: @, !, #, $, %, *</li>
                                </ul>"
                            </ReactTooltip>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" onClick={doRegister}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;