import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../features/userListSlice";
import { Container, Table, Row, Col } from "react-bootstrap";
import LoadingSpinner from "../Spinner";
import { logout } from "../../features/loginLogoutSlice";

function UserList() {
  const userList = useSelector((state) => state.userList.users);
  const isLoading = useSelector((state) => state.userList);
  const dispatch = useDispatch();
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
    <Container fluid className="pt-3">
      <h1>User List</h1>
      <Row className="overflow-scroll mt-4">
        <Col>
          {isLoading === "loading" ? (
            <LoadingSpinner />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.id}</Link>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.Department.name}</td>
                      <td>{user.Role.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserList;
