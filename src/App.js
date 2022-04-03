import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import Navigation from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import SingleUser from "./components/UserList/SingleUser";
import DocView from "./components/SingleDoc/DocView";
import { Col, Container, Row } from "react-bootstrap";
import DocManagement from "./components/DocManagement";
import { useSelector } from "react-redux";

function App() {
  const docs = useSelector((state) => state.loggedInUser.receivedDocs);
  return (
    <Container fluid className="App h-100">
      <Row className="m-0 topnav">
        <Col>
          <Navigation />
        </Col>
      </Row>
      <Row className="m-0">
        <Col lg={2} className="d-lg-block d-none m-0 p-0 sidebar">
          <Sidebar />
        </Col>
        <Col>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <DocManagement />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/doc/upload/:name"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <DocView docs={docs} />
                </RequireAuth>
              }
            />
            <Route
              path="/users"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <UserList />
                </RequireAuth>
              }
            />
            <Route
              path="/users/:id"
              element={
                <RequireAuth redirectTo={"/login"}>
                  <SingleUser />
                </RequireAuth>
              }
            />
            <Route path="*" element={<h1>404 page not found</h1>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
