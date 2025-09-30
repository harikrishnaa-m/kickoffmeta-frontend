import React from "react";
import { FaKey } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

function ChangePasswordModal({ openModal, setOpenModal }) {
  return (
    <Modal
      className="!w-full"
      show={openModal}
      dismissible
      onClose={() => setOpenModal(false)}
    >
      <ModalHeader className="bg-white border-b border-gray-200 rounded-t-lg px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-900 text-center">
          Modify Password
        </h3>
      </ModalHeader>

      <ModalBody className="flex flex-col  items-center justify-center !bg-white  ">
        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter new password"
            type="password"
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Confirm new password"
            type="password"
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter current password"
            type="password"
          />
        </div>
      </ModalBody>

      <ModalFooter className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
        <Button
          color="alternative"
          onClick={() => setOpenModal(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Cancel
        </Button>
        <Button
          onClick={() => setOpenModal(false)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 rounded-md shadow-sm"
        >
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ChangePasswordModal;
