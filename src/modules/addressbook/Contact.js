import React, { useState } from "react";

// redux
import { connect } from "react-redux";

const Contact = (props) => {

  // Default data
  const [addressData, setAddressData] = useState({
    email: props.addressBook.email,
    firstname: props.addressBook.firstName,
    lastname: props.addressBook.lastName,
    mobileNo: props.addressBook.mobileNo
  })

  const handleSubmit = e => {

    e.preventDefault();
    // mobile no validation
    if (isNaN(addressData.mobileNo) || addressData.mobileNo.length !== 10) {
      props.setError('Please enter valid mobile number.');
      setTimeout(() => {
        props.setError('');
      }, 5000);
    }
    else {
      let firstName = addressData.firstname;
      let lastName = addressData.lastname;
      let email = addressData.email;
      let mobileNo = addressData.mobileNo;
      let data = {
        id: props.addressBook.id,
        firstName,
        lastName,
        email,
        mobileNo
      }
      props.dispatch({
        type: 'UPDATE_CONTACT',
        id: props.addressBook.id,
        data
      });
    }
  }

  // if user click on edit contact than show editing form with update and cancle button.
  if (props.addressBook.editing) {
    return (
      <tr>
        <td>{props.addressBook.id}</td>
        <td>
          <input
            required
            className="form-control"
            type="text"
            name="firstname"
            defaultValue={props.addressBook.firstName}
            onChange={(e) => setAddressData({ ...addressData, firstname: e.target.value })}
          />
        </td>
        <td>
          <input
            required
            className="form-control"
            type="text"
            name="lastname"
            defaultValue={props.addressBook.lastName}
            onChange={(e) => setAddressData({ ...addressData, lastname: e.target.value })}
          />
        </td>
        <td>
          <input
            required
            className="form-control"
            type="text"
            name="email"
            defaultValue={props.addressBook.email}
            onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
          />
        </td>
        <td>
          <input
            required
            className="form-control"
            type="text"
            name="mobileNo"
            maxLength="10"
            defaultValue={props.addressBook.mobileNo}
            onChange={(e) => setAddressData({ ...addressData, mobileNo: e.target.value })}
          />
        </td>
        <td className="text-center">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Update
            </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() =>
              props.dispatch({
                type: "EDIT_CONTACT",
                id: props.addressBook.id
              })
            }
          >
            Cancle
            </button>
        </td>
      </tr>
    );
  }
  // show contact data with edit and delete button.
  else {
    return (
      <tr>
        <td className="text-center">{props.addressBook.id}</td>
        <td className="text-center">{props.addressBook.firstName}</td>
        <td className="text-center">{props.addressBook.lastName}</td>
        <td className="text-center">{props.addressBook.email}</td>
        <td className="text-center">{props.addressBook.mobileNo}</td>
        <td className="d-flex justify-content-around">
          <button
            className="btn btn-primary"
            onClick={() =>
              props.dispatch({
                type: "EDIT_CONTACT",
                id: props.addressBook.id
              })
            }
          >
            Edit
            </button>{" "}
          <button
            className="btn btn-danger"
            onClick={() =>
              props.dispatch({
                type: "DELETE_CONTACT",
                id: props.addressBook.id
              })
            }
          >
            Delete
            </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addressBooks: state
  }
}
export default connect(mapStateToProps)(Contact);
