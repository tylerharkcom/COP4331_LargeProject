import React from 'react';
import { renderEmail } from 'react-html-email'
import EmailTemplate from '../components/EmailPwResetTemplate';

const messageHtml =  renderEmail(<EmailTemplate />); // HTML code
const EmailResetPage = () =>
{

    return(
      <div id="testPage" className="emailTemplateBackground fillBackground">
        <EmailTemplate/>
      </div>
    );
};


export default EmailResetPage;
