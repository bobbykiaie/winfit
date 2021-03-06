import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db, firebase, app } from "../../firebase/firebase";
import { useAuth } from "../../providers/UserProvider";
import currentDate from "current-date";

function UpdateStats(props) {
  var mydate = require("current-date");
  const [steps, setSteps] = useState();
  const [calories, setCalories] = useState();
  const todaysDate = mydate("date");

  const { currentUser, userEmail, refresh, refreshState } = useAuth();
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
  const handleInput = async (event) => {
    if (event.target.name === "steps") {
      setSteps(event.target.value);
      console.log(steps);
    }
    if (event.target.name === "calories") {
      setCalories(event.target.value);
      console.log(calories);
    }
  };
  const checkDates = () => {
    const usersRef = db.collection("users").doc(userEmail).collection("stats").doc("dailyStats");
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const usersRef = db.collection("users").doc(userEmail).collection("stats").doc("dailyStats");
    await usersRef.get().then(doc => {
      const testDate = dateFormat();
      const retrievedSteps = doc.data().steps
      const retrievedDate = Object.keys(retrievedSteps)[0]
      
      if(retrievedDate===testDate){
         usersRef.set(
          {calories: {[dateFormat()]: (parseInt(steps))}, steps: {[dateFormat()]: parseInt(calories)}}
          );
      }else{
        usersRef.update({
        
          [`steps.${testDate}`]: steps,
          [`calories.${testDate}`]: calories
        });
      }
    
    })

   
     
    
    
    // await usersRef.update(({[todaysDate]: {steps: steps, calories: calories}}))
    refresh(true);
  };

  useEffect(() => {}, [refreshState]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Competition
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Steps
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={handleInput}
              value={steps}
              type="number"
              name="steps"
              placeholder="Enter total steps for the day"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Calories
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              onChange={handleInput}
              value={calories}
              type="number"
              name="calories"
              placeholder="Enter total burned calories for the day"
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div onClick={props.onHide}>
          <Button type="submit" variant="outline-dark" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <Button onClick={props.onHide} variant="outline-dark" type="button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateStats;
