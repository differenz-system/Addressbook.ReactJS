import React, { useState } from "react";

// redux
import { connect } from "react-redux";

// UI component
import { Container, Row, Col, Form, FormGroup, Label } from "reactstrap";

const Login = (props) => {

  const [credentials, setCredential] = useState({ username: '', password: '' });

  // auth submit logic
  const handleSubmit = e => {
    e.preventDefault();
    let username = credentials.username;
    let password = credentials.password;
    let data = {
      username,
      password
    };
    props.dispatch({
      type: "USER_AUTH",
      data
    });
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="12">
            <Form onSubmit={handleSubmit}>

              <FormGroup>
                <Label for="firstName">Username</Label>
                <input
                  required
                  type="email"
                  className="form-control"
                  placeholder="Enter Last Name"
                  onChange={(e) => setCredential({ ...credentials, username: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Password</Label>
                <input
                  required
                  type="password"
                  className="form-control"
                  placeholder="Enter Last Name"
                  onChange={(e) => setCredential({ ...credentials, password: e.target.value })}
                />
              </FormGroup>
              <button className="btn btn-primary">Login</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    errors: state
  };
};
export default connect(mapStateToProps)(Login);
