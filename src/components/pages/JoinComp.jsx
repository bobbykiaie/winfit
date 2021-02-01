import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db, firebase } from "../../firebase/firebase";
import { useAuth } from "../../providers/UserProvider";

function JoinComp(props) {
  const [compName, setCompName] = useState();

  const { currentUser, userEmail } = useAuth();
  
  const handleInput = (event) => {
    console.log(event.target.value);
    setCompName(event.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("handdlinnngngg Creeeaaatee");
    
    const usersRef = db.collection("users").doc(userEmail);
    const compRef = db.collection("Competitions").doc(compName);

    db.collection("Competitions")
      .doc(compName)
      .set({
        owner: currentUser,
        members: [userEmail],
      });
    usersRef.update(
      "enrolledIn",
      firebase.firestore.FieldValue.arrayUnion({ compName: compName })
    );
   
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
            <Form.Group as={Row} onSubmit={props.onHide}>
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
        
      </Modal.Body>
      <Modal.Footer>
         <div onClick={props.onHide}>
        <Button type="submit" onClick={handleCreate} >
          Create
        </Button>
        </div>
        <Button onClick={props.onHide} type="button">Close</Button>
       
      </Modal.Footer>
    </Modal>
   
  );
}

export default JoinComp;
