import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Placeholder from "../images/orangeSliceCrop.jpg";
import Image from "react-bootstrap/Image";

function Feed() {
  var timeStamp = "11 hours ago";
  var picture; //
  var item = "apples";
  var name = "Jonathan ";
  var action = "just bought ";

  const FeedTemplate = ({ name, action, item, timeStamp }) => (
    <Card
      style={{
        fontSize: ".5rem",
        backgroundColor: "#464646",
        border: "solid #DADADA",
        borderWidth: ".3em",
        marginTop: ".1rem",
        marginBottom: 0,
        marginLeft: ".3rem",
        marginRight: ".3rem",
      }}
    >
      <Row xs="3">
        <Col xs={1}>
          <Image
            src={Placeholder}
            roundedCircle
            align="left"
            style={{
              width: "5em",
              height: "5em",
              margin: "1em",
            }}
            alt="ffff"
          />
        </Col>
        <Col xs={6} style={{ marginTop: "auto", marginBottom: "auto" }}>
          <label
            style={{
              fontSize: "2em",
              color: "#DADADA",
              marginLeft: "2em",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <strong>{name} </strong>
            {action} {item}
          </label>
        </Col>
        <Col
          style={{
            textAlign: "right",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <label
            style={{
              fontSize: "1rem",
              color: "#DADADA",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {timeStamp}
          </label>
        </Col>
      </Row>
      {/* <Card.Footer style={{ backgroundColor: "#464646", borderTopWidth: 0 }}>
        <label style={{ fontSize: "1rem", color: "#DADADA", float: "right" }}>
          {timeStamp}
        </label>
      </Card.Footer> */}
    </Card>
  );

  return (
    <div>
      <FeedTemplate
        name={name}
        action={action}
        item={item}
        timeStamp={timeStamp}
      />
      <FeedTemplate />
      <FeedTemplate />

      <FeedTemplate />
      <FeedTemplate />

      <FeedTemplate />
      <FeedTemplate />

      <FeedTemplate />
      <FeedTemplate />

      <FeedTemplate />
      <FeedTemplate />

      <FeedTemplate />
    </div>
  );
}

export default Feed;
