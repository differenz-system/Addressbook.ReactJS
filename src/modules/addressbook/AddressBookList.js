import React, { useState } from "react";

// redux
import { connect } from 'react-redux';

// UI component
import { Table, Alert } from "reactstrap";

// component
import Contact from "./Contact";

const AddressBookList = (props) => {
  const [error, setError] = useState("");

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
      {error ? alerts(error) : ""}
      <Table bordered>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">First Name</th>
            <th className="text-center">Last Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Mobile No</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.addressBooks.map((addressBook) => <Contact key={addressBook.id} setError={setError} addressBook={addressBook} />)}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    addressBooks: state
  }
}
export default connect(mapStateToProps)(AddressBookList);
