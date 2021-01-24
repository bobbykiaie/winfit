import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../providers/UserProvider";

function NewCompButton(props) {
  const [compName, setCompName] = useState();
  const { currentUser, logout } = useAuth();
  const handleInput = (event) => {
    console.log(event.target.value);
    setCompName(event.target.value);
  };

  const handleCreate = (e) => {
   e.preventDefault();
    db.collection("Competitions").doc(compName).set({
      owner: currentUser,
    });
  };

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
        <Form onSubmit={handleCreate}>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                onChange={handleInput}
                value={compName}
                type="string"
                placeholder="Scone"
              />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Metrics
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="checkbox"
                  label="Weight"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="checkbox"
                  label="Calories"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="checkbox"
                  label="Steps"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
          </fieldset>
        </Form>
    
      </Modal.Body>
      <Modal.Footer>
          <Form onSubmit={handleCreate}>
        <Button onClick={props.onHide} type="submit">
          Create
        </Button>
        <Button onClick={props.onHide}>Close</Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
}

export default NewCompButton;
