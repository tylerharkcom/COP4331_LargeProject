import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import sha256 from "../sha256";

function ChangePass() {
  let password, confirmPassword;

  const [message, setMessage] = useState("");

  const goToLogin = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };

  const requestPassChange = async (event) => {
    event.preventDefault();

    if (password.value === "") {
      setMessage("A password is required");
      return;
    }

    let expression = /[!@#$%*]/;
    if (!expression.test(password.value)) {
      setMessage(
        "Your password must contain at least one of the following special character: @, !, #, $, %, *"
      );
      return;
    }

    expression = /[0-9]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one digit (0-9)");
      return;
    }

    expression = /[a-z]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one lowercase letter");
      return;
    }

    expression = /[A-Z]/;
    if (!expression.test(password.value)) {
      setMessage("Your password must contain at least one uppercase letter");
      return;
    }

    if (password !== confirmPassword) {
      console.log("password:",password);
      console.log("confirmPassword:", confirmPassword);
      setMessage("Passwords don't match");
      return;
    }

    password = sha256(password);

    let js = JSON.stringify({ password });

    try {
      const response = await fetch("/api/changePass", {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      let res = JSON.parse(await response.text());

      if (response.status !== 200) {
        let error = res.error;
        setMessage(error);
        return;
      } else {
        setMessage(
          "Success! If you are not redirected, please click 'Go to login'"
        );
        setTimeout(() => window.location.href = '/', 2000);
      }
      return;
    } catch (e) {
      alert(e);
      return;
    }
  };

  return (
    <div id="changePassDiv" className="center">
      <div id="changePassWrapper">
        <h1 className="pageTitle">Change Password</h1>
        <form id="changePassForm" onSubmit={requestPassChange}>
          <div className="form-row">
            <div className="form-group col-md">
              <label for="changePassPassword">New Password</label>
              <input
                type="text"
                className="form-control"
                id="changePassPassword"
                ref={(c) => (password = c)}
              />
            </div>
          </div>
          {/*Add React tooltip later*/}
          <div className="form-row">
            <div className="form-group col-md">
              <label for="changePassConfirm">Confirm New Password</label>
              <input
                type="text"
                className="form-control"
                id="changePassConfirm"
                ref={(c) => (confirmPassword = c)}
              />
            </div>
          </div>
          <div id="changePassButton">
            <input
              type="submit"
              className="btn btn-primary"
              value="Update Password"
              onClick={requestPassChange}
            />
            <button
              type="button"
              className="btn btn-group btn-secondary mx-1"
              onClick={goToLogin}
            >
              back to login
            </button>
          </div>
        </form>
        <span id="changePassResult" className="lightText center">
          {message}
        </span>
      </div>
    </div>
  );
}

export default ChangePass;
