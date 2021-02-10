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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersRef = db.collection("users").doc(userEmail).collection("stats").doc(todaysDate);

    await usersRef.set(
      { steps: steps, calories: calories } 
      );
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
              type="string"
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
              type="string"
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
