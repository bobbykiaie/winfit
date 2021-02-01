import React, { useEffect, useState } from "react";
import { db, firebase } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../../providers/UserProvider";
import NewCompButton from "./NewCompetition";
import Button from "react-bootstrap/Button";
import MediaCard from "../items/CompCard";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import { setRef } from "@material-ui/core";

const Dashboard = () => {
  const { currentUser, userEmail, refresh, refreshState } = useAuth();
  const [modalShow, setModalShow] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [enrolledComps, setEnrolledComps] = useState([""]);


  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const joinComp = (e) => {
    e.preventDefault();
    const compRef = db.collection("Competitions").doc(inputValue);
    compRef
      .get()
      .then(function (doc) {
        if (!doc.exists) {
          alert("Competition does not exist");
        } else {
          db.collection("users")
            .doc(userEmail)
            .update(
              "enrolledIn",
              firebase.firestore.FieldValue.arrayUnion({ compName: inputValue })
            );
          compRef.update(
            "members",
            firebase.firestore.FieldValue.arrayUnion(userEmail)
          );
          alert("joined" + inputValue);
          setInputValue("");
        }
        console.log("Enrolled in: " + inputValue);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
      refresh(true)
  };

  const addUser = () => {
    console.log("adding user");
    console.log(userEmail);
    const usersRef = db.collection("users").doc(userEmail);
    usersRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return;
        } else {
          // doc.data() will be undefined in this case
          console.log("adding user: " + userEmail);
          db.collection("users").doc(userEmail).set({
            name: currentUser,
            email: userEmail,
          });
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
   
    console.log("Starting Useefffect from dashboard with");
    console.log(userEmail);
    const usersRef = db.collection("users").doc(userEmail);
    usersRef.get().then((doc) => {
      if (doc.exists) {
        return;
      } else {
        addUser();
      }
    });
    console.log("fisnihed add user check");
    const getComps = async () => {
      console.log("starting get comps");
      const usersRef = db.collection("users").doc(userEmail);
      await usersRef.get().then((doc) => {
        console.log("this is the doc dawg:");
        console.log(doc.data());
        if (doc.exists) {
          console.log("the doc exists and its the follwoing:");
          console.log(doc.data());
          const received = doc.data().enrolledIn;
          console.log("Logging the enrolled competionts from useffect");
          console.log(received);
          if (!received) {
            console.log("Not enrolled");
            setEnrolledComps(["None"]);
          } else {
            const compNameList = received.map(
              async (comps) => await comps.compName
            );
            if (compNameList.length > 3) {
              setEnrolledComps(
                compNameList.slice(compNameList.length - 3, compNameList.length)
              );
            } else {
              setEnrolledComps(compNameList);
            }

            console.log("these are the enrolled ocmps");
            console.log(enrolledComps);
          }
        }
      });
    };

    getComps();
    refresh(false)
    
  }, [refreshState]);
  return (
    <Container fluid>
      <Row>
        <Col className="mx-auto">
          <h1>Welcome {currentUser}</h1>
        </Col>
      </Row>
      <Container fluid>
        <Paper>
          <Row>
            <Col>
              <Row className="ml-3">
                <Col>
                  <h5>Enrolled Competition:</h5>
                </Col>
              </Row>
              <Row
                style={{ paddingTop: 10 }}
                className="justify-content-center mt-3 mb-3 ml-3 mr-3"
              >
                {enrolledComps.map((comps) => (
                  <Col className="mb-10" md={4}>
                    <MediaCard prop={comps} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Paper>
      </Container>
      <Container fluid>
        <Row className="mb-3">
          <Col className="mt-3">
            <Button variant="outline-dark" onClick={() => setModalShow(true)}>
              Create Competition
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <NewCompButton
              
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={joinComp}>
              <button type="submit" onClick={joinComp}>
                Join
              </button>
              <input onChange={handleChange} value={inputValue}></input>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
