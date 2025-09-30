import { useState, useRef, useEffect } from "react";
import { FaHome, FaKey, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";

import {
  FaTrophy,
  FaSearch,
  FaCog,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaDesktop,
  FaUserFriends,
  FaTshirt,
  FaImage,
} from "react-icons/fa";
import ProfileSection from "../components/ProfileSection";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { GiSoccerBall } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

import {
  addCompetitionAPI,
  approveTeamForCompetitionAPI,
  createCheckoutSessionAPI,
  getOrganizerDashboardCompetitionsAPI,
  getUserAPI,
  updateActiveCompetitionStatusAPI,
} from "../../services/allAPIs";
import { ToastContainer, toast } from "react-toastify";

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [activeTab, setActiveTab] = useState("current");
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //state to hold competition details
  const [competitionDetails, setCompetitionDetails] = useState({
    competitionImage: null,
    tournamentName: "",
    organizationName: "",
    format: "",
    eventLocation: "",
    dateOfEvent: "",
    endDate: "",
    numberOfTeams: "",
    numberOfRounds: "",
    entryFee: "",
    winnersPrize: "",
  });
  //to hold preview
  const [preview, setPreview] = useState("");
  //to hold image list
  const [previewList, setPreviewList] = useState([]);
  //to handle upload
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (!file) return;

    // Update the state with the single image file
    setCompetitionDetails({
      ...competitionDetails,
      competitionImage: file, // directly store the file object
    });

    // Set preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  console.log(competitionDetails);
  console.log(preview);
  //handle reset
  const handleReset = () => {
    setCompetitionDetails({
      competitionImage: null,
      tournamentName: "",
      organizationName: "",
      format: "",
      eventLocation: "",
      dateOfEvent: "",
      endDate: "",
      numberOfTeams: "",
      numberOfRounds: "",
      entryFee: "",
      winnersPrize: "",
    });
  };
  //to hold token
  const [token, setToken] = useState("");
  //useeffect to fetch token
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);
  const formatFees = {
    "Penalty Shootouts": 20000, //in paise
    "Mini Match": 50000,
    "Speed Game": 80000,
    "Full Game": 100000,
    "Virtual League": 20000,
  };
  //handle add competition
  // const handleAddCompetition = async (e) => {
  //   e.preventDefault();
  //   const {
  //     competitionImage,
  //     tournamentName,
  //     organizationName,
  //     format,
  //     eventLocation,
  //     dateOfEvent,
  //     endDate,
  //     numberOfTeams,
  //     numberOfRounds,
  //     entryFee,
  //     winnersPrize,
  //   } = competitionDetails;

  //   if (
  //     !competitionImage ||
  //     !tournamentName ||
  //     !organizationName ||
  //     !format ||
  //     !eventLocation ||
  //     !dateOfEvent ||
  //     !endDate ||
  //     !numberOfTeams ||
  //     !numberOfRounds ||
  //     !entryFee ||
  //     !winnersPrize
  //   ) {
  //     toast.error("Please fill out all the fields", {
  //       position: "top-center",
  //       autoClose: 2000,
  //     });
  //     return;
  //   }

  //   const reqHeader = {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${token}`,
  //   };

  //   const reqBody = new FormData();
  //   for (let key in competitionDetails) {
  //     reqBody.append(key, competitionDetails[key]);
  //   }

  //   try {
  //     const result = await addCompetitionAPI(reqBody, reqHeader);
  //     if (result.status === 200) {
  //       toast.success("Competition created successfully!", {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //       handleReset();
  //     } else {
  //       toast.error("Failed to create competition", {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Server error!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };
  const handleAddCompetition = async (e) => {
    e.preventDefault();

    const {
      competitionImage,
      tournamentName,
      organizationName,
      format,
      eventLocation,
      dateOfEvent,
      endDate,
      numberOfTeams,
      numberOfRounds,
      entryFee,
      winnersPrize,
    } = competitionDetails;

    // validate all fields, including entryFee
    if (
      !competitionImage ||
      !tournamentName ||
      !organizationName ||
      !format ||
      !eventLocation ||
      !dateOfEvent ||
      !endDate ||
      !numberOfTeams ||
      !numberOfRounds ||
      !entryFee ||
      !winnersPrize
    ) {
      toast.error("Please fill out all the fields", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Get the format fee from constant
    const formatFee = formatFees[format];
    if (!formatFee) {
      toast.error("Invalid competition format selected", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Prepare FormData for the API
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const reqBody = new FormData();
    for (let key in competitionDetails) {
      reqBody.append(key, competitionDetails[key]);
    }

    try {
      //  Add competition
      const result = await addCompetitionAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Competition created! Proceeding to payment...", {
          position: "top-center",
          autoClose: 2000,
        });

        //   Stripe payment
        const stripe = await loadStripe(
          "pk_test_51RuT9W2MMbUr2oAY3g6FJ5pQJZtMGQR36IYZsUGdUfzxOy8Ts08CmuEgBZsVZT5PBDJYuUp9WAb3uyYMHINlwcmO00UoWhCKKL"
        );

        const session = await createCheckoutSessionAPI({
          amount: formatFee,
          format,
        });

        if (session?.data?.id) {
          await stripe.redirectToCheckout({ sessionId: session.data.id });
        } else {
          toast.error("Failed to create checkout session");
          console.error("Stripe session creation response:", session);
        }

        handleReset();
      } else {
        toast.error("Failed to create competition", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  //state to hold competition data for dashboard
  const [competitionData, setCompetitionData] = useState([]);
  const getOrganizerDashboardCompetitions = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await getOrganizerDashboardCompetitionsAPI(reqHeader);
      if (result.status === 200) {
        setCompetitionData(result.data);
      } else {
        setCompetitionData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      getOrganizerDashboardCompetitions();
    }
  }, [token]);
  console.log(competitionData);
  const handleApprove = async (competitionId, teamId) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    // Add team to acceptedTeams in competition
    await approveTeamForCompetitionAPI({ competitionId, teamId }, reqHeader);
    // Update team's activeCompetition status to "participating"
    await updateActiveCompetitionStatusAPI(
      { teamId, competitionId, status: "participating" },
      reqHeader
    );
    // Refresh dashboard data
    getOrganizerDashboardCompetitions();
  };

  const handleReject = async (competitionId, teamId) => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    // Only update team's activeCompetition status to "rejected"
    await updateActiveCompetitionStatusAPI(
      { teamId, competitionId, status: "rejected" },
      reqHeader
    );
    // Refresh dashboard data
    getOrganizerDashboardCompetitions();
  };
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
  }, [token]);
  console.log(userData);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold flex items-center">
              Kick
              <GiSoccerBall />
              ff Meta
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-white rounded-xl p-2 text-black"
            >
              Homepage
            </button>
            <button
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
              className="bg-white rounded-xl p-2 text-black"
            >
              LogOut
            </button>

            {/* <button className="bg-indigo-800 hover:bg-indigo-900 rounded-full p-2">
              <FaCog className="text-xl" />
            </button> */}
            <div className="relative" ref={dropdownRef}>
              {/* Avatar with initials */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center font-semibold text-white">
                  {userData.profilePic == null ? (
                    <div></div>
                  ) : (
                    <div>
                      <img
                        className="rounded-full w-10 h-10"
                        src={`https://kickoffmeta-backend.onrender.com/uploads/${userData.profilePic}`}
                        alt=""
                      />
                    </div>
                  )}
                </div>
                {/* <FaChevronDown
                  className={`text-gray-400 transition-transform ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                /> */}
              </button>

              {/* Dropdown menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <a
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      navigate("/");
                      setIsOpen(false);
                    }}
                  >
                    <FaHome className="mr-2" />
                    Back to Home
                  </a>

                  {/* <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setIsOpen(false); // close dropdown
                      setShowPasswordModal(true); // open modal
                    }}
                  >
                    <FaKey className="mr-2" />
                    Change Password
                  </button> */}

                  <a
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      sessionStorage.clear();
                      navigate("/");
                      setIsOpen(false);
                    }}
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </a>
                </div>
              )}

              <ChangePasswordModal
                openModal={showPasswordModal}
                setOpenModal={setShowPasswordModal}
              />
            </div>
          </div>
        </div>
      </header>
      <ProfileSection />

      {/* heading and subheading */}
      <div className="w-full flex flex-col items-center">
        <div className="w-7xl  flex flex-col items-center  py-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Organizer Dashboard
          </h1>
          <p className="text-gray-600 text-lg mt-1">
            Oversee your events, approve team requests, and stay in control
          </p>
          <div className="mt-6 h-1 w-50 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
          <div className="absolute top-0 right-0 h-32 w-50 -mr-10 -mt-10 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 h-32 w-50 -ml-10 -mb-10 bg-cyan-600 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>

      {/* Body */}
      <div className=" container mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 border border-neutral-300 bg-white p-4 rounded-xl shadow h-[600px] flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("current")}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-left ${
              activeTab === "current"
                ? "bg-gray-900 cursor-pointer  text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            Current Competitions
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-left ${
              activeTab === "create"
                ? "bg-gray-900 cursor-pointer  text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            Create Competition
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-left ${
              activeTab === "requests"
                ? "bg-gray-900 cursor-pointer  text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            Join Requests
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`w-full py-2 px-4 rounded-lg font-semibold text-left ${
              activeTab === "manage"
                ? "bg-gray-900 cursor-pointer  text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            Manage Active Competitions
          </button>
        </div>

        {/* Main Content */}
        <div className="w-3/4 bg-white border border-neutral-300 p-6 rounded-xl shadow h-[600px] overflow-y-auto">
          {activeTab === "current" && (
            <div className="space-y-4">
              {competitionData ? (
                competitionData.map((item) => (
                  <div className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="font-bold text-lg">{item.tournamentName}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaCalendarAlt className="mr-2" />{" "}
                      {new Date(item.dateOfEvent).toDateString()}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="mr-2" /> {item.eventLocation}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaUserFriends className="mr-2" /> {item.format}
                    </p>
                  </div>
                ))
              ) : (
                <div>
                  <p>No competition Found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "create" && (
            <form className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Competition Image
                </label>
                <label className=" w-32 h-32 bg-gray-100 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer">
                  {preview ? (
                    <div>
                      <img className="w-32 h-32" src={preview} alt="" />
                    </div>
                  ) : (
                    <FaImage className="text-3xl text-gray-400" />
                  )}
                  <input
                    onChange={(e) => handleUpload(e)}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tournament Name
                </label>
                <input
                  onChange={(e) =>
                    setCompetitionDetails({
                      ...competitionDetails,
                      tournamentName: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter Tournament Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  onChange={(e) =>
                    setCompetitionDetails({
                      ...competitionDetails,
                      organizationName: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter organization name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Format
                </label>
                <select
                  className="w-full border px-3 py-2 rounded-lg"
                  onChange={(e) =>
                    setCompetitionDetails({
                      ...competitionDetails,
                      format: e.target.value,
                    })
                  }
                >
                  <option value="">Select format</option>
                  <option value="Penalty Shootouts">Penalty Shootouts</option>
                  <option value="Mini Match">Mini Match (5v5)</option>
                  <option value="Speed Game">Speed Game (7v7)</option>
                  <option value="Full Game">Full Game (11v11)</option>
                  <option value="Virtual League">Virtual League</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  District/Platform
                </label>
                <input
                  onChange={(e) =>
                    setCompetitionDetails({
                      ...competitionDetails,
                      eventLocation: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg"
                  placeholder="Enter platform"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Event
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        dateOfEvent: e.target.value,
                      })
                    }
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    No of Teams
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        numberOfTeams: e.target.value,
                      })
                    }
                    type="number"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Number of teams"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        endDate: e.target.value,
                      })
                    }
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    No of rounds
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        numberOfRounds: e.target.value,
                      })
                    }
                    type="number"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="Number of rounds"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Entry Fee
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        entryFee: e.target.value,
                      })
                    }
                    type="number"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="₹"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Winners Prize
                  </label>
                  <input
                    onChange={(e) =>
                      setCompetitionDetails({
                        ...competitionDetails,
                        winnersPrize: e.target.value,
                      })
                    }
                    type="number"
                    className="w-full border px-3 py-2 rounded-lg"
                    placeholder="₹"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleReset}
                  type="reset"
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  onClick={(e) => handleAddCompetition(e)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Make Payment
                </button>
              </div>
            </form>
          )}

          {activeTab === "requests" && (
            <div className="space-y-4">
              {competitionData.length > 0 ? (
                competitionData.map((competition) =>
                  competition.registeredTeams.map((team) => {
                    // find the active competition status for this team
                    const activeComp = team.activeCompetition?.find(
                      (ac) => ac.competition === competition._id
                    );
                    const status = activeComp?.status || "pending";

                    return (
                      <div
                        key={team._id + competition._id}
                        className="bg-gray-100 p-4 rounded shadow flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">{team.name}</p>
                          <p className="text-sm text-gray-500">
                            {competition.tournamentName}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {status === "pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleApprove(competition._id, team._id)
                                }
                                className="px-3 py-1 bg-green-100 text-green-700 rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleReject(competition._id, team._id)
                                }
                                className="px-3 py-1 bg-red-100 text-red-700 rounded"
                              >
                                Reject
                              </button>
                            </>
                          ) : status === "participating" ? (
                            <button
                              className="px-3 py-1 bg-green-600 text-white rounded"
                              disabled
                            >
                              Approved
                            </button>
                          ) : status === "rejected" ? (
                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded"
                              disabled
                            >
                              Rejected
                            </button>
                          ) : null}
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                <p>No join requests found.</p>
              )}
            </div>
          )}
          {activeTab === "manage" && (
            <div className="space-y-4">
              {competitionData.length > 0 ? (
                competitionData.map((item) => (
                  <div
                    key={item._id}
                    className="flex bg-gray-100 border border-neutral-950/10 p-4 justify-between items-center rounded shadow w-full"
                  >
                    <div>
                      <h3 className="font-bold text-lg">
                        {item.tournamentName}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaMapMarkerAlt className="mr-2" /> {item.eventLocation}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaUserFriends className="mr-2" /> {item.format}
                      </p>
                    </div>
                    <button className="bg-gray-900 cursor-pointer text-white font-semibold rounded-lg text-sm max-h-fit p-2">
                      <Link to={`/fixtureorganizer/${item._id}`}>
                        Fixtures and Results
                      </Link>
                    </button>
                  </div>
                ))
              ) : (
                <div>
                  <p>No competitions created yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Competition Format Pricing */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 container mx-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Competition Format Pricing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="border p-4 rounded-lg text-center">
            <FaDesktop className="mx-auto text-blue-500 text-2xl mb-2" />
            <p>Virtual League</p>
            <p className="font-bold mt-1">₹200</p>
          </div>
          <div className="border p-4 rounded-lg text-center">
            <FaUserFriends className="mx-auto text-green-500 text-2xl mb-2" />
            <p>Mini Match (5v5)</p>
            <p className="font-bold mt-1">₹500</p>
          </div>
          <div className="border p-4 rounded-lg text-center">
            <FaUserFriends className="mx-auto text-orange-500 text-2xl mb-2" />
            <p>Speed Game (7v7)</p>
            <p className="font-bold mt-1">₹800</p>
          </div>
          <div className="border p-4 rounded-lg text-center">
            <FaTshirt className="mx-auto text-yellow-500 text-2xl mb-2" />
            <p>Full Game (11v11)</p>
            <p className="font-bold mt-1">₹1000</p>
          </div>
          <div className="border p-4 rounded-lg text-center">
            <FaTrophy className="mx-auto text-purple-500 text-2xl mb-2" />
            <p>Penalty Shootouts</p>
            <p className="font-bold mt-1">₹200</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganizerDashboard;
