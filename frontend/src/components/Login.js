import React, { useState } from 'react';

function Login()
{
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {username:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.fName,lastName:res.lName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/dashboard';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
      <div id="loginDiv" class="center">
        <div id="loginWrapper">
            <h1 class="pageTitle">FoodBuddy</h1>
            <form id="loginForm" onSubmit={doLogin}>
            <span id="inner-title">PLEASE LOG IN</span><br />
            <div class="form-group">
                <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                <input type="password" id="loginPassword" placeholder="Passsword" ref={(c) => loginPassword = c} /><br />
            </div>
            <div id="rememberme" class="checkbox">
                <label><input type="checkbox" /> Remember me</label>
            </div>
            <div id="loginButton">
                <input type="submit" class="button" value = "Login"
                    onClick={doLogin} />
            </div>
            <div id="registerLink">
                <label>Don't have an account? <br />
                <a href="#">Create one here!</a></label>
            </div>
            </form>
            <span id="loginResult"></span>
        </div>
     </div>
    );
};

export default Login;