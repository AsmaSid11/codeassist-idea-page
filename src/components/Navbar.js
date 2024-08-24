import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function AppNavbar({ setView }) {
  return (
    <Navbar variant="dark" expand="lg" style={{backgroundColor: "black"}}   >
      <Container>
        <Navbar.Brand href="#home">CodeAssist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-item" href="#all" onClick={() => setView("all")}>
              ALL POSTS
            </Nav.Link>
            <Nav.Link className="nav-item" href="#my" onClick={() => setView("my")}>
              MY POSTS
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
