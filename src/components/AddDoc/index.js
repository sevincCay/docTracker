import React, { useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import axios from "axios";
import { userProfile } from "../../features/userSlice";

function AddDoc() {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userList.users);
  const [showModal, setShow] = useState(false);
  const [file, setFile] = useState({});
  const [docResponse, setDocResponse] = useState({});
  const token = localStorage.getItem("auth-token");

  const openForm = () => {
    dispatch(getUsers());
    setDocResponse({});
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mailList = document.querySelectorAll("#mailList input");
    const emailList = [];
    mailList.forEach((i) => {
      if (i.checked) {
        emailList.push(i.value);
      }
    });
    const formData = new FormData();

    formData.append("emailList", JSON.stringify(emailList));
    formData.append("doc", file);

    axios({
      method: "POST",
      url: `${baseUrl}/docs/create`,
      data: formData,
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => {
        setDocResponse({
          status: response.status,
          message: `${response.data.savedDoc.name} shared with ${emailList.length} users`,
        });
        dispatch(userProfile());
      })
      .catch((error) => {
        setDocResponse({
          status: error.status,
          message: error.response.data,
        });
      });
  };

  return (
    <div>
      <a href="##" onClick={openForm} className="add-button">
        <FontAwesomeIcon icon={faPlusCircle} size={"3x"} />
      </a>

      <Modal
        show={showModal}
        onHide={() => setShow(false)}
        dialogClassName="custom-modal"
        centered
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title id="contained-modal-title-lg">Belge Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Form.Control
              type="file"
              placeholder="Dosya Seçin"
              name="doc"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="error-message">
              {docResponse.status !== 200 ? docResponse.message : ""}
            </p>
            <p className="success-message">
              {docResponse.status === 200 ? docResponse.message : ""}
            </p>

            <hr />
            <h6>Eklediğiniz belgeyi paylaşmak istediğiniz kişileri seçin.</h6>
            <div className="userList">
              {users.map((user) => (
                <Form.Group key={user.id} id="mailList">
                  <Form.Check
                    type="checkbox"
                    label={user.email}
                    id={user.id}
                    name="email"
                    value={user.email}
                  />
                </Form.Group>
              ))}
            </div>
            <Button type="submit">Gönder</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddDoc;
