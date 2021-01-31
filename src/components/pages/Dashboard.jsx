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
import Form from 'react-bootstrap/Form';

const Dashboard = () => {


  const { currentUser, userEmail } = useAuth();
  const [modalShow, setModalShow] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [enrolledComps, setEnrolledComps] = useState([""]);
  const [refresh, setRefresh] = useState(false);

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
              firebase.firestore.FieldValue.arrayUnion({compName: inputValue})
            );
          compRef.update(
            "members",
            firebase.firestore.FieldValue.arrayUnion(userEmail)
          );
          alert("joined" + inputValue);
          setInputValue("")
        }
        console.log("Enrolled in: " + inputValue);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    
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
  const getComps = async () => {
    const usersRef = db.collection("users").doc(userEmail);
    await usersRef.get().then((doc) => {
      if (doc.exists) {
        const received = doc.data().enrolledIn;
        console.log("Logging Received")
        if (!received) {
          setEnrolledComps(["None"])
        } else {
          const compNameList = received.map((comps) => comps.compName)
        setEnrolledComps(compNameList.slice((compNameList.length-3),compNameList.length));
        console.log(enrolledComps);

        }
      }
      
    });

  };

  useEffect(() => {
    if (currentUser !== null) {
      addUser();
    }
    getComps();
    
  },[modalShow, inputValue]);
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
                <Row style={{paddingTop: 10}} className="justify-content-center mt-3 mb-3 ml-3 mr-3">
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
            <button type="submit" onClick={joinComp}>Join</button>
            <input onChange={handleChange} placeHolder={inputValue} value={inputValue}></input>
         </Form>
          </Col>
          
        </Row>
      </Container>
    </Container>
  );
};

export default Dashboard;
