import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactModal from "../../modals/ContactModal";
import DeleteConfirmModal from "../../modals/DeleteConfirmModal";
import CustomTable from "../../components/common/CustomTable";
import toast from "react-hot-toast";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react";
import {
  fetchContacts,
  deleteContactAsync,
  setSelectedContact,
  selectContacts,
  selectLoading,
  selectError,
} from "./slice/ContactSlice";
import { countries } from "countries-list";

function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContactForDelete, setSelectedContactForDelete] =
    useState(null);
  const [sorting, setSorting] = useState([]);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEditContact = useCallback(
    (contact) => {
      dispatch(setSelectedContact(contact));
      setIsModalOpen(true);
    },
    [dispatch],
  );

  const handleDeleteContact = useCallback((contact) => {
    setSelectedContactForDelete(contact);
    setIsDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedContactForDelete) {
      dispatch(deleteContactAsync(selectedContactForDelete.id));
      setIsDeleteModalOpen(false);
      setSelectedContactForDelete(null);
    }
  }, [selectedContactForDelete, dispatch]);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedContactForDelete(null);
  }, []);

  const columns = useMemo(
    () => [
      {
        accessor: "firstName",
        header: "First Name",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      },
      {
        accessor: "lastName",
        header: "Last Name",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      },
      {
        accessor: "email",
        header: "Email",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        accessor: "contactNumber",
        header: "Contact Number",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      },
      {
        accessor: "country",
        header: "Country",
        cell: (info) => (
          <span className="text-gray-600">
            {countries[info.getValue()]?.name || "N/A"}
          </span>
        ),
      },
      {
        accessor: "city",
        header: "City",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue() || "N/A"}</span>
        ),
      },
      {
        accessor: "state",
        header: "State",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue() || "N/A"}</span>
        ),
      },
      {
        accessor: "zipCode",
        header: "Zip Code",
        cell: (info) => (
          <span className="text-gray-600">{info.getValue() || "N/A"}</span>
        ),
      },
      {
        accessor: "actions",
        header: "Actions",
        enableSorting: false,
        cell: (info) => {
          const contact = info.row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditContact(contact)}
                className="p-2 rounded-lg bg-transparent hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-300"
                title="Edit"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteContact(contact)}
                disabled={loading}
                className="p-2 rounded-lg bg-transparent hover:bg-red-100 text-red-600 hover:text-red-700 disabled:text-red-400 disabled:hover:bg-transparent transition-all duration-200 border border-transparent hover:border-red-300 disabled:border-transparent"
                title="Delete"
              >
                <Trash2Icon className="h-5 w-5" />
              </button>
            </div>
          );
        },
      },
    ],
    [handleEditContact, handleDeleteContact, loading],
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Contacts
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your contact list
          </p>
        </div>
        <button
          onClick={handleOpenModal}
          disabled={loading}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add New Contact</span>
        </button>
      </div>

      <CustomTable
        columns={columns}
        data={contacts}
        handleSorting={setSorting}
        sorting={sorting}
        disablePagination={false}
        isLoading={loading}
      />

      <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        contactName={
          selectedContactForDelete
            ? `${selectedContactForDelete.firstName} ${selectedContactForDelete.lastName}`
            : ""
        }
        loading={loading}
      />
    </div>
  );
}

export default ContactsPage;
