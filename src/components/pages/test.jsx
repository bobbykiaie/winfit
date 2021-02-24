import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Styles = styled.div`
  /* .messageBoard {
    padding: 20px;
    height: 400px;
    width: 400px;
  } */
  .Card{
  display: flex;
  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  margin: 5px;
  align-items: stretch;
  height: 100vh;
  }
`;

const Test = () => {
  return (
      <Styles>
    <Container fluid>
      <Row>
        <Col>
         
            <div className="Card">Test</div>
          
        </Col>
        <Col></Col>
      </Row>
    </Container>
    </Styles>
  );
};

export default Test;
