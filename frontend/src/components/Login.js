import React, { useState, useEffect } from "react";
import sha256 from '../sha256';

function Login() {
  var loginName;
  var loginPassword;

  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [message, setMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(user));
  });

    const goToRegister = event => {
        event.preventDefault();

        window.location.href = '/register';
    }

  const doLogin = async (event) => {
    event.preventDefault();

    var pwd = sha256(loginPassword.value);
    var obj = { username: loginName.value, password: pwd };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());

      if (response.status !== 200) {
        setMessage(res.error);
      } else {
        setUser({ firstName: res.fName, lastName: res.lName })

        setMessage("");
        window.location.href = "/dashboard";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="loginDiv" class="center">
      <div id="loginWrapper">
        <h1 class="pageTitle">FoodBuddy</h1>
        <form id="loginForm" onSubmit={doLogin}>
          <span id="inner-title">PLEASE LOG IN</span>
          <br />
          <div class="form-group">
            <input
              type="text"
              id="loginName"
              placeholder="Username"
              ref={(c) => (loginName = c)}
            />
            <br />
            <input
              type="password"
              id="loginPassword"
              placeholder="Passsword"
              ref={(c) => (loginPassword = c)}
            />
            <br />
          </div>
          <div id="rememberme" class="checkbox">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <div id="loginButton">
            <input
              type="submit"
              className="btn btn-primary"
              value="Login"
              onClick={doLogin}
            />
          </div>
          <div id="registerLink">
            <label>
              Don't have an account? <br />
              <input 
                        name="register" 
                        type="button" 
                        className="link-button-light" 
                        value="Create an account" 
                        onClick={goToRegister}
                />
            </label>
          </div>
        </form>
        <span 
          id="loginResult" 
          className="lightText"
        >
          {message}
        </span>
      </div>
    </div>
  );
}

export default Login;
