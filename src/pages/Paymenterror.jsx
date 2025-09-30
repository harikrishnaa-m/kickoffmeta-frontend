import React from "react";
import { FaTimesCircle, FaHome, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Paymenterror() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="mb-6 p-4 bg-red-100 rounded-full">
            <FaTimesCircle className="text-red-500 text-6xl" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't process your payment. Please check your payment details
            and try again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={() => navigate("/")}
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

export default Paymenterror;
