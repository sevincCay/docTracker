import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../../features/userSlice";
import { Container, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";
import AddDoc from "../AddDoc";
import DocDetails from "./DocDetails";
import { logout } from "../../features/loginLogoutSlice";

function Profile() {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const profileData = useSelector((state) => state.loggedInUser);
  const ownedDocs = useSelector((state) => state.loggedInUser.docs);
  const sharedWith = useSelector((state) => state.loggedInUser.sharedWith);
  const receivedDocs = useSelector((state) => state.loggedInUser.receivedDocs);
  const navigate = useNavigate();

  const approved = sharedWith
    ? sharedWith.filter((item) => item.isApproved === true)
    : "";
  const pending = sharedWith
    ? sharedWith.filter((item) => item.isApproved === false)
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile())
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
          navigate("login");
        }
      });
  }, []);

  const [showModal, setShow] = useState(false);

  const openDocDetails = (e) => {
    const docData = ownedDocs.filter((i) => i.id == e.target.id);
    setShow({
      show: true,
      docs: docData,
    });
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          {profileData.isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <Row className="profile profile-page">
              <Col sm={4} md={4}>
                <div className="">
                  <h5>Profile Info</h5>
                  <p>
                    Name: <span>{profileData.name}</span>
                  </p>
                  <p>
                    Lastname: <span>{profileData.lastName}</span>
                  </p>
                  <p>
                    Email: <span className="email">{profileData.email}</span>
                  </p>
                  <p>
                    Department: <span>{profileData.department}</span>
                  </p>
                  <p>
                    Role: <span>{profileData.role}</span>
                  </p>
                </div>
              </Col>
              <Col sm={4} md={4}>
                <div className="">
                  <h5>Uploaded Docs</h5>
                  <p>
                    Owned Docs: <span>{ownedDocs ? ownedDocs.length : ""}</span>
                  </p>
                  <p>
                    Shared With:{" "}
                    <span>{sharedWith ? sharedWith.length : ""}</span>
                  </p>
                  <p>
                    Approved: <span>{approved.length}</span>
                  </p>
                  <p>
                    Pending: <span>{pending.length}</span>
                  </p>
                </div>
              </Col>

              <Col sm={4} md={4}>
                <div className="">
                  <h5>Received Docs</h5>
                  <p>
                    Total:{" "}
                    <span>{receivedDocs ? receivedDocs.length : ""}</span>
                  </p>
                  <p>
                    Approved:{" "}
                    <span>
                      {profileData.myApprovals
                        ? profileData.myApprovals.length
                        : ""}
                    </span>
                  </p>
                  <p>
                    Pending:{" "}
                    <span>
                      {profileData.myPendings
                        ? profileData.myPendings.length
                        : ""}
                    </span>
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
            <h6>Uploaded Documents</h6>
            <div className="doc-wrapper">
              <div className="add-doc">
                <AddDoc />
              </div>
              {ownedDocs
                ? ownedDocs.map((doc) => (
                    <div className="card m-3 p-3 doc-card" key={doc.id}>
                      <Link
                        to={{
                          pathname: `/doc/${doc.docPath}`,
                          search: `?docId=${doc.id}`,
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
                        <h6>Shared with: {doc.DocUsers.length}</h6>
                        <h6>
                          Approved:{" "}
                          {
                            doc.DocUsers.filter((item) => {
                              return item.isApproved === true;
                            }).length
                          }
                        </h6>
                        <h6>
                          Pending:{" "}
                          {
                            doc.DocUsers.filter((item) => {
                              return item.isApproved === false;
                            }).length
                          }
                        </h6>
                        <DocDetails show={showModal} hide={handleHide} />
                        <a
                          href="##"
                          id={doc.id}
                          onClick={(e) => openDocDetails(e)}
                        >
                          Details...
                        </a>
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

export default Profile;
