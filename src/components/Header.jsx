import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Магазин обоев</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Главная</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/visualization">
              <Nav.Link>3D Визуализация</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacts">
              <Nav.Link>Контакты</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>О нас</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}