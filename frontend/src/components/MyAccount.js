// TODO
// Find out why the setTimeout  func fails after multiple calls
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import sha256 from "../sha256";
import Container from "react-bootstrap/Container";
import delAcctImg from "../images/sadFruit.png";
import UpdtAcctImg from "../images/happy-banana.png";
import UpdtPassImg from "../images/strawberry.png";

import Image from "react-bootstrap/Image";

function MyAccount() {
  // Info update vars
  var newFName = "";
  var newLName = "";
  var newEmail;
  var newUsername;
  var newBDay;
  var newGender;
  var newCountry;
  var newLang;
  // PW Reset Vars
  var newPassword1;
  var newPassword2;
  var currPassword;

  const pwRequirements = " ";
  // Modal show/hide
  const [pwShow, setPwShow] = useState(false);
  const [infoShow, setInfoShow] = useState(false);
  const [delMShow, setDelShow] = useState(false);
  const [delFinal, setDelFinalShow] = useState(false);
  // PW msg
  const [messageCurr, setMessageCurr] = useState("");
  const [messageNewPW, setMessageNewPW] = useState("");
  // Post MSGs
  const [didUpdateAcct, setDidUpdateAcct] = useState(false);
  const [didUpdatePass, setDidUpdatePass] = useState(false);

  const pwHandleClose = (event) => {
    event.preventDefault();
    setPwShow(false);
  };
  const pwHandleShow = (event) => {
    event.preventDefault();
    setPwShow(true);
  };
  const infoHandleClose = (event) => {
    if (didUpdateAcct == true) {
      setInfoShow(false);
      setDidUpdateAcct(false);
    } else setInfoShow(false);
  };
  const infoHandleShow = (event) => {
    event.preventDefault();
    setInfoShow(true);
  };
  const toggleUpdatePassMsg = (event) => {
    if (didUpdatePass == true) {
      setPwShow(false);
      setDidUpdatePass(false);
    } else setDidUpdatePass(true);
  };
  const toggleUpdateAcctMsg = (event) => {
    if (didUpdateAcct == true) {
      setInfoShow(false);
      setDidUpdateAcct(false);
    } else setDidUpdateAcct(true);
  };

  const delHandleClose = (event) => {
    setDelShow(false);
  };
  const delHandleShow = (event) => {
    event.preventDefault();
    setDelShow(true);
  };
  const delFinalHandleClose = (event) => {
    event.preventDefault();
    setDelFinalShow(true);
  };

  var user = JSON.parse(localStorage.getItem("user_data"));
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [loginName, setLoginName] = useState("");
  const [bDay, setBday] = useState("MM/DD/YYYY");
  const [gender, setGender] = useState("Prefer not to say");
  const [country, setCountry] = useState("location");
  const [lang, setLang] = useState("English");

  useEffect(() => {
    setfName(user.firstName);
    setlName(user.lastName);
    setEmail(user.email);
    setLoginName(user.loginName);
    setBday(user.birthday);
    if (!user.gender) {
      setGender("Prefer not to say");
    } else
      user.gender.localeCompare("prefNoSay") == 0
        ? setGender("Prefer not to say")
        : setGender(user.gender);

    setCountry(user.country);
    setLang(user.language);
    // Testing for localmachine use
    //  setfName("user.firstName");
    //  setlName("user.lastName");
    //  setEmail("user.email");
    //  setLoginName("user.loginName");
    //  setBday("user.birthday");
    //  setGender("user.gender");
    //  setCountry("user.country");
    //  setLang("user.language");
  }, []);
  // Empty dependecy array means useEffect will only run once

  const genderNameChange = () => {
    console.log(gender.localeCompare);
    console.log(gender);
    console.log(user.gender);
    if (gender.localeCompare("prefNoSay") == 0) setGender("Prefer not to say");
  };

  const renderPwReqTooltip = (props) => (
    <Tooltip id="passwordReqTooltip" style={{ minWidth: "200" }} {...props}>
      <div>
        <p
          style={{
            color: "white",
            width: "100%",
            position: "relative",
            fontsize: "15px",
            marginRight: "50px",
            maxWidth: "100% !important",
          }}
        >
          Your new password should:
          <ul style={{ textAlign: "left" }}>
            <li>be at least 8 characters long</li>
            <li>
              contain at least one capital letter, one lowercase letter, and one
              digit
            </li>
            <li>
              contain at least one of the following special characters: @, !, #,
              $, %, *
            </li>
          </ul>
        </p>
      </div>
    </Tooltip>
  );

  const DelFinalButton = (props) => (
    <Button
      {...props}
      onClick={deleteAccount}
      display="none"
      id="delFinalBut"
      variant="danger"
      type="submit"
      style={{
        margin: "5px",
        marginRight: "5rem",
      }}
    >
      Delete Account
    </Button>
  );

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
      const response = await fetch("/api/updatePassword", {
        method: "POST",
        credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        // ADD REPLACEMENT FOR ALERT
        toggleUpdatePassMsg();
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const deleteAccount = async (event) => {
    var obj = { username: loginName };
    var js = JSON.stringify(obj);
    try {
      const response = await fetch("/api/deleteAccount", {
        method: "POST",
        credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const updateAccountInfo = async (event) => {
    event.preventDefault();
    var updatedUser = {
      fName: newFName.value,
      lName: newLName.value,
      email: newEmail.value,
      username: newUsername.value,
      bDay: newBDay.value,
      gender: newGender.value,
      country: newCountry.value,
      language: newLang.value,
    };
    // Testing Vals
    //
    // console.log(newFName.value.concat(" ", newLName.value));
    // console.log("Value check");
    // console.log(newFName.value);
    // console.log(newLName.value);
    // console.log(newEmail.value);
    // console.log(newUsername.value);
    // console.log(newBDay.value);
    // console.log(newGender.value);
    // console.log(newCountry.value);
    // console.log(newLang.value);
    // console.log(updatedUser);

    console.log("End of Value check");

    var js = JSON.stringify(updatedUser);
    try {
      const response = await fetch("/api/updateAccount", {
        method: "POST",
        credentials: "include",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        // // ADD REPLACEMENT FOR ALERT
        // alert("Account Updated!");

        // Setting local vars
        console.log("Account updated");
        user.firstName = updatedUser.fName;
        user.lastName = updatedUser.lName;
        user.email = updatedUser.email;
        user.loginName = updatedUser.username;
        user.birthday = updatedUser.bDay;
        user.gender = updatedUser.gender;
        user.country = updatedUser.country;
        user.language = updatedUser.language;

        setfName(user.firstName);
        setlName(user.lastName);
        setEmail(user.email);
        setLoginName(user.loginName);
        setBday(user.birthday);
        if (user.gender.localeCompare("prefNoSay") == 0)
          setGender("Prefer not to say");
        else setGender(user.gender);
        setCountry(user.country);
        setLang(user.language);
        localStorage.setItem("user_data", JSON.stringify(user));

        toggleUpdateAcctMsg();
        // infoHandleClose();
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const foo = () => {
    return 1;
  };

  return (
    <div id="accountDiv" class="center">
      <div id="accountWrapper">
        <h1 className="pageTitle" style={{ fontSize: "4rem" }}>
          Account Information
        </h1>
        <Card class="text-center" style={{ width: "40rem", align: "center" }}>
          {/* Account info fields */}
          <Form style={{ backgroundColor: "#DADADA", fontSize: "1.5rem" }}>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label
                  className="text-right"
                  column
                  sm="5"
                  style={{ marginTop: ".5rem" }}
                >
                  <b> Name : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {fName.concat(" ", lName)}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Email : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {email}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Username : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {loginName}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Birthday : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {bDay}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Gender : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {gender}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Country : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {country}
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="12">
                <Form.Label className="text-right" column sm="5">
                  <b> Language : </b>
                </Form.Label>
                <Form.Label plaintext readOnly>
                  {lang}
                </Form.Label>
              </Col>
            </Form.Group>

            {/* Account buttons */}
            <Container
              style={{ display: "flex ", justifyContent: "spaceEvenly" }}
            >
              <Row>
                <Col sm="4">
                  <button
                    type="submit"
                    id="updateInfoButton"
                    class="btn btn-info "
                    onClick={infoHandleShow}
                    style={{
                      backgroundColor: "#049A9E",
                      outlineColor: "#049A9E",
                      alignItems: "center",
                      margin: ".75rem",
                      width: "10rem",
                      height: "25",
                    }}
                  >
                    Update Info.
                  </button>
                </Col>
                <Col sm="4">
                  <button
                    type="submit"
                    id="updatePwButton"
                    class="btn btn-info"
                    onClick={pwHandleShow}
                    style={{
                      backgroundColor: "#049A9E",
                      outlineColor: "#049A9E",
                      alignItems: "center",
                      margin: ".75rem",
                      width: "10rem",
                      height: "25",
                    }}
                  >
                    Update Password
                  </button>
                </Col>
                <Col sm="4">
                  <button
                    type="submit"
                    id="deleteAccButton"
                    class="btn btn-danger"
                    onClick={delHandleShow}
                    style={{
                      alignItems: "center",
                      margin: ".75rem",
                      width: "10rem",
                      height: "25",
                    }}
                  >
                    Delete Account
                  </button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Card>
        {/* Update Account Modal */}
        <Modal centered show={infoShow} onHide={infoHandleClose}>
          {!didUpdateAcct && (
            <div
              // show={didUpdateAcct}
              // id="AcctUpdtMsg"
              style={{ backgroundColor: "#DADADA", padding: "10px" }}
            >
              <Modal.Header>
                <Modal.Title>
                  <h1 style={{ textAlign: "center" }}>
                    Update Account Information
                  </h1>
                </Modal.Title>
              </Modal.Header>
              <Form>
                <Form.Row>
                  <Form.Group
                    id="fNameField"
                    className="form-inline"
                    style={{
                      marginLeft: "1rem",
                      marginTop: "1rem",
                      paddingRight: ".5em",
                    }}
                    as={Col}
                  >
                    <Form.Label class="col-sm-2.5 col-form-label">
                      <b>First Name</b>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        defaultValue={fName}
                        ref={(c) => (newFName = c)}
                        style={{ marginLeft: ".5rem" }}
                      />
                    </Col>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="lNameField"
                    className="form-inline"
                    style={{ marginLeft: "1rem" }}
                    as={Col}
                  >
                    <Form.Label class="col-sm-2.5 col-form-label">
                      <b>Last Name</b>&nbsp;
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        defaultValue={lName}
                        ref={(c) => (newLName = c)}
                        style={{ marginLeft: ".5rem" }}
                      />
                    </Col>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="emailField"
                    className="form-inline"
                    style={{ marginLeft: "1rem" }}
                    as={Col}
                  >
                    <Form.Label
                      class="col-sm-2.5 col-form-label"
                      style={{ paddingRight: "2.4em" }}
                    >
                      <b>Email</b>&nbsp;
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="email"
                        defaultValue={email}
                        ref={(c) => (newEmail = c)}
                        style={{ marginLeft: ".5rem" }}
                      />
                    </Col>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="usernameField"
                    className="form-inline"
                    style={{ marginLeft: "1rem" }}
                    as={Col}
                  >
                    <Form.Label
                      class="col-sm-2.5 col-form-label"
                      style={{ paddingRight: ".3em" }}
                    >
                      <b>Username</b>&nbsp;
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        defaultValue={loginName}
                        ref={(c) => (newUsername = c)}
                        style={{ marginLeft: ".5rem" }}
                      />
                    </Col>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="bDayField"
                    style={{ marginLeft: "1rem" }}
                  ></Form.Group>
                  <Form.Label
                    class="col-sm-2.5 col-form-label"
                    style={{ paddingRight: "2.2em" }}
                  >
                    <b>Birthday</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={bDay}
                    ref={(c) => (newBDay = c)}
                    style={{ marginLeft: ".5rem", width: "12.8rem" }}
                  />
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="genderField"
                    style={{ marginLeft: "1rem" }}
                  ></Form.Group>
                  <Form.Label
                    class="col-sm-2.5 col-form-label"
                    style={{ marginTop: "1rem", paddingRight: "2.9em" }}
                  >
                    <b>Gender</b>
                  </Form.Label>
                  <select
                    class="form-control"
                    id="sel1"
                    defaultValue={gender}
                    ref={(c) => (newGender = c)}
                    style={{
                      marginLeft: ".5rem",
                      marginTop: "1rem",
                      width: "12.8rem",
                    }}
                  >
                    <option value="prefNoSay">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="countryField"
                    style={{ marginLeft: "1rem" }}
                  ></Form.Group>
                  <Form.Label
                    class="col-sm-2.5 col-form-label"
                    style={{ marginTop: "1rem", paddingRight: "2.6em" }}
                  >
                    <b>Country</b>
                  </Form.Label>
                  <select
                    class="form-control"
                    id="sel2"
                    defaultValue={country}
                    ref={(c) => (newCountry = c)}
                    style={{
                      marginLeft: ".5rem",
                      marginTop: "1rem",
                      width: "12.8rem",
                    }}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="A">A</option>
                    <option value="Other">Other</option>
                  </select>
                </Form.Row>
                <Form.Row>
                  <Form.Group
                    id="LanguageField"
                    style={{ marginLeft: "1rem" }}
                  ></Form.Group>
                  <Form.Label
                    class="col-sm-2.5 col-form-label"
                    style={{ marginTop: "1rem", paddingRight: "1.8em" }}
                  >
                    <b>Language</b>
                  </Form.Label>
                  <select
                    class="form-control"
                    id="sel2"
                    defaultValue={lang}
                    ref={(c) => (newLang = c)}
                    style={{
                      marginLeft: ".5rem",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      width: "12.8rem",
                    }}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Other">Other</option>
                  </select>
                </Form.Row>
                <Modal.Footer>
                  <div class="form-group align-right">
                    <Button
                      id="updateInfoBut"
                      variant="primary"
                      type="submit"
                      style={{ margin: "5px" }}
                      onClick={updateAccountInfo}
                    >
                      Update Info.
                    </Button>
                    {/* infoHandleClose toggleUpdateAcctMsg */}
                    <Button variant="secondary" onClick={infoHandleClose}>
                      Close
                    </Button>
                  </div>
                </Modal.Footer>
              </Form>
            </div>
          )}
          {didUpdateAcct && (
            <div
              id="AcctUpdtMsg"
              show={didUpdateAcct}
              style={{
                backgroundColor: "#DADADA",
                padding: "10px",
              }}
            >
              <div style={{ color: "#DADADA" }}>
                {setTimeout(() => {
                  foo();
                }, 7000)}
              </div>
              <h1 fontSize="5rem" style={{ textAlign: "center" }}>
                Account Updated!
              </h1>
              <div style={{ textAlign: "center" }}>
                Wait, or click anywhere to continue
              </div>
              <Image
                src={UpdtAcctImg}
                style={{
                  width: "10em",
                  height: "10em",
                  // margin: "1em",
                }}
                alt="ffff"
              />
              <div style={{ color: "#DADADA" }}>
                {setTimeout(() => {
                  toggleUpdateAcctMsg();
                }, 7000)}
              </div>
            </div>
          )}
        </Modal>
        {/* Update password Modal */}
        <Modal centered show={pwShow} onHide={pwHandleClose}>
          {!didUpdatePass && (
            <div style={{ backgroundColor: "#DADADA", padding: "10px" }}>
              <Modal.Header>
                <h1
                  style={{
                    textAlign: "center",
                    marginLeft: "5rem",
                    marginRight: "3rem",
                  }}
                >
                  Update password
                </h1>
              </Modal.Header>
              <Form>
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter your current password"
                    ref={(c) => (currPassword = c)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                  <span id="currPasswordMSG">{messageCurr}</span>
                </Form.Group>
                <Form.Label htmlFor="newPassword1">New password</Form.Label>
                <OverlayTrigger placement="bottom" overlay={renderPwReqTooltip}>
                  <Form.Control
                    type="password"
                    id="newPassword1"
                    placeholder="Please enter your new password"
                    aria-describedby={pwRequirements}
                    ref={(c) => (newPassword1 = c)}
                  />
                </OverlayTrigger>
                <Form.Group controlId="newPassword2">
                  <Form.Label style={{ marginTop: "1rem" }}>
                    Confirm new password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter your new password again"
                    ref={(c) => (newPassword2 = c)}
                  />
                  <span id="newPasswordMSG">{messageNewPW}</span>
                </Form.Group>
                <Modal.Footer>
                  <div className="form-group align-right">
                    <Button
                      id="updatePWBut"
                      variant="primary"
                      type="submit"
                      style={{ margin: "5px" }}
                      onClick={updatePasswordCheck}
                    >
                      Update Password
                    </Button>
                    <Button variant="secondary" onClick={pwHandleClose}>
                      Close
                    </Button>
                  </div>
                </Modal.Footer>
              </Form>
            </div>
          )}
          {didUpdatePass && (
            <div
              id="PassUpdtMsg"
              // show={didUpdatePass}
              style={{
                backgroundColor: "#DADADA",
                padding: "10px",
              }}
            >
              <div style={{ color: "#DADADA" }}>
                {setTimeout(() => {
                  foo();
                }, 7000)}
              </div>
              <h1 fontSize="5rem" style={{ textAlign: "center" }}>
                Password Updated!
              </h1>
              <div style={{ textAlign: "center" }}>
                Wait, or click anywhere to continue
              </div>
              <Image
                src={UpdtPassImg}
                style={{
                  width: "10em",
                  height: "10em",
                  // margin: "1em",
                }}
                alt="ffff"
              />
              <div style={{ color: "#DADADA" }}>
                {setTimeout(() => {
                  toggleUpdatePassMsg();
                }, 7000)}
              </div>
            </div>
          )}
        </Modal>
        {/* Delete Account Modal */}
        <Modal
          centered
          show={delMShow}
          onHide={delHandleClose}
          style={{
            padding: "0!important",
            textAlign: "center",
          }}
        >
          <div style={{ backgroundColor: "#DADADA" }}>
            <Modal.Header>
              <Col sm="12">
                <Modal.Title class="text-center">
                  <h1>Delete Account</h1>
                </Modal.Title>
              </Col>
            </Modal.Header>
            <Image
              src={delAcctImg}
              style={{
                width: "8em",
                height: "8em",
                // margin: "1em",
              }}
              alt="ffff"
            />
            <h6 style={{ margin: "5px", fontSize: "" }}>
              How did it come to this. Was there just too many cooks in the
              kitchen? Well if you're sure about deleting your account go ahead,
              we can't stop you. We're not cops, we're FoodBuddy.{" "}
            </h6>
            <span>
              Please note that this action is permanent. All data will be lost
              if you delete your account.
            </span>

            <Form>
              <Modal.Footer>
                <div>{delFinal ? <DelFinalButton /> : null}</div>
                <div class="form-group align-right">
                  <Button
                    id="delConfirmBut"
                    variant="primary"
                    type="submit"
                    style={{ margin: "5px" }}
                    onClick={delFinalHandleClose}
                  >
                    Confirm
                  </Button>
                  <Button variant="secondary" onClick={delHandleClose}>
                    Return to safety!
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
