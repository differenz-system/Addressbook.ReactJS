import { DeleteIcon, Trash2Icon, TrashIcon } from "lucide-react";
import React, { useCallback } from "react";

const DeleteConfirmModal = React.memo(
  ({ isOpen, onClose, onConfirm, contactName, loading }) => {
    const handleConfirm = useCallback(() => {
      onConfirm();
    }, [onConfirm]);

    return !isOpen ? null : (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <Trash2Icon className="h-6 w-6 text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Delete Contact
          </h2>

          <p className="text-gray-600 text-center mb-2">
            Are you sure you want to delete
          </p>

          <p className="text-gray-900 font-semibold text-center mb-6">
            {contactName}?
          </p>

          <p className="text-gray-500 text-sm text-center mb-6">
            This action cannot be undone. The contact will be permanently
            removed from your address book.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors font-medium"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

DeleteConfirmModal.displayName = "DeleteConfirmModal";

export default DeleteConfirmModal;
