//import React from "react";
import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import sha256 from '../sha256';

function MyAccount() 
{
    // var fName;
    // var lName;
    // var email;
    // var loginName; // Username?
    var newPassword1;
    var newPassword2;
    var currPassword;

    const [show, setShow] = useState(false);
    const [message,setMessage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const user = JSON.parse(localStorage.getItem("user_data"));
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [loginName, setLoginName] = useState('');

    useEffect(() => {
        setfName(user.firstName);
        setlName(user.lastName);
        setEmail(user.email);
        setLoginName(user.loginName);
    });

    const refreshPage = async (event) => {
        alert('Theres always going to be another mountain');
       //  window.location.reload(false);  // Deprecated 
       // Maybe create an updateField
    }
    
    const updatePassword = async (event) => {
        //Api call to update PW
        alert('I think i thought i saw you try')
    }
    // Launched from the Modal, find out how to launch from button click
    const updatePasswordCheck =  async (event) => {
        var pwCheck = false; 
        event.preventDefault();
        alert('Im always going to want to make it move');
        // Check if new password meets criteria
        if(!pwCheck){
            if(newPassword1.value==="")
            {
                setMessage('A password is required');
                return;
            }

            var expression = /^\w+$/;

            if(newPassword1.value.length<8)
            {
                setMessage('Your new password must be at least 8 characters long');
                return;
            }

            expression = /[!@#$%*]/;
            if(!expression.test(newPassword1.value))
            {
                setMessage('Your new password must contain at least one of the following special character: @, !, #, $, %, *');
                return;
            }

            expression = /[0-9]/
            if(!expression.test(newPassword1.value))
            {
                setMessage('Your new password must contain at least one digit (0-9)');
                return;
            }

            expression = /[a-z]/
            if(!expression.test(newPassword1.value))
            {
                setMessage('Your new password must contain at least one lowercase letter');
                return;
            }

            expression = /[A-Z]/
            if(!expression.test(newPassword1.value))
            {
                setMessage('Your new password must contain at least one uppercase letter');
                return;
            }
        }
        // Check if both new password fields are equal
        if (!(newPassword1.value == newPassword2.value))
        {
            setMessage('Your new passwords do not match');
            return;
        }
        // Check if current password is correct
        var pwd = sha256(currPassword.value);
        var obj = {username: loginName.value, password: pwd};
        var js = JSON.stringify(obj);
        
        try {
            const response = await fetch("http://localhost:5000/api/login", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
      
            var res = JSON.parse(await response.text());
      
            if (response.status !== 200) {
              setMessage(res.error);
            } else {
              updatePassword();
      
              setMessage("Password successfully updated!");
              window.location.href = "/MyAccount";
            }
          } catch (e) {
            alert(e.toString());
            return;
          }
        
    }
    // Func to load in data as page is entered. May be redudant if pulled from cache
    // Not up to date
    /*
    const getAccountinfo = async (event) => // Find what kind of event this requires
    {
        var obj = {
            firstName: firstName.value, 
            lastName: lastName.value, 
            email: email.value,
            user: loginName.value
        };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch("http://localhost:5000/api/accountInfo",
            {
             method: "POST",
             body: js, 
             headers : { "Content-Type": "application/json" }, 
            });

            var res = JSON.parse(await response.text());

            if (res.id <= 0){} // Dev msg for debugging
               // setMessage("Error: Information not retrieved from the database");
            else
            {
               // var user = {firstName: res.fName, lastName: res.lName, email: res.email};
                // do something with data
            }
        } catch (e) 
        {
            alert(e.toString());
            return;
        }
    };
    */

    return (
        <div id="accountDiv" class= "center">
            <div id = "accountWrapper"> 
                <h1 class="pageTitle">FoodBuddy</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>First Name</Card.Header>
                        <ListGroup variant="flush">
                        <ListGroup.Item>{fName}</ListGroup.Item>
                    <Card.Header>Last Name</Card.Header>
                        <ListGroup.Item>{lName}</ListGroup.Item>
                    <Card.Header>Email</Card.Header>
                        <ListGroup.Item>{email}</ListGroup.Item>
                    <Card.Header>Login Name</Card.Header>
                        <ListGroup.Item>{loginName}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">Update Account Information</Button>
                </Card>
               
                <Button variant="primary" onClick={handleShow}> 
                Update password
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                     <Modal.Title>Update password</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Form.Group controlId="currentPassword">
                            <Form.Label>Current password</Form.Label>
                            <Form.Control 
                                type="" 
                                placeholder="Current password"
                                ref={(c) => (currPassword = c)} 
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        <Form.Label htmlFor="newPassword1">New Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="newPassword1"
                            aria-describedby="passwordHelpBlock"
                            ref={(c) => (newPassword1 = c)}     
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your new password should:
                            <ul>
                                <li>be at least 8 characters long</li>
                                <li>contain at least one capital letter, at least one lowercase letter, and at least one digit</li>
                                <li>contain at least one of the following special characters: @, !, #, $, %, *</li>
                            </ul>
                        </Form.Text>
                        <Form.Group controlId="newPassword2">
                            <Form.Label>Please enter your new password again</Form.Label>
                            <Form.Control 
                                type="newPW"
                                ref={(c) => (newPassword2 = c)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Confirm password change(add onclick->)"  />
                        </Form.Group> 
                        <Button variant="primary" type="submit"  onClick={updatePasswordCheck}> 
                            Update Password
                        </Button>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>   
        </div>

    );
}

export default MyAccount;