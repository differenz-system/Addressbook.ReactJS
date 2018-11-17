import React, { Component } from "react";
import { connect } from 'react-redux';
import { Table } from "reactstrap";

import Contact from "./Contact";
class AddressBookList extends Component {
  render() {
    return (
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.props.addressBooks.map((addressBook) => <Contact key={addressBook.id} addressBook={addressBook} />)}
          </tbody>
        </Table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      addressBooks: state
  }
}
export default connect(mapStateToProps)(AddressBookList);
