
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

const NewDash = () => {
    const { currentUser, userEmail } = useAuth();
    const [modalShow, setModalShow] = React.useState(false);

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
       
                  <Col className="mb-10" md={4}>
               
                  </Col>
        
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
            <Form >
              <button type="submit" >
                Join
              </button>
              <input ></input>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
    )
}

export default NewDash;