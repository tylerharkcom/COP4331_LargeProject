import React, {useState} from 'react';
import ReactTooltip from 'react-tooltip';

// TODO: make more components out of this.
// I only implemented what was necessary for testing.
function ResetPass()
{

  var username, email;

  const [message, setMessage] = useState('');

  const requestPassReset = async event => 
  {
    event.preventDefault();

    // Copied over, but maybe use RFC regex?
    let expression = /\S+@\S+/;

    if (!expression.test(String(email.value).toLowerCase()))
    {
      setMessage('Please enter a valid email address');
      return;
    }

    // TODO: figure out endpoint format and send email accordingly
    // alert("*static*");

    let obj = {username: username.value, email: email.value};
    let js = JSON.stringify(obj);
    try {
        const response = await fetch("/api/resetPass", {
          method: "POST",
          body: js,
          headers: {"Content-Type": "application/json"}
        });

      var res = JSON.parse(await response.text());

      if (response.status !== 200) {
        var error = res.error;
        setMessage(error);
        return;
      } else {
        // TODO: Splash page for redirection
        setMessage("Success! Check your email for the reset link");
        return;
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }
  };

  return (
    <div id="resetPassDiv" className="center">
      <div id="resetPassWrapper">
        <h1 class="pageTitle">Reset Password</h1>
          <form
            id="resetPassForm"
            onSubmit={requestPassReset}
          >

            <div className="form-row">
              <div className="form-group col-md">
                <label for="resetPassUser">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="resetPassUser"
                  placeholder="Enter your username"
                  ref={(c) => username = c}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md">
                <label for="resetPassEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="resetPassEmail"
                  placeholder="Enter your email"
                  ref={(c) => email = c}
                />
              </div>
            </div>

            <ReactTooltip id="emailTip"
              place="bottom"
              effect="solid"
            >
                myname@example.com
            </ReactTooltip>
            <div id="resetPassButton">
              <input
                type="submit"
                className="btn btn-primary"
                value="Reset Password"
                onClick={requestPassReset}
              />
            </div>
          </form>
      </div>
    </div>
  );
};

export default ResetPass;
