import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Placeholder1 from "../images/orangeSliceCrop.jpg";
import Placeholder2 from "../images/happyToast.png";
import Placeholder3 from "../images/happyToast.png";

import Image from "react-bootstrap/Image";
import React, { useState, useEffect } from "react";

const Feed = () => {
  const picturePlaceholder = [];
  // const [picturePlaceholder, setPic] = useState(0);
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

  // const getPicture = (event) => {
  //   if (picturePlaceholder.length == 0) {
  //     picturePlaceholder.push(1);
  //     return Placeholder1;
  //   } else if (picturePlaceholder.length == 1) {
  //     picturePlaceholder.push(2);
  //     return Placeholder2;
  //   } else {
  //     picturePlaceholder.pop();
  //     picturePlaceholder.pop();
  //     return Placeholder3;
  //   }
  // };

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
        setFeed({ posts: res });
        console.log(feedData);
      }
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };

  const FormattedDate = (props) => {
    let newDate = new Date(props.date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let rVal = "";

    if (month > 0) {
      rVal += month;
      rVal += " month";
      if (month == 1) {
        rVal += "s";
      }
      rVal += " ago";
      if (day > 0) {
        rVal += " ";
      }
    }
    if (day > 0) {
      rVal += day;
      rVal += "day";
      if (day == 1) {
        rVal += "s";
      }
      rVal += " ago";
    }
    return rVal;
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
                  src={Placeholder1}
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
                    marginLeft: "1em",
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
                  {<FormattedDate date={p.date} />}
                  {/* {p.date} */}
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

  return <div>{printFeed}</div>;
  // return <FeedTemplate />;
  // };
};
export default Feed;
