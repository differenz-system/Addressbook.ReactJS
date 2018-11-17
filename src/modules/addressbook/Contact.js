import React, { Component } from "react";
import { connect } from "react-redux";
class Contact extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let firstName = this.getFirstName.value;
    let lastName = this.getLastName.value;
    let email = this.getEmail.value;
    let mobileNo = this.getMobileNo.value;
    let data = {
      id: this.props.addressBook.id,
      firstName,
      lastName,
      email,
      mobileNo
    };
    this.props.dispatch({
      type: "UPDATE_CONTACT",
      id: this.props.addressBook.id,
      data
    });
  };

  render() {
    if (this.props.addressBook.editing) {
      return (
        <tr>
          <td>{this.props.addressBook.id}</td>
          <td>
            <input
            required
              className="form-control"
              type="text"
              name="firstName"
              defaultValue={this.props.addressBook.firstName}
              ref={input => (this.getFirstName = input)}
            />
          </td>
          <td>
            <input
            required
              className="form-control"
              type="text"
              name="lastName"
              defaultValue={this.props.addressBook.lastName}
              ref={input => (this.getLastName = input)}
            />
          </td>
          <td>
            <input
            required
              className="form-control"
              type="text"
              name="email"
              defaultValue={this.props.addressBook.email}
              ref={input => (this.getEmail = input)}
            />
          </td>
          <td>
            <input
            required
              className="form-control"
              type="text"
              name="mobileNo"
              defaultValue={this.props.addressBook.mobileNo}
              ref={input => (this.getMobileNo = input)}
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Update
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() =>
                this.props.dispatch({
                  type: "EDIT_CONTACT",
                  id: this.props.addressBook.id
                })
              }
            >
              Cancle
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{this.props.addressBook.id}</td>
          <td>{this.props.addressBook.firstName}</td>
          <td>{this.props.addressBook.lastName}</td>
          <td>{this.props.addressBook.email}</td>
          <td>{this.props.addressBook.mobileNo}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() =>
                this.props.dispatch({
                  type: "EDIT_CONTACT",
                  id: this.props.addressBook.id
                })
              }
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() =>
                this.props.dispatch({
                  type: "DELETE_CONTACT",
                  id: this.props.addressBook.id
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
}
const mapStateToProps = (state) => {
    return {
        addressBooks: state
    }
  }
export default connect(mapStateToProps)(Contact);
