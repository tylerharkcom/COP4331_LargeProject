import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Placeholder from "../images/orangeSliceCrop.jpg";
// import Placeholder2 from "../images/happyToast.png";

import Image from "react-bootstrap/Image";
import React, { useState, useEffect } from "react";

const Feed = () => {
  const [feedData, setFeed] = useState({
    posts: [
      {
        eventType: "",
        item: "",
        name: "",
        data: "",
      },
    ],
  });

  useEffect(() => {
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    try {
      const response = await fetch("/api/loadFeed", {
        method: "POST",
        body: null,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      var res = JSON.parse(await response.text());
      if (response.status !== 200) {
        console.log(res.error);
      } else {
        console.log(res);
        console.log(res.feed);
        console.log(res.feed.eventType);
        console.log(res.feed.item);

        setFeed({ posts: res.feed });
        console.log(feedData.posts);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const FeedTemplate = (name, eventType, item, date) => {
    let dateN = new Date(date);
    return (
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
              {eventType} {item}
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
              {dateN}
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
  };

  let printFeed = (
    <div>
      {feedData.posts.map((p) => {
        return (
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
                  <strong>{p.name} </strong>
                  {p.eventType} {p.item}
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
                  {p.date}
                </label>
              </Col>
            </Row>
          </Card>
        );
        // return (
        //   <FeedTemplate
        //     name={p.name}
        //     eventType={p.eventType}
        //     item={p.item}
        //     date={p.date}
        //   />
        // );
      })}
    </div>
  );

  const GenerateFeed = async () => {
    for (let i = 0; i < feedData.posts.length; i++) {
      <FeedTemplate
        name={feedData.posts.name[i]}
        eventType={feedData.posts.eventType[i]}
        item={feedData.posts.item[i]}
        date={feedData.posts.date[i]}
      />;
    }
  };

  return <div>{printFeed}</div>;
  // { printFeed };
  // };
};
export default Feed;
