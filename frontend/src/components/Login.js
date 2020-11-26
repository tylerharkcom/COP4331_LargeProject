import React, { useState, useEffect } from "react";
import sha256 from "../sha256";

function Login() {
  var loginName;
  var loginPassword;

  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [message, setMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("user_data", JSON.stringify(user));
  });

  const goToRegister = (event) => {
    event.preventDefault();

    window.location.href = "/register";
  };

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
      }
      // Add Verification flag to res statement
      //  else if(response.status ==  ) {
      else if (!true) {
        setMessage("Please verify your account!");
      } else {
        setUser({
          firstName: res.fName,
          lastName: res.lName,
          loginName: loginName.value,
          email: res.email,
          birthday: res.bDay,
          country: res.country,
          language: res.language,
          country: res.country,
        });

        setMessage("");
        window.location.href = "/dashboard";
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  };

  const resetPass = async (event) => {
    event.preventDefault();

    window.location.href = "/resetPass";
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
              {/*Don't have an account? <br />*/}
              <input
                name="register"
                type="button"
                className="link-button-light"
                value="Create your account!"
                onClick={goToRegister}
              />
            </label>
          </div>
          <div id="resetPassLink">
            <label>
              {/*Forgot your password? <br />*/}
              <input
                name="resetPass"
                type="button"
                className="link-button-light"
                value="Forgot password?"
                onClick={resetPass}
              />
            </label>
          </div>
        </form>
        <span id="loginResult" className="lightText">
          {message}
        </span>
      </div>
    </div>
  );
}

export default Login;
