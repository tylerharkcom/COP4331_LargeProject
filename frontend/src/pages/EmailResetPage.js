import React from "react";
import { renderEmail } from "react-html-email";
import EmailPass from "../components/EmailPwReset";

// const messageHtml = renderEmail(<EmailPass />); // HTML code
const EmailResetPage = () => {
  return (
    <div id="testPage" className="emailTemplateBackground fillBackground">
      <EmailPass />
    </div>
  );
};

export default EmailResetPage;
