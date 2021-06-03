const addressBookReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      // add new contact to redux
      return state.concat([action.data]);
    case "DELETE_CONTACT":
      // delete contact from redux
      return state.filter(addressBooks => addressBooks.id !== action.id);
    case "EDIT_CONTACT":
      // enable edit to contact
      return state.map(addressBooks =>
        addressBooks.id === action.id
          ? { ...addressBooks, editing: !addressBooks.editing }
          : addressBooks
      );
    case "UPDATE_CONTACT":
      // update contact to redux
      return state.map(addressBooks => {
        if (addressBooks.id === action.id) {
          return {
            ...addressBooks,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            email: action.data.email,
            mobileNo: action.data.mobileNo,
            editing: !addressBooks.editing
          };
        } else return addressBooks;
      });
    case "USER_AUTH":
      // authenication user
      state = [];
      if (action.data.username && action.data.password) {
        if (action.data.username === "admin@admin.com" && action.data.password === "123456789") {
          localStorage.setItem('is_login', true);
          return state;
        } else {
          return state.concat([{ msg: "Username or password invalid" }])
        }
      } else {
        return state.concat([{ msg: "Please Enter Username & password" }])
      }
    case "LOGOUT":
      state = [];
      localStorage.clear();
      return state;
    default:
      return state;
  }
};
export default addressBookReducer;
