import React from "react";
import { Col, Figure, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signup } from "utils/api-client";
import { validate } from "../utils/validate";

export default function Signup() {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError(null);
      const rawFullname = event.target.elements.fullname.value;
      const rawUsername = event.target.elements.username.value;
      const rawPassword = event.target.elements.password.value;
      const fullname = validate(rawFullname, "username", {
        min_length: 4,
      });
      const username = validate(rawUsername, "username", {
        min_length: 4,
      });
      const password = validate(rawPassword, "password", {
        min_length: 8,
      });
      await signup({ fullname, username, password });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Col style={{ maxWidth: "400px" }} className="mx-auto border px-3 pb-3">
      <Figure className="d-flex flex-column align-items-center">
        <Figure.Image
          style={{ padding: "2em" }}
          width={200}
          height={200}
          src="/img/twitter-splash.png"
          alt="Twitter Logo"
        />
      </Figure>
      <h5 className="font-weight-bolder">See what’s happening now.</h5>
      <fieldset disabled={isLoading}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>
              Choose a username - <small className="text-muted">required</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              autoCapitalize="off"
              autoComplete="off"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="fillname">
            <Form.Label>
              Full name - <small className="text-muted">optional</small>
            </Form.Label>
            <Form.Control
              type="text"
              name="fullname"
              autoCapitalize="on"
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              Choose a password - <small className="text-muted">required</small>
            </Form.Label>
            <Form.Control type="password" name="password"></Form.Control>
          </Form.Group>
          <p className="mt-n2">
            <small>
              Already have an account? <Link to="/login">Log in instead</Link>
            </small>
            <br />
            <small className="text-danger">{error}</small>
          </p>
          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-outline-primary font-weight-bold rounded-pill btn-block"
            >
              <span>Sign up</span>
            </button>
            <div className="seperator">
              <span>or</span>
            </div>
            <Link
              to="login"
              className="btn btn-primary font-weight-bold rounded-pill btn-block"
            >
              <span>Log in</span>
            </Link>
          </div>
        </Form>
      </fieldset>
    </Col>
  );
}
