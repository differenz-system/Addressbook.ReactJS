import React from "react";

// redux
import { connect } from "react-redux";
import { Container, Row, Col, Alert } from "reactstrap";

// components
import AddressBookForm from "./modules/addressbook/AddressBookForm";
import AddressBookList from "./modules/addressbook/AddressBookList";
import Login from "./modules/login/login";

const App = (props) => {

  // Show alert dialog with error message
  const alerts = (message) => {
    return (
      <Alert color="danger">
        {message}
      </Alert>
    );
  }

  // if user already login,then show address book page
  if (localStorage.getItem("is_login")) {
    return (
      <div className="App">
        <Container className="pt-5 pl-0 pr-0">
          <Row>
            <Col xs="12">
              <AddressBookForm />
            </Col>
            <Col xs="12">
              <br />
              <AddressBookList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  // if user is not login show login page 
  else {
    return (
      <div className="App">
        <Container className="pt-5">
          <Row>
            <Col xs="12">
              {props.erorrs && props.erorrs.length ? alerts(props.erorrs[0].msg) : ""}
              <Login key="0" error={(props.erorrs && props.erorrs.length) ? props.erorrs[0].msg : 'error'} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    erorrs: state
  };
};
export default connect(mapStateToProps)(App);
