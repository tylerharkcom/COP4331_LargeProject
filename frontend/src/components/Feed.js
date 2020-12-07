import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Icon from "react-crud-icons";
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
  //   console.log(picturePlaceholder.length);
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
  const GetPicture = (props) => {
    let event = props.eventType;
    if (props.eventType === "threw out") {
      return <Icon name="remove" size="medium" theme="dark" />;
    }
    if (props.eventType === "bought") {
      return <Icon name="add" size="medium" theme="dark" />;
    }
    if (props.eventType === "found a recipe for") {
      return <Icon name="browse" size="medium" theme="dark" />;
    } else return null;
  };
  const FormattedDate = (props) => {
    let propsDate = new Date(props.date);
    let expDate = new Date(
      propsDate.getTime() + propsDate.getTimezoneOffset() * 60000
    );
    expDate.setHours(23, 59, 59, 999);
    let current = new Date();
    let timeDiff = Math.round(
      (expDate.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );
    let timeDiffString = "";

    if (timeDiff == 0) {
      timeDiffString = "today";
    } else if (timeDiff == 1) {
      timeDiffString = timeDiff + " day ago";
    } else if (timeDiff > 1) {
      timeDiffString = timeDiff + " days ago";
    } else {
      timeDiffString = "A time long ago";
    }
    return timeDiffString;
    // return timeDiffString;
    //   // let actionDate = new Date(props.date);
    //   let actionDate = new Date("12/5/2020");
    //   let currDate = new Date();
    //   let newDate = new Date(currDate.getTime() - actionDate.getTime());
    //   let day = Math.abs(currDate.getDate() - newDate.getDate());
    //   let month = Math.abs(currDate.getMonth() - newDate.getMonth());
    //   let rVal = "";

    //   if (month > 0) {
    //     rVal += month;
    //     rVal += " month";
    //     if (month > 1) {
    //       rVal += "s";
    //     }

    //     if (day > 0) {
    //       rVal += ", ";
    //     }
    //   }
    //   if (day > 0) {
    //     rVal += day;
    //     rVal += " day";
    //     if (day > 1) {
    //       rVal += "s";
    //     }
    //   }
    //   if (day < 0 && month < 0) {
    //     let seconds = newDate.getSeconds();
    //     if (seconds > 3600) {
    //       rVal += seconds / 3600;
    //       if (seconds / 3600 > 1) {
    //         rVal += " hours";
    //       } else rVal += " hour";
    //     }
    //     let min = seconds % 3600;
    //     if (seconds % 3600 >= 60) {
    //       rVal += seconds % 3600;
    //       if (seconds % 3600 > 60) {
    //         rVal += " minutes";
    //       } else rVal += " minute";
    //     }
    //     if (seconds < 60) {
    //       rVal += seconds;
    //       rVal += " seconds";
    //     }
    //   }
    //   rVal += " ago";
    //   return rVal;
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
                {<GetPicture eventType={p.eventType} />}
                {/* <Image
                  src={getPicture(p.eventType)}
                  roundedCircle
                  align="left"
                  style={{
                    width: "5em",
                    height: "5em",
                    margin: "1em",
                  }}
                  alt="ffff"
                /> */}
              </Col>
              <Col xs={6} style={{ marginTop: "auto", marginBottom: "auto" }}>
                <label
                  style={{
                    fontSize: "2em",
                    color: "#DADADA",
                    marginLeft: "1em",
                    marginTop: "auto",
                    marginBottom: "auto",
                    minWidth: "10rem",
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
