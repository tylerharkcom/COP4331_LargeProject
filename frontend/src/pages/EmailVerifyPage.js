import React from "react";
import { renderEmail } from "react-html-email";
import EmailVerify from "../components/EmailVerify";

// const messageHtml = renderEmail(<EmailVerify />); // HTML code
const EmailVerifyPage = () => {
  return (
    <div id="testPage" className="emailTemplateBackground fillBackground">
      <EmailVerify emailLink={"sample"} />
    </div>
  );
};

export default EmailVerifyPage;
