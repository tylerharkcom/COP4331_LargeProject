import { func } from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Email, Item, A} from 'react-html-email';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import banana from '../images/banana.jpg';
const EmailTemplate = () => ( 
    <Email title ="Password reset">
        <Item align="center">
            <h1 className="title" style={{fontSize:"5rem",color:"#049A9E"}}>FoodBuddy</h1>
            <Card align="center" style={{backgroundColor:"049A9E",margin:"1rem",minHeight:"40rem",width:"40rem"}}>
                <Container>
                    <Row>
                        <Col xs={6} md={4} style={{display:"block",margin:"auto",marginTop:"2rem"}}>
                        <Image align="center" style={{width:"150px",height:"150px"}} alt="ffff" src={banana} roundedCircle></Image>
                        </Col>
                    </Row>
                </Container>
    
                <Item align="center">
                    <h2 style={{marginTop:"7rem",fontSize:"2rem"}}>
                        Forgot your password?</h2>
                    <h2 style={{fontSize:"2rem"}}>
                        Stay calm, we've got you covered.</h2>
                    <body style={{fontSize:"1.25rem",marginLeft:"2.5rem",marginRight:"2.5rem"}}>
                        Make a new one by clicking this link to login & updating your password on the account page! 
                    </body>
                </Item>
                
                
                
                <Button  size="lg" outline-color="red" style={{backgroundColor:"#049A9E",outlineColor:"#049A9E",marginLeft:"15rem",marginTop:"1rem",marginBottom:"1rem",maxWidth:"10rem"}}>
                    <A color="#0B2B53" style={{padding: "10",textDecorationLine:"none"}} href='group1largeproject.herokuapp.com/'>
                        Click here!
                    </A>
                </Button> 
                
            </Card>
        
        </Item>
    </Email>
);
    export default EmailTemplate;



    // TODO: Import these lines into calling func.
    // import EmailTemplate from './EmailTemplate'
    // import { renderEmail } from 'react-html-email'
    // 
    //       Call this template via 
    // const messageHtml =  renderEmail(<MyEmail name={this.state.name} />); // HTML code
