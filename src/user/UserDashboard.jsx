import {
  FaTrophy,
  FaUsers,
  FaBell,
  FaSearch,
  FaCalendarAlt,
  FaUserCircle,
  FaChessKnight,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { RiSwordFill, RiDashboardFill } from "react-icons/ri";
import { BsGraphUp, BsPencilSquare } from "react-icons/bs";
import UserNavbar from "./components/UserNavbar";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import {
  editUserAPI,
  getTeamsManagedAPI,
  getUserAPI,
} from "../services/allAPIs";

function UserDashboard() {
  //state to hold team details
  const [teamsManaged, setTeamsManaged] = useState([]);
  const getTeamsManaged = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await getTeamsManagedAPI(reqHeader);
      console.log(result.data);
      setTeamsManaged(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      getTeamsManaged();
    }
  }, []);
  console.log(teamsManaged);
  //actvie no of competitions
  const filteredComps = [];

  teamsManaged?.forEach((team) => {
    team.activeCompetition.forEach((comp) => {
      if (comp.status === "pending" || comp.status === "participating") {
        filteredComps.push(comp);
      }
    });
  });

  const activeCount = filteredComps.length;
  console.log("active no:", activeCount);

  const [formValue, setFormValue] = useState({
    profilePic: null,
    fullName: "",
    currentTeam: "",
    bio: "",
  });
  console.log(formValue);
  const [preview, setPreview] = useState(null);
  const handleProfpic = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFormValue({ ...formValue, profilePic: file });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  console.log(preview);
  const handleReset = () => {
    setPreview(null);
    setFormValue({ profilePic: null, fullName: "", currentTeam: "", bio: "" });
  };
  //edit profile
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    if (
      formValue.currentTeam == "" ||
      formValue.bio == "" ||
      formValue.profilePic == null ||
      formValue.fullName == ""
    ) {
      alert("Fill the Form");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", formValue.fullName);
    formData.append("currentTeam", formValue.currentTeam);
    formData.append("bio", formValue.bio);
    if (formValue.profilePic) {
      formData.append("profilePic", formValue.profilePic);
    }
    try {
      const res = await editUserAPI(formData, reqHeader);
      if (res.status === 200) {
        getUser(); // Update UI with new user data
        setOpenModal(false); // Close modal
        handleReset();
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };
  const [userData, setUserData] = useState({});
  const token = sessionStorage.getItem("token");
  const getUser = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getUserAPI(reqHeader);
      console.log(res.data);
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  //useeffect to fetch user details
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);
  console.log(userData.profilePic);
  const [openModal, setOpenModal] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
        {/* Dark Navigation Bar */}
        <UserNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                  {userData?.profilePic ? (
                    <img
                      className="h-full w-full rounded-full"
                      src={`https://kickoffmeta-backend.onrender.com/uploads/${userData.profilePic}`}
                      alt="Profile"
                    />
                  ) : (
                    <FaUserCircle className="h-10 w-10 text-gray-500" />
                  )}
                </div>
                {/* <label
                  htmlFor="profilepic"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-blue-50 transition"
                >
                  <BsPencilSquare className="text-blue-500 text-sm" />
                  <input id="profilepic" type="file" className="hidden" />
                </label> */}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.fullName}
                </h1>
                <div className="mb-3">
                  <p className="text-gray-600 italic">{userData.bio}</p>
                </div>
                <button
                  onClick={() => setOpenModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
                >
                  <BsPencilSquare className="mr-2" />
                  Edit Profile
                </button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <ModalHeader className="bg-white">
                    <p className="text-black">Edit Profile</p>
                  </ModalHeader>
                  <ModalBody className="bg-white">
                    <div className="flex flex-col  items-center justify-center">
                      <div className="relative mb-4 md:mb-0 md:mr-6">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
                          {preview ? (
                            <div className="w-25 h-25">
                              <img
                                className="w-full h-full rounded-full"
                                src={preview}
                                alt=""
                              />
                            </div>
                          ) : (
                            <FaUserCircle />
                          )}
                        </div>
                        <label
                          htmlFor="profpic"
                          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-blue-50 transition"
                        >
                          <BsPencilSquare className="text-blue-500 text-sm" />
                          <input
                            onChange={handleProfpic}
                            id="profpic"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <div className="flex flex-col justify-start">
                        <label htmlFor="">UserName</label>
                        <input
                          value={formValue.fullName}
                          onChange={(e) =>
                            setFormValue({
                              ...formValue,
                              fullName: e.target.value,
                            })
                          }
                          className="p-2 border border-gray-400 rounded-md w-80"
                          type="text"
                          name=""
                          id=""
                          placeholder="Username"
                        />
                      </div>
                      <div className="flex flex-col justify-start ">
                        {" "}
                        <label htmlFor="">Current Team</label>
                        <input
                          value={formValue.currentTeam}
                          onChange={(e) =>
                            setFormValue({
                              ...formValue,
                              currentTeam: e.target.value,
                            })
                          }
                          className="p-2  border border-gray-400 rounded-md w-80"
                          type="text"
                          placeholder="Current Team"
                        />
                      </div>

                      <div className="flex flex-col justify-start">
                        <label htmlFor="">Profile Bio</label>
                        <textarea
                          value={formValue.bio}
                          onChange={(e) =>
                            setFormValue({ ...formValue, bio: e.target.value })
                          }
                          className="p-2 border border-gray-400 rounded-md w-80 "
                          rows={4}
                          name=""
                          id=""
                        ></textarea>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex justify-end bg-white">
                    <Button
                      className="!bg-red-600 !text-white"
                      color="alternative"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button
                      className="!bg-green-600 !text-white"
                      onClick={handleEditProfile}
                    >
                      Modify
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <RiSwordFill className="text-blue-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Active Competitions</p>
                  <h3 className="text-2xl font-bold">{activeCount}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-purple-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 mr-4">
                  <FaUsers className="text-purple-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Current Team</p>
                  <h3 className="text-2xl font-bold">
                    {userData.currentTeam}{" "}
                  </h3>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <BsGraphUp className="text-green-500 text-xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Win Rate</p>
                  <h3 className="text-2xl font-bold">78%</h3>
                </div>
              </div>
            </div> */}
          </div>

          {/* Current Competitions */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 ">
            <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-xl font-bold flex items-center text-gray-800">
                <RiSwordFill className="text-blue-500 mr-2" />
                Your Tournaments
              </h2>
              {/* <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                View All
              </button> */}
            </div>

            <div className="space-y-4 overflow-y-scroll h-80">
              {teamsManaged?.map((team) =>
                team.activeCompetition.map((comp, index) => (
                  <div
                    key={`${team._id}-${index}`}
                    className="bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition border-l-4 border-blue-400"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {comp.competition.tournamentName}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="mr-2" />
                          <span>
                            Organizer: {comp.competition.organizationName}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="mr-2" />
                          <span>Team: {team.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                          {comp.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Competition History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-800">
                <FaTrophy className="text-yellow-500 mr-2" />
                Managed Teams
              </h2>
              {/* <button className="text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition">
                View All
              </button> */}
            </div>

            <div className="overflow-x-auto space-y-2.5 overflow-y-scroll h-80">
              {teamsManaged ? (
                teamsManaged.map((item) => (
                  <div className="w-full flex justify-between items-center p-4 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    {/* Team Info */}
                    <div className="flex flex-col space-y-1">
                      <p className="text-lg font-semibold text-gray-800">
                        Team Name : {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Captain : {item.captain}
                      </p>
                    </div>
                    {/* Image Container */}
                    <div className="flex-shrink-0">
                      <img
                        className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500 shadow-md"
                        src={`https://kickoffmeta-backend.onrender.com/uploads/${item.logo}`}
                        alt="Team Captain"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p>No teams Managed yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
