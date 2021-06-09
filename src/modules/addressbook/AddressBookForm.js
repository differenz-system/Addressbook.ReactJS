import React, { useState } from "react";

// redux
import { connect } from 'react-redux';

// UI components
import { Button, Form, FormGroup, Label, Alert } from "reactstrap";

const AddressBookForm = (props) => {

  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [addressData, setAddressData] = useState({ email: '', firstname: '', lastname: '', mobileNo: '' });

  // handle submission of new record
  const handleSubmit = (e) => {
    e.preventDefault();

    // mobile no validation
    if (isNaN(addressData.mobileNo) || addressData.mobileNo.length !== 10) {
      setError('Please enter valid mobile number.');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    else {
      let firstName = addressData.firstname;
      let lastName = addressData.lastname;
      let email = addressData.email;
      let mobileNo = addressData.mobileNo;
      let data = {
        id: count,
        firstName,
        lastName,
        email,
        mobileNo
      }

      // add data to redux
      props.dispatch({
        type: 'ADD_CONTACT',
        data
      });
      setCount(count + 1)

      // set default values
      setAddressData({ email: '', firstname: '', lastname: '', mobileNo: '' });
    }
  }

  // Show alert dialog with error message
  const alerts = (message) => {
    return (
      <Alert color="danger">
        {message}
      </Alert>
    );
  }

  return (
    <div>
      <div>
        <h1 className="float-left">Address Book</h1>
        <button className="btn btn-warning float-right" onClick={() => { props.dispatch({ type: 'LOGOUT' }); }} >Logout</button>
      </div>
      {error ? alerts(error) : ""}
      <div className="clearfix"></div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <input required type="text" className="form-control" value={addressData.firstname} name="firstname" placeholder="Enter First Name" onChange={(e) => setAddressData({ ...addressData, firstname: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <input required type="text" className="form-control" value={addressData.lastname} name="lastname" placeholder="Enter Last Name" onChange={(e) => setAddressData({ ...addressData, lastname: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <input required type="email" className="form-control" value={addressData.email} name="email" placeholder="Enter Email Address" onChange={(e) => setAddressData({ ...addressData, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="mobileNo">Mobile No</Label>
          <input required type="text" maxLength="10" className="form-control" value={addressData.mobileNo} name="mobileNo" placeholder="Enter Mobile No" onChange={(e) => setAddressData({ ...addressData, mobileNo: e.target.value })} />
        </FormGroup>
        <Button color="primary">Save</Button>
      </Form>
    </div>
  )
}

export default connect()(AddressBookForm);
