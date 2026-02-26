import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumber } from "libphonenumber-js";
import Select from "react-select";
import { countries } from "countries-list";
import {
  addContactAsync,
  updateContactAsync,
  clearSelectedContact,
} from "../pages/contacts/slice/ContactSlice";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .test("is-valid-phone", "Invalid phone number", function (value) {
      if (!value) return false;
      try {
        const phoneNumber = parsePhoneNumber("+" + value);
        return phoneNumber && phoneNumber.isValid();
      } catch (error) {
        return false;
      }
    }),
  country: Yup.string().required("Country is required"),
  state: Yup.string().trim().required("State is required"),
  city: Yup.string().trim().required("City is required"),
  zipCode: Yup.string()
    .trim()
    .required("Zip code is required")
    .matches(/^[0-9]{5,10}$/, "Invalid zip code format"),
});

const ContactModal = React.memo(({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedContact = useSelector(
    (state) => state.contacts.selectedContact,
  );
  const loading = useSelector((state) => state.contacts.loading);

  // Memoized countries list for Select component
  const countriesOptions = useMemo(() => {
    return Object.entries(countries).map(([code, country]) => ({
      value: code,
      label: country.name,
    }));
  }, []);

  const initialValues = {
    firstName: selectedContact?.firstName || "",
    lastName: selectedContact?.lastName || "",
    email: selectedContact?.email || "",
    contactNumber: selectedContact?.contactNumber?.replace(/\D/g, "") || "",
    country: selectedContact?.country || "us",
    state: selectedContact?.state || "",
    city: selectedContact?.city || "",
    zipCode: selectedContact?.zipCode || "",
  };

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      const contactData = {
        ...values,
        contactNumber: "+" + values.contactNumber,
      };

      if (selectedContact) {
        // Update existing contact
        await dispatch(
          updateContactAsync({ ...contactData, id: selectedContact.id }),
        );
      } else {
        // Add new contact
        await dispatch(addContactAsync(contactData));
      }

      resetForm();
      dispatch(clearSelectedContact());
      onClose();
    },
    [dispatch, onClose, selectedContact],
  );

  const handleClose = useCallback(() => {
    dispatch(clearSelectedContact());
    onClose();
  }, [dispatch, onClose]);

  useEffect(() => {
    if (!isOpen) {
      dispatch(clearSelectedContact());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {selectedContact ? "Edit Contact" : "Add New Contact"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ touched, errors, setFieldValue, setFieldTouched, values }) => (
            <Form className="space-y-4 p-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.firstName && errors.firstName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="John"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.lastName && errors.lastName
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Doe"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country
                </label>
                <Select
                  id="country"
                  name="country"
                  value={countriesOptions.find(
                    (c) => c.value === values.country,
                  )}
                  onChange={(option) => {
                    setFieldValue("country", option.value);
                    // Update phone input country
                    const phoneInputElement = document.querySelector(
                      ".react-tel-input .flag-dropdown",
                    );
                    if (phoneInputElement) {
                      phoneInputElement.click();
                    }
                  }}
                  onBlur={() => setFieldTouched("country", true)}
                  options={countriesOptions}
                  className={`${
                    touched.country && errors.country ? "border-red-500" : ""
                  }`}
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor:
                        touched.country && errors.country
                          ? "#ef4444"
                          : "#d1d5db",
                      "&:hover": {
                        borderColor:
                          touched.country && errors.country
                            ? "#ef4444"
                            : "#d1d5db",
                      },
                    }),
                  }}
                  placeholder="Select country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>

                <PhoneInput
                  country={(values.country || "us").toLowerCase()}
                  value={values.contactNumber}
                  onChange={(phone) => setFieldValue("contactNumber", phone)}
                  onBlur={() => setFieldTouched("contactNumber", true)}
                  inputClass={`w-full ${
                    touched.contactNumber && errors.contactNumber
                      ? "border-red-500"
                      : ""
                  }`}
                  containerClass="w-full"
                  inputStyle={{
                    width: "100%",
                    height: "42px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    border: `1px solid ${
                      touched.contactNumber && errors.contactNumber
                        ? "#ef4444"
                        : "#d1d5db"
                    }`,
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                    border: `1px solid ${
                      touched.contactNumber && errors.contactNumber
                        ? "#ef4444"
                        : "#d1d5db"
                    }`,
                  }}
                />
                {touched.contactNumber && errors.contactNumber && (
                  <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    {errors.contactNumber}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <Field
                    type="text"
                    id="state"
                    name="state"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      touched.state && errors.state
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="California"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      touched.city && errors.city
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Los Angeles"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Zip Code
                </label>
                <Field
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    touched.zipCode && errors.zipCode
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="90001"
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
                >
                  {loading
                    ? "Saving..."
                    : selectedContact
                      ? "Update Contact"
                      : "Add Contact"}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

ContactModal.displayName = "ContactModal";

export default ContactModal;
