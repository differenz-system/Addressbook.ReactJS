import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "../pages/contacts/slice/ContactSlice";
import authReducer from "../pages/login/Slice/authSlice";

// Clear old localStorage keys that might conflict
try {
  const oldContactsKey = "contacts";
  const oldAuthKeys = ["isAuthenticated", "user", "registeredUsers"];
  
  // Check if old format exists (direct keys without persist:)
  if (localStorage.getItem(oldContactsKey) && !localStorage.getItem("persist:contacts")) {
    localStorage.removeItem(oldContactsKey);
  }
  
  oldAuthKeys.forEach(key => {
    if (localStorage.getItem(key) && !localStorage.getItem("persist:auth")) {
      localStorage.removeItem(key);
    }
  });
} catch (error) {
  console.error("Error clearing old localStorage:", error);
}

// Persist config for contacts
const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["contacts"], // Only persist contacts array
  version: 1,
};

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user", "registeredUsers"], // Persist these
  version: 1,
};

const rootReducer = {
  contacts: persistReducer(contactsPersistConfig, contactsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
};

export default rootReducer;
