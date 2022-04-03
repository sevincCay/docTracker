import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SpinnerDotted } from "spinners-react";

function LoadingSpinner(props) {
  return (
    <Container fluid className="w-100">
      <Row className="vh-100">
        <Col className="d-flex justify-content-center">
          <SpinnerDotted color={"rgb(15, 100, 126)"} />
        </Col>
      </Row>
    </Container>
  );
}

export default LoadingSpinner;
