import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Label } from "reactstrap";

class App extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // let data = this.data;
    let username = this.getUsername.value;
    let password = this.getPassword.value;
    let data = {
      username,
      password
    };
    this.props.dispatch({
      type: "USER_AUTH",
      data
    });
  };
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="12">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="firstName">Username</Label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    placeholder="Enter Last Name"
                    ref={input => (this.getUsername = input)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Password</Label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Enter Last Name"
                    ref={input => (this.getPassword = input)}
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
}
const mapStateToProps = state => {
  return {
    errors: state
  };
};
export default connect(mapStateToProps)(App);
