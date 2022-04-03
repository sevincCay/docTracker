import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../features/userListSlice";
import LoadingSpinner from "../Spinner";
import { logout } from ".././../features/loginLogoutSlice";
function SingleUser() {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const userDetails = useSelector((state) => state.singleUser);
  const docDetails = useSelector((state) => state.singleUser.docs);
  const dispatch = useDispatch();
  const user = useParams();
  useEffect(() => {
    dispatch(getUserDetails(user.id))
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
        }
      });
  }, []);

  const pendingDocs = docDetails
    ? docDetails.filter((item) => {
        return item.DocUser.isApproved === true;
      })
    : "";
  const approveDocs = docDetails
    ? docDetails.filter((item) => {
        return item.DocUser.isApproved === false;
      })
    : "";

  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          {userDetails.isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <Row className="profile">
              <Col sm={4} md={4}>
                <div className="">
                  <h5>Profile Info</h5>
                  <p>
                    Name: <span>{userDetails.name}</span>
                  </p>
                  <p>
                    Lastname: <span>{userDetails.lastName}</span>
                  </p>
                  <p>
                    Email: <span className="email">{userDetails.email}</span>
                  </p>
                  <p>
                    Department: <span>{userDetails.department}</span>
                  </p>
                  <p>
                    Role: <span>{userDetails.role}</span>
                  </p>
                </div>
              </Col>
              <Col sm={4} md={4}>
                <div className="">
                  <h5>Received Docs</h5>
                  <p>
                    Total: <span>{docDetails ? docDetails.length : ""}</span>
                  </p>
                  <p>
                    Approved: <span>{approveDocs.length}</span>
                  </p>
                  <p>
                    Pending: <span>{pendingDocs.length}</span>
                  </p>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <h6>Pending Docs</h6>
            <div className="doc-wrapper">
              {approveDocs
                ? approveDocs.map((doc) => (
                    <div className="card m-3 p-3 doc-card" key={doc.id}>
                      <Link
                        to={{
                          pathname: `/doc/${doc.docPath}`,
                        }}
                      >
                        <div className="doc-box m-auto">
                          <span>{doc.name}</span>
                          <img
                            src={`${baseUrl}/upload/PDF_file_icon.svg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <p>Shared By: {doc.DocUser.ownerEmail}</p>
                        <p>On: {doc.DocUser.createdAt}</p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="text-center">
            <h6>Approved Docs</h6>
            <div className="doc-wrapper">
              {pendingDocs
                ? pendingDocs.map((doc) => (
                    <div className="card m-3 p-3 doc-card" key={doc.id}>
                      <Link to={`/doc/${doc.docPath}`}>
                        <div className="doc-box m-auto">
                          <span>{doc.name}</span>
                          <img
                            src={`${baseUrl}/upload/PDF_file_icon.svg`}
                            alt=""
                          />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <p>Shared By: {doc.DocUser.ownerEmail}</p>
                        <p>On: {doc.DocUser.createdAt}</p>
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

export default SingleUser;
