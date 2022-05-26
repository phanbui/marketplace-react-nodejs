import { useState, useEffect, useContext } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import MiddleWrapper from "../../shared/components/MiddleWrapper";
import { AuthContext } from "../../shared/context/auth-context";

const EditListing = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [listing, setListing] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // get listing data
  const listingId = useParams().listingId;
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + `/listings/${listingId}`)
      .then((response) => response.json())
      .then((data) => {
        setListing(data);
        setIsLoading(false);
      });
  }, []);

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit form, fetch
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("condition", data.condition);
    formData.append("description", data.description);
    formData.append("postalCode", data.postalCode);

    fetch(process.env.REACT_APP_BACKEND_URL + `/listings/${listingId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          auth.logout();
          navigate("/users/login");
        } else {
          navigate(`/listings/${listingId}`);
        }
      });
  };

  return (
    <MiddleWrapper>
      {!isLoading && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register("title", { required: "This field is required" })}
              defaultValue={listing.title}
            />
          </Form.Group>
          <p>{errors.title?.message}</p>

          {/* price */}
          <Form.Label>Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl
              type="number"
              {...register("price", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Price cannot be nagative",
                },
              })}
              aria-label="Amount (to the nearest dollar)"
              defaultValue={listing.price}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <p>{errors.price?.message}</p>

          {/* condition */}
          <Form.Group className="mb-3">
            <Form.Label>Condition</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("condition", { required: "This field is required" })}
              defaultValue={listing.condition}
            >
              <option value="Open Box">Open Box</option>
              <option value="Used-Like New">Used-Like New</option>
              <option value="Used-Good">Used-Good</option>
              <option value="Used-Fair">Used-Fair</option>
            </Form.Select>
          </Form.Group>
          <p>{errors.condition?.message}</p>

          {/* description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows={5}
              aria-label="With textarea"
              {...register("description")}
              defaultValue={listing.description}
            />
          </Form.Group>

          {/* postal code */}
          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Postal Code"
              {...register("postalCode", {
                required: "This field is required",
              })}
              defaultValue={listing.postalCode}
            />
          </Form.Group>
          <p>{errors.postalCode?.message}</p>

          {/* images */}
          {/* <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" multiple {...register("images")} />
        </Form.Group> */}

          {/* Submit */}
          <Button variant="primary" type="submit">
            Update Listing
          </Button>
        </Form>
      )}
    </MiddleWrapper>
  );
};

export default EditListing;
