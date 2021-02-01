import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { db, firebase, app } from "../../firebase/firebase";
import { useAuth } from "../../providers/UserProvider";

function NewCompButton(props) {

  const [compName, setCompName] = useState();
  const [bannerLink, setBannerLink] = useState();

  const { currentUser, userEmail, refresh, refreshState} = useAuth();
  const handleInput = (event) => {
    setCompName(event.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if(!bannerLink){
      alert("please wait")
    } else {
      console.log(bannerLink)
      const usersRef = await db.collection("users").doc(userEmail);
      const compRef = await db.collection("Competitions").doc(compName)
      await compRef
        .set({
          owner: currentUser,
          members: [userEmail],
          banner: bannerLink,
          compName: compName,
        });
      await usersRef.update(
        "enrolledIn",
        firebase.firestore.FieldValue.arrayUnion({ compName: compName })
      );
     
    }
 
    refresh(true);
  };
  const onChange = async (e) => {
    const file = await e.target.files[0];
    const storageRef = await app.storage().ref();
    const fileRef = await storageRef.child(file.name);
    await fileRef.put(file);
    await fileRef.getDownloadURL().then(async(url) => {
    await setBannerLink(url);
    });
  };
useEffect (()=> {
  
},[refreshState])
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
        <Form.Group>
          <Form.Label column sm={2}>
            Banner
          </Form.Label>
          <input onChange={onChange} type="file"></input>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <div onClick={props.onHide}>
          <Button type="submit" onClick={handleCreate}>
            Create
          </Button>
        </div>
        <Button onClick={props.onHide} type="button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewCompButton;
