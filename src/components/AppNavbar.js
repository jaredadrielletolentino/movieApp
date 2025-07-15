import { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    // Apply the new navbar classes
    <Navbar className="custom-navbar" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <strong>🎬 MovieApp</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/movies" className="nav-link-custom">Movies</Nav.Link>
          </Nav>
          <Nav>
            {user.id ? (
              <Button as={Link} to="/logout" variant="danger">Logout</Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="primary" className="me-2">Login</Button>
                <Button as={Link} to="/register" variant="secondary">Register</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
