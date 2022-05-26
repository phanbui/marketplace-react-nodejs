import { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const MainNavigation = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <LinkContainer to="/listings">
          <Navbar.Brand href="#">Marketplace</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/listings">
              <Nav.Link>All Listing</Nav.Link>
            </LinkContainer>
            {auth.isLoggedIn && (
              <LinkContainer to="/listings/new">
                <Nav.Link>Add Listing</Nav.Link>
              </LinkContainer>
            )}
            {auth.isLoggedIn && (
              <LinkContainer to="/listings/mylistings">
                <Nav.Link>My Listings</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav>
            {!auth.isLoggedIn && (
              <LinkContainer to="/users/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {!auth.isLoggedIn && (
              <LinkContainer to="/users/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            )}
            {/* {auth.isLoggedIn && (
              <Navbar.Text>
                Signed in as: {auth.userId}
              </Navbar.Text>
            )} */}
            {auth.isLoggedIn && (
              <Button variant="outline-success" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
