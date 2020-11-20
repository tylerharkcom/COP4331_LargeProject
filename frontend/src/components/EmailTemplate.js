import { func } from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from "react-bootstrap/Button";

import { Email, Item, A} from 'react-html-email';

const EmailTemplate = () => ( 
        <div id="emailTemplateDiv" class="emailTemplateBackground">
        <div id="emailTemplateWrapper"></div>
        <h1 className="title" style={{fontSize:"5rem"}}>FoodBuddy</h1>
        <Card style={{backgroundColor: "#DADADA",minHeight:"40rem",minWidth:"20rem"}}>
            <Card.Img id="emailBanner" variant="top" src="/src/images/banana.jpg" />
            <Card style={{backgroundColor:"white",margin:"1rem"}}>
            <Item style={{textAlign:"center",margin:"1rem"}}>
                
                &nbsp; Hey! Click this link to reset your password! &nbsp;
                <Button size="lg">
                    <A color="black" style={{padding: "10"}} href='group1largeproject.herokuapp.com/'>
                        This link!
                    </A>
                </Button> 
            </Item>
            </Card>
        </Card>
        </div>
);
    export default EmailTemplate;



    // TODO: Import these lines into calling func.
    // import EmailTemplate from './EmailTemplate'
    // import { renderEmail } from 'react-html-email'
    // 
    //       Call this template via 
    // const messageHtml =  renderEmail(<MyEmail name={this.state.name} />); // HTML code
