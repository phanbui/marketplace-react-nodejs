import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import MiddleWrapper from "../../shared/components/MiddleWrapper";
import { AuthContext } from "../../shared/context/auth-context";

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Wrong Credential!");
          navigate("/users/login");
        } else {
          auth.login(data.userId, data.token);
          navigate("/listings");
        }
      });
  };

  return (
    <MiddleWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            {...register("email", { required: "This field is required" })}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: "This field is required" })}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </MiddleWrapper>
  );
};

export default Login;
