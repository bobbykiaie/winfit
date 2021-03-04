import React, { useEffect, useState, useReducer } from "react";
import { db, firebase } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../providers/UserProvider";
import { Link, useParams } from "react-router-dom";

import styled, { ThemeProvider } from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";

import { Icon, InlineIcon } from "@iconify/react";
import footstepsIcon from "@iconify-icons/ion/footsteps";

import sigmaIcon from "@iconify-icons/mdi/sigma";

import fireIcon from "@iconify-icons/el/fire";

const Styles = styled.div`
  font-family: "Roboto", sans-serif;
  .middleAlign {
    margin: 0 0 0 0;
    text-align: left;
    margin-bottom: 0;
    align-content: start;
    font-family: "Roboto Condensed", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
  }
  .rightAlign {
    padding: 0;
    margin: auto;
    text-align: right;
    align-content: middle;
    font-family: "Roboto Condensed", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;

    color: #000000;
  }
  .userStats {
    margin: 0 30% 0% 0%;
  }
  .leaderBoard {
    height: 80vh;

    filter: drop-shadow(0px 2px 4px #747373);
  }
  .messages {
    height: 30vh;
    margin-top: 20px;
  }

  .userData {
    font-family: "Roboto Condensed", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.67);
    padding: 20px;
  }
  .avatar {
    height: 8vw;
    width: 8vw;
   
    background-color: #bbb;
    border-radius: 50%;
    margin: 40px;
  }
  .message {
    height: 50vw;
  }
  .leader {
    height: 100vh;
    padding: 20px;
    height: 50vh;
    background: #ffffff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    border-radius: 15px;
    margin: 5px;
  }
`;
const H1 = styled.h1`
  font-family: "Roboto Condensed", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.67);
  margin-top: 10px;
`;
const AccentCard = styled.div`
  background: rgba(228, 228, 228, 0.28);
  box-shadow: 0px 4px 4px #ffffff;
  border-radius: 20px;
  margin: 10px;
  padding: 5% 5% 5% 10%;
`;
const Card = styled.div`
  padding: 20px;

  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 5px;
`;

const RankingBadge = styled.div`
  position: absolute;
  width: 90px;
  height: 90px;
  background: #92ebbb;
`;

const CompDetails = (props) => {
  var mydate = require("current-date");
  const todaysDate = mydate("date");

  const { currentUser, userEmail, refresh, refreshState } = useAuth();
  const { comp } = useParams();
  const [enrolledMembers, setEnrolledMembers] = useState();
  const [memberData, setMemberData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserSteps, setCurrentUserSteps] = useState();
  const [currentUserCalories, setCurrentUserCalories] = useState();

  const compRef = db.collection("Competitions").doc(comp);

  function dateFormat() {
    const today = new Date();
    var monthOption = { month: "short" };
    var dayOption = { day: "numeric" };
    var yearOption = { year: "numeric" };

    const month = today.toLocaleDateString("default", monthOption);
    const day = today.toLocaleDateString("default", dayOption);
    const year = today.toLocaleDateString("default", yearOption);

    const theDate = month + day + year;

    return theDate;
  }
  const testButton = () => {
    console.log(memberData);
  };

  const getMembers = async () => {
    await compRef.get().then(async (doc) => {
      if (doc.exists) {
        setEnrolledMembers(await doc.data().members);
        if (!enrolledMembers) {
          setRefreshing(true);
          return;
        } else {
          getStatus();
        }
      } else {
        setEnrolledMembers(["None"]);
      }
    });
  };

  const getCurrentUserStats = () => {
    console.log(userEmail);
    const userRef = db
      .collection("users")
      .doc(userEmail)
      .collection("stats")
      .doc("dailyStats");
    userRef.get().then((doc) => {
      const formattedDate = dateFormat();
      const { steps, calories } = doc.data();
      const stepsArray = [];

      for (const date in steps) {
        stepsArray.push({ [date]: steps[date] });
      }
      const stepDateFilter = stepsArray.filter(
        (entry) => Object.keys(entry)[0] === formattedDate
      );
      const caloriesArray = [];
      for (const date in calories) {
        caloriesArray.push({ [date]: calories[date] });
      }

      const calorieDateFilter = caloriesArray.filter(
        (entry) => Object.keys(entry)[0] === formattedDate
      );
      const todaysSteps = stepDateFilter[0]
        ? Object.values(stepDateFilter[0])[0]
        : 0;
      const todaysCalories = calorieDateFilter[0]
        ? Object.values(calorieDateFilter[0])[0]
        : 0;
      setCurrentUserCalories(todaysCalories);
      setCurrentUserSteps(todaysSteps);
    });
  };

  const getStatus = async () => {
    console.log("get status begnning line");
    await compRef.get().then(async (doc) => {
      if (doc.exists) {
        setEnrolledMembers(doc.data().members);
      } else {
        setEnrolledMembers(["None"]);
      }
    });
    if (!enrolledMembers) {
      setRefreshing(true);
      console.log("there were no members so we are refreshing");
    } else {
      enrolledMembers.forEach(async (member) => {
        const userRef = db
          .collection("users")
          .doc(member)
          .collection("stats")
          .doc("dailyStats");

        userRef.get().then(async (doc) => {
          if (doc.exists) {
            const formattedDate = dateFormat();

            const { steps, calories } = doc.data();

            const caloriesArray = [];
            for (const date in calories) {
              caloriesArray.push({ [date]: calories[date] });
            }

            const calorieDateFilter = caloriesArray.filter(
              (entry) => Object.keys(entry)[0] === formattedDate
            );
            const stepsArray = [];

            for (const date in steps) {
              stepsArray.push({ [date]: steps[date] });
            }
            const stepDateFilter = stepsArray.filter(
              (entry) => Object.keys(entry)[0] === formattedDate
            );

            const todaysCalories = calorieDateFilter[0]
              ? Object.values(calorieDateFilter[0])[0]
              : 0;

            const todaysSteps = stepDateFilter[0]
              ? Object.values(stepDateFilter[0])[0]
              : 0;

            setMemberData((prevData) => {
              if (!prevData) {
                setRefreshing(true);
              } else {
                console.log(prevData);

                return [
                  ...prevData,
                  {
                    steps: todaysCalories ? todaysCalories : 0,
                    calories: todaysSteps ? todaysSteps : 0,
                    name: member,
                  },
                ];
              }
            });
          }
        });
        // console.log(memberData);
        // console.log("ending loop");
      });
    }
  };
  useEffect(() => {
    setMemberData([]);
    getMembers();
    getCurrentUserStats();
  }, [refreshing]);

  return (
    <Styles>
      <h1>{comp}</h1>
      <button onClick={testButton}>Click Me</button>
      <Container fluid>
        <Row>
          <Col lg={6}>
            <Row className="justify-content-xs-center">
              <Col className="mx-auto">
                <Card>
                  <Row className="justify-content-md-center align-middle">
                    <Col xs={4} className="mx-auto text-center p-4 ">
                      <Image
                            style={{width: "100px", height: "100px"}}
                             src="https://firebasestorage.googleapis.com/v0/b/winfit-302321.appspot.com/o/F30E171C-6C3B-4CCA-9373-755B1131FB2A.jpeg?alt=media&token=8253a89c-fb0d-4894-bebc-be7539302640"
                             roundedCircle
                          fluid />
                     
                    </Col>
                    <Col xs={4} className="mx-auto text-center p-5">
                      <p className="text-center"  ><h2>200</h2></p>
                     
                    </Col>
                    <Col xs={4} className="mx-auto text-center p-4">
                      <Image
                            style={{width: "100px", height: "100px"}}
                             src="https://firebasestorage.googleapis.com/v0/b/winfit-302321.appspot.com/o/F30E171C-6C3B-4CCA-9373-755B1131FB2A.jpeg?alt=media&token=8253a89c-fb0d-4894-bebc-be7539302640"
                             roundedCircle
                          fluid />
                     
                    </Col>
                  </Row>
                  <Row id="" className="justify-content-md-center">
                    <Col className="mx-auto">
                      <AccentCard>
                        <Row className="justify-content-md-center">
                          <Col>
                            <Row>
                              <Col className="userStats">Steps</Col>
                            </Row>
                            <Row>
                              <Col className="userStats">Calories</Col>
                            </Row>
                            <Row>
                              <Col className="userStats">Weight</Col>
                            </Row>
                          </Col>
                          <Col className="text-center"></Col>
                          <Col className="text-center">
                            <Row>
                              <Col>{currentUserSteps}</Col>
                            </Row>
                            <Row>
                              <Col>{currentUserCalories}</Col>
                            </Row>
                          </Col>
                        </Row>
                      </AccentCard>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="mx-auto">
                <Card className="messages">Message Board</Card>
              </Col>
            </Row>
          </Col>
          <Col className="mx-auto m-0 ">
            <Card className="leaderBoard">
              <Row>
                <Col className="text-center">
                  <p style={{ color: "#747373" }}>
                    <h3>Leader Board</h3>
                  </p>
                </Col>
              </Row>
              <Row className="justify-content-right">
                <Col className="rightAlign pb-3" xs={{ offset: 6 }}>
                  <span style={{ marginRight: 10 }}>
                    <Icon icon={footstepsIcon} />
                  </span>
                  <span style={{ marginRight: 10 }}>
                    <Icon icon={fireIcon} />
                  </span>
                  <span style={{ marginRight: 10 }}>
                    <Icon icon={sigmaIcon} />
                  </span>
                </Col>
              </Row>
              {memberData ? (
                memberData.map((user) => {
                  return (
                    <Row>
                      <Col className="middleAlign">
                        <Row>
                          <Col xs="auto"className="pb-1">
                            <Image
                              style={{ height: 40, width: 40 }}
                              src="https://firebasestorage.googleapis.com/v0/b/winfit-302321.appspot.com/o/F30E171C-6C3B-4CCA-9373-755B1131FB2A.jpeg?alt=media&token=8253a89c-fb0d-4894-bebc-be7539302640"
                              roundedCircle
                            />
                            <span style={{ padding: 10, fontSize: "85%" }}>
                              {user.name}
                            </span>
                          </Col>
                        </Row>
                      </Col>

                      <Col xs="auto" className="rightAlign pb-0">
                        <span style={{ marginRight: 19 }}>{parseInt(user.steps)}</span>
                        <span style={{ marginRight: 17 }}>{parseInt(user.calories)}</span>
                        <span style={{ marginRight: 14 }}>
                          {parseInt(user.steps) + parseInt(user.calories)}
                        </span>
                      </Col>
                    </Row>
                  );
                })
              ) : (
                <h1>None</h1>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </Styles>
  );
};

export default CompDetails;
// {state.members.map((members) => {
//   return (
//     <div>
//       <h1>{members.name}</h1>
//     </div>
//   );
// })}
// {memberData ? (
//   memberData.map((data) => {
//     return (
//       <div>
//         <Col>
//           <H1>{data.name}</H1>
//           <H1 style={{ marginLeft: "30px" }}>
//             {" "}
//             Steps: {data.steps}
//           </H1>
//           <H1 style={{ marginLeft: "30px" }}>
//             {" "}
//             Calories: {data.calories}
//           </H1>
//         </Col>
//       </div>
//     );
//   })
// ) : (
//   <h1>"none"</h1>
// )}
