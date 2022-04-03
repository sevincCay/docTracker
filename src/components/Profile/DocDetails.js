import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function DocDetails(props) {
  const docDetails = props.show.docs ? props.show.docs[0].DocUsers : "";

  const approvedBy = docDetails
    ? docDetails.filter((item) => {
        return item.isApproved === true;
      })
    : "";
  const pendingBy = docDetails
    ? docDetails.filter((item) => {
        return item.isApproved === false;
      })
    : "";

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.hide}
        dialogClassName="custom-modal"
        centered
      >
        <Modal.Header closeButton onClick={props.hide}>
          <Modal.Title id="contained-modal-title-lg">Belge Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h6>
                  Approved By: <span>{approvedBy.length}</span>
                </h6>
                <ul>
                  {approvedBy
                    ? approvedBy.map((item) => (
                        <li key={item.id}>
                          <Link to={`/users/${item.UserId}`}>
                            {item.sharedTo}
                          </Link>
                        </li>
                      ))
                    : "No Data"}
                </ul>
              </Col>
              <Col>
                <h6>
                  Pending: <span>{pendingBy.length}</span>
                </h6>
                <ul>
                  {pendingBy
                    ? pendingBy.map((item) => (
                        <li key={item.id}>
                          <Link to={`/users/${item.UserId}`}>
                            {item.sharedTo}
                          </Link>
                        </li>
                      ))
                    : "No Data"}
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DocDetails;
