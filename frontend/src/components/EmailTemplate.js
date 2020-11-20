import { func } from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Email, Item, A} from 'react-html-email';

const EmailTemplate = () => ( 
    <Email title ="Password reset">
        <Item align="center">
            <mark><h1 className="title" style={{fontSize:"5rem",backgroundColor:"white"}}>FoodBuddy</h1></mark>
            <Card align="center" style={{backgroundColor: "#DADADA",minHeight:"40rem"}}>
            <Card align="center" style={{backgroundColor:"white",margin:"1rem",minHeight:"40rem",width:"40rem"}}>
                <Item align="center">
                <body style={{marginTop:"30rem",fontSize:"1.5rem"}}>                    
                    <mark></mark>&nbsp; Hey! Click this link to reset your password! &nbsp;
                </body>
                </Item>
                
                
                
                <Button  size="lg" style={{marginLeft:"15rem",maxWidth:"10rem"}}>
                    <A color="black" style={{padding: "10"}} href='group1largeproject.herokuapp.com/'>
                        This link!
                    </A>
                </Button> 
                
            </Card>
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
