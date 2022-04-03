import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../features/loginLogoutSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    await dispatch(login(loginData)).unwrap();
    navigate("/");
  };

  return (
    <Container fluid className="bg-light">
      <Row className="vh-100 justify-content-center align-items-center">
        <Col>
          <div className="loginForm m-auto bg-secondary rounded-3 shadow text-white">
            <form onSubmit={handleLogin} className="m-5 pt-5 pb-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="on"
                />
                <Link to="/">Forgot Password</Link>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Beni hatırla" />
              </Form.Group>
              <Button className="float-end" variant="primary" type="submit">
                Giriş Yap
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
