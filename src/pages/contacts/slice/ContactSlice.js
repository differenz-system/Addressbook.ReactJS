import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import contactsData from "../../../components/constants/contactsData.json";
import toast from "react-hot-toast";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
  selectedContact: null,
};

// Async thunk to fetch contacts (simulating API call)
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if contacts already exist in state (from Redux Persist)
      const { contacts } = getState().contacts;
      if (contacts && contacts.length > 0) {
        return contacts;
      }

      // Otherwise return default contacts
      return contactsData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to add contact
export const addContactAsync = createAsyncThunk(
  "contacts/addContact",
  async (contactData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newContact = {
        id: Date.now(),
        ...contactData,
      };
      return newContact;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to update contact
export const updateContactAsync = createAsyncThunk(
  "contacts/updateContact",
  async (contactData, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return contactData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to delete contact
export const deleteContactAsync = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add contact
      .addCase(addContactAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.unshift(action.payload);
        toast.success("Contact added successfully!");
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to add contact");
      })
      // Update contact
      .addCase(updateContactAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
        toast.success("Contact updated successfully!");
      })
      .addCase(updateContactAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to update contact");
      })
      // Delete contact
      .addCase(deleteContactAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload,
        );
        toast.success("Contact deleted successfully!");
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to delete contact");
      });
  },
});

export const { setSelectedContact, clearSelectedContact } =
  contactSlice.actions;

// Selectors
export const selectContacts = (state) => state.contacts.contacts;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectSelectedContact = (state) => state.contacts.selectedContact;

// Memoized selectors
export const selectContactsCount = createSelector(
  [selectContacts],
  (contacts) => contacts.length,
);

export default contactSlice.reducer;
