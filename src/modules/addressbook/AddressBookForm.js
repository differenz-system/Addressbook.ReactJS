import React, { Component } from "react";
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label } from "reactstrap";

class AddressBookForm extends Component {
  constructor(props) {
    super(props);
    this.count= 1;
}
  handleSubmit = (e) => {
    e.preventDefault();
    // let data = this.data;
    let firstName = this.getFirstName.value;
    let lastName = this.getLastName.value;
    let email = this.getEmail.value;
    let mobileNo = this.getMobileNo.value;
    let data = {
      id: this.count++,
      firstName,
      lastName,
      email,
      mobileNo
    }
    this.props.dispatch({
      type:'ADD_CONTACT',
      data});
    this.getFirstName.value = '';
    this.getLastName.value = '';
    this.getEmail.value = '';
    this.getMobileNo.value = '';
  }
  render() {
    return (
      <div>
        <div>
        <h1 className="float-left">Address Book</h1>
        <button className="btn btn-warning float-right"  onClick={()=>{ localStorage.clear();window.location.reload(); }} >Logout</button>
        </div>
        <div className="clearfix"></div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <input required type="text" className="form-control" placeholder="Enter Last Name" ref={(input)=>this.getFirstName = input} />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <input required type="text" className="form-control" placeholder="Enter Last Name" ref={(input)=>this.getLastName = input} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <input required type="email" className="form-control" placeholder="Enter Email Address" ref={(input)=>this.getEmail = input} />
          </FormGroup>
          <FormGroup>
            <Label for="mobileNo">Mobile No</Label>
            <input required type="text" maxLength="10"  className="form-control" placeholder="Enter Mobile No" ref={(input)=>this.getMobileNo = input} />
          </FormGroup>
          <Button color="primary">Save</Button>
        </Form>
      </div>
    );
  }
}

export default connect()(AddressBookForm);
