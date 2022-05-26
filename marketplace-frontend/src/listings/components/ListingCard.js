import { useContext } from "react";
import { Card, ListGroup, ListGroupItem, Carousel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";

const ListingCard = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // delete listing handler
  const deleteHandler = () => {
    const id = props.id;
    fetch(process.env.REACT_APP_BACKEND_URL + `/listings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          auth.logout();
          navigate("/users/login");
        } else {
          props.change(data);
          navigate("/listings");
        }
      });
  };

  const goToListingEdit = (e) => {
    navigate(`/listings/${props.id}/edit`);
  };

  return (
    <Card style={{ width: "18rem" }} className="m-5">
      {/* carousel */}
      <Carousel>
        {props.images.map((image) => (
          <Carousel.Item key={image.url}>
            <img className="d-block w-100" src={image.url} alt="No Image" />
          </Carousel.Item>
        ))}
      </Carousel>

      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Card.Body>
            {/* title */}
            <Card.Title>
              <Link to={`/listings/${props.id}`}>{props.title}</Link>
            </Card.Title>

            {/* condition */}
            {props.detailedInfo && (
              <Card.Text>Condition: {props.condition}</Card.Text>
            )}

            {/* description */}
            {props.detailedInfo && props.description && (
              <Card.Text>" {props.description} "</Card.Text>
            )}
          </Card.Body>
        </ListGroupItem>

        {/* price */}
        <ListGroupItem>
          <Card.Body>
            <Card.Text className="text-muted">${props.price}</Card.Text>
          </Card.Body>
        </ListGroupItem>

        {/* postal code */}
        {props.detailedInfo && (
          <ListGroupItem>
            <Card.Body>
              <Card.Text>Postal Code: {props.postalCode}</Card.Text>
            </Card.Body>
          </ListGroupItem>
        )}

        {/* seller */}
        {props.detailedInfo && (
          <ListGroupItem>
            <Card.Body>
              <Card.Text>Seller: {props.email}</Card.Text>
            </Card.Body>
          </ListGroupItem>
        )}

        {/* edit and delete button */}
        {auth.isLoggedIn && auth.userId === props.seller && (
          <ListGroupItem>
            <Card.Body>
              <button
                className="btn btn-primary card-link"
                onClick={goToListingEdit}
              >
                Edit Listing
              </button>

              <button
                className="btn btn-danger card-link"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </Card.Body>
          </ListGroupItem>
        )}
      </ListGroup>
    </Card>
  );
};

export default ListingCard;
