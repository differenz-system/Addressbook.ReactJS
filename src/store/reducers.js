import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "../pages/contacts/slice/ContactSlice";
import authReducer from "../pages/login/Slice/authSlice";

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
