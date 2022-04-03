import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../features/loginLogoutSlice";
import { NavItem } from "react-bootstrap";
import logo from "../../logo.svg";

function Navigation() {
  const user = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    setExpanded(false);
    navigate("/login");
  };
  return (
    <Navbar collapseOnSelect expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            setExpanded(expanded ? false : "expanded");
          }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavItem className="d-lg-none mt-2 mb-2 mobile-menu">
              <Link to="/" onClick={() => setExpanded(false)}>
                Doc Management
              </Link>
            </NavItem>
            <NavItem className="d-lg-none mt-2 mb-2 mobile-menu">
              <Link to="/profile" onClick={() => setExpanded(false)}>
                Profile
              </Link>
            </NavItem>
            <NavItem className="d-lg-none mt-2 mb-2 mobile-menu">
              <Link to="/users" onClick={() => setExpanded(false)}>
                Users
              </Link>
            </NavItem>
            <NavDropdown
              className="text-capitalize"
              title={user ? `Merhaba ${user}` : `Merhaba Kullanıcı`}
              id="collasible-nav-dropdown"
            >
              {user ? (
                <NavDropdown.Item onClick={handleLogout}>
                  Çıkış Yap
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  onClick={() => setExpanded(false)}
                >
                  Giriş Yap
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
