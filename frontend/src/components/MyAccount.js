// TODO
// 1. When checkbox gets clicked, Update pw appears --Hard
// 2. Resize tooltip & style it so it looks nice -- Get confirmation
// 3. Test PW reset
// 4. Remove 

import React, { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Switch from 'react-switch';
import sha256 from '../sha256';

 
function MyAccount() 
{
    var newPassword1;
    var newPassword2;
    var currPassword;
    var showSubmit; 
    const pwRequirements = 'bop this can be removed once i check its dependents';

    const [show, setShow] = useState(false);
   // const [showSubmit,handleChange] = useToggle();
    const [messageCurr,setMessageCurr] = useState('');
    const [messageNewPW,setMessageNewPW] = useState('');

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" style={{width: "150%", }} {...props}>
           Your new password should:
                                <ul>
                                    <li>be at least 8 characters long</li>
                                    <li>contain at least one capital letter, at least one lowercase letter, and at least one digit</li>
                                    <li>contain at least one of the following special characters: @, !, #, $, %, *</li>
                                </ul>
        </Tooltip>
      );
    // const handleChange = () => {
    //     setShowUpdate()
    // };
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
    
    const updatePassword = async () => {
        //Api call to update PW
        var pwd = sha256(newPassword1.value);
        var obj = { password: pwd };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch("/api/updatePassword", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
            var res = JSON.parse(await response.text());

            if (response.status !== 200) {
              alert(res.error);
            } 
            else {
                alert('Password change successful!');
                handleClose();
            } // filler
        } catch (e) {
            alert(e.toString());
            return;
        }
        };
    

    const updatePasswordCheck =  async (event) => {
        event.preventDefault();
        // Check if new password meets criteria
        setMessageCurr('');
        setMessageNewPW(currPassword); // Just to check if its getting sent right
        
        if(currPassword.value==="")
        {
            setMessageCurr('Your current password is required');
            return;
        }
        
        if(newPassword1.value==="")
        {
            setMessageNewPW('A new password is required');
            return;
        }

        var expression = /^\w+$/;
        if(newPassword1.value.length<8)
        {
            setMessageNewPW('Your new password must be at least 8 characters long');
            return;
        }

        expression = /[!@#$%*]/;
        if(!expression.test(newPassword1.value))
        {
            setMessageNewPW('Your new password must contain at least one of the following special character: @, !, #, $, %, *');
            return;
        }

        expression = /[0-9]/
        if(!expression.test(newPassword1.value))
        {
            setMessageNewPW('Your new password must contain at least one digit (0-9)');
            return;
        }

        expression = /[a-z]/
        if(!expression.test(newPassword1.value))
        {
            setMessageNewPW('Your new password must contain at least one lowercase letter');
            return;
        }
        expression = /[A-Z]/
        if(!expression.test(newPassword1.value))
        {
            setMessageNewPW('Your new password must contain at least one uppercase letter');
            return;
        }
        
        // Check if both new password fields are equal
        if (!(newPassword1.value == newPassword2.value))
        {
            setMessageNewPW('Your new passwords do not match');
            return;
        }
        alert('All Reqs met');
        alert(loginName.value);
        alert(currPassword.value);
        // Check if current password is correct
        var pwd = sha256(currPassword.value);
        var obj = {username: loginName.value, password: pwd};
        var js = JSON.stringify(obj);
        
        try {
            alert('Before fetch');
            const response = await fetch("/api/login", {
              method: "POST",
              body: js,
              headers: { "Content-Type": "application/json" },
            });
            alert('After fetch');
            var res = JSON.parse(await response.text());
      
            if (response.status !== 200) {
              setMessageNewPW(res.error);
            } else {
                alert('Before Update password');
                updatePassword();
                alert('After update pw');
                setMessageNewPW("Password successfully updated!");
                window.location.href = '/account'; 
                return;
            }
          } catch (e) {
            alert(e.toString());
            return;
          }
        
    }

    return (
        <div id="accountDiv" class= "center">
            <div id = "accountWrapper"> 
                <h1 className="pageTitle">Account Information(4)</h1>
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
                {/*    <button hidden type="submit" className="btn btn-secondary">Update Info</button> */}
                    <button type="submit" className="btn btn-secondary" onClick={handleShow}>Update Password</button>
                </Card>
        
                <Modal show={show} onHide={handleClose}>
                    <div id="updatePassWrapper">
                        <Modal.Header>
                            <Modal.Title>Update password</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Form.Group controlId="currentPassword">
                                <Form.Label>Current password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Current password"
                                    ref={(c) => (currPassword = c)} 
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                                <span id="currPasswordMSG">{messageCurr}</span>
                            </Form.Group>                        
                            <Form.Label htmlFor="newPassword1">New Password</Form.Label>
                            <OverlayTrigger
                             placement="bottom"
                             overlay={renderTooltip}
                            >
                            <Form.Control
                                type="password"
                                id="newPassword1"
                                aria-describedby= {pwRequirements}
                                ref={(c) => (newPassword1 = c)}     
                            />
                            </OverlayTrigger>
                            <Form.Group controlId="newPassword2">
                                <Form.Label>Please enter your new password again</Form.Label>
                                <Form.Control 
                                    type="password"
                                    ref={(c) => (newPassword2 = c)}
                                />
                                <span id="newPasswordMSG" >{messageNewPW}</span>
                            </Form.Group>
                            <Modal.Footer>
                            
                            <div class="form-group align-right">

                                <Button  id="UpdatePWBut" variant="primary" type="submit"  onClick={updatePasswordCheck}> 
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
{/* <Form.Group controlId="toggleConfirm">
                            <Toggle
                                id = 'toggleConfirmId'
                                defaultChecked={false}
                                onChange={handleChange}  />
                            <span>Confirm password change</span>
                            

                            </Form.Group>  */} // Safekeep from under newpw2