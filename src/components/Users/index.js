import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import { Container, Row, Col } from "react-bootstrap";
import { logout } from "../../features/loginLogoutSlice";

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .catch((error) => {
        if (error) {
          dispatch(logout());
        }
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Users</h1>
          <ul>
            {loading === true ? (
              <p>Loading...</p>
            ) : (
              users.map((user) => <li key={user.id}>{user.name}</li>)
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Users;
