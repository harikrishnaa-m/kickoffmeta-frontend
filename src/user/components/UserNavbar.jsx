import { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  getNotificationsAPI,
  saveNotificationAPI,
} from "../../services/allAPIs";

const socket = io("http://localhost:3000");

const UserNavbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  //fetch user id to store the notification to backend
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
  console.log("existingUser:", existingUser);

  const userId = existingUser._id;
  console.log(userId);

  // Fetch notifications from backend
  useEffect(() => {
    if (userId) {
      getNotificationsAPI(userId).then((res) => {
        if (res.data) setNotifications(res.data);
      });
    }
  }, [userId]);

  // Listen for socket notifications and save to backend
  useEffect(() => {
    socket.on("team-status", (data) => {
      // Save to backend
      saveNotificationAPI({
        userId: userId,
        message: data.message,
        type: data.status,
      });
      // Update local state
      setNotifications((prev) => [
        {
          message: data.message,
          type: data.status,
          createdAt: new Date(),
        },
        ...prev,
      ]);
    });
    return () => {
      socket.off("team-status");
    };
  }, [userId]);

  // dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target)
    ) {
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="ml-2 text-2xl flex items-center font-bold text-white">
              Kick
              <GiSoccerBall />
              ff Meta
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <FaBell className="text-lg" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-10 w-64 bg-gray-800 rounded-md shadow-lg py-2 z-50 h-150 overflow-y-scroll">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">
                      Notifications
                    </p>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 mx-2 my-1 rounded bg-gradient-to-r from-blue-500 to-purple-600">
                      <p className="text-sm text-white font-medium">
                        Welcome to Kickoff Meta!
                      </p>
                      <p className="text-xs text-blue-100 mt-1">
                        We're excited to have you on board.
                      </p>
                    </div>
                  ) : (
                    notifications.map((note, idx) => (
                      <div
                        key={idx}
                        className={`p-4 mx-2 my-1 rounded ${
                          note.type === "accepted"
                            ? "bg-green-600"
                            : note.type === "rejected"
                            ? "bg-red-600"
                            : "bg-gradient-to-r from-blue-500 to-purple-600"
                        }`}
                      >
                        <p className="text-sm text-white font-medium">
                          {note.message}
                        </p>
                        {note.createdAt && (
                          <p className="text-xs text-blue-100 mt-1">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    ))
                  )}
                  <div className="px-4 py-2 text-center">
                    {/* <a
                      href="#"
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      View all notifications
                    </a> */}
                  </div>
                </div>
              )}
            </div>

            {/* User dropdown */}
            <div className="ml-4 flex items-center relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <FaUserCircle className="text-gray-300" />
                </div>
                <FaChevronDown
                  className={`text-gray-400 text-xs transition transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      navigate("/");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Kickoffmeta Main
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
