import React from 'react';
import { renderEmail } from 'react-html-email'
import EmailTemplate from '../components/EmailTemplate';

const messageHtml =  renderEmail(<EmailTemplate />); // HTML code
const EmailResetPage = () =>
{

    return(
      <div id="testPage" class="backgroundPage">
        <body>
        </body>
        
        <EmailTemplate/>
      </div>
    );
};


export default EmailResetPage;
