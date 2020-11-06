import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import sha256 from '../sha256';

function Register() 
{

    var loginName;
    var loginPassword;
    var firstName;
    var lastName;
    var email;
    var checkEmail;
    
    
    const [message,setMessage] = useState('');

    const doRegister = async event =>
    {
        event.preventDefault();
        let check = email.value === checkEmail.value;
        if (!check)
        {
            setMessage('The emails do not match!');
            return;
        }

        if(firstName.value==""||lastName.value=="")
        {
            setMessage('Please enter your first and last name');
            return;
        }

        if(loginName.value=="")
        {
            setMessage('A username is required');
            return;
        }

        if(loginPassword.value=="")
        {
            setMessage('A password is required');
            return;
        }

        var expression = /\S+@\S+/ ;
        if(!expression.test(String(email.value).toLowerCase()))
        {
            setMessage('Please enter a valid email address');
            return;
        }

        expression = /^\w+$/;
        if(!expression.test(loginName.value))
        {
            setMessage('Your username may only contain letters, numbers, and underscores');
            return;
        }

        if(loginPassword.value.length<8)
        {
            setMessage('Your password must be at least 8 characters long');
            return;
        }

        expression = /[!@#$%*]/;
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one of the following special character: @, !, #, $, %, *');
            return;
        }

        expression = /[0-9]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one digit (0-9)');
            return;
        }

        expression = /[a-z]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one lowercase letter');
            return;
        }

        expression = /[A-Z]/
        if(!expression.test(loginPassword.value))
        {
            setMessage('Your password must contain at least one uppercase letter');
            return;
        }

        var pwd = sha256(loginPassword.value);

        var obj = { username: loginName.value, password: pwd, fName: firstName.value, lName: lastName.value, email: email.value };
        var js = JSON.stringify(obj);
        
        try 
        {
            const response = await fetch("http://localhost:5000/api/register", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
      
            var res = JSON.parse(await response.text());
      
            if (response.status != 200) {
                var error = res.error;
                setMessage(error);
                return;
            } else {
                setMessage("Success! If you are not redirected, please ckick 'Go to login'");
                setTimeout(function() {
                    window.location.href = '/';
                }, 2000);
                return;
            }
        } catch (e) {
            alert(e.toString());
            return;
        };
    }

    const goToLogin = event => 
    {
        event.preventDefault();
        window.location.href = '/';
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
                        </div>
                        <div class="form-group col-md-6">
                            <label for="verifyEmail1">Verify email address</label>
                            <input type="email" class="form-control" id="verifyEmail1" aria-describedby="emailHelp" placeholder="Reenter email" ref={(c) => checkEmail = c} />
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
                                </ul>
                            </ReactTooltip>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" onClick={doRegister}>Register</button>
                        <button type="reset" style={{marginLeft: "10px", marginRight: "10px"}} class="btn btn-secondary">Reset</button>
                        <button type="button" style={{marginLeft: "10x"}} class="btn btn-secondary" onClick={goToLogin}>Go to login</button>
                    </div>
                </form>
                <span id="registerResult" class="lightText">{message}</span>
            </div>
        </div>
    );
};

export default Register;