import React from "react";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Email, Item, A } from "react-html-email";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import EmailPic from "../images/orangeSlice.jpg";

// TODO Make a temp password
// Set font family
function EmailVerify({ emailLink }) {
  return (
    <Email title="Verify your account">
      <div id="testPage" className="emailTemplateBackground fillBackground">
        <Item align="center">
          <h1 className="title" style={{ fontSize: "5rem", color: "#049A9E" }}>
            FoodBuddy
          </h1>
          <Card align="center" style={{ minHeight: "40rem", width: "40rem" }}>
            <Container>
              <Row>
                <Col
                  xs={6}
                  md="auto"
                  style={{ display: "block", margin: "auto" }}
                >
                  <Image
                    align="left"
                    style={{ width: "384px", height: "255px" }}
                    alt="ffff"
                    src={EmailPic}
                    roundedCircle
                  ></Image>
                </Col>
              </Row>
            </Container>

            <Item align="center">
              <h2 style={{ fontSize: "2rem" }}>Welcome to FoodBuddy!</h2>
              <h2
                style={{
                  fontSize: "1.75em",
                  marginLeft: "2em",
                  marginRight: "2em",
                }}
              >
                Please verify your account by clicking this link.
              </h2>
            </Item>

            <Button
              className="btn btn-info"
              size="lg"
              style={{
                backgroundColor: "#049A9E",
                outlineColor: "#049A9E",
                marginTop: "6rem",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "20rem",
              }}
            >
              <A
                color="#0B2B53"
                style={{ padding: "10", textDecorationLine: "none" }}
                href={emailLink}
              >
                Verify Account
              </A>
            </Button>
          </Card>
        </Item>
      </div>
    </Email>
  );
}
export default EmailVerify;

// TODO: Import these lines into calling func.
// import EmailTemplate from './EmailTemplate'
// import { renderEmail } from 'react-html-email'
//
//       Call this template via
// const messageHtml =  renderEmail(<MyEmail name={this.state.name} />); // HTML code
