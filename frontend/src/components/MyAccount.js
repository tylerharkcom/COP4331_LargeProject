// TODO
// 1. When checkbox gets clicked, Update pw appears --Hard
// 2. Resize tooltip & style it so it looks nice -- Get confirmation
// 3. Test PW reset
// 4. Remove

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import sha256 from "../sha256";

function MyAccount() {
  var newPassword1;
  var newPassword2;
  var currPassword;
  const pwRequirements = " ";

  const [show, setShow] = useState(false);
  const [messageCurr, setMessageCurr] = useState("");
  const [messageNewPW, setMessageNewPW] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("user_data"));
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [loginName, setLoginName] = useState("");

  const renderPwReqTooltip = (props) => (
    <Tooltip id="passwordReqTooltip" style={{minWidth: "200"}} {...props}>
      <div>
          <p style={{
            color: "white", 
            width: "100%", 
            position: "relative",
            fontsize: "15px",
            marginRight: "50px",
            maxWidth: "100% !important",
            }}>
                
        Your new password should:
        <ul style={{textAlign: "left"}}>
            <li>be at least 8 characters long</li>
            <li>
            contain at least one capital letter, one lowercase letter,
            and one digit
            </li>
            <li>
            contain at least one of the following special characters: @, !, #, $,
            %, *
            </li>
        </ul>
        </p>
    </div>
    </Tooltip>
  );

  useEffect(() => {
    setfName(user.firstName);
    setlName(user.lastName);
    setEmail(user.email);
    setLoginName(user.loginName);
    // Testing for localmachine use
    // setfName("user.firstName");
    // setlName("user.lastName");
    // setEmail("user.email");
    // setLoginName("user.loginName");
  }, [user.firstName, user.lastName, user.email, user.loginName]);


  const updatePasswordCheck = async (event) => {
    event.preventDefault();
    setMessageCurr("");
    setMessageNewPW("");
    // Check if new password meets criteria
    try {
      if (currPassword.value === "") {
        setMessageCurr("Your current password is required");
        return;
      }

      if (newPassword1.value === "") {
        setMessageNewPW("A new password is required");
        return;
      }

      var expression = /^\w+$/;
      if (newPassword1.value.length < 8) {
        setMessageNewPW("Your new password must be at least 8 characters long");
        return;
      }

      expression = /[!@#$%*]/;
      if (!expression.test(newPassword1.value)) {
        setMessageNewPW(
          "Your new password must contain at least one of the following special character: @, !, #, $, %, *"
        );
        return;
      }

      expression = /[0-9]/;
      if (!expression.test(newPassword1.value)) {
        setMessageNewPW(
          "Your new password must contain at least one digit (0-9)"
        );
        return;
      }

      expression = /[a-z]/;
      if (!expression.test(newPassword1.value)) {
        setMessageNewPW(
          "Your new password must contain at least one lowercase letter"
        );
        return;
      }
      expression = /[A-Z]/;
      if (!expression.test(newPassword1.value)) {
        setMessageNewPW(
          "Your new password must contain at least one uppercase letter"
        );
        return;
      }

      // Check if both new password fields are equal
      if (!(newPassword1.value === newPassword2.value)) {
        setMessageNewPW("Your new passwords do not match");
        return;
      }

      var currPwd = sha256(currPassword.value);
      var newPwd = sha256(newPassword1.value);
      var obj = { password: currPwd, newPassword: newPwd };
      var js = JSON.stringify(obj);
      // try {
      const response = await fetch("/api/updatePassword", {
        method: "POST",
        credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        alert(res.error);
      } else {
        alert("Password change successful!");
        handleClose();
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  return (
    <div id="accountDiv" class="center">
      <div id="accountWrapper">
        <h1 className="pageTitle">Account Information</h1>
        <Card class="text-center" style={{ width: "27rem" }}>
          <Form style={{backgroundColor: "#DADADA"}}>
            <Form.Group as={Row}>
                <Col sm="12">
              <Form.Label className="text-center" column sm="4">
                <b> Name : </b>
              </Form.Label>
                  {fName.concat(" ", lName)}
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col sm="12">
              <Form.Label className="text-center" column sm="4">
                <b> Email : </b>
              </Form.Label>
                <Form.Label plaintext readOnly>
                  {email}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
            <Col sm="12">
              <Form.Label className="text-center" column sm="4">
                <b> Username : </b>
              </Form.Label>
                <Form.Label plaintext readOnly>
                  {loginName}
                </Form.Label>
              </Col>
            </Form.Group>
          </Form>

          {/*    <button hidden type="submit" className="btn btn-secondary">Update Info</button> */}
          <button
            type="submit"
            id ="updatePwButton"
            class="btn btn-primary"
            onClick={handleShow}
            style={{justifyContent: "center",display:"flex",alignItems:"center"}}
          >
            Update Password
          </button>
        </Card>

        <Modal show={show} onHide={handleClose}>
          <div id="updatePassWrapper">
            <Modal.Header>
                <Modal.Title>
                  <h1>Update password</h1>
                </Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group controlId="currentPassword">
                <Form.Label>Current password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Current password"
                  ref={(c) => (currPassword = c)}
                />
                <Form.Text className="text-muted"></Form.Text>
                <span id="currPasswordMSG">{messageCurr}</span>
              </Form.Group>
              <Form.Label htmlFor="newPassword1">New Password</Form.Label>
              <OverlayTrigger placement="bottom" overlay={renderPwReqTooltip}>
                <Form.Control
                  type="password"
                  id="newPassword1"
                  aria-describedby={pwRequirements}
                  ref={(c) => (newPassword1 = c)}
                />
              </OverlayTrigger>
              <Form.Group controlId="newPassword2">
                <Form.Label>Please enter your new password again</Form.Label>
                <Form.Control type="password" ref={(c) => (newPassword2 = c)} />
                <span id="newPasswordMSG">{messageNewPW}</span>
              </Form.Group>
              <Modal.Footer>
                <div class="form-group align-right">
                  <Button
                    id="updatePWBut"
                    variant="primary"
                    type="submit"
                    style={{margin:"5px"}}
                    onClick={updatePasswordCheck}
                  >
                    Update Password
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </Modal.Footer>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default MyAccount;
//   <Form.Check type="checkbox" label="Confirm password change(4add onclick->)" onClick={handleChange} />
// Safekeep, from line 245 ^^
{
  /* <Form.Group controlId="toggleConfirm">
                            <Toggle
                                id = 'toggleConfirmId'
                                defaultChecked={false}
                                onChange={handleChange}  />
                            <span>Confirm password change</span>
                            

                            </Form.Group>  */
} // Safekeep from under newpw2
