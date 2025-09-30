import React from "react";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Paymentsuccess() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="mb-6 p-4 bg-green-100 rounded-full">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your transaction has been completed
            successfully.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center justify-center gap-2 text-blue-600 hover:underline font-medium py-3 px-6 rounded-lg transition duration-200 flex-1"
            >
              <FaHome />
              Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentsuccess;
