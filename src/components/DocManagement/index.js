import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../features/userSlice";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../Spinner";
import { Link } from "react-router-dom";

function DocManagement() {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const { authorization } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.loggedInUser.isLoading);
  const myApprovals = useSelector((state) => state.loggedInUser.myApprovals);
  const receivedDocs = useSelector((state) => state.loggedInUser.receivedDocs);
  const myPendings = useSelector((state) => state.loggedInUser.myPendings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile(authorization));
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <Row className="profile">
              <h5>Received Docs</h5>
              <Col sm={4} md={4}>
                <div className="profile-info">
                  <p>
                    Total:{" "}
                    <span>{receivedDocs ? receivedDocs.length : ""}</span>
                  </p>
                  <p>
                    Approved:{" "}
                    <span>{myApprovals ? myApprovals.length : ""}</span>
                  </p>
                  <p>
                    Pending: <span>{myPendings ? myPendings.length : ""}</span>
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div className="text-center">
            <h6>Approved Documents</h6>
            <div className="doc-wrapper">
              {myApprovals
                ? myApprovals.map((doc) => (
                    <div className="card m-3 p-3 doc-card" key={doc.Doc.id}>
                      <Link
                        to={{
                          pathname: `/doc/${doc.Doc.docPath}`,
                          search: `?docId=${doc.Doc.id}`,
                        }}
                      >
                        <div className="doc-box">
                          <span>{doc.Doc.name}</span>
                          <img
                            src={`${baseUrl}/upload/PDF_file_icon.svg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <p>Shared By: {doc.ownerEmail}</p>
                        <p>On: {doc.createdAt}</p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div className="text-center">
            <h6>Pending Documents</h6>
            <div className="doc-wrapper">
              {myPendings
                ? myPendings.map((doc) => (
                    <div className="card m-3 p-3 doc-card" key={doc.Doc.id}>
                      <Link
                        to={{
                          pathname: `/doc/${doc.Doc.docPath}`,
                          search: `?docId=${doc.Doc.id}`,
                        }}
                      >
                        <div className="doc-box">
                          <span>{doc.Doc.name}</span>
                          <img
                            src={`${baseUrl}/upload/PDF_file_icon.svg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <p>Shared By: {doc.ownerEmail}</p>
                        <p>On: {doc.createdAt}</p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DocManagement;
