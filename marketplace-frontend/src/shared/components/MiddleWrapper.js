import { Container, Row, Col } from "react-bootstrap";

const MiddleWrapper = (props) => {
  return (
    <Container className="mt-5 mb-5">
      <Row>
        <Col></Col>
        <Col>{props.children}</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default MiddleWrapper;
