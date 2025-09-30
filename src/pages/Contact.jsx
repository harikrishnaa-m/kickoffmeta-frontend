import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  FaPlayCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaComments,
} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import AppFooter from "../components/Footer";

function Contact({ active, setActive }) {
  const [address, setAddress] = useState(0);
  const handleAddress1 = () => {
    setAddress(0);
  };
  const handleAddress2 = () => {
    setAddress(1);
  };
  console.log(address);

  useEffect(() => {
    setActive(3);
  }, []);
  return (
    <div>
      <Header active={active} />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="bg-white p-8 rounded-lg shadow-xl border border-neutral-950/10 w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-4 text-center">Contact</h1>
            <p className="text-gray-600 mb-6 text-center">
              Please reach out to us with any questions you may have.
            </p>
            <button className="flex items-center justify-center w-full bg-blue-100 text-blue-600 p-2 rounded mb-6">
              <FaPlayCircle className="mr-2" /> Tip: take a look at our video
              tutorials before contacting us
            </button>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-2" />
                <span>Email: info@kickoffmeta.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-2" />
                <span>Phone: +31 20 217 109</span>
                <button className="ml-auto bg-green-500 text-white p-2 rounded flex items-center">
                  <FaWhatsapp className="text-xl font-bold mr-1" /> Start chat
                </button>
              </div>
              <div className="flex flex-col bg-gray-200 p-4 rounded-xl">
                <div className="flex">
                  <button
                    onClick={handleAddress1}
                    className={
                      address == 0
                        ? "bg-indigo-500 text-white p-2 rounded-l mb-2"
                        : "bg-white text-gray-800 p-2 rounded-l mb-2"
                    }
                  >
                    Mailing address
                  </button>
                  <button
                    onClick={handleAddress2}
                    className={
                      address == 1
                        ? "bg-indigo-500 text-white p-2 rounded-r mb-2"
                        : "bg-white text-gray-800 p-2 rounded-r mb-2"
                    }
                  >
                    Office address
                  </button>
                </div>

                {address == 0 ? (
                  <p className="text-gray-800">
                    TourniBV.
                    <br />
                    Maaskade 109 A 02
                    <br />
                    3071 NH Rotterdam
                    <br />
                    The Netherlands
                  </p>
                ) : (
                  <p className="text-gray-800">
                    TourniBV.
                    <br />
                    K.P. Van Der Mandelelaan 41-43
                    <br />
                    3062 MB Rotterdam
                    <br />
                    The Netherlands
                  </p>
                )}
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">Chamber of commerce:</span>
                95501061
                <br />
                <span className="font-semibold">VAT registration number:</span>
                NL867158838B01
                <br />
                <span className="font-semibold">Bank account:</span>
                NL28BUNQ2207003604 - <span className="font-semibold">
                  BIC:
                </span>{" "}
                BUNQNL2A
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded border border-neutral-950/10 shadow p-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.561132219061!2d8.571886476380296!3d47.38148347117016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa0c18166e45d%3A0x9b35f19a87a7dd52!2sFIFA%20headquarters%2C%20Forrenweidstrasse%2C%208044%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sin!4v1753716926348!5m2!1sen!2sin"
            className="min-w-full h-135"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Contact;
