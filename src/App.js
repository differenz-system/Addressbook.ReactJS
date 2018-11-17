import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col ,Alert } from "reactstrap";
import AddressBookForm from "./modules/addressbook/AddressBookForm";
import AddressBookList from "./modules/addressbook/AddressBookList";
import Login from "./modules/login/login";
class App extends Component {
   alerts(message) {
    return (
      <Alert color="danger">
      {message}
      </Alert>
    );
  }

  render() {
    if (localStorage.getItem("is_login")) {
      return (
        <div className="App">
          <Container className="pt-5">
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
    } else {
      return (
        <div className="App">
          <Container className="pt-5">
            <Row>
              <Col xs="12">
                {console.log(this.props.erorrs)}
                {this.props.erorrs && this.props.erorrs.length? this.alerts(this.props.erorrs[0].msg): ""}
                <Login key="0" error={(this.props.erorrs && this.props.erorrs.length)  ? this.props.erorrs[0].msg : 'error' } />
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    erorrs: state
  };
};
export default connect(mapStateToProps)(App);
